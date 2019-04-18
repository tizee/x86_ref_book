# CBW/CWDE
 
## Convert Byte to Word/Convert Word to Doubleword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|98|CBW|AX = sign-extend of AL|
|98|CWDE|EAX = sign-extend of AX|
 
## Description
 
Double the size of the source operand by means of sign extension. The CBW (convert byte to word) instruction copies the sign (bit 7) in the source operand into every bit in the AH register. The CWDE (convert word to doubleword) instruction copies the sign (bit 15) of the word in the AX register into the higher 16 bits of the EAX register.
 
The CBW and CWDE mnemonics reference the same opcode. The CBW instruction is intended for use when the operand-size attribute is 16 and the CWDE instruction for when the operandsize attribute is 32. Some assemblers may force the operand size to 16 when CBW is used and to 32 when CWDE is used. Others may treat these mnemonics as synonyms (CBW/CWDE) and use the current setting of the operand-size attribute to determine the size of values to be converted, regardless of the mnemonic used.
 
The CWDE instruction is different from the CWD (convert word to double) instruction. The CWD instruction uses the DX:AX register pair as a destination operand; whereas, the CWDE instruction uses the EAX register as a destination.
 
 
## Operation
 
```c
if(OperandSize == 16) AX = SignExtend(AL); //instruction == CBW
else EAX = SignExtend(AX); //OperandSize == 32, instruction == CWDE

```
 
 
## Flags affected
 
None.

 
 
## Exceptions
 
None.
