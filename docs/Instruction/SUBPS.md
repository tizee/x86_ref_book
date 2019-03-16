# SUBPS
 
## Subtract Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 5C /r|SUBPS xmm1 xmm2/m128|Subtract packed single-precision floating-point values in xmm2/mem from xmm1.|
 
## Description
 
Performs an SIMD subtract of the four packed single-precision floating-point values in the source operand (second operand) from the four packed single-precision floating-point values in the destination operand (first operand), and stores the packed single-precision floating-point results in the destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. See Figure 10-5 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD double-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..31] = Destination[0..31] - Source[0..31];
Destination[32..63] = Destination[32..63] - Source[32..63];
Destination[64..95] = Destination[64..95] - Source[64..95];
Destination[96..127] = Destination[96..127] - Source[96..127];

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SUBPS xmm, xmm|5/4/4|2/2/2|FP_ADD|
