# SCAS/SCASB/SCASW/SCASD
 
## Scan String
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|AE|SCAS m8|Compare AL with byte at ES:(E)DI and set status flags.|
|AF|SCAS m16|Compare AX with word at ES:(E)DI and set status flags.|
|AF|SCAS m32|Compare EAX with doubleword at ES(E)DI and set status flags.|
|AE|SCASB|Compare AL with byte at ES:(E)DI and set status flags.|
|AF|SCASW|Compare AX with word at ES:(E)DI and set status flags.|
|AF|SCASD|Compare EAX with doubleword at ES:(E)DI and set status flags.|
 
## Description
 
Compares the byte, word, or double word specified with the memory operand with the value in the AL, AX, or EAX register, and sets the status flags in the EFLAGS register according to the results. The memory operand address is read from either the ES:EDI or the ES:DI registers (depending on the address-size attribute of the instruction, 32 or 16, respectively). The ES segment cannot be overridden with a segment override prefix.
 
At the assembly-code level, two forms of this instruction are allowed: the "explicit-operands" form and the "no-operands" form. The explicit-operand form (specified with the SCAS mnemonic) allows the memory operand to be specified explicitly. Here, the memory operand should be a symbol that indicates the size and location of the operand value. The register operand is then automatically selected to match the size of the memory operand (the AL register for byte comparisons, AX for word comparisons, and EAX for doubleword comparisons). This explicit-operand form is provided to allow documentation; however, note that the documentation provided by this form can be misleading. That is, the memory operand symbol must specify the correct type (size) of the operand (byte, word, or doubleword), but it does not have to specify the correct location. The location is always specified by the ES:(E)DI registers, which must be loaded correctly before the compare string instruction is executed.
 
The no-operands form provides "short forms" of the byte, word, and doubleword versions of the SCAS instructions. Here also ES:(E)DI is assumed to be the memory operand and the AL, AX, or EAX register is assumed to be the register operand. The size of the two operands is selected with the mnemonic: SCASB (byte comparison), SCASW (word comparison), or SCASD (doubleword comparison).
 
After the comparison, the (E)DI register is incremented or decremented automatically according to the setting of the DF flag in the EFLAGS register. (If the DF flag is 0, the (E)DI register is incremented; if the DF flag is 1, the (E)DI register is decremented.) The (E)DI register is incremented or decremented by 1 for byte operations, by 2 for word operations, or by 4 for doubleword operations.
 
The SCAS, SCASB, SCASW, and SCASD instructions can be preceded by the REP prefix for block comparisons of ECX bytes, words, or doublewords. More often, however, these instructions will be used in a LOOP construct that takes some action based on the setting of the status flags before the next comparison is made. See "REP/REPE/REPZ/REPNE /REPNZ-Repeat String Operation Prefix" in this chapter for a description of the REP prefix.
 
 
## Operation
 
```c
if(IsByteComparison()) {
	Temporary = AL - Source;
	SetStatusFlags(Temporary);
	if(DF == 0) {
		(E)SI = (E)SI + 1;
		(E)DI = (E)DI + 1;
	}
	else {
		(E)SI = (E)SI - 1;
		(E)DI = (E)DI - 1;
	}
}
else if(IsWordComparison()) {
	Temporary = Ax - Source;
	SetStatusFlags(Temporary);
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
	Temporary = EAX - Source;
	SetStatusFlags(Temporary);
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
 
The OF, SF, ZF, AF, PF, and CF flags are set according to the temporary result of the comparison.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SCAS|4|1.5|ALU MEM_LOAD|
