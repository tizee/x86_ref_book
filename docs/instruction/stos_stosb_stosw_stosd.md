# STOS/STOSB/STOSW/STOSD
 
## Store String
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|AA|STOS m8|Store AL at address ES:(E)DI.|
|AB|STOS m16|Store AX at address ES:(E)DI.|
|AB|STOS m32|Store EAX at address ES:(E)DI.|
|AA|STOSB|Store AL at address ES:(E)DI.|
|AB|STOSW|Store AX at address ES:(E)DI.|
|AB|STOSD|Store EAX at address ES:(E)DI.|
 
## Description
 
Stores a byte, word, or doubleword from the AL, AX, or EAX register, respectively, into the destination operand. The destination operand is a memory location, the address of which is read from either the ES:EDI or the ES:DI registers (depending on the address-size attribute of the instruction, 32 or 16, respectively). The ES segment cannot be overridden with a segment override prefix.
 
At the assembly-code level, two forms of this instruction are allowed: the "explicit-operands" form and the "no-operands" form. The explicit-operands form (specified with the STOS mnemonic) allows the destination operand to be specified explicitly. Here, the destination operand should be a symbol that indicates the size and location of the destination value. The source operand is then automatically selected to match the size of the destination operand (the AL register for byte operands, AX for word operands, and EAX for doubleword operands). This explicit-operands form is provided to allow documentation; however, note that the documentation provided by this form can be misleading. That is, the destination operand symbol must specify the correct type (size) of the operand (byte, word, or doubleword), but it does not have to specify the correct location. The location is always specified by the ES:(E)DI registers, which must be loaded correctly before the store string instruction is executed.
 
The no-operands form provides "short forms" of the byte, word, and doubleword versions of the STOS instructions. Here also ES:(E)DI is assumed to be the destination operand and the AL, AX, or EAX register is assumed to be the source operand. The size of the destination and source operands is selected with the mnemonic: STOSB (byte read from register AL), STOSW (word from AX), or STOSD (doubleword from EAX).
 
After the byte, word, or doubleword is transferred from the AL, AX, or EAX register to the memory location, the (E)DI register is incremented or decremented automatically according to the setting of the DF flag in the EFLAGS register. (If the DF flag is 0, the (E)DI register is incremented; if the DF flag is 1, the (E)DI register is decremented.) The (E)DI register is incremented or decremented by 1 for byte operations, by 2 for word operations, or by 4 for doubleword operations.
 
The STOS, STOSB, STOSW, and STOSD instructions can be preceded by the REP prefix for block loads of ECX bytes, words, or doublewords. More often, however, these instructions are used within a LOOP construct because data needs to be moved into the AL, AX, or EAX register before it can be stored. See "REP/REPE/REPZ/REPNE /REPNZ-Repeat String {operation} Prefix" in this chapter for a description of the REP prefix.
 
 
## Operation
 
```c
if(IsByteOperation()) {
	Destination = AL;
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
	Destination = AX;
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
	Destination = EAX;
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

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|STOSB|5|2|ALU MEM_STORE|
