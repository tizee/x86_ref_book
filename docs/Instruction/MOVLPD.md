# MOVLPD
 
## Move Low Packed Double-Precision Floating-Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 12 /r|MOVLPD xmm, m64|Move double-precision floating-point value from m64 to low quadword of xmm register.|
|66 0F 13 /r|MOVLPD m64, xmm|Move double-precision floating-point nvalue from low quadword of xmm register to m64.|
 
## Description
 
Moves a double-precision floating-point value from the source operand (second operand) to the destination operand (first operand). The source and destination operands can be an XMM register or a 64-bit memory location. This instruction allows a double-precision floating-point value to be moved to and from the low quadword of an XMM register and memory. It cannot be used for register to register or memory to memory moves. When the destination operand is an XMM register, the high quadword of the register remains unchanged.
 
 
## Operation
 
```c
//MOVLPD instruction for memory to XMM move:
if(IsXMM(Destination)) Destination[0..63] = Source;
//Destination[64..127] unchanged
//MOVLPD instruction for XMM to memory move:
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
|#UD|If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE2 is 0.|
 
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
