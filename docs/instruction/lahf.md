# LAHF
 
## Load Status Flags into AH Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9F|LAHF|Load: AH = EFLAGS(SF:ZF:0:AF:0:PF:1:CF).|
 
## Description
 
Moves the low byte of the EFLAGS register (which includes status flags SF, ZF, AF, PF, and CF) to the AH register. Reserved bits 1, 3, and 5 of the EFLAGS register are set in the AH register as shown in the "Operation" section below.
 
 
## Operation
 
```c
AH = EFLAGS(SF:ZF:0:AF:0:PF:1:CF);

```
 
 
## Flags affected
 
None (that is, the state of the flags in the EFLAGS register is not affected).

 
 
## Exceptions
 
None.
