# POPA/POPAD
 
## Pop All General-Purpose Registers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|61 POPA|Pop DI, SI, BP, BX, DX, CX, and AX.||
|61 POPAD|Pop EDI, ESI, EBP, EBX, EDX, ECX, and EAX.||
 
## Description
 
Pops doublewords (POPAD) or words (POPA) from the stack into the general-purpose registers.
 
The registers are loaded in the following order: EDI, ESI, EBP, EBX, EDX, ECX, and EAX (if the operand-size attribute is 32) and DI, SI, BP, BX, DX, CX, and AX (if the operand-size attribute is 16). (These instructions reverse the operation of the PUSHA/PUSHAD instructions.) The value on the stack for the ESP or SP register is ignored. Instead, the ESP or SP register is incremented after each register is loaded.
 
The POPA (pop all) and POPAD (pop all double) mnemonics reference the same opcode. The POPA instruction is intended for use when the operand-size attribute is 16 and the POPAD instruction for when the operand-size attribute is 32. Some assemblers may force the operand size to 16 when POPA is used and to 32 when POPAD is used (using the operand-size override prefix [66H] if necessary). Others may treat these mnemonics as synonyms (POPA/POPAD) and use the current setting of the operand-size attribute to determine the size of values to be popped from the stack, regardless of the mnemonic used. (The D flag in the current code segment's segment descriptor determines the operand-size attribute.)
 
 
## Operation
 
```c
if(OperandSize == 32) {
	//Instruction == POPAD
	EDI = Pop();
	ESI = Pop();
	EBP = Pop();
	ESP = ESP + 4; //skip next 4 bytes of stack
	EBX = Pop();
	EDX = Pop();
	ECX = Pop();
	EAX = Pop();
}
else {
	//OperandSize == 16, instruction == POPA
	DI = Pop();
	SI = Pop();
	BP = Pop();
	ESP = ESP + 2; //skip next 2 bytes of stack
	BX = Pop();
	DX = Pop();
	CX = Pop();
	AX = Pop();
}

```
 
 
## Flags affected
 
None.

 
