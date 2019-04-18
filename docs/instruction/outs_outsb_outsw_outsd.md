# OUTS/OUTSB/OUTSW/OUTSD
 
## Output String to Port
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|6E|OUTS DX, m8|Output byte from memory location specified in DS:(E)SI to I/O port specified in DX.|
|6F|OUTS DX, m16|Output word from memory location specified in DS:(E)SI to I/O port specified in DX.|
|6F|OUTS DX, m32|Output doubleword from memory location specified in DS:(E)SI to I/O port specified in DX.|
|6E|OUTSB|Output byte from memory location specified in DS:(E)SI to I/O port specified in DX.|
|6F|OUTSW|Output word from memory location specified in DS:(E)SI to I/O port specified in DX.|
|6F|OUTSD|Output doubleword from memory location specified in DS:(E)SI to I/O port specified in DX.|
 
## Description
 
Copies data from the source operand (second operand) to the I/O port specified with the destination operand (first operand). The source operand is a memory location, the address of which is read from either the DS:ESI or the DS:SI registers (depending on the address-size attribute of the instruction, 32 or 16, respectively). (The DS segment may be overridden with a segment override prefix.) The destination operand is an I/O port address (from 0 to 65,535) that is read from the DX register. The size of the I/O port being accessed (that is, the size of the source and destination operands) is determined by the opcode for an 8-bit I/O port or by the operand-size attribute of the instruction for a 16- or 32-bit I/O port.
 
At the assembly-code level, two forms of this instruction are allowed: the "explicit-operands" form and the "no-operands" form. The explicit-operands form (specified with the OUTS mnemonic) allows the source and destination operands to be specified explicitly. Here, the source operand should be a symbol that indicates the size of the I/O port and the source address, and the destination operand must be DX. This explicit-operands form is provided to allow documentation; however, note that the documentation provided by this form can be misleading. That is, the source operand symbol must specify the correct type (size) of the operand (byte, word, or doubleword), but it does not have to specify the correct location. The location is always specified by the DS:(E)SI registers, which must be loaded correctly before the OUTS instruction is executed.
 
The no-operands form provides "short forms" of the byte, word, and doubleword versions of the OUTS instructions. Here also DS:(E)SI is assumed to be the source operand and DX is assumed to be the destination operand. The size of the I/O port is specified with the choice of mnemonic:
 
OUTSB (byte), OUTSW (word), or OUTSD (doubleword).
 
After the byte, word, or doubleword is transferred from the memory location to the I/O port, the (E)SI register is incremented or decremented automatically according to the setting of the DF flag in the EFLAGS register. (If the DF flag is 0, the (E)SI register is incremented; if the DF flag is 1, the (E)SI register is decremented.) The (E)SI register is incremented or decremented by 1 for byte operations, by 2 for word operations, or by 4 for doubleword operations.
 
The OUTS, OUTSB, OUTSW, and OUTSD instructions can be preceded by the REP prefix for block input of ECX bytes, words, or doublewords. See "REP/REPE/REPZ/REPNE /REPNZ-Repeat String Operation Prefix" in this chapter for a description of the REP prefix.
 
This instruction is only useful for accessing I/O ports located in the processor's I/O address space. See Chapter 13, Input/Output, in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for more information on accessing I/O ports in the I/O address space.
 
 
## Operation
 
```c
if(PE == 1 && (CPL > IOPL || VM == 1)) { //Protected mode with CPL > IOPL or virtual-8086 mode
	if(!IOPermission()) Exception(GP); //Any I/O Permission Bit for I/O port being accessed = 1
	else Destination = Source; //Writes to selected I/O port
}
//Real Mode or Protected Mode with CPL <= IOPL
else Destination = Source; //Writes to selected I/O port

if(IsByteMove()) {
	if(DF == 0) {
		(E)SI = (E)SI + 1;
		(E)DI = (E)DI + 1;
	}
	else {
		(E)SI = (E)SI - 1;
		(E)DI = (E)DI - 1;
	}
}
else if(IsWordMove()) {
	if(DF == 0) {
		(E)SI = (E)SI + 2;
		(E)DI = (E)DI + 2;
	}
	else {
		(E)SI = (E)SI - 2;
		(E)DI = (E)DI - 2;
	}
}
else { //doubleword move
	if(DF == 0) {
		(E)SI = (E)SI + 4;
		(E)DI = (E)DI + 4;
	}
	else {
		(E)SI = (E)SI - 4;
		(E)DI = (E)DI - 4;
	}
}

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
After executing an OUTS, OUTSB, OUTSW, or OUTSD instruction, the Pentium processor insures that the EWBE# pin has been sampled active before it begins to execute the next instruction.
(Note that the instruction can be prefetched if EWBE# is not active, but it will not be executed until the EWBE# pin is sampled active.) Only the Pentium processor family has the EWBE# pin; the other IA-32 processors do not. For the Pentium 4, Intel Xeon, and P6 family processors, upon execution of an OUTS, OUTSB, OUTSW, or OUTSD instruction, the processor will not execute the next instruction until the data phase of the transaction is complete.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the corresponding I/O permission bits in TSS for the I/O port being accessed is 1. If a memory operand effective address is outside the limit of the CS, DS, ES, FS, or GS segment. If the segment register contains a null segment selector.|
|#GP(0)|If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the corresponding I/O permission bits in TSS for the I/O port being accessed is 1. If a memory operand effective address is outside the limit of the CS, DS, ES, FS, or GS segment. If the segment register contains a null segment selector.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any of the I/O permission bits in the TSS for the I/O port being accessed is 1.|
|#GP(0)|If any of the I/O permission bits in the TSS for the I/O port being accessed is 1.|
|#PF(fault-code)|If a page fault occurs.|
