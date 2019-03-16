# CLD
 
## Clear Direction Flag
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|FC|CLD|Clear DF flag.|
 
## Description
 
Clears the DF flag in the EFLAGS register. When the DF flag is set to 0, string operations increment the index registers (ESI and/or EDI).
 
 
## Operation
 
```c
DF = 0;

```
 
 
## Flags affected
 
The DF flag is set to 0. The CF, OF, ZF, SF, AF, and PF flags are unaffected.

 
 
## Exceptions
 
None.
