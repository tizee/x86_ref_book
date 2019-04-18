# IRET/IRETD
 
## Interrupt Return
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|CF|IRET|Interrupt return (16-bit operand size).|
|CF|IRETD|Interrupt return (32-bit operand size).|
 
## Description
 
Returns program control from an exception or interrupt handler to a program or procedure that was interrupted by an exception, an external interrupt, or a software-generated interrupt. These instructions are also used to perform a return from a nested task. (A nested task is created when a CALL instruction is used to initiate a task switch or when an interrupt or exception causes a task switch to an interrupt or exception handler.) See the section titled "Task Linking" in Chapter 6 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3.
 
IRET and IRETD are mnemonics for the same opcode. The IRETD mnemonic (interrupt return double) is intended for use when returning from an interrupt when using the 32-bit operand size; however, most assemblers use the IRET mnemonic interchangeably for both operand sizes.
 
In Real-Address Mode, the IRET instruction preforms a far return to the interrupted program or procedure. During this operation, the processor pops the return instruction pointer, return code segment selector, and EFLAGS image from the stack to the EIP, CS, and EFLAGS registers, respectively, and then resumes execution of the interrupted program or procedure.
 
In Protected Mode, the action of the IRET instruction depends on the settings of the NT (nested task) and VM flags in the EFLAGS register and the VM flag in the EFLAGS image stored on the current stack. Depending on the setting of these flags, the processor performs the following types of interrupt returns:
 
* Return from virtual-8086 mode.
* Return to virtual-8086 mode.
* Intra-privilege level return.
* Inter-privilege level return.
* Return from nested task (task switch).
 
If the NT flag (EFLAGS register) is cleared, the IRET instruction performs a far return from the interrupt procedure, without a task switch. The code segment being returned to must be equally or less privileged than the interrupt handler routine (as indicated by the RPL field of the code segment selector popped from the stack). As with a real-address mode interrupt return, the IRET instruction pops the return instruction pointer, return code segment selector, and EFLAGS image from the stack to the EIP, CS, and EFLAGS registers, respectively, and then resumes execution of the interrupted program or procedure. If the return is to another privilege level, the IRET instruction also pops the stack pointer and SS from the stack, before resuming program execution. If the return is to virtual-8086 mode, the processor also pops the data segment registers from the stack.
 
If the NT flag is set, the IRET instruction performs a task switch (return) from a nested task (a task called with a CALL instruction, an interrupt, or an exception) back to the calling or inter- rupted task. The updated state of the task executing the IRET instruction is saved in its TSS. If the task is re-entered later, the code that follows the IRET instruction is executed.
 
 
## Operation
 
```c
if(PE == 0) {
	//Real-Address-Mode
	if(OperandSize == 32) {
		if(!IsWithinStackLimits(TopStackBytes(12)) Exception(SS); //top 12 bytes of stack not within stack limits
		if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
		EIP = Pop();
		CS = Pop(); //32-bit pop, high-order 16 bits discarded
		TemporaryEFLAGS = Pop();
		EFLAGS = (TemporaryEFLAGS & 0x257FD5) | (EFLAGS & 0x1A0000);
	}
	else { //OperandSize is 16
		if(!IsWithinStackLimits(TopStackBytes(6)) Exception(SS); //top 6 bytes of stack not within stack limits
		if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
		EIP = Pop();
		EIP = EIP & 0xFFFF;
		CS = Pop(); //16-bit pop
		EFLAGS[0..15] = Pop();
	}
	//END
}
else {
	//Protected Mode
	if(VM == 1) {
		//Virtual-8086 mode: PE == 1, VM == 1
		//Processor is in virtual-8086 mode when IRET is executed and stays in virtual-8086 mode
		if(IOPL == 3) { //Virtual mode: PE=1, VM=1, IOPL=3
			if(OperandSize == 32) {
				if(!IsWithinStackLimits(TopStackBytes(12)) Exception(SS(0)); //top 12 bytes of stack not within stack limits
				if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
				EIP = Pop();
				CS = Pop(); //32-bit pop, high-order 16 bits discarded
				EFLAGS = Pop();
				//VM, IOPL, VIP and VIF EFLAGS bits are not modified by pop
			}
			else { //OperandSize is 16
				if(!IsWithinStackLimits(TopStackBytes(6)) Exception(SS(0)); //top 6 bytes of stack not within stack limits
				if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
				EIP = Pop();
				EIP = EIP & 0xFFFF;
				CS = Pop(); //16-bit pop
				EFLAGS[0..15] = Pop();
				//VM, IOPL, VIP and VIF EFLAGS bits are not modified by pop
			}
		}
		else Exception(GP(0)); //trap to virtual-8086 monitor: PE == 1, VM == 1, IOPL < 3
		//END
	}
	if(NT == 1) {
		//Task return
		//PE == 1, VM == 0, NT == 1
		SegmentSelector = ReadSegmentSelector(CurrentTSS.LinkField); //Read segment selector in link field of current TSS
		if(!IsGlobal() /*local/global bit is set to local*/ || !IsWithinGDTLimits(Index)) Exception(TS(TSSSelector));
		TSSDescriptor = AccessTSS(CurrentTSS.LinkField.Task); //Access TSS for task specified in link field of current TSS
		if(TSSDescriptor.Type != TSS || !IsBusy(TSS)) Exception(TS(TSSSelector));
		if(!IsPresent(TSS)) Exception(NP(TSSSelector));
		SwitchTasks(CurrenTSS.LinkField.TSS, WithoutNesting); //Switch tasks (without nesting) to TSS specified in link field of current TSS
		SetBusyState(AbandonedTask, NotBusy); //Mark the task just abandoned as NOT BUSY
		if(!IsWithinCodeSegmentLimit(EIP)) Exception(GP(0));
		//END
	}
	if(OperandSize == 32) {
		if(!IsWithinStackLimits(TopStackBytes(12)) Exception(SS); //top 12 bytes of stack not within stack limits
		TemporaryEIP = Pop();
		TemporaryCS = Pop();
		TemporaryEFLAGS = Pop();
	}
	else { //OperandSize == 16
		if(!IsWithinStackLimits(TopStackBytes(6)) Exception(SS); //top 6 bytes of stack not within stack limits
		TemporaryEIP = Pop();
		TemporaryCS = Pop();
		TemporaryEFLAGS = Pop();
		TemporaryEIP = TemporaryEIP & 0xFFFF;
		TemporaryEFLAGS = TemporaryEFLAGS & 0xFFFF;
	}
	if(TemporaryEFLAGS.VM == 1 && CPL == 0) {
		//Interrupted procedure was in virtual-8086 mode: PE == 1, VM == 1 in flags image
		if(!IsWithinStackLimits(TopStackBytes(24)) Exception(SS(0)); //top 24 bytes of stack not within stack limits
		if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
		CS = TemporaryCS;
		EIP = TemporaryEIP;
		EFLAGS = TemporaryEFLAGS;
		TemporaryESP = Pop();
		TemporarySS = Pop();
		ES = Pop(); //pop 2 words; throw away high-order word
		DS = Pop(); //pop 2 words; throw away high-order word
		FS = Pop(); //pop 2 words; throw away high-order word
		GS = Pop(); //pop 2 words; throw away high-order word
		SS:ESP = TemporarySS:TemporaryESP;
		CPL = 3;
		ResumeExecution() //Resume execution in Virtual-8086 mode
	}
	else {
		//Protected mode return
		//PE == 1, VM == 0 in flags image
		if(ReturnCode.SegmentSelector == 0) Exception(GP(0));
		if(!IsWithinDescriptorTableLimits(ReturnCode.SegmentSelector.AddressesDescriptor)) Exception(GP(Selector));
		ReturnCode.SegmentDescriptor = ReadSegmentDescriptor(ReturnCode.SegmentSelector);
		if(!IsCodeSegment(ReturnCode.SegmentDescriptor)) Exception(GP(Selector));
		if(ReturnCode.SegmentSelector.RPL < CPL) Exception(GP(Selector));
		if(IsConforming(ReturnCode.SegmentDescriptor) && ReturnCode.Segment.DPL > ReturnCode.SegmentSelector.RPL) Exception(GP(Selector));
		if(ReturnCode.SegmentSelector.RPL > CPL) {
			//Return to outer privilege level
			if(OperandSize == 32 && if(!IsWithinStackLimits(TopStackBytes(8)) Exception(SS(0)); //top 8 bytes of stack not within stack limits
			else /*OperandSize == 16*/ if(!IsWithinStackLimits(TopStackBytes(4)) Exception(SS(0)); //top 4 bytes of stack not within stack limits
			StackSegmentSelector = ReadReturnSegmentSelector();
			if(StackSegmentSelector == 0) Exception(GP(0));
			if(!IsWithinDescriptorTableLimits(ReturnStackSegmentSelector.Index)) Exception(GP(SSSelector));
			SegmentDescriptor = ReadSegmenDescriptor(ReturnSegmentSelector);
			if(StackSegmentSelector.RPL != ReturnCode.SegmentSelector.RPL) {
				if(StackSegmentSelector.RPL != ReturnCode.SegmentSelector.RPL || !IndicatesWritableDataSegment(StackSegmentDescriptor) || StackSegment.DPL != ReturnCode.SegmentSelector.RPL) Exception(GP(SSSelector));
				if(!IsPresent(StackSegment)) Exception(SS(SSSelector));
			}
			if(!IsWithinCodeSegmentLimit(TemporaryEIP)) Exception(GP(0));
			EIP = TemporaryIP;
			CS = TemporaryCS;
			EFLAGS.CF = TemporaryEFLAGS.CF;
			EFLAGS.PF = TemporaryEFLAGS.PF;
			EFLAGS.AF = TemporaryEFLAGS.ZF;
			EFLAGS.SF = TemporaryEFLAGS.SF;
			EFLAGS.TF = TemporaryEFLAGS.DF;
			EFLAGS.OF = TemporaryEFLAGS.OF;
			EFLAGS.NT = TemporaryEFLAGS.NT;
			if(OperandSize == 32) {
				EFLAGS.RF = TemporaryEFLAGS.RF;
				EFLAGS.AC = TemporaryEFLAGS.AC;
				EFLAGS.ID = TemporaryEFLAGS.ID;
			}
			if(CPL <= IOPL) EFLAGS.IF = TemporaryEFLAGS.IF;
			if(CPL == 0) {
				EFLAGS.IOPL = TemporaryEFLAGS.IOPL;
				if(OperandSize == 32) {
					EFLAGS.VM = TemporaryEFLAGS.VM;
					EFLAGS.VIF = TemporaryEFLAGS.VIF;
					EFLAGS.VIP = TemporaryEFLAGS.VIP;
				}
			}
			//perform operation for each of the segment registers
			SegmentRegisters[] = {ES, FS, GS, DS};
			while(SegmentRegister = SegmentRegisters.Next()) if((PointsToDate(SegmentRegister) || !IsConformingCodeSegment(SegmentRegister)) && CPL > SegmentDescriptor.DPL /*stored in hidden part of segment register*/) SegmentSelector = 0; //segment register invalid; null segment selector
			//END
		}
		else {
			//Same privilege level
			//PE=1, VM=0 in flags image, RPL=CPL
			if(!IsWithinCodeSegmentLimits(EIP)) Exception(GP(0));
			EIP = TemporaryEIP;
			CS = TemporaryCS; //segment descriptor information also loaded
			EFLAGS.CF = TemporaryEFLAGS.CF;
			EFLAGS.PF = TemporaryEFLAGS.PF;
			EFLAGS.AF = TemporaryEFLAGS.ZF;
			EFLAGS.SF = TemporaryEFLAGS.SF;
			EFLAGS.TF = TemporaryEFLAGS.DF;
			EFLAGS.OF = TemporaryEFLAGS.OF;
			EFLAGS.NT = TemporaryEFLAGS.NT;
			if(OperandSize == 32) {
				EFLAGS.RF = TemporaryEFLAGS.RF;
				EFLAGS.AC = TemporaryEFLAGS.AC;
				EFLAGS.ID = TemporaryEFLAGS.ID;
			}
			if(CPL <= IOPL) EFLAGS.IF = TemporaryEFLAGS.IF;
			if(CPL == 0) {
				EFLAGS.IOPL = TemporaryEFLAGS.IOPL;
				if(OperandSize == 32) {
					EFLAGS.VM = TemporaryEFLAGS.VM;
					EFLAGS.VIF = TemporaryEFLAGS.VIF;
					EFLAGS.VIP = TemporaryEFLAGS.VIP;
				}
			}
			//END
		}
	}
}

```
 
 
## Flags affected
 
All the flags and fields in the EFLAGS register are potentially modified, depending on the mode of operation of the processor. If performing a return from a nested task to a previous task, the EFLAGS register will be modified according to the EFLAGS image stored in the previous task's TSS.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the return code or stack segment selector is null. If the return instruction pointer is not within the return code segment limit.|
|#GP(0)|If the return code or stack segment selector is null. If the return instruction pointer is not within the return code segment limit.|
|#GP(selector)|If a segment selector index is outside its descriptor table limits. If the return code segment selector RPL is greater than the CPL. If the DPL of a conforming-code segment is greater than the return code segment selector RPL. If the DPL for a nonconforming-code segment is not equal to the RPL of the code segment selector. If the stack segment descriptor DPL is not equal to the RPL of the return code segment selector. If the stack segment is not a writable data segment. If the stack segment selector RPL is not equal to the RPL of the return code segment selector. If the segment descriptor for a code segment does not indicate it is a code segment. If the segment selector for a TSS has its local/global bit set for local. If a TSS segment descriptor specifies that the TSS is not busy. If a TSS segment descriptor specifies that the TSS is not available.|
|#SS(0)|If the top bytes of stack are not within stack limits.|
|#NP(selector)|If the return code or stack segment is not present.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If the return instruction pointer is not within the return code segment limit.|
|#GP|If the return instruction pointer is not within the return code segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the return instruction pointer is not within the return code segment limit. IF IOPL not equal to 3.|
|#GP(0)|If the return instruction pointer is not within the return code segment limit. IF IOPL not equal to 3.|
|#PF(fault-code)|If a page fault occurs.|
|#SS(0)|If the top bytes of stack are not within stack limits.|
