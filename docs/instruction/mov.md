# MOV
 
## Move to/from Debug Registers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 21/r|MOV r32, DR0-DR7|Move debug register to r32.|
|0F 23 /r|MOV DR0-DR7,r32|Move r32 to debug register.|
 
## Description
 
Moves the contents of a debug register (DR0, DR1, DR2, DR3, DR4, DR5, DR6, or DR7) to a general-purpose register or vice versa. The operand size for these instructions is always 32 bits, regardless of the operand-size attribute. (See Chapter 15, Debugging and Performance Monitoring, of the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for a detailed description of the flags and fields in the debug registers.) The instructions must be executed at privilege level 0 or in real-address mode.
 
When the debug extension (DE) flag in register CR4 is clear, these instructions operate on debug registers in a manner that is compatible with Intel386 and Intel486 processors. In this mode, references to DR4 and DR5 refer to DR6 and DR7, respectively. When the DE flag in CR4 is set, attempts to reference DR4 and DR5 result in an undefined opcode (#UD) exception. (The CR4 register was added to the IA-32 Architecture beginning with the Pentium processor.) At the opcode level, the reg field within the ModR/M byte specifies which of the debug registers is loaded or read. The two bits in the mod field are always 11. The r/m field specifies the generalpurpose register loaded or read.
 
 
## Operation
 
```c
if(DE == 1 && Source == DR4 || Source == DR5 || Destination == DR4 || Destination == DR5) Exception(UD);
else Destination = Source;

```
 
 
## Flags affected
 
The OF, SF, ZF, AF, PF, and CF flags are undefined.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the current privilege level is not 0.|
|#GP(0)|If the current privilege level is not 0.|
|#UD|If the DE (debug extensions) bit of CR4 is set and a MOV instruction is executed involving DR4 or DR5.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|If the DE (debug extensions) bit of CR4 is set and a MOV instruction is executed involving DR4 or DR5.|
|#UD|If the DE (debug extensions) bit of CR4 is set and a MOV instruction is executed involving DR4 or DR5.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|The debug registers cannot be loaded or read when in virtual-8086 mode.|
