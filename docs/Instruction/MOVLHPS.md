# MOVLHPS
 
## Move Packed Single-Precision Floating-Point Values Low to High
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 16 /r|MOVLHPS xmm1, xmm2|Move two packed single-precision floating-point values from low quadword of xmm2 to high quadword of xmm1.|
 
## Description
 
Moves two packed single-precision floating-point values from the low quadword of the source operand (second operand) to the high quadword of the destination operand (first operand). The low quadword of the destination operand is left unchanged.
 
 
## Operation
 
```c
Destination[64..127] = Source[0..63];
//Destination[0..63] unchanged

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
|MOVLHPS xmm, xmm|4/4|2/2|MMX_SHFT|
