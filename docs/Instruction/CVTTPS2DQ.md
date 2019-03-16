# CVTTPS2DQ
 
## Convert with Truncation Packed Single-Precision Floating-Point Values to Packed Doubleword Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 5B /r|CVTTPS2DQ xmm1, xmm2/m128|Convert four single-precision floating-point values from xmm2/m128 to four signed doubleword integers in xmm1 using truncation.|
 
## Description
 
Converts four packed single-precision floating-point values in the source operand (second operand) to four packed signed doubleword integers in the destination operand (first operand). The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. When a conversion is inexact, a truncated (round toward zero) result is returned. If a converted result is larger than the maximum signed doubleword integer, the floating-point invalid exception is raised, and if this exception is masked, the indefinite integer value (80000000H) is returned.
 
 
## Operation
 
```c
Destination[0..31] = ConvertFloatToIntegerTruncate(Source[0..31]);
Destination[32..63] = ConvertFloatToIntegerTruncate(Source[32..63]);
Destination[64..95] = ConvertFloatToIntegerTruncate(Source[64..95]);
Destination[96..127] = ConvertFloatToIntegerTruncate(Source[96..127]);

```
 
 
## SIMD Floating-Point Exceptions
 
Invalid, Precision.
 
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
|CVTTPS2DQ xmm, xmm|5/5/3+1|2/2/2|FP_ADD|
