# SMSW
 
## Store Machine Status Word
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 01 /4|SMSW r/m16|Store machine status word to r/m16.|
|0F 01 /4|SMSW r32/m16|Store machine status word in low-order 16 bits of r32/m16; high-order 16 bits of r32 are undefined.|
 
## Description
 
Stores the machine status word (bits 0 through 15 of control register CR0) into the destination operand. The destination operand can be a 16-bit general-purpose register or a memory location.
 
When the destination operand is a 32-bit register, the low-order 16 bits of register CR0 are copied into the low-order 16 bits of the register and the upper 16 bits of the register are undefined.
 
When the destination operand is a memory location, the low-order 16 bits of register CR0 are written to memory as a 16-bit quantity, regardless of the operand size.
 
The SMSW instruction is only useful in operating-system software; however, it is not a privileged instruction and can be used in application programs.
 
This instruction is provided for compatibility with the Intel 286 processor. Programs and procedures intended to run on the Pentium 4, Intel Xeon, P6 family, Pentium, Intel486, and Intel386 processors should use the MOV (control registers) instruction to load the machine status word.
 
 
## Operation
 
```c
Destination = CR0[0..15]; //Machine status word

```
 
 
## Flags affected
 
None.

 
