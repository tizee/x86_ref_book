# UNPCKHPS
 
## Unpack and Interleave High Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 15 /r|UNPCKHPS xmm1, xmm2/m128|Unpack and interleave the single-precision floating-point values from high quadwords of xmm1 and xmm2/mem into xmm1.|
 
## Description
 
Performs an interleaved unpack of the high-order single-precision floating-point values from the source operand (second operand) and the destination operand (first operand).
 
The source operand can be an XMM register or a 128-bit memory location; the destination operand is an XMM register.
 
When unpacking from a memory operand, an implementation may fetch only the appropriate 64 bits; however, alignment to 16-byte boundary and normal segment checking will still be enforced.
 
 
## Operation
 
```c
Destination[0..31] = Destination[64..95];
Destination[32..63] = Source[64..95];
Destination[64..95] = Destination[96..127];
Destination[96..127] = Source[96..127];

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|UNPCKHPS xmm, xmm|6/6/3|2/2/2|MMX_SHFT|
