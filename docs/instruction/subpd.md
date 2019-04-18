# SUBPD
 
## Subtract Packed Double-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 5C /r|SUBPD xmm1, xmm2/m128 Subtract packed double-precision floating-point values in xmm2/m128 from xmm1.||
 
## Description
 
Performs an SIMD subtract of the two packed double-precision floating-point values in the source operand (second operand) from the two packed double-precision floating-point values in the destination operand (first operand), and stores the packed double-precision floating-point results in the destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. See Figure 11-3 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD double-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..63] = Destination[0..63] - Source[0..63];
Destination[64..127] = Destination[64..127] - Source[64..127];

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SUBPD xmm, xmm|5/4/4|2/2/2|FP_ADD|
