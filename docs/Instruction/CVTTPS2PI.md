# CVTTPS2PI
 
## Convert with Truncation Packed Single-Precision Floating-Point Values to Packed Doubleword Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 2C /r|CVTTPS2PI mm, xmm/m64|Convert two single-precision floating-point values from xmm/m64 to two signed doubleword signed integers in mm using truncation.|
 
## Description
 
Converts two packed single-precision floating-point values in the source operand (second operand) to two packed signed doubleword integers in the destination operand (first operand).
 
The source operand can be an XMM register or a 64-bit memory location. The destination operand is an MMX technology register. When the source operand is an XMM register, the two single-precision floating-point values are contained in the low quadword of the register.
 
When a conversion is inexact, a truncated (round toward zero) result is returned. If a converted result is larger than the maximum signed doubleword integer, the floating-point invalid exception is raised, and if this exception is masked, the indefinite integer value (80000000H) is returned.
 
This instruction causes a transition from x87 FPU to MMX technology operation (that is, the x87 FPU top-of-stack pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]). If this instruction is executed while an x87 FPU floating-point exception is pending, the exception is handled before the CVTTPS2PI instruction is executed.
 
 
## Operation
 
```c
Destination[0..31] = ConvertFloatToIntegerTruncate(Source[0..31]);
Destination[32..63] = ConvertFloatToIntegerTruncate(Source[32..63]);

```
 
 
## SIMD Floating-Point Exceptions
 
Invalid, Precision.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#MF|If there is a pending x87 FPU exception.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
|#UD|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 0. If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE is 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
|#MF|If there is a pending x87 FPU exception.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|CVTTPS2PI mm, xmm|8/7/3|2/2/1|FP_ADD MMX_ALU|
