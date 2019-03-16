# CALL
 
## Call Procedure
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|E8 cw|CALL rel16|Call near, relative, displacement relative to next instruction|
|E8 cd|CALL rel32|Call near, relative, displacement relative to next instruction|
|FF /2|CALL r/m16|Call near, absolute indirect, address given in r/m16|
|FF /2|CALL r/m32|Call near, absolute indirect, address given in r/m32|
|9A cd|CALL ptr16:16|Call far, absolute, address given in operand|
|9A cp|CALL ptr16:32|Call far, absolute, address given in operand|
|FF /3|CALL m16:16|Call far, absolute indirect, address given in m16:16|
|FF /3|CALL m16:32|Call far, absolute indirect, address given in m16:32|
 
## Description
 
Saves procedure linking information on the stack and branches to the procedure (called procedure) specified with the destination (target) operand. The target operand specifies the address of the first instruction in the called procedure. This operand can be an immediate value, a generalpurpose register, or a memory location.
 
This instruction can be used to execute four different types of calls:
 
> * Near call
> A call to a procedure within the current code segment (the segment currently pointed to by the CS register), sometimes referred to as an intrasegment call.
> * Far call
> A call to a procedure located in a different segment than the current code segment, sometimes referred to as an intersegment call.
> * Inter-privilege-level far call
> A far call to a procedure in a segment at a different privilege level than that of the currently executing program or procedure.
> * Task switch
> A call to a procedure located in a different task.
The latter two call types (inter-privilege-level call and task switch) can only be executed in protected mode. See the section titled "Calling Procedures Using Call and RET" in Chapter 6 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for additional information on near, far, and inter-privilege-level calls. See Chapter 6, Task Management, in the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for information on performing task switches with the CALL instruction.
 
### Near Call
 
When executing a near call, the processor pushes the value of the EIP register (which contains the offset of the instruction following the CALL instruction) onto the stack (for use later as a return-instruction pointer). The processor then branches to the address in the current code segment specified with the target operand. The target operand specifies either an absolute offset in the code segment (that is an offset from the base of the code segment) or a relative offset (a signed displacement relative to the current value of the instruction pointer in the EIP register, which points to the instruction following the CALL instruction). The CS register is not changed on near calls.
 
For a near call, an absolute offset is specified indirectly in a general-purpose register or a memory location (r/m16 or r/m32). The operand-size attribute determines the size of the target operand (16 or 32 bits). Absolute offsets are loaded directly into the EIP register. If the operandsize attribute is 16, the upper two bytes of the EIP register are cleared, resulting in a maximum instruction pointer size of 16 bits. (When accessing an absolute offset indirectly using the stack pointer [ESP] as a base register, the base value used is the value of the ESP before the instruction executes.) A relative offset (rel16 or rel32) is generally specified as a label in assembly code, but at the machine code level, it is encoded as a signed, 16- or 32-bit immediate value. This value is added to the value in the EIP register. As with absolute offsets, the operand-size attribute determines the size of the target operand (16 or 32 bits).
 
### Far Calls in Real-Address or Virtual-8086 Mode
 
When executing a far call in realaddress or virtual-8086 mode, the processor pushes the current value of both the CS and EIP registers onto the stack for use as a return-instruction pointer. The processor then performs a "far branch" to the code segment and offset specified with the target operand for the called procedure.
 
Here the target operand specifies an absolute far address either directly with a pointer (ptr16:16 or ptr16:32) or indirectly with a memory location (m16:16 or m16:32). With the pointer method, the segment and offset of the called procedure is encoded in the instruction, using a 4-byte (16-bit operand size) or 6-byte (32-bit operand size) far address immediate. With the indirect method, the target operand specifies a memory location that contains a 4-byte (16-bit operand size) or 6-byte (32-bit operand size) far address. The operand-size attribute determines the size of the offset (16 or 32 bits) in the far address. The far address is loaded directly into the CS and EIP registers. If the operand-size attribute is 16, the upper two bytes of the EIP register are cleared.
 
### Far Calls in Protected Mode
 
When the processor is operating in protected mode, the CALL instruction can be used to perform the following three types of far calls: o Far call to the same privilege level o Far call to a different privilege level (inter-privilege level call) o Task switch (far call to another task) In protected mode, the processor always uses the segment selector part of the far address to access the corresponding descriptor in the GDT or LDT. The descriptor type (code segment, call gate, task gate, or TSS) and access rights determine the type of call operation to be performed.
 
If the selected descriptor is for a code segment, a far call to a code segment at the same privilege level is performed. (If the selected code segment is at a different privilege level and the code segment is non-conforming, a general-protection exception is generated.) A far call to the same privilege level in protected mode is very similar to one carried out in real-address or virtual-8086 mode. The target operand specifies an absolute far address either directly with a pointer (ptr16:16 or ptr16:32) or indirectly with a memory location (m16:16 or m16:32). The operandsize attribute determines the size of the offset (16 or 32 bits) in the far address. The new code segment selector and its descriptor are loaded into CS register, and the offset from the instruction is loaded into the EIP register.
 
Note that a call gate (described in the next paragraph) can also be used to perform a far call to a code segment at the same privilege level. Using this mechanism provides an extra level of indirection and is the preferred method of making calls between 16-bit and 32-bit code segments.
 
When executing an inter-privilege-level far call, the code segment for the procedure being called must be accessed through a call gate. The segment selector specified by the target operand identifies the call gate. Here again, the target operand can specify the call gate segment selector either directly with a pointer (ptr16:16 or ptr16:32) or indirectly with a memory location (m16:16 or m16:32). The processor obtains the segment selector for the new code segment and the new instruction pointer (offset) from the call gate descriptor. (The offset from the target operand is ignored when a call gate is used.) On inter-privilege-level calls, the processor switches to the stack for the privilege level of the called procedure. The segment selector for the new stack segment is specified in the TSS for the currently running task. The branch to the new code segment occurs after the stack switch. (Note that when using a call gate to perform a far call to a segment at the same privilege level, no stack switch occurs.) On the new stack, the processor pushes the segment selector and stack pointer for the calling procedure's stack, an (optional) set of parameters from the calling procedures stack, and the segment selector and instruction pointer for the calling procedure's code segment. (A value in the call gate descriptor determines how many parameters to copy to the new stack.) Finally, the processor branches to the address of the procedure being called within the new code segment.
 
Executing a task switch with the CALL instruction, is somewhat similar to executing a call through a call gate. Here the target operand specifies the segment selector of the task gate for the task being switched to (and the offset in the target operand is ignored.) The task gate in turn points to the TSS for the task, which contains the segment selectors for the task's code and stack segments. The TSS also contains the EIP value for the next instruction that was to be executed before the task was suspended. This instruction pointer value is loaded into the EIP register so that the task begins executing again at this next instruction.
 
The CALL instruction can also specify the segment selector of the TSS directly, which eliminates the indirection of the task gate. See Chapter 6, Task Management, in the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for detailed information on the mechanics of a task switch.
 
Note that when you execute at task switch with a CALL instruction, the nested task flag (NT) is set in the EFLAGS register and the new TSS's previous task link field is loaded with the old tasks TSS selector. Code is expected to suspend this nested task by executing an IRET instruction, which, because the NT flag is set, will automatically use the previous task link to return to the calling task. (See "Task Linking" in Chapter 6 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for more information on nested tasks.) Switching tasks with the CALL instruction differs in this regard from the JMP instruction which does not set the NT flag and therefore does not expect an IRET instruction to suspend the task.
 
### Mixing 16-Bit and 32-Bit Calls
 
When making far calls between 16-bit and 32-bit code segments, the calls should be made through a call gate. If the far call is from a 32-bit code segment to a 16-bit code segment, the call should be made from the first 64 KBytes of the 32- bit code segment. This is because the operand-size attribute of the instruction is set to 16, so only a 16-bit return address offset is saved. Also, the call should be made using a 16-bit call gate so that 16-bit values will be pushed on the stack. See Chapter 17, Mixing 17-Bit and 32-Bit Code, in IA-32 Intel Architecture Software Developer's Manual, Volume 3 for more information.
 
 
## Operation
 
```c
if(IsNearCall(Call)) {
	if(IsRelativeCall(Call)) {
		if(!InCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
		if(OperandSize == 32) {
			If(GetStackSpace() < 4) Exception(SS(0));
			Push(IP);
			EIP = EIP + Destination; //Destination is rel32
		}
		else { //OperandSize == 16
			if(GetStackSpace() < 2) Exception(SS(0));
			Push(IP);
			EIP = (EIP + Destination) & 0xFFFF; //Destination is rel16
		}
	}
	else { //near absolute call
		if(!InCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
		if(OperandSize == 32) {
			If(GetStackSpace() < 4) Exception(SS(0));
			Push(EIP);
			EIP = Destination; //Destination is r/m32
		}
		else { //OperandSize == 16
			if(GetStackSpace() < 2) Exception(SS(0));
			Push(IP);
			EIP = Destination & 0xFFFF; //Destination is r/m16
		}
	}
}

if(IsFarCall(Call) && (PE == 0 || (PE == 1 && VM == 1))) { //real-address or virtual-8086 mode
	if(OperandSize == 32) {
		if(GetStackSpace() < 6) Exception(SS(0));
		if(!InCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
		Push(CS); //padded with 16 high-order bits
		Push(EIP);
		//Destination is ptr16:32 or [m16:32]
		CS = Destination[32..47];
		EIP = Destination[0..31];
	}
	else {	//OperandSize == 16
		if(GetStackSpace() < 4) Exception(SS(0));
		if(!InCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
		Push(CS);
		Push(IP);
		//Destination is ptr16:16 or [m16:16]
		CS = Destination[31..16];
		EIP = Destination[15..0];
		EIP = EIP & 0xFFFF; //clear upper 16 bits
	}
}

if(IsFarCall(Call) && (PE == 1 && VM == 0)) { //Protected mode, not virtual-8086 mode
	if(TargetOperand.SegmentSelector == 0) Exception(GP(0));
	if(!InDescriptorTableLimits(TargetOperand.SegmentSelector)) Exception(GP(NewCodeSegmentSelector));
	SegmentDescriptorType = ReadSegmentDescriptorType();
	SegmentDescriptorAccessRights = ReadSegmentDescriptorAccessRights();
	
	switch(SegmentDescriptorType) {
		case ConformingCodeSegment:
			if(DPL > CPL) Exception(GP(NewCodeSegmentSelector));
			if(!SegementIsPresent(SegmentSelector)) Exception(NP(NewCodeSegmentSelector));
			if(OperandSize == 32) {
				if(GetStackSpace() < 6) Exception(SS(0));
				if(!InCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
				Push(CS); //padded with 16 high-order bits
				Push(EIP);
				CS = Destination[NewCodeSegmentSelector];
				//segment descriptor information also loaded
				CS.RPL = CPL;
				EIP = Destination.Offset;
			}
			else { //OperandSize == 16
				if(GetStackSpace() < 4) Exception(SS(0));
				if(!InCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
				Push(CS);
				Push(IP);
				CS = Destination[NewCodeSegmentSelector];
				//segment descriptor information also loaded
				CS.RPL = CPL;
				EIP = Destination.Offset & 0xFFFF; //clear upper 16 bits
			}
			break;
			
		case NonConformingCodeSegment:
			if(RPL > CPL || DPL != CPL) Exception(GP(NewCodeSegmentSelector);
			if(!SegementIsPresent(SegmentSelector)) Exception(NP(NewCodeSegmentSelector));
			if(GetStackSpace() < ReturnAddress.Size) Exception(SS(0));
			TemporaryEIP = Destination.Offset;
			if(OperandSize == 16) TemporaryEIP = TemporaryEIP & 0xFFFF; //clear upper 16 bits
			if(!InCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
			if(OperandSize == 32) {
				Push(CS); //padded with 16 high-order bits
				Push(EIP);
				CS = Destination.NewCodeSegmentSelector;
				//segment descriptor information also loaded
				CS.RPL = CPL;
				EIP = TemporaryEIP;
			}
			else { //OperandSize == 16
				Push(CS);
				Push(IP);
				CS = Destination.NewCodeSegmentSelector;
				//segment descriptor information also loaded.
				CS.RPL = CPL;
				EIP = TemporaryEIP;
			}
			break;
			
		case CallGate:
			if(CallGate.DPL < CPL || CallGate.DPL < RPL) Exception(GP(CallGateSelector));
			if(!IsPresent(CallGate)) Exception(NP(CallGateSelector));
			if(CallGateCodeSegmentSelector == 0) Exception(GP(0));
			if(!InDescriptorTableLimits(CallGateCodeSegmentSelector)) Exception(GP(CodeSegmentSelector));
			CodeSegmentDescriptor = ReadCodeSegmentDescriptor();
			if(!IndicatesCodeSegment(CodeSegmentDescriptor) || CodeSegmentDescriptor.DPL > CPL) Exception(GP(CodeSegmentSelector));
			if(!IsPresent(CodeSegment)) Exception(NP(NewCodeSegmentSelector));
			if(IsNonConformingCodeSegment(CodeSegment) && DPL < CPL) {
				//More privilege
				if(Is32BitTSS(CurrenTSS)) {
					TSSStackAddress = NewCodeSegment(DPL * 8) + 4;
					if(TSSStackAddress + 7 > TSSLimit) Exception(TS(CurrenTSSSelector));
					NewSS = TSSStackAddress + 4;
					NewESP = StackAddress;
				}
				else { //TSS is 16-bit
					if(TSSStackAddress + 4 > TSSLimit) Exception(TS(CurrenTSSSelector));
					NewESP = TSSStackAddress;
					NewSS = TSSStackAddress + 2;
				}
				if(StackSegmentSelector == 0) Exception(TS(StackSegmentSelector));
				if(!IsWithinDescriptorTableLimits(StackSegmentSelector)) Exception(TS(SSSelector));
				CodeSegmentDescriptor = ReadCodeSegmentDescriptor();
				if(StackSegmentSelectorData.RPL != CodeSegmentDescriptor.DPL || StackSegment.DPL != CodeSegment.DPL || !IsWritableDataSegment(StackSegment)) Exception(TS(SSSelector));
				if(!IsPresent(StackSegment)) Exception(SS(SSSelector));
				if(CallGate.Size == 32) {
					if(GetStackSpace() < Parameters.Size + 16) Exception(SS(SSSelector));
					if(!IsWithinCodeSegmentLimit(CallGate.InstructionPointer)) Exception(GP(0));
					SS = NewSS;
					//segment descriptor information also loaded;
					ESP = NewESP;
					CS:EIP = CallGate(CS:InstructionPointer);
					//segment descriptor information also loaded
					Push(oldSS:oldESP); //from calling procedure
					Temporary = MaskTo5Bits(Parameters.Count);
					Push(Parameters, Temporary);
					Push(oldCS:oldEIP); //return address to calling procedure
				}
				else { //CallGate.Size == 16
					if(GetStackSpace() < Parameters.Size + 8) Exception(SS(SSSelector));
					if(!IsWithinCodeSegmentLimit(CallGate.InstructionPointer & 0xFFFF)) Exception(GP(0));
					SS = NewSS;
					//segment descriptor information also loaded;
					ESP = NewESP;
					CS:IP = CallGate(CS:InstructionPointer);
					//segment descriptor information also loaded
					Push(oldSS:oldESP); //from calling procedure
					Temporary = MaskTo5Bits(Parameters.Count);
					Push(Parameters, Temporary);
					Push(oldCS:oldEIP); //return address to calling procedure
					if(GetStackSpace() < Parameters.Size + 16) Exception(SS(SSSelector));
					if(!IsWithinCodeSegmentLimit(CallGate.InstructionPointer)) Exception(GP(0));
					SS = NewSS;
					//segment descriptor information also loaded;
					ESP = NewESP;
					CS:EIP = CallGate(CS:InstructionPointer);
					//segment descriptor information also loaded
					Push(oldSS:oldESP); //from calling procedure
					Temporary = MaskTo5Bits(Parameters.Count);
					Push(Parameters, Temporary);
					Push(oldCS:oldEIP); //return address to calling procedure
				}
				CPL = CodeSegment.DPL
				CS.RPL = CPL;
			}
			//Same privilege
			else {
				if(CallGate.Size == 32) {
					if(GetStackSpace() < 8) Exception(SS(0));
					if(!IsWithinCodeSegmentLimit(EIP)) Exception(GP(0));
					CS:EIP = CallGate(CS:EIP) //segment descriptor information also loaded
					Push(oldCS:oldEIP); //return address to calling procedure
				}
				else { //CallGate.Size == 16
					if(GetStackSpace() < 4) Exception(SS(0));
					if(!IsWithinCodeSegmentLimit(IP)) Exception(GP(0));
					CS:IP = CallGate(CS:IP) //segment descriptor information also loaded
					Push(oldCS:oldIP); //return address to calling procedure
				}
				CS.RPL = CPL;
			}
			break;
			
		case TaskGate:
			if(TaskGate.DPL < CPL || TaskGate.DPL < RPL) Exception(GP(TaskGateSelector));
			if(!IsPresent(TaskGate)) Exception(NP(TaskGateSelector));
			TaskGateDescriptor = ReadTSSegmentSelector();
			if(IsLocal(TSSegmentSelector) || !IsWithinGDTLimits(Index)) Exception(GP(TSSSelector));
			Access(GDT.TSSDescriptor);
			if(TSSDescriptor & 0x1F == 1) Exception(GP(TSSSelector)); //TSS is busy
			if(!IsPresent(TSS)) Exception(NP(TSSSelector));
			SwitchTasks(TSS); //switch tasks to TSS (with nesting)
			if(!IsWithinCodeSegmentLimits(EIP)) Exception(GP(0));
			break;
			
		case TaskStateSegment:
			if(TSS.DPL < CPL || TSS.DPL < RPL || !IsTSSAvailable(TSSDescriptor)) Exception(GP(TSSSelector));
			if(!IsPresent(TSS)) Exception(NP(TSSSelector));
			SwitchTasks(TSS); //switch tasks to TSS (with nesting)
			if(!IsWithinCodeSegmentLimits(EIP)) Exception(GP(0));
			break;
			
		default:
			Exception(GP(SegmentSelector));
	}
}

```
 
 
## Flags affected
 
All flags are affected if a task switch occurs; no flags are affected if a task switch does not occur.

 
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the target offset is beyond the code segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the target offset is beyond the code segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the target offset is beyond the code segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|CALL|5|1|ALU MEM_STORE|
