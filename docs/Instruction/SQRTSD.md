# SQRTSD
 
## Compute Square Root of Scalar Double-Precision Floating-Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F 51 /r|SQRTSD xmm1, xmm2/m64|Compute the square root of the low double-precision floating-point value in xmm2/m64 and store the results in xmm1.|
 
## Description
 
Computes the square root of the low double-precision floating-point value in the source operand (second operand) and stores the double-precision floating-point result in the destination operand. The source operand can be an XMM register or a 64-bit memory location. The destination operand is an XMM register. The high quadword of the destination operand remains unchanged. See Figure 11-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of a scalar double-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..63] = SquareRoot(Source[0..63]);
//Destination[64..127] remains unchanged

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SQRTSD xmm, xmm|39/38/58|39/38/57|FP_DIV|
