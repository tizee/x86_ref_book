# MOVSD
 
## Move Scalar Double-Precision Floating-Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F 10 /r|MOVSD xmm1, xmm2/m64|Move scalar double-precision floating-point value from xmm2/m64 to xmm1 register.|
|F2 0F 11 /r|MOVSD xmm2/m64, xmm|Move scalar double-precision floating-point value from xmm1 register to xmm2/m64.|
 
## Description
 
Moves a scalar double-precision floating-point value from the source operand (second operand) to the destination operand (first operand). The source and destination operands can be XMM registers or 64-bit memory locations. This instruction can be used to move a double-precision floating-point value to and from the low quadword of an XMM register and a 64-bit memory location, or to move a double-precision floating-point value between the low quadwords of two XMM registers. The instruction cannot be used to transfer data between memory locations.
 
When the source and destination operands are XMM registers, the high quadword of the destination operand remains unchanged. When the source operand is a memory location and destination operand is an XMM registers, the high quadword of the destination operand is cleared to all 0s.
 
 
## Operation
 
```c
//MOVSD instruction when source and destination operands are XMM registers:
if(IsXMM(Source) && IsXMM(Destination)) Destination[0..63] = Source[0..63];
//Destination[64..127] remains unchanged
//MOVSD instruction when source operand is XMM register and destination operand is memory location:
else if(IsXMM(Source) && IsMemory(Destination)) Destination = Source[0..63];
//MOVSD instruction when source operand is memory location and destination operand is XMM register:
else {
	Destination[0..63] = Source;
	Destination[64..127] = 0;
}

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
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|MOVSD xmm, xmm|6/6|2/2|MMX_SHFT|
