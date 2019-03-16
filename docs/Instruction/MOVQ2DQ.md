# MOVQ2DQ
 
## Move Quadword from MMX Technology to XMM Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F D6|MOVQ2DQ xmm, mm|Move quadword from mmx to low quadword of xmm.|
 
## Description
 
Moves the quadword from the source operand (second operand) to the low quadword of the destination operand (first operand). The source operand is an MMX technology register and the destination operand is an XMM register.
 
This instruction causes a transition from x87 FPU to MMX technology operation (that is, the x87 FPU top-of-stack pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]). If this instruction is executed while an x87 FPU floating-point exception is pending, the exception is handled before the MOVQ2DQ instruction is executed.
 
 
## Operation
 
```c
Destination[0..63] = Source[0..63];
Destination[64..127] = 0;

```
 
 
## SIMD Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#NM|If TS in CR0 is set.|
|#NM|If TS in CR0 is set.|
|#UD|If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE2 is 0.|
 
## Real-Address Mode Exceptions
 
Same exceptions as in Protected Mode
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Protected Mode
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|MOVQ2DQ xmm, mm|8/8/1|2/2/1|FP_MOVE MMX_SHFT|
