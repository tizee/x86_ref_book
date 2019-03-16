# LODS/LODSB/LODSW/LODSD
 
## Load String
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|AC|LODS m8|Load byte at address DS:(E)SI into AL.|
|AD|LODS m16|Load word at address DS:(E)SI into AX.|
|AD|LODS m32|Load doubleword at address DS:(E)SI into EAX.|
|AC|LODSB|Load byte at address DS:(E)SI into AL.|
|AD|LODSW|Load word at address DS:(E)SI into AX.|
|AD|LODSD|Load doubleword at address DS:(E)SI into EAX.|
 
## Description
 
Loads a byte, word, or doubleword from the source operand into the AL, AX, or EAX register, respectively. The source operand is a memory location, the address of which is read from the DS:EDI or the DS:SI registers (depending on the address-size attribute of the instruction, 32 or 16, respectively). The DS segment may be overridden with a segment override prefix.
 
At the assembly-code level, two forms of this instruction are allowed: the "explicit-operands" form and the "no-operands" form. The explicit-operands form (specified with the LODS mnemonic) allows the source operand to be specified explicitly. Here, the source operand should be a symbol that indicates the size and location of the source value. The destination operand is then automatically selected to match the size of the source operand (the AL register for byte operands, AX for word operands, and EAX for doubleword operands). This explicit-operands form is provided to allow documentation; however, note that the documentation provided by this form can be misleading. That is, the source operand symbol must specify the correct type (size) of the operand (byte, word, or doubleword), but it does not have to specify the correct location.
 
The location is always specified by the DS:(E)SI registers, which must be loaded correctly before the load string instruction is executed.
 
The no-operands form provides "short forms" of the byte, word, and doubleword versions of the LODS instructions. Here also DS:(E)SI is assumed to be the source operand and the AL, AX, or EAX register is assumed to be the destination operand. The size of the source and destination operands is selected with the mnemonic: LODSB (byte loaded into register AL), LODSW (word loaded into AX), or LODSD (doubleword loaded into EAX).
 
After the byte, word, or doubleword is transferred from the memory location into the AL, AX, or EAX register, the (E)SI register is incremented or decremented automatically according to the setting of the DF flag in the EFLAGS register. (If the DF flag is 0, the (E)SI register is incremented; if the DF flag is 1, the ESI register is decremented.) The (E)SI register is incremented or decremented by 1 for byte operations, by 2 for word operations, or by 4 for doubleword operations.
 
The LODS, LODSB, LODSW, and LODSD instructions can be preceded by the REP prefix for block loads of ECX bytes, words, or doublewords. More often, however, these instructions are used within a LOOP construct because further processing of the data moved into the register is usually necessary before the next transfer can be made. See "REP/REPE/REPZ/REPNE /REPNZ-Repeat String Operation Prefix" in Chapter 4 for a description of the REP prefix.
 
 
## Operation
 
```c
if(IsByteOperation()) {
	AL = Source;
	if(DF == 0) (E)SI = (E)SI + 1;
	else (E)SI = (E)SI - 1;
}
else if(IsWordOperation()) {
	AX = Source;
	if(DF == 0) (E)SI = (E)SI + 2;
	else (E)SI = (E)SI - 2;
}
else { //doubleword transfer
	EAX = Source;
	if(DF == 0) (E)SI = (E)SI + 4;
	else (E)SI = (E)SI - 4;
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
