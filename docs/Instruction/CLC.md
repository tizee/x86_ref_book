# CLC
 
## Clear Carry Flag
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F8|CLC|Clear CF flag.|
 
## Description
 
Clears the CF flag in the EFLAGS register.
 
 
## Operation
 
```c
CF = 0;

```
 
 
## Flags affected
 
The CF flag is set to 0. The OF, ZF, SF, AF, and PF flags are unaffected.

 
 
## Exceptions
 
None.
