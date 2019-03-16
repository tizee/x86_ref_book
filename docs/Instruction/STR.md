# STR
 
## Store Task Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 00 /1|STR r/m16|Stores segment selector from TR in r/m16.|
 
## Description
 
Stores the segment selector from the task register (TR) in the destination operand. The destination operand can be a general-purpose register or a memory location. The segment selector stored with this instruction points to the task state segment (TSS) for the currently running task.
 
When the destination operand is a 32-bit register, the 16-bit segment selector is copied into the lower 16 bits of the register and the upper 16 bits of the register are cleared. When the destination operand is a memory location, the segment selector is written to memory as a 16-bit quantity, regardless of operand size.
 
The STR instruction is useful only in operating-system software. It can only be executed in protected mode.
 
 
## Operation
 
```c
Destination = TR.SegmentSelector;

```
 
 
## Flags affected
 
None.

 
