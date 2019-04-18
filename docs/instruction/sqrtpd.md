# SQRTPD
 
## Compute Square Roots of Packed Double-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 51 /r|SQRTPD xmm1, xmm2/m128|Compute the square root of the packed doubleprecision floating-point values in xmm2/m128 and store the results in xmm1.|
 
## Description
 
Performs an SIMD computation of the square roots of the two packed double-precision floatingpoint values in the source operand (second operand) stores the packed double-precision floatingpoint results in the destination operand. The source operand can be an XMM register or a 128- bit memory location. The destination operand is an XMM register. See Figure 11-3 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD double-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..63] = SquareRoot(Source[0..63]);
Destination[64..127] = SquareRoot(Source[64..127]);

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SQRTPD xmm, xmm|70/69/58+57|70/69/114|FP_DIV|
