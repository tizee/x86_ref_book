# FINIT/FNINIT
 
## Initialize Floating-Point Unit
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9B DB E3|FINIT|Initialize FPU after checking for pending unmasked floating-point exceptions.|
|DB E3|FNINIT|Initialize FPU without checking for pending unmasked floating-point exceptions. See the IA-32 Architecture Compatibility section below.|
 
## Description
 
Sets the FPU control, status, tag, instruction pointer, and data pointer registers to their default states. The FPU control word is set to 037FH (round to nearest, all exceptions masked, 64-bit precision). The status word is cleared (no exception flags set, TOP is set to 0). The data registers in the register stack are left unchanged, but they are all tagged as empty (11B). Both the instruction and data pointers are cleared.
 
The FINIT instruction checks for and handles any pending unmasked floating-point exceptions before performing the initialization; the FNINIT instruction does not.
 
The assembler issues two instructions for the FINIT instruction (an FWAIT instruction followed by an FNINIT instruction), and the processor executes each of these instructions in separately.
 
If an exception is generated for either of these instructions, the save EIP points to the instruction that caused the exception.
 
 
## Operation
 
```c
FPUControlWord = 0x37F;
FPUStatusWord = 0;
FPUTagWord = 0xFFFF;
FPUDataPointer = 0;
FPUInstructionPointer = 0;
FPULastInstructionOpcode = 0;

```
 
 
## FPU flags affected
 
C0, C1, C2, C3 set to 0.

 
 
## IA-32 Architecture Compatibility
 
When operating a Pentium or Intel486 processor in MS-DOS compatibility mode, it is possible (under unusual circumstances) for an FNINIT instruction to be interrupted prior to being executed to handle a pending FPU exception. See the section titled "No-Wait FPU Instructions Can Get FPU Interrupt in Window" in Appendix D of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a description of these circumstances. An FNINIT instruction cannot be interrupted in this way on a Pentium 4, Intel Xeon, or P6 family processor.
In the Intel387 math coprocessor, the FINIT/FNINIT instruction does not clear the instruction and data pointers.
This instruction affects only the x87 FPU. It does not affect the XMM and MXCSR registers.

 
 
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
