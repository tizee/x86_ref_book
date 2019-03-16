# CMPS/CMPSB/CMPSW/CMPSD
 
## Compare String Operands
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|A6|CMPS m8, m8|Compares byte at address DS:(E)SI with byte at address ES:(E)DI and sets the status flags accordingly.|
|A7|CMPS m16, m16|Compares word at address DS:(E)SI with word at address ES:(E)DI and sets the status flags accordingly.|
|A7|CMPS m32, m32|Compares doubleword at address DS:(E)SI with doubleword at address ES:(E)DI and sets the status flags accordingly.|
|A6|CMPSB|Compares byte at address DS:(E)SI with byte at address ES:(E)DI and sets the status flags accordingly.|
|A7|CMPSW|Compares word at address DS:(E)SI with word at address ES:(E)DI and sets the status flags accordingly.|
|A7|CMPSD|Compares doubleword at address DS:(E)SI with doubleword at address ES:(E)DI and sets the status flags accordingly.|
 
## Description
 
Compares the byte, word, or double word specified with the first source operand with the byte, word, or double word specified with the second source operand and sets the status flags in the EFLAGS register according to the results. Both source operands are located in memory. The address of the first source operand is read from either the DS:ESI or the DS:SI registers (depending on the address-size attribute of the instruction, 32 or 16, respectively). The address of the second source operand is read from either the ES:EDI or the ES:DI registers (again depending on the address-size attribute of the instruction). The DS segment may be overridden with a segment override prefix, but the ES segment cannot be overridden.
 
At the assembly-code level, two forms of this instruction are allowed: the "explicit-operands" form and the "no-operands" form. The explicit-operands form (specified with the CMPS mnemonic) allows the two source operands to be specified explicitly. Here, the source operands should be symbols that indicate the size and location of the source values. This explicit-operands form is provided to allow documentation; however, note that the documentation provided by this form can be misleading. That is, the source operand symbols must specify the correct type (size) of the operands (bytes, words, or doublewords), but they do not have to specify the correct location.
 
The locations of the source operands are always specified by the DS:(E)SI and ES:(E)DI registers, which must be loaded correctly before the compare string instruction is executed.
 
The no-operands form provides "short forms" of the byte, word, and doubleword versions of the CMPS instructions. Here also the DS:(E)SI and ES:(E)DI registers are assumed by the processor to specify the location of the source operands. The size of the source operands is selected with the mnemonic: CMPSB (byte comparison), CMPSW (word comparison), or CMPSD (doubleword comparison).
 
After the comparison, the (E)SI and (E)DI registers increment or decrement automatically according to the setting of the DF flag in the EFLAGS register. (If the DF flag is 0, the (E)SI and (E)DI register increment; if the DF flag is 1, the (E)SI and (E)DI registers decrement.) The registers increment or decrement by 1 for byte operations, by 2 for word operations, or by 4 for doubleword operations.
 
The CMPS, CMPSB, CMPSW, and CMPSD instructions can be preceded by the REP prefix for block comparisons of ECX bytes, words, or doublewords. More often, however, these instructions will be used in a LOOP construct that takes some action based on the setting of the status flags before the next comparison is made. See "REP/REPE/REPZ/REPNE /REPNZ-Repeat String Operation Prefix" in Chapter 4 for a description of the REP prefix.
 
 
## Operation
 
```c
Temporary = Source1 - Source2;
SetStatusFlags(Temporary);
if(IsByteOperation()) {
	if(DF == 0) {
		(E)SI = (E)SI + 1;
		(E)DI = (E)DI + 1;
	}
	else {
		(E)SI = (E)SI - 1;
		(E)DI = (E)DI - 1;
	}
}
else if(IsWordOperation()) {
	if(DF == 0) {
		(E)SI = (E)SI + 2;
		(E)DI = (E)DI + 2;
	}
	else {
		(E)SI = (E)SI - 2;
		(E)DI = (E)DI - 2;
	}
}
else { //doubleword comparison
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
 
The CF, OF, SF, ZF, AF, and PF flags are set according to the temporary result of the comparison.

 
 
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
