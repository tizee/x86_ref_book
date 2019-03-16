# UNPCKHPD
 
## Unpack and Interleave High Packed Double- Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 15 /r|UNPCKHPD xmm1, xmm2/m128|Unpack and interleave double-precision floating-point values from the high quadwords of xmm1 and xmm2/m128.|
 
## Description
 
Performs an interleaved unpack of the high double-precision floating-point values from the source operand (second operand) and the destination operand (first operand).
 
The source operand can be an XMM register or a 128-bit memory location; the destination operand is an XMM register.
 
When unpacking from a memory operand, an implementation may fetch only the appropriate 64 bits; however, alignment to 16-byte boundary and normal segment checking will still be enforced.
 
 
## Operation
 
```c
Destination[0..63] = Destination[64..127];
Destination[64..127] = Source[64..127];

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|UNPCKHPD xmm, xmm|6/6/1|2/2/1|MMX_SHFT|
