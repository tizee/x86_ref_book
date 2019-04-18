# SQRTSS
 
## Compute Square Root of Scalar Single-Precision Floating-Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 51 /r|SQRTSS xmm1, xmm2/m32|Compute the square root of the low single-precision floating-point value in xmm2/m32 and store the results in xmm1.|
 
## Description
 
Computes the square root of the low single-precision floating-point value in the source operand (second operand) and stores the single-precision floating-point result in the destination operand.
 
The source operand can be an XMM register or a 32-bit memory location. The destination operand is an XMM register. The three high-order doublewords of the destination operand remain unchanged. See Figure 10-6 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of a scalar single-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..31] = SquareRoot(Source[0..31]);
//Destination[64..127] remains unchanged

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SQRTSS xmm, xmm|32/23/30|32/23/29|FP_DIV|
