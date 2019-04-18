# EMMS
 
## Empty MMX Technology State
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 77|EMMS|Set the x87 FPU tag word to empty.|
 
## Description
 
Sets the values of all the tags in the x87 FPU tag word to empty (all 1s). This operation marks the x87 FPU data registers (which are aliased to the MMX technology registers) as available for use by x87 FPU floating-point instructions. (See Figure 8-7 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for the format of the x87 FPU tag word.) All other MMX instructions (other than the EMMS instruction) set all the tags in x87 FPU tag word to valid (all 0s).
 
The EMMS instruction must be used to clear the MMX technology state at the end of all MMX technology procedures or subroutines and before calling other procedures or subroutines that may execute x87 floating-point instructions. If a floating-point instruction loads one of the registers in the x87 FPU data register stack before the x87 FPU tag word has been reset by the EMMS instruction, an x87 floating-point register stack overflow can occur that will result in an x87 floating-point exception or incorrect result.
 
 
## Operation
 
```c
x87FPUTagWord = 0xFFFF;

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#UD|If EM in CR0 is set.|
|#UD|If EM in CR0 is set.|
|#NM|If TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
Same as for protected mode exceptions.
 
## Virtual-8086 Mode Exceptions
 
Same as for protected mode exceptions.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|EMMS|12|12|-|
