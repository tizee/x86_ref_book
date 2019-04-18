# SUBSS
 
## Subtract Scalar Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 5C /r|SUBSS xmm1, xmm2/m32|Subtract the lower single-precision floating-point values in xmm2/m32 from xmm1.|
 
## Description
 
Subtracts the low single-precision floating-point value in the source operand (second operand) from the low single-precision floating-point value in the destination operand (first operand), and stores the single-precision floating-point result in the destination operand. The source operand can be an XMM register or a 32-bit memory location. The destination operand is an XMM register. The three high-order doublewords of the destination operand remain unchanged. See Figure 10-6 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of a scalar single-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..31] = Destination[0..31] - Source[0..31];
//Destination[96..127] remains unchanged

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SUBSS xmm, xmm|5/4/3|2/2/1|FP_ADD|
