# CLTS
 
## Clear Task-Switched Flag in CR0
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 06|CLTS|Clears TS flag in CR0.|
 
## Description
 
Clears the task-switched (TS) flag in the CR0 register. This instruction is intended for use in operating-system procedures. It is a privileged instruction that can only be executed at a CPL of 0. It is allowed to be executed in real-address mode to allow initialization for protected mode.
 
The processor sets the TS flag every time a task switch occurs. The flag is used to synchronize the saving of FPU context in multitasking applications. See the description of the TS flag in the section titled "Control Registers" in Chapter 2 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for more information about this flag.
 
 
## Operation
 
```c
CR0.TS = 0;

```
 
 
## Flags affected
 
The TS flag in CR0 register is cleared.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the current privilege level is not 0.|
 
## Real-Address Mode Exceptions
 
None.
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|CLTS is not recognized in virtual-8086 mode.|
