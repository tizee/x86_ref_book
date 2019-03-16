# MOVLPS
 
## Move Low Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 12 /r|MOVLPS xmm, m64|Move two packed single-precision floating-point values from m64 to low quadword of xmm.|
|0F 13 /r|MOVLPS m64, xmm|Move two packed single-precision floating-point values from low quadword of xmm to m64.|
 
## Description
 
Moves two packed single-precision floating-point values from the source operand (second operand) and the destination operand (first operand). The source and destination operands can be an XMM register or a 64-bit memory location. This instruction allows two single-precision floating-point values to be moved to and from the low quadword of an XMM register and memory. It cannot be used for register to register or memory to memory moves. When the destination operand is an XMM register, the high quadword of the register remains unchanged.
 
 
## Operation
 
```c
//MOVLPS instruction for memory to XMM move:
if(IsXMM(Destination)) Destination[0..63] = Source;
//Destination[64..127] unchanged
//MOVLPS instruction for XMM to memory move:
else Destination = Source[0..63];

```
 
 
## SIMD Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS in CR0 is set.|
|#UD|If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE is 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
