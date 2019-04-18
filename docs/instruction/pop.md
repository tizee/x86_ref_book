# POP
 
## Pop a Value from the Stack
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|8F /0|POP r/m16|Pop top of stack into m16; increment stack pointer.|
|8F /0|POP r/m32|Pop top of stack into m32; increment stack pointer.|
|58+ rw|POP r16|Pop top of stack into r16; increment stack pointer.|
|58+ rd|POP r32 Pop top of stack into r32; increment stack pointer.||
|1F|POP DS|Pop top of stack into DS; increment stack pointer.|
|07|POP ES|Pop top of stack into ES; increment stack pointer.|
|17|POP SS|Pop top of stack into SS; increment stack pointer.|
|0F A1|POP FS|Pop top of stack into FS; increment stack pointer.|
|0F A9|POP GS|Pop top of stack into GS; increment stack pointer.|
 
## Description
 
Loads the value from the top of the stack to the location specified with the destination operand and then increments the stack pointer. The destination operand can be a general-purpose register, memory location, or segment register.
 
The address-size attribute of the stack segment determines the stack pointer size (16 bits or 32 bits-the source address size), and the operand-size attribute of the current code segment determines the amount the stack pointer is incremented (2 bytes or 4 bytes). For example, if these address- and operand-size attributes are 32, the 32-bit ESP register (stack pointer) is incremented by 4 and, if they are 16, the 16-bit SP register is incremented by 2. (The B flag in the stack segment's segment descriptor determines the stack's address-size attribute, and the D flag in the current code segment's segment descriptor, along with prefixes, determines the operandsize attribute and also the address-size attribute of the destination operand.) If the destination operand is one of the segment registers DS, ES, FS, GS, or SS, the value loaded into the register must be a valid segment selector. In protected mode, popping a segment selector into a segment register automatically causes the descriptor information associated with that segment selector to be loaded into the hidden (shadow) part of the segment register and causes the selector and the descriptor information to be validated (see the "Operation" section below).
 
A null value (0000-0003) may be popped into the DS, ES, FS, or GS register without causing a general protection fault. However, any subsequent attempt to reference a segment whose corresponding segment register is loaded with a null value causes a general protection exception (#GP). In this situation, no memory reference occurs and the saved value of the segment register is null.
 
The POP instruction cannot pop a value into the CS register. To load the CS register from the stack, use the RET instruction.
 
If the ESP register is used as a base register for addressing a destination operand in memory, the POP instruction computes the effective address of the operand after it increments the ESP register. For the case of a 16-bit stack where ESP wraps to 0h as a result of the POP instruction, the resulting location of the memory write is processor-family-specific.
 
The POP ESP instruction increments the stack pointer (ESP) before data at the old top of stack is written into the destination.
 
A POP SS instruction inhibits all interrupts, including the NMI interrupt, until after execution of the next instruction. This action allows sequential execution of POP SS and MOV ESP, EBP instructions without the danger of having an invalid stack during an interrupt1. However, use of the LSS instruction is the preferred method of loading the SS and ESP registers.
 
 
## Operation
 
```c
/*
1. Note that in a sequence of instructions that individually delay interrupts past the following instruction, only
the first instruction in the sequence is guaranteed to delay the interrupt, but subsequent interrupt-delaying
instructions may not delay the interrupt. Thus, in the following instruction sequence:
	STI
	POP SS
	POP ESP
interrupts may be recognized before the POP ESP executes, because STI also delays interrupts for one instruction.
*/

if(StackAddressSize == 32) {
	if(OperandSize == 32) {
		Destination = SS:ESP; //copy a doubleword
		ESP = ESP + 4;
	}
	else { //OperandSize == 16
		Destination = SS:ESP; //copy word
		ESP = ESP + 2;
	}
}
else { //StackAddressSize == 16
	if(OperandSize == 16) {
		Destination= SS:SP; //copy a word
		SP = SP + 2;
	}
	else { //OperanSize == 32
		Destination = SS:SP; //copy a doubleword
		SP = SP + 4;
	}
}

/*
Loading a segment register while in protected mode results in special actions, as described in
the following listing. These checks are performed on the segment selector and the segment
descriptor it points to.
*/

if(IsLoaded(SS)) {
	if(SegmentSelector == 0) Exception(GP(0));
	if(!IsWithinDescriptorTableLimits(SegmentSelector.Index) || SegmentSelector.RPL != CPL || !IsWritableDataSegment(SegmentSelector) || DPL != CPL) Exception(GP(Selector));
	if(!IsPresent(Segment)) Exception(GP(Selector));
}
else {
	SS = SegmentSelector;
	SS = SegmentDescriptor;
}

if((IsLoaded(DS) || IsLoaded(ES) || IsLoaded(FS) || IsLoaded(GS)) && SegmentSelector != 0) { //DS, ES, FS, or GS is loaded with non-null segment selector
	if(!IsWithinDescriptorTableLimits(SegmentSelector.Index) || IsData(SegmentSelector) || IsReadableCodeSegment(SegmentSelector) || (IsData(Segment) || !IsConformingCodeSegment(Segment) && RPL > DPL && CPL > DPL)) Exception(GP(Selector));
	if(!IsPresent(Segment)) Exception(NP(Selector));
	else {
		SegmentRegister = SegmentSelector;
		SegmentRegister = SegmenDescriptor;
	}
}

if((IsLoaded(DS) || IsLoaded(ES) || IsLoaded(FS) || IsLoaded(GS)) && SegmentSelector == 0) { //DS, ES, FS, or GS is loaded with a null segment selector
	SegmentRegister = SegmentSelector;
	SegmentRegister = SegmenDescriptor;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|POP r32|1.5|1|MEM_LOAD ALU|
