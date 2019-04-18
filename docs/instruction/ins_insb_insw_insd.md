# INS/INSB/INSW/INSD
 
## Input from Port to String
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|6C INS m8, DX|Input byte from I/O port specified in DX into memory location specified in ES:(E)DI.||
|6D INS m16, DX|Input word from I/O port specified in DX into memory location specified in ES:(E)DI.||
|6D INS m32, DX|Input doubleword from I/O port specified in DX into memory location specified in ES:(E)DI.||
|6C INSB|Input byte from I/O port specified in DX into memory location specified with ES:(E)DI.||
|6D INSW|Input word from I/O port specified in DX into memory location specified in ES:(E)DI.||
|6D INSD|Input doubleword from I/O port specified in DX into memory location specified in ES:(E)DI.||
 
## Description
 
Copies the data from the I/O port specified with the source operand (second operand) to the destination operand (first operand). The source operand is an I/O port address (from 0 to 65,535) that is read from the DX register. The destination operand is a memory location, the address of which is read from either the ES:EDI or the ES:DI registers (depending on the address-size attribute of the instruction, 32 or 16, respectively). (The ES segment cannot be overridden with a segment override prefix.) The size of the I/O port being accessed (that is, the size of the source and destination operands) is determined by the opcode for an 8-bit I/O port or by the operandsize attribute of the instruction for a 16- or 32-bit I/O port.
 
At the assembly-code level, two forms of this instruction are allowed: the "explicit-operands" form and the "no-operands" form. The explicit-operands form (specified with the INS mnemonic) allows the source and destination operands to be specified explicitly. Here, the source operand must be "DX," and the destination operand should be a symbol that indicates the size of the I/O port and the destination address. This explicit-operands form is provided to allow documentation; however, note that the documentation provided by this form can be misleading.
 
That is, the destination operand symbol must specify the correct type (size) of the operand (byte, word, or doubleword), but it does not have to specify the correct location. The location is always specified by the ES:(E)DI registers, which must be loaded correctly before the INS instruction is executed.
 
The no-operands form provides "short forms" of the byte, word, and doubleword versions of the INS instructions. Here also DX is assumed by the processor to be the source operand and ES:(E)DI is assumed to be the destination operand. The size of the I/O port is specified with the choice of mnemonic: INSB (byte), INSW (word), or INSD (doubleword).
 
After the byte, word, or doubleword is transfer from the I/O port to the memory location, the (E)DI register is incremented or decremented automatically according to the setting of the DF flag in the EFLAGS register. (If the DF flag is 0, the (E)DI register is incremented; if the DF flag is 1, the (E)DI register is decremented.) The (E)DI register is incremented or decremented by 1 for byte operations, by 2 for word operations, or by 4 for doubleword operations.
 
The INS, INSB, INSW, and INSD instructions can be preceded by the REP prefix for block input of ECX bytes, words, or doublewords. See "REP/REPE/REPZ/REPNE /REPNZ-Repeat String Operation Prefix" in this chapter for a description of the REP prefix.
 
These instructions are only useful for accessing I/O ports located in the processor's I/O address space. See Chapter 13, Input/Output, in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for more information on accessing I/O ports in the I/O address space.
 
 
## Operation
 
```c
if(PE == 1 && CPL > IOPL || VM == 1) { //Protected mode with CPL > IOPL or virtual-8086 mode
	if(AnyPermissionBitSet(CurrentIOPort())) Exception(GP(0)); //If any I/O Permission Bit for I/O port being accessed == 1 the I/O operation is not allowed
	else Destination = Source; //I/O operation is allowed; Reads from selected I/O port
}
else Destination = Source; //Real Mode or Protected Mode with CPL <= IOPL; Reads from selected I/O port

if(IsByteTransfer()) {
	if(DF == 0) (E)DI = (E)DI + 1;
	else (E)DI = (E)DI - 1;
}
else if(IsWordTransfer()) {
	if(DF == 0) (E)DI = (E)DI + 2;
	else (E)DI = (E)DI - 2;
}
else { //doubleword transfer
	if(DF == 0) (E)DI = (E)DI + 4;
	else (E)DI = (E)DI - 4;
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the corresponding I/O permission bits in TSS for the I/O port being accessed is 1. If the destination is located in a non-writable segment. If an illegal memory operand effective address in the ES segments is given.|
|#GP(0)|If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the corresponding I/O permission bits in TSS for the I/O port being accessed is 1. If the destination is located in a non-writable segment. If an illegal memory operand effective address in the ES segments is given.|
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
