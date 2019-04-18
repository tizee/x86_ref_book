# WAIT/FWAIT
 
## Wait
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9B|WAIT|Check pending unmasked floating-point exceptions.|
|9B|FWAIT|Check pending unmasked floating-point exceptions.|
 
## Description
 
Causes the processor to check for and handle pending, unmasked, floating-point exceptions before proceeding. (FWAIT is an alternate mnemonic for WAIT.) This instruction is useful for synchronizing exceptions in critical sections of code. Coding a WAIT instruction after a floating-point instruction insures that any unmasked floating-point exceptions the instruction may raise are handled before the processor can modify the instruction's results. See the section titled "Floating-Point Exception Synchronization" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for more information on using the WAIT/FWAIT instruction.
 
 
## Operation
 
```c
CheckForPendingUnmaskedFloatingPointExceptions();

```
 
 
## FPU flags affected
 
The C0, C1, C2, and C3 flags are undefined.

 
