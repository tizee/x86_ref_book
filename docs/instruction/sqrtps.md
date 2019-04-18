# SQRTPS
 
## Compute Square Roots of Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 51 /r|SQRTPS xmm1, xmm2/m128|Compute the square root of the packed single-precision floating-point values in xmm2/m128 and store the results in xmm1.|
 
## Description
 
Performs an SIMD computation of the square roots of the four packed single-precision floatingpoint values in the source operand (second operand) stores the packed single-precision floatingpoint results in the destination operand. The source operand can be an XMM register or a 128- bit memory location. The destination operand is an XMM register. See Figure 10-5 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD single-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..31] = SquareRoot(Source[0..31]);
Destination[32..63] = SquareRoot(Source[32..63]);
Destination[64..95] = SquareRoot(Source[64..95]);
Destination[96..127] = SquareRoot(Source[96..127]);

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SQRTPS xmm, xmm|40/39/29+28|40/39/58|FP_DIV|
