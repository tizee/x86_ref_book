# STD
 
## Set Direction Flag
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|FD|STD|Set DF flag.|
 
## Description
 
Sets the DF flag in the EFLAGS register. When the DF flag is set to 1, string operations decrement the index registers (ESI and/or EDI).
 
 
## Operation
 
```c
DF = 1;

```
 
 
## Flags affected
 
The DF flag is set. The CF, OF, ZF, SF, AF, and PF flags are unaffected.

 
