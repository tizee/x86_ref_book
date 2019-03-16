# RSQRTPS
 
## Compute Reciprocals of Square Roots of Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 52 /r|RSQRTPS xmm1, xmm2/m128|Compute the approximate reciprocals of the square roots of the packed single-precision floating-point values in xmm2/m128 and store the results in xmm1.|
 
## Description
 
Performs an SIMD computation of the approximate reciprocals of the square roots of the four packed single-precision floating-point values in the source operand (second operand) and stores the packed single-precision floating-point results in the destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. See Figure 10-5 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD single-precision floating-point operation.
 
The relative error for this approximation is:
 
|Relative Error| <= 1.5 * 2-12 The RSQRTPS instruction is not affected by the rounding control bits in the MXCSR register.
 
When a source value is a 0.0, an infinite of the sign of the source value is returned. A denormal source value is treated as a 0.0 (of the same sign). When a source value is a negative value (other than -0.0), a floating-point indefinite is returned. When a source value is an SNaN or QNaN, the SNaN is converted to a QNaN or the source QNaN is returned.
 
 
## Operation
 
```c
Destination[0..31] = Approximate(1.0 / SquareRoot(Source[0..31]));
Destination[32..63] = Approximate(1.0 / SquareRoot(Source[32..63]));
Destination[64..95] = Approximate(1.0 / SquareRoot(Source[64..95]));
Destination[96..127] = Approximate(1.0 / SquareRoot(Source[96..127]));

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|RSQRTPS xmm, xmm|6/6/2|4/4/2|MMX_MISC|
