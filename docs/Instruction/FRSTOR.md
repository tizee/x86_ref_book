# FRSTOR
 
## Restore x87 FPU State
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DD /4|FRSTOR m94/108byte|Load FPU state from m94byte or m108byte.|
 
## Description
 
Loads the FPU state (operating environment and register stack) from the memory area specified with the source operand. This state data is typically written to the specified memory location by a previous FSAVE/FNSAVE instruction.
 
The FPU operating environment consists of the FPU control word, status word, tag word, instruction pointer, data pointer, and last opcode. Figures 8-9 through 8-12 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, show the layout in memory of the stored environment, depending on the operating mode of the processor (protected or real) and the current operand-size attribute (16-bit or 32-bit). In virtual-8086 mode, the real mode layouts are used. The contents of the FPU register stack are stored in the 80 bytes immediately following the operating environment image.
 
The FRSTOR instruction should be executed in the same operating mode as the corresponding FSAVE/FNSAVE instruction.
 
If one or more unmasked exception bits are set in the new FPU status word, a floating-point exception will be generated. To avoid raising exceptions when loading a new operating environment, clear all the exception flags in the FPU status word that is being loaded.
 
 
## Operation
 
```c
FPUControlWord = Source.FPUControlWord;
FPUStatusWord = Source.FPUStatusWord.;
FPUTagWord = Source.FPUTagWord.;
FPUDataPointer = Source.FPUDataPointer;
FPUInstructionPointer = Source.FPUInstructionPointer;
FPULastInstructionOpcode = Source.FPULastInstructionOpcode.;
ST(0) = Source.ST(0);
ST(1) = Source.ST(1);
ST(2) = Source.ST(2);
ST(3) = Source.ST(3);
ST(4) = Source.ST(4);
ST(5) = Source.ST(5);
ST(6) = Source.ST(6);
ST(7) = Source.ST(7);

```
 
 
## FPU flags affected
 
The C0, C1, C2, C3 flags are loaded.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|None;|however, this operation might unmask an existing exception that has been detected but not generated, because it was masked. Here, the exception is generated at the completion of the instruction.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
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
