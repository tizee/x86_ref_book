# LDMXCSR
 
## Load MXCSR Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F AE /2|LDMXCSR m32|Load MXCSR register from m32.|
 
## Description
 
Loads the source operand into the MXCSR control/status register. The source operand is a 32- bit memory location. See "MXCSR Control and Status Register" in Chapter 10, of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a description of the MXCSR register and its contents.
 
The LDMXCSR instruction is typically used in conjunction with the STMXCSR instruction, which stores the contents of the MXCSR register in memory.
 
The default MXCSR value at reset is 1F80H.
 
If a LDMXCSR instruction clears an SIMD floating-point exception mask bit and sets the corresponding exception flag bit, an SIMD floating-point exception will not be immediately generated.
 
The exception will be generated only upon the execution of the next SSE or SSE2 instruction that causes that particular SIMD floating-point exception to be reported.
 
 
## Operation
 
```c
MXCSR = m32;

```
 
 
## Numeric Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS, or GS segments. For an attempt to set reserved bits in MXCSR.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS, or GS segments. For an attempt to set reserved bits in MXCSR.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS in CR0 is set.|
|#UD|If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE is 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to FFFFH. For an attempt to set reserved bits in MXCSR.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to FFFFH. For an attempt to set reserved bits in MXCSR.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode.
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
