# CVTSI2SD
 
## Convert Doubleword Integer to Scalar Double- Precision Floating-Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F 2A /r|CVTSI2SD xmm, r/m32|Convert one signed doubleword integer from r/m32 to one double-precision floating-point value in xmm.|
 
## Description
 
Converts a signed doubleword integer in the source operand (second operand) to a double-precision floating-point value in the destination operand (first operand). The source operand can be a general-purpose register or a 32-bit memory location. The destination operand is an XMM register. The result is stored in the low quadword of the destination operand, and the high quadword left unchanged.
 
 
## Operation
 
```c
Destination[0..63] = ConvertIntegerToDouble(Source[0..31]);
//Destination[64..127] remains unchanged

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
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
|#UD|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 0. If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE2 is 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
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
|CVTSI2SD xmm, r32|16/15/4|2/3/1|FP_ADD MMX_SHFT MMX_MISC|
