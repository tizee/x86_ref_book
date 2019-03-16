# FSAVE/FNSAVE
 
## Store x87 FPU State
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9B DD /6|FSAVE m94/108byte|Store FPU state to m94byte or m108byte after checking for pending unmasked floating-point exceptions. Then reinitialize the FPU.|
|DD /6|FNSAVE m94/108byte|Store FPU environment to m94byte or m108byte without checking for pending unmasked floating-point exceptions. Then re-initialize the FPU. See the IA-32 Architecture Compatibility section below.|
 
## Description
 
Stores the current FPU state (operating environment and register stack) at the specified destination in memory, and then re-initializes the FPU. The FSAVE instruction checks for and handles pending unmasked floating-point exceptions before storing the FPU state; the FNSAVE instruction does not.
 
The FPU operating environment consists of the FPU control word, status word, tag word, instruction pointer, data pointer, and last opcode. Figures 8-9 through 8-12 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, show the layout in memory of the stored environment, depending on the operating mode of the processor (protected or real) and the current operand-size attribute (16-bit or 32-bit). In virtual-8086 mode, the real mode layouts are used. The contents of the FPU register stack are stored in the 80 bytes immediately follow the operating environment image.
 
The saved image reflects the state of the FPU after all floating-point instructions preceding the FSAVE/FNSAVE instruction in the instruction stream have been executed.
 
After the FPU state has been saved, the FPU is reset to the same default values it is set to with the FINIT/FNINIT instructions (see "FINIT/FNINIT-Initialize Floating-Point Unit" in this chapter).
 
The FSAVE/FNSAVE instructions are typically used when the operating system needs to perform a context switch, an exception handler needs to use the FPU, or an application program needs to pass a "clean" FPU to a procedure.
 
The assembler issues two instructions for the FSAVE instruction (an FWAIT instruction followed by an FNSAVE instruction), and the processor executes each of these instructions separately. If an exception is generated for either of these instructions, the save EIP points to the instruction that caused the exception.
 
 
## Operation
 
```c
//Save FPU State and Registers
Destination.FPUControlWord = FPUControlWord;
Destination.FPUStatusWord = FPUStatusWord;
Destination.FPUTagWord = FPUTagWord;
Destination.FPUDataPointer = FPUDataPointer;
Destination.FPUInstructionPointer = FPUInstructionPointer;
Destination.FPULastInstructionOpcode = FPULastInstructionOpcode;
Destination.ST(0) = ST(0);
Destination.ST(1) = ST(1);
Destination.ST(2) = ST(2);
Destination.ST(3) = ST(3);
Destination.ST(4) = ST(4);
Destination.ST(5) = ST(5);
Destination.ST(6) = ST(6);
Destination.ST(7) = ST(7);
//Initialize FPU
FPUControlWord = 0x37F;
FPUStatusWord = 0;
FPUTagWord = 0xFFFF;
FPUDataPointer = 0;
FPUInstructionPointer = 0;
FPULastInstructionOpcode = 0;

```
 
 
## FPU flags affected
 
The C0, C1, C2, and C3 flags are saved and then cleared.

 
 
## IA-32 Architecture Compatibility
 
For Intel math coprocessors and FPUs prior to the Intel Pentium processor, an FWAIT instruction should be executed before attempting to read from the memory image stored with a prior FSAVE/FNSAVE instruction. This FWAIT instruction helps insure that the storage operation has been completed.
When operating a Pentium or Intel486 processor in MS-DOS compatibility mode, it is possible (under unusual circumstances) for an FNSAVE instruction to be interrupted prior to being executed to handle a pending FPU exception. See the section titled "No-Wait FPU Instructions Can Get FPU Interrupt in Window" in Appendix D of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a description of these circumstances. An FNSAVE instruction cannot be interrupted in this way on a Pentium 4, Intel Xeon, or P6 family processor.

 
 
## Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|EM or TS in CR0 is set.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS|If a memory operand effective address is outside the SS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|EM or TS in CR0 is set.|
|#PF(fault-code)|If a page fault occurs.|
