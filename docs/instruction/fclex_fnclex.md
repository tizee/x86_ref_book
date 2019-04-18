# FCLEX/FNCLEX
 
## Clear Exceptions
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9B DB E2|FCLEX|Clear floating-point exception flags after checking for pending unmasked floating-point exceptions.|
|DB E2|FNCLEX*|Clear floating-point exception flags without checking for pending unmasked floating-point exceptions. See the IA-32 Architecture Compatibility section below.|
 
## Description
 
Clears the floating-point exception flags (PE, UE, OE, ZE, DE, and IE), the exception summary status flag (ES), the stack fault flag (SF), and the busy flag (B) in the FPU status word. The FCLEX instruction checks for and handles any pending unmasked floating-point exceptions before clearing the exception flags; the FNCLEX instruction does not.
 
The assembler issues two instructions for the FCLEX instruction (an FWAIT instruction followed by an FNCLEX instruction), and the processor executes each of these instructions separately. If an exception is generated for either of these instructions, the save EIP points to the instruction that caused the exception.
 
 
## Operation
 
```c
FPUStatusWord[0..7] = 0;
FPUStatusWord[15] = 0;

```
 
 
## FPU flags affected
 
The PE, UE, OE, ZE, DE, IE, ES, SF, and B flags in the FPU status word are cleared. The C0,
C1, C2, and C3 flags are undefined.

 
 
## IA-32 Architecture Compatibility
 
When operating a Pentium or Intel486 processor in MS-DOS* compatibility mode, it is possible (under unusual circumstances) for an FNCLEX instruction to be interrupted prior to being executed to handle a pending FPU exception. See the section titled "No-Wait FPU Instructions Can Get FPU Interrupt in Window" in Appendix D of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a description of these circumstances. An FNCLEX instruction cannot be interrupted in this way on a Pentium 4, Intel Xeon, or P6 family processor.
This instruction affects only the x87 FPU floating-point exception flags. It does not affect the SIMD floating-point exception flags in the MXCRS register.

 
 
## Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
