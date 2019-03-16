# INT n/INTO/INT 3
 
## Call to Interrupt Procedure
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|CC|INT 3|Interrupt 3 - trap to debugger.|
|CD ib|INT imm8|Interrupt vector number specified by immediate byte.|
|CE|INTO|Interrupt 4 - if overflow flag is 1.|
 
## Description
 
The INT n instruction generates a call to the interrupt or exception handler specified with the destination operand (see the section titled "Interrupts and {exceptions}" in Chapter 6 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1). The destination operand specifies an interrupt vector number from 0 to 255, encoded as an 8-bit unsigned intermediate value. Each interrupt vector number provides an index to a gate descriptor in the IDT. The first 32 interrupt vector numbers are reserved by Intel for system use. Some of these interrupts are used for internally generated exceptions.
 
The INT n instruction is the general mnemonic for executing a software-generated call to an interrupt handler. The INTO instruction is a special mnemonic for calling overflow exception (#OF), interrupt vector number 4. The overflow interrupt checks the OF flag in the EFLAGS register and calls the overflow interrupt handler if the OF flag is set to 1.
 
The INT 3 instruction generates a special one byte opcode (CC) that is intended for calling the debug exception handler. (This one byte form is valuable because it can be used to replace the first byte of any instruction with a breakpoint, including other one byte instructions, without over-writing other code). To further support its function as a debug breakpoint, the interrupt generated with the CC opcode also differs from the regular software interrupts as follows: - Interrupt redirection does not happen when in VME mode; the interrupt is handled by a protected-mode handler.
 
The virtual-8086 mode IOPL checks do not occur. The interrupt is taken without faulting at any IOPL level.
 
Note that the "normal" 2-byte opcode for INT 3 (CD03) does not have these special features.
 
Intel and Microsoft assemblers will not generate the CD03 opcode from any mnemonic, but this opcode can be created by direct numeric code definition or by self-modifying code.
 
The action of the INT n instruction (including the INTO and INT 3 instructions) is similar to that of a far call made with the CALL instruction. The primary difference is that with the INT n instruction, the EFLAGS register is pushed onto the stack before the return address. (The return address is a far address consisting of the current values of the CS and EIP registers.) Returns from interrupt procedures are handled with the IRET instruction, which pops the EFLAGS information and return address from the stack.
 
The interrupt vector number specifies an interrupt descriptor in the interrupt descriptor table (IDT); that is, it provides index into the IDT. The selected interrupt descriptor in turn contains a pointer to an interrupt or exception handler procedure. In protected mode, the IDT contains an array of 8-byte descriptors, each of which is an interrupt gate, trap gate, or task gate. In realaddress mode, the IDT is an array of 4-byte far pointers (2-byte code segment selector and a 2-byte instruction pointer), each of which point directly to a procedure in the selected segment.
 
(Note that in real-address mode, the IDT is called the interrupt vector table, and its pointers are called interrupt vectors.)
 
The following decision table indicates which action in the lower portion of the table is taken given the conditions in the upper portion of the table. Each Y in the lower section of the decision table represents a procedure defined in the "Operation" section for this instruction (except #GP).
 
|[]()|||||||||
|-|-|-|-|-|-|-|-|-|
|PE|0|1|1|1|1|1|1|1|
|VM|Don't care|Don't care|Don't care|Don't care|Don't care|0|1|1|
|IOPL|Don't care|Don't care|Don't care|Don't care|Don't care|Don't care|<3|=3|
|DPL/CPL RELATIONSHIP|Don't care|DPL < CPL|Don't care|DPL > CPL|DPL = CPL or C|DPL < CPL & NC|Don't care|Don't care|
|INTERRUPT TYPE|Don't care|S/W|Don't care|Don't care|Don't care|Don't care|Don't care|Don't care|
|GATE TYPE|Don't care|Don't care|Task Trap or Interrupt|Trap or Interrupt|Trap or Interrupt|Trap or Interrupt|Trap or Interrupt|
|REAL-ADDRESS-MODE|Action taken|No action|No action|No action|No action|No action|No action|No action|
|PROTECTED-MODE|No action|Action taken|Action taken|Action taken|Action taken|Action taken|Action taken|Action taken|
|TRAP-OR-INTERRUPT-GATE|No action|No action|No action|Action taken|Action taken|Action taken|Action taken|Action taken|
|INTER-PRIVILEGE-LEVEL-INTERRUPT|No action|No action|No action|No action|No action|Action taken|No action|No action|
|INTRA-PRIVILEGE-LEVEL-INTERRUPT|No action|No action|No action|No action|Action taken|No action|No action|No action|
|INTERRUPT-FROM-VIRTUAL-8086-MODE|No action|No action|No action|No action|No action|No action|No action|Action taken|
|TASK-GATE|No action|No action|Action taken|No action|No action|No action|No action|No action|
|#GP|No action|Action taken|No action|Action taken|No action|No action|Action taken|No action|
When the processor is executing in virtual-8086 mode, the IOPL determines the action of the INT n instruction. If the IOPL is less than 3, the processor generates a general protection exception (#GP); if the IOPL is 3, the processor executes a protected mode interrupt to privilege level 0. The interrupt gate's DPL must be set to 3 and the target CPL of the interrupt handler procedure must be 0 to execute the protected mode interrupt to privilege level 0.
 
The interrupt descriptor table register (IDTR) specifies the base linear address and limit of the IDT. The initial base address value of the IDTR after the processor is powered up or reset is 0.
 
 
## Operation
 
```c
//The following operational description applies not only to the INT n and INTO instructions, but also to external interrupts and exceptions.
if(pe == 0) {
	if(!IsWithinIDTLimit(Destination * 4 + 3)) Exception(GP(0));
	if(GetStackSpace() < 6) Exception(SS);
	Push(EFLAGS[0..15]);
	IF = 0;
	TF = 0;
	AC = 0;
	Push(CS);
	Push(IP);
	CS = IDT(Descriptor(VectorNumber * 4), Selector);
	EIP = IDT(Descriptor(VectorNumber * 4), Offset); //16 bit offset & 0xFFFF
}
else {
	if(VM == 1 && IOPL < 3 && INT(n)) Exception(GP(0));
	else { //protected mode or virtual-8086 mode interrupt
		if(!IsWithinIDTLimits(Destination * 8 + 7) || !(GetCurrentIDTDescriptorType() & (TYPE_INTERRUPT | TYPE_TRAP | TYPE_TASK_GATE))) Exception(GP(Destination * 8 + 2 + EXT)); //Selected IDT descriptor is not an iterrupt-, trap-, or task-gate type; EXT is bit 0 in error code
		if(IsSoftwareInterrupt() /*generated by INT n, INT 3, or INTO*/ && GateDescriptor.DPL < CPL) Exception(GP(VectorNumber * 8 + 2); //PE = 1, DPL < CPL, software interrupt
		if(!IsPresent(Gate)) Exception(NP(VectorNumber * 8 + 2 + EXT);
		if(IsTaskGate()) {
			//Task-gate
			//PE = 1, task gate
			IDTDescriptor = ReadSegmentSelector(TaskGate);
			if(!IsGlobal() || !IsWithinGDTLimits(Index)) Exception(GP(TSSSelector));
			TSSDescriptor = AccessTSSDescriptor(GDT.TSSDescriptor);
			if(TSSIsBusy(TSSDescriptor)) Exception(GP(TSSSelector)); //TSS descriptor specifies that the TSS is busy (low-order 5 bits set to 00001)
			if(!IsPresent(TSSDescriptor)) Exception(NP(TSSSelector));
			SwitchTasks(TSSDescriptor, WithNesting); //Switch tasks (with nesting) to TSS
			if(InterruptOccured()) { //interrupt caused by fault with error code
				if(GetStackSpace() < ErrorCodeSize) Exception(SS(0)); //stack limit does not allow push of error code
				Push(ErrorCode);
			}
			if(!IsWithinCSLimit(EIP)) Exception(GP(0));
		}
		else { //PE = 1, trap/interrupt gate
			//Trap interrupt gate
			IDTDescriptor = ReadSegmentSelector();
			if(CodeSegmentSelector == 0) Exception(GP(0 + EXT)); //null selector with EXT flag set
			if(!IsWithinDescriptorTableLimits(SegmentSelector)) Exception(GP(SegmentSelector + EXT));
			Descriptor = ReadDescriptor(); //Read trap or interrupt handler descriptor
			if(!IndicatesCodeSegment(Descriptor) || CodeSegmentDescriptor.DPL > CPL) Exception(GP(Selector + EXT));
			if(!IsPresent(GateSegment)) Exception(NP(Selector + EXT));
			if(!IsConforming(CodeSegment) && DPL < CPL) {
				if(VM == 0) {
					//Inter-Privilege-Level interrupt
					//PE == 1, interrupt or trap gate, nonconforming
					//code segment, DPL < CPL, VM == 0
					//Check segment selector and descriptor for stack of new privilege level in current TSS
					if(Is32BitTSS(CurrentTSS)) {
						TSSStackAddress = NewCodSegment.DPL * 8 + 4;
						if(TSSStackAddress + 7 > TSSLim9t) Exception(TS(CurrentTSSSelector);
						NewSS = TSSStackAddress + 4;
						NewESP = StackAddress;
					}
					else { //TSS is 16-bit
						TSSStackAddress = NewCodSegment.DPL * 4 + 2;
						if(TSSStackAddress + 4 > TSSLim9t) Exception(TS(CurrentTSSSelector);
						NewSS = TSSStackAddress + 2;
						NewESP = StackAddress;
					}
					if(SegmentSelector == 0) Exception(TS(EXT));
					if(!IsWithinDescriptorTableLimits(SegmentSelector.Index) || SegmentSelector.RPL != CodeSegment.DPL) Exception(TS(SSSelector + EXT));
					StackSegmentDescriptor = ReadStackSegmentDescriptor();  //Read segment descriptor for stack segment in GDT or LDT
					if(StackSegment.DPL != CodeSegment.DPL || !IndicatesWritableDataSegment(StackSegment)) Exception(TS(SSSelector + EXT));
					if(!IsPresent(StackSegment)) Excpetion(#SS(SSSelector + EXT));
					if(Is32BitGate() && GetStackSpace() < 24 /*error code pushed*/ || GetStackSpace() < 20 /*no error code pushed*/) Exception(SS(SegmentSelector + EXT));
					else /*16-bit gate*/ if(GetStackSpace() < 12 /*error code pushed*/ || GetStackSpace() < 10 /*no error code pushed*/) Exception(SS(SegmentSelector + EXT);
					if(!IsWithinCSLimits(InstructionPointer)) Exception(GP(0));
					SS:ESP = TSS(NewSS:NewESP) //segment descriptor information also loaded
					if(Is32BitGate()) {
						Push(FarPointer(OldStack)); //push a far pointer to the old stack, old SS and ESP, 3 words padded to 4
						Push(EFLAGS);
						Push(FarPointer(ReturnInstruction)); //old CS and EIP, 3 words padded to 4
						Push(ErrorCode); //if needed, 2 bytes
					}
					else { //16-bit gate
						Push(FarPointer(OldStack)); //old SS and SP, 2 words
						Push(EFLAGS[0..15]);
						Push(FarPointer(ReturnInstruction)); //old CS and IP, 2 words
						Push(ErrorCode); //if needed, 2 bytes
					}
					CPL = CodeSegmentDescriptor.DPL;
					CS.RPL = CPL;
					if(IsInterruptGate()) IF = 0; //interrupt flag set to 0: disabled
					TF = 0;
					VM = 0;
					RF = 0;
					NT = 0;
				}
				else { //VM == 1
					if(CodeSegment.DPL != 0) Exception(GP(NewCodeSegmentSelector));
					//Interrupt from Virtual 8086 mode
					//PE = 1, interrupt or trap gate, DPL
					//Check segment selector and descriptor for privilege level 0 stack in current TSS
					if(Is32BitTSS(CurrentTSS)) {
						TSSStackAddress = NewCodeSegment.DPL * 8 + 4;
						if(TSSStackAddress + 7 > TSSLimit) Exception(TS(CurrentTSSSelector));
						NewSS = TSSStackAddress + 4;
						NewESP = StackAddress;
					}
					else { //TSS is 16-bit
						TSSStackAddress = NewCodeSegment.DPL * 4 + 2;
						if(TSSStackAddress + 4 > TSSLimit) Excpetion(#TS(CurrentTSSSelector));
						NewESP = TSSStackAddress;
						NewSS = TSSStackAddress + 2;
					}
					if(SegmentSelector == 0) Exception(TS(EXT));
					if(!IsWithinDescriptorTableLimits(SegmentSelector.Index) || SegmentSelector.RPL != CodeSegment.DPL) Exception(TS(SSSelector + EXT));
					if(!IsPresent(StackSegment)) Exception(SS(SSSelector + EXT));
					if(Is32BitGate() && GetStackSpace() < 40 /*error code pushed*/ || GetStackSpace() < 36 /*no error code pushed*/) Exception(SS(SegmentSelector + EXT));
					else /*16-bit gate*/ if(GetStackSpace() < 20 /*error code pushed*/ || GetStackSpace() < 18 /*no error code pushed*/) Exception(SS(SegmentSelector + EXT);
					if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
					TemporaryEFLAGS = EFLAGS;
					VM = 0;
					TF = 0;
					RF = 0;
					NT = 0;
					if(IsInterruptGateService()) IF = 0; //service through interrupt gate
					TemporarySS = SS;
					TemporaryESP = ESP;
					SS:ESP = TSS(SS0:ESP0); //Change to level 0 stack segment
					//Folowing pushes are 16 bits for 16-bit gate and 32 bits for 32-bit gates
					//Segment selector pushes in 32-bit mode are padded to two words
					Push(GS);
					Push(FS);
					Push(DS);
					Push(ES);
					Push(TemporarySS);
					Push(TemporaryESP);
					Push(TemporaryEFLAGS);
					Push(CS);
					Push(EIP);
					GS = 0; //segment registers nullified, invalid in protection mode
					FS = 0;
					DS = 0;
					ES = 0;
					CS = Gate(CS);
					if(OperandSize == 32) EIP = Gate(InstructionPointer);
					else EIP = Gate(InstructionPointer) & 0xFFFF; //OperandSize is 16
					//Starts execution of new routine in Protected Mode
				}
			}
			else { //PE = 1, interrupt or trap gate, DPL >= CPL
				if(VM == 1) Exception(GP(NewCodeSegmentSelector);
				if(IsConforming(CodeSegment) || CodeSegment.DPL == CPL) {
					//Intra-privilege level interrupt
					//PE == 1, DPL == CPL or conforming segment
					if(Is32BitGate() && GetStackSpace() < 16 /*error code pushed*/ || GetStackSpace() < 12 /*no error code pushed*/) Exception(SS(0));
					else /*16-bit gate*/ if(GetStackSpace() < 8 /*error code pushed*/ || GetStackSpace() < 6 /*no error code pushed*/) Exception(SS(0);
					if(!IsWithinCodeSegmentLimit(InstructionPointer)) Exception(GP(0));
					if(Is32BitGate()) {
						Push(EFLAGS);
						Push(FarPointer(ReturnInstruction)); //3 words padded to 4
						CS:EIP = Gate(CS:EIP); //segment descriptor information also loaded
						Push(ErrorCode); //if any
					}
					else { //16-bit gate
						Push(FLAGS);
						Push(FarPointer(ReturnLocation)); //2 words
						CS:IP = Gate(CS:IP); //segment descriptor information also loaded
						Push(ErrorCode); //if any
					}
					CS.RPL = CPL;
					if(IsInterruptGate()) IF = 0; //interrupt flag is set to 0: disabled
					TF = 0;
					NT = 0;
					VM = 0;
					RF = 0;
				}
				else Exception(GP(CodeSegmentSelector + EXT);
			}
		}
	}
}

```
 
 
## Flags affected
 
The EFLAGS register is pushed onto the stack. The IF, TF, NT, AC, RF, and VM flags may be cleared, depending on the mode of operation of the processor when the INT instruction is executed (see the "Operation" section). If the interrupt uses a task gate, any flags may be set or cleared, controlled by the EFLAGS image in the new task's TSS.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the instruction pointer in the IDT or in the interrupt-, trap-, or task gate is beyond the code segment limits.|
|#GP(0)|If the instruction pointer in the IDT or in the interrupt-, trap-, or task gate is beyond the code segment limits.|
|#GP(selector)|If the segment selector in the interrupt-, trap-, or task gate is null. If an interrupt-, trap-, or task gate, code segment, or TSS segment selector index is outside its descriptor table limits. If the interrupt vector number is outside the IDT limits. If an IDT descriptor is not an interrupt-, trap-, or task-descriptor. If an interrupt is generated by the INT n, INT 3, or INTO instruction and the DPL of an interrupt-, trap-, or task-descriptor is less than the CPL. If the segment selector in an interrupt- or trap-gate does not point to a segment descriptor for a code segment. If the segment selector for a TSS has its local/global bit set for local. If a TSS segment descriptor specifies that the TSS is busy or not available.|
|#SS(0)|If pushing the return address, flags, or error code onto the stack exceeds the bounds of the stack segment and no stack switch occurs.|
|#SS(selector)|If the SS register is being loaded and the segment pointed to is marked not present. If pushing the return address, flags, error code, or stack segment pointer exceeds the bounds of the new stack segment when a stack switch occurs.|
|#NP(selector)|If code segment, interrupt-, trap-, or task gate, or TSS is not present.|
|#TS(selector)|If the RPL of the stack segment selector in the TSS is not equal to the DPL of the code segment being accessed by the interrupt or trap gate. If DPL of the stack segment descriptor pointed to by the stack segment selector in the TSS is not equal to the DPL of the code segment descriptor for the interrupt or trap gate. If the stack segment selector in the TSS is null. If the stack segment for the TSS is not a writable data segment. If segment-selector index for stack segment is outside descriptor table limits.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the interrupt vector number is outside the IDT limits.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the interrupt vector number is outside the IDT limits.|
