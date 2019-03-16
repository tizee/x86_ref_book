# RSQRTSS
 
## Compute Reciprocal of Square Root of Scalar Single- Precision Floating-Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 52 /r|RSQRTSS xmm1, xmm2/m32|Computes the approximate reciprocal of the square root of the low single-precision floating-point value in xmm2/m32 and stores the results in xmm1.|
 
## Description
 
Computes an approximate reciprocal of the square root of the low single-precision floatingpoint value in the source operand (second operand) stores the single-precision floating-point result in the destination operand. The source operand can be an XMM register or a 32-bit memory location. The destination operand is an XMM register. The three high-order doublewords of the destination operand remain unchanged. See Figure 10-6 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of a scalar single-precision floating-point operation.
 
The relative error for this approximation is:
 
|Relative Error| <= 1.5 * 2-12 The RSQRTSS instruction is not affected by the rounding control bits in the MXCSR register.
 
When a source value is a 0.0, an infinite of the sign of the source value is returned. A denormal source value is treated as a 0.0 (of the same sign). When a source value is a negative value (other than -0.0), a floating-point indefinite is returned. When a source value is an SNaN or QNaN, the SNaN is converted to a QNaN or the source QNaN is returned.
 
 
## Operation
 
```c
Destination[0..31] = Approximate(1.0 / SquareRoot(Source[0..31]));
//Destination[32..127] remains unchanged

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|RSQRTSS xmm, xmm|6/6/-|4/4/1|MMX_MISC MMX_SHFT|
