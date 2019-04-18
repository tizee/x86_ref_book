# POR
 
## Bitwise Logical OR
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F EB /r|POR mm, mm/m64|Bitwise OR of mm/m64 and mm.|
|66 0F EB /r|POR xmm1, xmm2/m128|Bitwise OR of xmm2/m128 and xmm1.|
 
## Description
 
Performs a bitwise logical OR operation on the source operand (second operand) and the destination operand (first operand) and stores the result in the destination operand. The source operand can be an MMX technology register or a 64-bit memory location or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register. Each bit of the result is set to 1 if either or both of the corresponding bits of the first and second operands are 1; otherwise, it is set to 0.
 
 
## Operation
 
```c
Destination = Destination | Source;

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|POR mm, mm|2/2/-|1/1/-|MMX_ALU|
|POR xmm, xmm|2/2/1|2/2/1|MMX_ALU|
