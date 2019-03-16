# PUSHA/PUSHAD
 
## Push All General-Purpose Registers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|60|PUSHA|Push AX, CX, DX, BX, original SP, BP, SI, and DI.|
|60|PUSHAD|Push EAX, ECX, EDX, EBX, original ESP, EBP, ESI, and EDI.|
 
## Description
 
Pushes the contents of the general-purpose registers onto the stack. The registers are stored on the stack in the following order: EAX, ECX, EDX, EBX, EBP, ESP (original value), EBP, ESI, and EDI (if the current operand-size attribute is 32) and AX, CX, DX, BX, SP (original value), BP, SI, and DI (if the operand-size attribute is 16). These instructions perform the reverse operation of the POPA/POPAD instructions. The value pushed for the ESP or SP register is its value before prior to pushing the first register (see the "Operation" section below).
 
The PUSHA (push all) and PUSHAD (push all double) mnemonics reference the same opcode.
 
The PUSHA instruction is intended for use when the operand-size attribute is 16 and the PUSHAD instruction for when the operand-size attribute is 32. Some assemblers may force the operand size to 16 when PUSHA is used and to 32 when PUSHAD is used. Others may treat these mnemonics as synonyms (PUSHA/PUSHAD) and use the current setting of the operandsize attribute to determine the size of values to be pushed from the stack, regardless of the mnemonic used.
 
In the real-address mode, if the ESP or SP register is 1, 3, or 5 when the PUSHA/PUSHAD instruction is executed, the processor shuts down due to a lack of stack space. No exception is generated to indicate this condition.
 
 
## Operation
 
```c
if(OperandSize = 32) { //PUSHAD instruction
	Temporary = ESP;
	Push(EAX);
	Push(ECX);
	Push(EDX);
	Push(EBX);
	Push(Temporary);
	Push(EBP);
	Push(ESI);
	Push(EDI);
}
else { //OperandSize = 16, PUSHA instruction
	Temporary = SP;
	Push(AX);
	Push(CX);
	Push(DX);
	Push(BX);
	Push(Temporary);
	Push(BP);
	Push(SI);
	Push(DI);
}

```
 
 
## Flags affected
 
None.

 
