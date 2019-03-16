# JMP
 
## Jump
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|EB cb|JMP rel8|Jump short, relative, displacement relative to next instruction.|
|E9 cw|JMP rel16|Jump near, relative, displacement relative to next instruction.|
|E9 cd|JMP rel32|Jump near, relative, displacement relative to next instruction.|
|FF /4|JMP r/m16|Jump near, absolute indirect, address given in r/m16.|
|FF /4|JMP r/m32|Jump near, absolute indirect, address given in r/m32.|
|EA cd|JMP ptr16:16|Jump far, absolute, address given in operand.|
|EA cp|JMP ptr16:32|Jump far, absolute, address given in operand.|
|FF /5|JMP m16:16|Jump far, absolute indirect, address given in m16:16.|
|FF /5|JMP m16:32|Jump far, absolute indirect, address given in m16:32.|
 
## Description
 
Transfers program control to a different point in the instruction stream without recording return information. The destination (target) operand specifies the address of the instruction being jumped to. This operand can be an immediate value, a general-purpose register, or a memory location.
 
This instruction can be used to execute four different types of jumps: - Near jump-A jump to an instruction within the current code segment (the segment currently pointed to by the CS register), sometimes referred to as an intrasegment jump.
 
> * Short jump
> A near jump where the jump range is limited to -128 to +127 from the current EIP value.
> * Far jump
> A jump to an instruction located in a different segment than the current code segment but at the same privilege level, sometimes referred to as an intersegment jump.
> * Task switch
> A jump to an instruction located in a different task.
A task switch can only be executed in protected mode (see Chapter 6, Task Management, in the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for information on performing task switches with the JMP instruction).
 
Near and Short Jumps. When executing a near jump, the processor jumps to the address (within the current code segment) that is specified with the target operand. The target operand specifies either an absolute offset (that is an offset from the base of the code segment) or a relative offset (a signed displacement relative to the current value of the instruction pointer in the EIP register). A near jump to a relative offset of 8-bits (rel8) is referred to as a short jump. The CS register is not changed on near and short jumps.
 
An absolute offset is specified indirectly in a general-purpose register or a memory location (r/m16 or r/m32). The operand-size attribute determines the size of the target operand (16 or 32 bits). Absolute offsets are loaded directly into the EIP register. If the operand-size attribute is 16, the upper two bytes of the EIP register are cleared, resulting in a maximum instruction pointer size of 16 bits.
 
A relative offset (rel8, rel16, or rel32) is generally specified as a label in assembly code, but at the machine code level, it is encoded as a signed 8-, 16-, or 32-bit immediate value. This value is added to the value in the EIP register. (Here, the EIP register contains the address of the instruction following the JMP instruction). When using relative offsets, the opcode (for short vs.
 
near jumps) and the operand-size attribute (for near relative jumps) determines the size of the target operand (8, 16, or 32 bits).
 
Far Jumps in Real-Address or Virtual-8086 Mode. When executing a far jump in realaddress or virtual-8086 mode, the processor jumps to the code segment and offset specified with the target operand. Here the target operand specifies an absolute far address either directly with a pointer (ptr16:16 or ptr16:32) or indirectly with a memory location (m16:16 or m16:32). With the pointer method, the segment and address of the called procedure is encoded in the instruction, using a 4-byte (16-bit operand size) or 6-byte (32-bit operand size) far address immediate.
 
With the indirect method, the target operand specifies a memory location that contains a 4-byte (16-bit operand size) or 6-byte (32-bit operand size) far address. The far address is loaded directly into the CS and EIP registers. If the operand-size attribute is 16, the upper two bytes of the EIP register are cleared.
 
Far Jumps in Protected Mode. When the processor is operating in protected mode, the JMP instruction can be used to perform the following three types of far jumps:
 
* A far jump to a conforming or non-conforming code segment.
* A far jump through a call gate.
* A task switch.
 
(The JMP instruction cannot be used to perform inter-privilege-level far jumps.) In protected mode, the processor always uses the segment selector part of the far address to access the corresponding descriptor in the GDT or LDT. The descriptor type (code segment, call gate, task gate, or TSS) and access rights determine the type of jump to be performed.
 
If the selected descriptor is for a code segment, a far jump to a code segment at the same privilege level is performed. (If the selected code segment is at a different privilege level and the code segment is non-conforming, a general-protection exception is generated.) A far jump to the same privilege level in protected mode is very similar to one carried out in real-address or virtual-8086 mode. The target operand specifies an absolute far address either directly with a pointer (ptr16:16 or ptr16:32) or indirectly with a memory location (m16:16 or m16:32). The operandsize attribute determines the size of the offset (16 or 32 bits) in the far address. The new code segment selector and its descriptor are loaded into CS register, and the offset from the instruction is loaded into the EIP register. Note that a call gate (described in the next paragraph) can also be used to perform far call to a code segment at the same privilege level. Using this mechanism provides an extra level of indirection and is the preferred method of making jumps between 16-bit and 32-bit code segments.
 
When executing a far jump through a call gate, the segment selector specified by the target operand identifies the call gate. (The offset part of the target operand is ignored.) The processor then jumps to the code segment specified in the call gate descriptor and begins executing the instruction at the offset specified in the call gate. No stack switch occurs. Here again, the target operand can specify the far address of the call gate either directly with a pointer (ptr16:16 or ptr16:32) or indirectly with a memory location (m16:16 or m16:32).
 
Executing a task switch with the JMP instruction is somewhat similar to executing a jump through a call gate. Here the target operand specifies the segment selector of the task gate for the task being switched to (and the offset part of the target operand is ignored). The task gate in turn points to the TSS for the task, which contains the segment selectors for the task's code and stack segments. The TSS also contains the EIP value for the next instruction that was to be executed before the task was suspended. This instruction pointer value is loaded into the EIP register so that the task begins executing again at this next instruction.
 
The JMP instruction can also specify the segment selector of the TSS directly, which eliminates the indirection of the task gate. See Chapter 6, Task Management, in IA-32 Intel Architecture Software Developer's Manual, Volume 3, for detailed information on the mechanics of a task switch.
 
Note that when you execute at task switch with a JMP instruction, the nested task flag (NT) is not set in the EFLAGS register and the new TSS's previous task link field is not loaded with the old task's TSS selector. A return to the previous task can thus not be carried out by executing the IRET instruction. Switching tasks with the JMP instruction differs in this regard from the CALL instruction which does set the NT flag and save the previous task link information, allowing a return to the calling task with an IRET instruction.
 
 
## Operation
 
```c
if(IsNearJump()) {
	if(IsRelativeJump()) TemporaryEIP = EIP + Destination; //EIP is instruction following JMP instruction;
	else TemporaryEIP == Destination;
	if(!IsWithinCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
	if(OperandSize == 32) EIP = TemporaryEIP;
	else EIP = TemporaryEIP & 0xFFFF; //OperandSize == 16
	//END
}

if(IsFarJump() && (PE == 0 || (PE == 1 && VM == 1)) { //real-address or virtual-8086 mode
	TemporaryEIP = Destination.Offset; //Destination is ptr16:32 or [m16:32]
	if(!IsWithinCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
	CS = Destination.SegmentSelector; //Destination ptr16:32 [m16:32]
	if(OperandSize == 32) EIP = TemporaryEIP; //Destination ptr16:32 [m16:32]
	else /*OperandSize == 16*/ EIP = TemporaryEIP & 0xFFFF; //clear upper 16 bits;
	//END
}

if(IsFarJump() && PE == 1 && VM == 0) { //Protected mode, not virtual-8086 mode
	SegmentsToCheck[] = {CS, DS, ES, FS, GS, SS};
	if(!CheckEffectiveAddresses(SegmentsToCheck) || TargetOperand.SegmentSelector == 0) Exception(GP(0)); //effective address in the CS, DS, ES, FS, GS, or SS segment is illegal
	if(!IsWithinDescriptorTableLimits(SegmentSelector.Index)) Exception(GP(NewSelector));
	SegmentDescriptorData = ReadSegmentDescriptorData(); //Read type and access rights of segment descriptor
	switch(SegmentDescriptorData.Type) {
		case TypeConformingCodeSegment:
			if(DPL > CPL) Exception(GP(SegmentSelector));
			if(!IsPresent(Segment)) Exception(NP(SegmentSelector));
			TemporaryEIP = Destination.Offset;
			if(OperandSize == 16) TemporaryEIP = TemporaryEIP & 0xFFFF;
			if(!isWithinCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
			CS = Destination.SegmentSelector; //segment descriptor information also loaded
			CS.RPL = CPL;
			EIP = TemporaryEIP;
			break;
		case TypeNonConformingCodeSegment:
			if(RPL > CPL || DPL != CPL) Exception(GP(CodeSegmentSelector));
			if(!IsPresent(Segment)) Exception(NP(SegmentSelector));
			if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
			TemporaryEIP = Destination.Offset;
			if(OperandSize == 16) TemporaryEIP = TemporaryEIP & 0xFFFF;
			if(!IsWithinCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
			CS = Destination.SegmentSelector; //segment descriptor information also loaded
			CS.RPL = CPL;
			EIP = TemporaryEIP;
			break;
		case TypeCallGate:
			if(CallGate.DPL < CPL || CallGate.DPL < CallGate.SegmentSelector.RPL) Exception(GP(CallGate.Selector));
			if(!IsPresent(CallGate)) Exception(NP(CallGate.Selector));
			if(CallGate.CodeSegmentSelector == 0) Exception(GP(0));
			CodeSegmentDescriptor = ReadCodeSegmentDescriptor();
			if(!IndicatesCodeSegment(CodeSegmentDescriptor) || (IsConforming(CodeSegmentDescriptor) && DPL > CPL) || (!IsConforming(CodeSegmentDescriptor) && DPL != CPL)) Exception(GP(CodeSegmentSelector));
			if(!IsPresent(CodeSegment)) Exception(NP(CodeSegmentSelector));
			if(!IsWithinCodeSegmentLimits(InstructionPointer)) Exception(GP(0));
			TemporaryEIP = Destination.Offset;
			if(GateSize == 16) TemporaryEIP = TemporaryEIP & 0xFFFF;
			if(!IsWithinCodeSegmentLimits(TemporaryEIP)) Exception(GP(0));
			CS = Destination.SegmentSelector; //segment descriptor information also loaded
			CS.RPL = CPL;
			EIP = TemporaryEIP;
			break;
		case TypeTaskGate:
			if(TaskGate.DPL < CPL || TaskGate.DPL < TaskGate.SegmentSelector.RPL) Exception(GP(TaskGate.Selector));
			if(!IsPresent(TaskGate)) Exception(NP(TaskGate.Selector));
			TSSSegmentSelector = ReadTSSSegmentSelector(TaskGateDescriptor); //Read the TSS segment selector in the task-gate descriptor;
			if(!IsGlobal(TSSSegmentSelector) /*TSS segment selector local/global bit is set to local*/ || !IsWithinGDTLimits(Index) || TSSIsBusy(TSSDescriptor)) Exception(GP(TSSSelector));
			if(!IsPresent(TSS)) Exception(NP(TSSSelector));
			SwitchTasks(TSS); //Switch tasks to TSS
			if(!IsWithinCodeSegmentLimit(EIP)) Exception(GP(0));
			break;
		case TypeTaskStateSegment:
			if(TSS.DPL < CPL || TSS.DPL < TSS.SegmentSelector.RPL || !TSSIsAvailable(TSSDescriptor) /*TSS descriptor indicates that TSS is not available*/) Exception(GP(TSSSelector));
			if(!IsPresent(TSS)) Exception(NP(TSSSelector));
			SwitchTasks(TSS); //Switch tasks to TSS
			if(!IsWithinCodeSegmentLimit(EIP)) Exception(GP(0));
			break;
		default:
			Exception(GP(SegmentSelector));
	}
}
else Exception(GP(SegmentSelector));

```
 
 
## Flags affected
 
All flags are affected if a task switch occurs; no flags are affected if a task switch does not occur.

 
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the target operand is beyond the code segment limits. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If the target operand is beyond the code segment limits. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|Jcc|Not Applicable|0.5|ALU|
