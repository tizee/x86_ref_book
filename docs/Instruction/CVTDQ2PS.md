# CVTDQ2PS
 
## Convert Packed Doubleword Integers to Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 5B /r|CVTDQ2PS xmm1, xmm2/m128|Convert four packed signed doubleword integers from xmm2/m128 to four packed single-precision floating-point values in xmm1.|
 
## Description
 
Converts four packed signed doubleword integers in the source operand (second operand) to four packed single-precision floating-point values in the destination operand (first operand). The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. When a conversion is inexact, rounding is performed according to the rounding control bits in the MXCSR register.
 
 
## Operation
 
```c
Destination[0..31] = ConvertIntegerToFloat(Source[0..31]);
Destination[32..63] = ConvertIntegerToFloat(Source[32..63]);
Destination[64..95] = ConvertIntegerToFloat(Source[64..95]);
Destination[96..127] = ConvertIntegerToFloat(Source[96..127]);

```
 
 
## SIMD Floating-Point Exceptions
 
Precision.
 
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
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|CVTDQ2PS xmm, xmm|5/5|2/2|FP_ADD|
