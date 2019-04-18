# XADD
 
## Exchange and Add
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F C0 /r|XADD r/m8, r8|Exchange r8 and r/m8; load sum into r/m8.|
|0F C1 /r|XADD r/m16, r16|Exchange r16 and r/m16; load sum into r/m16.|
|0F C1 /r|XADD r/m32, r32|Exchange r32 and r/m32; load sum into r/m32.|
 
## Description
 
Exchanges the first operand (destination operand) with the second operand (source operand), then loads the sum of the two values into the destination operand. The destination operand can be a register or a memory location; the source operand is a register.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Temporary = Source + Destination;
Source = Destination;
Destination = Temporary;

```
 
 
## Flags affected
 
The CF, PF, AF, SF, ZF, and OF flags are set according to the result of the addition, which is stored in the destination operand.

 
 
## IA-32 Architecture Compatibility
 
IA-32 processors earlier than the Intel486 processor do not recognize this instruction. If this instruction is used, you should provide an equivalent code sequence that runs on earlier processors.

 
