# RCPPS
 
## Compute Reciprocals of Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 53 /r|RCPPS xmm1, xmm2/m128|Compute the approximate reciprocals of the packed single-precision floating-point values in xmm2/m128 and store the results in xmm1.|
 
## Description
 
Performs an SIMD computation of the approximate reciprocals of the four packed single-precision floating-point values in the source operand (second operand) stores the packed single-precision floating-point results in the destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. See Figure 10-5 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD single-precision floating-point operation.
 
The relative error for this approximation is:
 
|Relative Error| <= 1.5 * 2-12 The RCPPS instruction is not affected by the rounding control bits in the MXCSR register.
 
When a source value is a 0.0, an infinite of the sign of the source value is returned. A denormal source value is treated as a 0.0 (of the same sign). Tiny results are always flushed to 0.0, with the sign of the operand. (Input values greater than or equal to |1.11111111110100000000000B*2125| are guaranteed to not produce tiny results; input values less than or equal to |1.00000000000110000000001B*2126| are guaranteed to produce tiny results, which are in turn flushed to 0.0; and input values in between this range may or may not produce tiny results, depending on the implementation.) When a source value is an SNaN or QNaN, the SNaN is converted to a QNaN or the source QNaN is returned.
 
 
## Operation
 
```c
Destination[0..31] = Approximate(1.0 / Source[0..31]);
Destination[32..63] = Approximate(1.0 / Source[32..63]);
Destination[64..95] = Approximate(1.0 / Source[64..95]);
Destination[96..127] = Approximate(1.0 / Source[96..127]);

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|RCPPS xmm, xmm|6/6/2|4/4/2|MMX_MISC|
