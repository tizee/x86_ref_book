# FLDENV
 
## Load x87 FPU Environment
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 /4|FLDENV m14/28byte|Load FPU environment from m14byte or m28byte.|
 
## Description
 
Loads the complete x87 FPU operating environment from memory into the FPU registers. The source operand specifies the first byte of the operating-environment data in memory. This data is typically written to the specified memory location by a FSTENV or FNSTENV instruction.
 
The FPU operating environment consists of the FPU control word, status word, tag word, instruction pointer, data pointer, and last opcode. Figures 8-9 through 8-12 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, show the layout in memory of the loaded environment, depending on the operating mode of the processor (protected or real) and the current operand-size attribute (16-bit or 32-bit). In virtual-8086 mode, the real mode layouts are used.
 
The FLDENV instruction should be executed in the same operating mode as the corresponding FSTENV/FNSTENV instruction.
 
If one or more unmasked exception flags are set in the new FPU status word, a floating-point exception will be generated upon execution of the next floating-point instruction (except for the no-wait floating-point instructions, see the section titled "Software Exception Handling" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1). To avoid generating exceptions when loading a new environment, clear all the exception flags in the FPU status word that is being loaded.
 
If a page or limit fault occurs during the execution of this instruction, the state of the x87 FPU registers as seen by the fault handler may be different than the state being loaded from memory.
 
In such situations, the fault handler should ignore the status of the x87 FPU registers, handle the fault, and return. The FLDENV instruction will then complete the loading of the x87 FPU registers with no resulting context inconsistency.
 
 
## Operation
 
```c
FPUControlWord = Source.FPUControlWord;
FPUStatusWord = Source.FPUStatusWord;
FPUTagWord = Source.FPUTagWord;
FPUDataPointer = Source.FPUDataPointer;
FPUInstructionPointer = Source.FPUInstructionPointer;
FPULastInstructionOpcode = Source.FPULastInstructionOpcode;

```
 
 
## FPU flags affected
 
The C0, C1, C2, C3 flags are loaded.

 
 
## Floating-Point Exceptions
 
None; however, if an unmasked exception is loaded in the status word, it is generated upon execution of the next "waiting" floating-point instruction.
 
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
