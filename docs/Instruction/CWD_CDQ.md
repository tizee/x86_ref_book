# CWD/CDQ
 
## Convert Word to Doubleword/Convert Doubleword to Quadword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|99|CWD|DX:AX = sign-extend of AX|
|99|CDQ|EDX:EAX = sign-extend of EAX|
 
## Description
 
Doubles the size of the operand in register AX or EAX (depending on the operand size) by means of sign extension and stores the result in registers DX:AX or EDX:EAX, respectively.
 
The CWD instruction copies the sign (bit 15) of the value in the AX register into every bit position in the DX register (see Figure 7-6 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1). The CDQ instruction copies the sign (bit 31) of the value in the EAX register into every bit position in the EDX register.
 
The CWD instruction can be used to produce a doubleword dividend from a word before a word division, and the CDQ instruction can be used to produce a quadword dividend from a doubleword before doubleword division.
 
The CWD and CDQ mnemonics reference the same opcode. The CWD instruction is intended for use when the operand-size attribute is 16 and the CDQ instruction for when the operand-size attribute is 32. Some assemblers may force the operand size to 16 when CWD is used and to 32 when CDQ is used. Others may treat these mnemonics as synonyms (CWD/CDQ) and use the current setting of the operand-size attribute to determine the size of values to be converted, regardless of the mnemonic used.
 
 
## Operation
 
```c
if(OperandSize == 16) DX = SignExtend(AX); //CWD instruction
else EDX = SignExtend(EAX); //OperandSize = 32, CDQ instruction

```
 
 
## Flags affected
 
None.

 
 
## Exceptions
 
None.
