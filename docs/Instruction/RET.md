# RET
 
## Return from Procedure
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|C3|RET|Near return to calling procedure.|
|CB|RET|Far return to calling procedure.|
|C2 iw|RET imm16|Near return to calling procedure and pop imm16 bytes from stack.|
|CA iw|RET imm16|Far return to calling procedure and pop imm16 bytes from stack.|
 
## Description
 
Transfers program control to a return address located on the top of the stack. The address is usually placed on the stack by a CALL instruction, and the return is made to the instruction that follows the CALL instruction.
 
The optional source operand specifies the number of stack bytes to be released after the return address is popped; the default is none. This operand can be used to release parameters from the stack that were passed to the called procedure and are no longer needed. It must be used when the CALL instruction used to switch to a new procedure uses a call gate with a non-zero word count to access the new procedure. Here, the source operand for the RET instruction must specify the same number of bytes as is specified in the word count field of the call gate.
 
The RET instruction can be used to execute three different types of returns:
 
> * Near return
> A return to a calling procedure within the current code segment (the segment currently pointed to by the CS register), sometimes referred to as an intrasegment return.
> * Far return
> A return to a calling procedure located in a different segment than the current code segment, sometimes referred to as an intersegment return.
> * Inter-privilege-level far return
> A far return to a different privilege level than that of the currently executing program or procedure.
The inter-privilege-level return type can only be executed in protected mode. See the section titled "Calling Procedures Using Call and RET" in Chapter 6 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for detailed information on near, far, and inter-privilege- level returns.
 
When executing a near return, the processor pops the return instruction pointer (offset) from the top of the stack into the EIP register and begins program execution at the new instruction pointer. The CS register is unchanged.
 
When executing a far return, the processor pops the return instruction pointer from the top of the stack into the EIP register, then pops the segment selector from the top of the stack into the CS register. The processor then begins program execution in the new code segment at the new instruction pointer.
 
The mechanics of an inter-privilege-level far return are similar to an intersegment return, except that the processor examines the privilege levels and access rights of the code and stack segments being returned to determine if the control transfer is allowed to be made. The DS, ES, FS, and GS segment registers are cleared by the RET instruction during an inter-privilege-level return if they refer to segments that are not allowed to be accessed at the new privilege level. Since a stack switch also occurs on an inter-privilege level return, the ESP and SS registers are loaded from the stack.
 
If parameters are passed to the called procedure during an inter-privilege level call, the optional source operand must be used with the RET instruction to release the parameters on the return.
 
Here, the parameters are released both from the called procedure's stack and the calling procedure's stack (that is, the stack being returned to).
 
 
## Operation
 
```c
switch(Instruction) {
	case NearReturn:
		if(OperandSize == 32 && !IsWithinStackLimits(TopStackBytes(12))) Exception(SS(0)); //top 12 bytes of stack not within stack limits
		//OperandSize == 16
		else if(!IsWithinStackLimits(TopStackBytes(6)) Exception(SS(0)); //IF top 6 bytes of stack not within stack limits
		TemporaryEIP = Pop();
		TemporaryEIP = TemporaryEIP & 0xFFFF;
		if(!IsWithinCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
		EIP = TemporaryEIP;
		if(HasImmediateOperand()) { //instruction has immediate operand
			if(StackAddressSize == 32) ESP = ESP + Source; //release parameters from stack
			//StackAddressSize == 16
			else SP = SP + Source; //release parameters from stack
		}
		break;
	case FarReturn:
		//Real-address mode or virtual-8086 mode
		if(PE == 0 || (PE == 1 && VM == 1)) {
			if(OperandSize == 32) {
				if(!IsWithinStackLimits(TopStackBytes(12)) Exception(SS(0)); //top 12 bytes of stack not within stack limits
				EIP = Pop();
				CS = Pop(); //32-bit pop, high-order 16 bits discarded
			}
			else { //OperandSize == 16
				if(!IsWithinStackLimits(TopStackBytes(6)) Exception(SS(0)); //top 6 bytes of stack not within stack limits
				TemporaryEIP = Pop();
				TemporaryEIP = TemporaryEIP & 0xFFFF;
				if(!IsWithinCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
				EIP = TemporaryEIP;
				CS = Pop(); //16-bit pop
			}
			if(HasImmediateOperand()) else SP = SP + Source; //instruction has immediate operand; release parameters from stack
		}
		//Protected mode, not virtual-8086 mode
		else if(PE == 1 && VM == 0) {
			if(OperandSize == 32 && !IsWithinStackLimits(OffsetStackBytes(4, 4)) Exception(SS(0)); //second doubleword on stack is not within stack limits
			//OperandSize == 16
			else if(!IsWithinStackLimits(OffsetStackBytes(2, 2))) Exception(SS(0)); //second word on stack is not within stack limits
			if(ReturnCode.SegmentSelector == 0) Exception(GP(Selector));
			if(!IsWithinDescriptorTableLimits(ReturnCode.SegmentSelector)) Exception(GP(Selector));
			ReturnCode.SegmentDescriptor = ObtainSegmentDescriptor(); //Obtain descriptor to which return code segment selector points from descriptor table
			if(!IsCodeSegment(ReturnCode.SegmentDescriptor)) Exception(GP(Selector));
			if(ReturnCode.SegmentSelector.RPL < CPL) Exception(GP(Selector));
			if(IsConforming(ReturnCode.SegmentDescriptor && ReturnCode.Segment.DPL > ReturnCode.SegmentSelector.RPL) Exception(GP(Selector));
			if(!IsPresent(ReturnCode.SegmentDescriptor)) Exception(NP(Selector));
			if(ReturnCode.SegmentSelector.RPL > CPL) {
				//Return outer privilege level
				if(OperandSize == 32 && !IsWithinStackLimits(TopStackBytes(16 + Source)) Exception(SS(0)); //top 16 + Source bytes of stack not within stack limits
				//OperandSize == 16
				else if(!IsWithinStackLimits(TopStackBytes(8 + Source)) Exception(SS(0)); //top 8 + Source bytes of stack not within stack limits
				ReturnSegmentSelector = ReadReturnSegmentSelector();
				if(StackSegmentSelector == 0) Exception(GP(0));
				if(!IsWithinDescriptorTableLimits(ReturnStack.SegmentSelector.Index)) Exception(GP(Selector));
				if(StackSegmentSelector.RPL != ReturnCode.SegmentSelector.RPL || !IsWritableDataSegment(StackSegment) || StackSegmentDescriptor.DPL != ReturnCode.SegmentSelector.RPL) Exception(GP(Selector));
				if(!IsPresent(StackSegment)) Exception(SS(StackSegmentSelector));
				if(!IsWithinLimits(ReturnCode.SegmentLimit, ReturnInstructionPointer)) Exception(GP(0));
				CPL = ReturnCode.SegmentSelector.RPL;
				if(OperandSize == 32) {
					EIP = Pop();
					CS = Pop(); //32-bit pop, high-order 16 bits discarded; segment descriptor information also loaded
					CS.RPL = CPL;
					ESP = ESP + Source; //release parameters from called procedure's stack
					TemporaryESP = Pop();
					TemporarySS = Pop(); //32-bit pop, high-order 16 bits discarded; segment descriptor information also loaded
					ESP = TemporaryESP;
					SS = TemporarySS;
				}
				//OperandSize == 16
				else {
					EIP = Pop();
					EIP = EIP & 0xFFFF;
					CS = Pop(); //16-bit pop; segment descriptor information also loaded
					CS.RPL = CPL;
					ESP = ESP + Source; //release parameters from called procedure's stack
					TemporaryESP = Pop();
					TemporarySS = Pop(); //16-bit pop; segment descriptor information also loaded
					ESP = TemporaryESP;
					SS = TemporarySS;
				}
				SegmentRegisters[] = {ES, FS, GS, DS};
				while(SegmentRegister = NextSegmentRegister(SegmentRegisters)) {
					if(IsDataPointer(SegmentRegister)  || !IsConformingCodeSegment(SegmentRegister) && CPL > SegmentDescriptor.DPL /*DPL in hidden part of segment register*/) SegmentSelector = 0; //segment register is invalid, null segment selector
					if(!IsWithinDescriptorTableLimits(SegmentSelector.Index) || (!IsData(SegmentDescriptor) && !IsReadableCodeSegment(SegmentDescriptor)) || (IsData(SegmentDescriptor) && !IsConformingCodeSegment(SegmentDescriptor) && SegmentDescriptor.DPL < CPL && SegmentDescriptor.DPL < CodeSegment.SegmentSelector.RPL)) SegmentSelectorRegister = NullSelector;
					ESP = ESP + Source; //release parameters from called procedure's stack
				}
			}
			else {
				//Return to same privilege level
				if(!IsWithinLimits(ReturnCode.SegmentLimit, ReturnInstructionPointer)) Exception(GP(0));
				if(OperandSize == 32) {
					EIP = Pop();
					CS = Pop(); //32-bit pop, high-order 16 bits are discarded
					ESP = ESP + Source; //Release parameters from stack
				}
				else { //OperandSize == 16
					EIP = Pop();
					EIP = EIP & 0xFFFF;
					ESP = ESP + Source; //Release parameters from stack
				}
			}
		}
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|RET|8|1|MEM_LOAD ALU|
