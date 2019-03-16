# DIVPD
 
## Divide Packed Double-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 5E /r|DIVPD xmm1, xmm2/m128|Divide packed double-precision floating-point values in xmm1 by packed double-precision floating-point values xmm2/m128.|
 
## Description
 
Performs an SIMD divide of the four packed double-precision floating-point values in the destination operand (first operand) by the four packed double-precision floating-point values in the source operand (second operand), and stores the packed double-precision floating-point results in the destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. See Figure 11-3 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD double-precision floating-point operation.
 
 
## Operation
 
```c
Destination[0..63] = Destination[0..63] / Source[0..63];
Destination[64..127] = Destination[64..127] / Source[64..127];

```
 
 
## SIMD Floating-Point Exceptions
 
Overflow, Underflow, Invalid, Divide-by-Zero, Precision, Denormal.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|DIVPD xmm, xmm|70/69/32+31|70/69/62|FP_DIV|
