# XORPS
 
## Bitwise Logical XOR for Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 57 /r|XORPS xmm1, xmm2/m128|Bitwise exclusive-OR of xmm2/m128 and xmm1.|
 
## Description
 
Performs a bitwise logical exclusive-OR of the four packed single-precision floating-point values from the source operand (second operand) and the destination operand (first operand), and stores the result in the destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register.
 
 
## Operation
 
```c
Destination[0..127] = Destination[0..127] ^ Source[0..127];

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|XORPS xmm, xmm|4/4/2|2/2/2|MMX_ALU|
