# CVTPI2PD
 
## Convert Packed Doubleword Integers to Packed Double-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 2A /r|CVTPI2PD xmm, mm/m64|Convert two packed signed doubleword integers from mm/mem64 to two packed double-precision floating-point values in xmm.|
 
## Description
 
Converts two packed signed doubleword integers in the source operand (second operand) to two packed double-precision floating-point values in the destination operand (first operand). The source operand can be an MMX technology register or a 64-bit memory location. The destination operand is an XMM register.
 
This instruction causes a transition from x87 FPU to MMX technology operation (that is, the x87 FPU top-of-stack pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]). If this instruction is executed while an x87 FPU floating-point exception is pending, the exception is handled before the CVTPI2PD instruction is executed.
 
 
## Operation
 
```c
Destination[0..63] = ConvertIntegerToDouble(Source[0..31]);
Destination[64..127] = ConvertIntegerToDouble(Source[32..63]);

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
|#MF|If there is a pending x87 FPU exception.|
|#UD|If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE2 is 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
|#MF|If there is a pending x87 FPU exception.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|CVTPI2PD xmm, mm|12/11/4+1|2/4/4|FP_ADD MMX_SHFT MMX_ALU|
