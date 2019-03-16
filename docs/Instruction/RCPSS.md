# RCPSS
 
## Compute Reciprocal of Scalar Single-Precision Floating- Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 53 /r|RCPSS xmm1, xmm2/m32|Compute the approximate reciprocal of the scalar single-precision floating-point value in xmm2/m32 and store the result in xmm1.|
 
## Description
 
Computes of an approximate reciprocal of the low single-precision floating-point value in the source operand (second operand) and stores the single-precision floating-point result in the destination operand. The source operand can be an XMM register or a 32-bit memory location.
 
The destination operand is an XMM register. The three high-order doublewords of the destination operand remain unchanged. See Figure 10-6 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of a scalar single-precision floating-point operation.
 
The relative error for this approximation is:
 
|Relative Error| <= 1.5 * 2-12 The RCPSS instruction is not affected by the rounding control bits in the MXCSR register.
 
When a source value is a 0.0, an infinite of the sign of the source value is returned. A denormal source value is treated as a 0.0 (of the same sign). Tiny results are always flushed to 0.0, with the sign of the operand. (Input values greater than or equal to |1.11111111110100000000000B*2125| are guaranteed to not produce tiny results; input values less than or equal to |1.00000000000110000000001B*2126| are guaranteed to produce tiny results, which are in turn flushed to 0.0; and input values in between this range may or may not produce tiny results, depending on the implementation.) When a source value is an SNaN or QNaN, the SNaN is converted to a QNaN or the source QNaN is returned.
 
 
## Operation
 
```c
Destination[0..31] = Approximate(1.0 / Source[0..31]);
//Destination[32..127] remains unchanged

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|RCPSS xmm, xmm|6/6/1|2/2/1|MMX_MISC MMX_SHFT|
