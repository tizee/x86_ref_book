# SLDT
 
## Store Local Descriptor Table Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 00 /0|SLDT r/m16|Store segment selector from LDTR in r/m16.|
 
## Description
 
Stores the segment selector from the local descriptor table register (LDTR) in the destination operand. The destination operand can be a general-purpose register or a memory location. The segment selector stored with this instruction points to the segment descriptor (located in the GDT) for the current LDT. This instruction can only be executed in protected mode.
 
When the destination operand is a 32-bit register, the 16-bit segment selector is copied into the lower-order 16 bits of the register. The high-order 16 bits of the register are cleared for the Pentium 4, Intel Xeon, and P6 family processors and are undefined for Pentium, Intel486, and Intel386 processors. When the destination operand is a memory location, the segment selector is written to memory as a 16-bit quantity, regardless of the operand size.
 
The SLDT instruction is only useful in operating-system software; however, it can be used in application programs.
 
 
## Operation
 
```c
Destination = LDTR.SegmentSelector;

```
 
 
## Flags affected
 
None.

 
