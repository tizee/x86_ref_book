# MOVHLPS
 
##  Move Packed Single-Precision Floating-Point Values High to Low
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 12 /r|MOVHLPS xmm1, xmm2|Move two packed single-precision floating-point values from high quadword of xmm2 to low quadword of xmm1.|
 
## Description
 
Moves two packed single-precision floating-point values from the high quadword of the source operand (second operand) to the low quadword of the destination operand (first operand). The high quadword of the destination operand is left unchanged.
 
 
## Operation
 
```c
Destination[0..63] = Source[64..127];
//Destination[64..127] unchanged

```
 
 
## SIMD Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#NM|If TS in CR0 is set.|
|#NM|If TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
Same exceptions as in Protected Mode.
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Protected Mode.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|MOVHLPS xmm, xmm|6/6|2/2|MMX_SHFT|
