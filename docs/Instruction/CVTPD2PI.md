# CVTPD2PI
 
## Convert Packed Double-Precision Floating-Point Values to Packed Doubleword Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 2D /r|CVTPD2PI mm, xmm/m128|Convert two packed double-precision floating-point values from xmm/m128 to two packed signed doubleword integers in mm.|
 
## Description
 
Converts two packed double-precision floating-point values in the source operand (second operand) to two packed signed doubleword integers in the destination operand (first operand).
 
The source operand can be an XMM register or a 128-bit memory location. The destination operand is an MMX technology register.
 
When a conversion is inexact, the value returned is rounded according to the rounding control bits in the MXCSR register. If a converted result is larger than the maximum signed doubleword integer, the floating-point invalid exception is raised, and if this exception is masked, the indefinite integer value (80000000H) is returned.
 
This instruction causes a transition from x87 FPU to MMX technology operation (that is, the x87 FPU top-of-stack pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]). If this instruction is executed while an x87 FPU floating-point exception is pending, the exception is handled before the CVTPD2PI instruction is executed.
 
 
## Operation
 
```c
Destination[0..31] = ConvertDoubleToInteger(Source[0..63]);
Destination[32..63] = ConvertDoubleToInteger(Source[64..127]);

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
|#MF|If there is a pending x87 FPU exception.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
|#MF|If there is a pending x87 FPU exception.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|CVTPD2PI mm, xmm|12/11/5|3/3/3|FP_ADD MMX_SHFT MMX_ALU|
