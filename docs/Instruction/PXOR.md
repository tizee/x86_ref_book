# PXOR
 
## Logical Exclusive OR
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F EF /r|PXOR mm, mm/m64|Bitwise XOR of mm/m64 and mm.|
|66 0F EF /r|PXOR xmm1, xmm2/m128|Bitwise XOR of xmm2/m128 and xmm1.|
 
## Description
 
Performs a bitwise logical exclusive-OR (XOR) operation on the source operand (second operand) and the destination operand (first operand) and stores the result in the destination operand. The source operand can be an MMX technology register or a 64-bit memory location or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register. Each bit of the result is 1 if the corresponding bits of the two operands are different; each bit is 0 if the corresponding bits of the operands are the same.
 
 
## Operation
 
```c
Destination = Destination ^ Source;

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PXOR mm, mm|2/2/-|1/1/-|MMX_ALU|
|PXOR xmm, xmm|2/2/1|2/2/1|MMX_ALU|
