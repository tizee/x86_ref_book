# CMC
 
## Complement Carry Flag
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F5|CMC|Complement CF flag.|
 
## Description
 
Complements the CF flag in the EFLAGS register.
 
 
## Operation
 
```c
CF = ~CF;

```
 
 
## Flags affected
 
The CF flag contains the complement of its original value. The OF, ZF, SF, AF, and PF flags are unaffected.

 
 
## Exceptions
 
None.
