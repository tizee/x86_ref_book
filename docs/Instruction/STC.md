# STC
 
## Set Carry Flag
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F9|STC|Set CF flag.|
 
## Description
 
Sets the CF flag in the EFLAGS register.
 
 
## Operation
 
```c
CF = 1;

```
 
 
## Flags affected
 
The CF flag is set. The OF, ZF, SF, AF, and PF flags are unaffected.

 
