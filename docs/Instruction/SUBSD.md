# SUBSD
 
## Subtract Scalar Double-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F 5C /r|SUBSD xmm1, xmm2/m64|Subtract the low double-precision floating-point value in xmm2/mem64 from xmm1.|
 
## Description
 
Subtracts the low double-precision floating-point value in the source operand (second operand) from the low double-precision floating-point value in the destination operand (first operand), and stores the double-precision floating-point result in the destination operand. The source operand can be an XMM register or a 64-bit memory location. The destination operand is an XMM register. The high quadword of the destination operand remains unchanged. See Figure 11-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of a scalar double-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..63] = Destination[0..63] - Source[0..63];
//Destination[64..127] remains unchanged

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SUBSD xmm, xmm|5/4/3|2/2/1|FP_ADD|
