# FFREE
 
## Free Floating-Point Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DD C0+i|FFREE|ST(i) Sets tag for ST(i) to empty.|
 
## Description
 
Sets the tag in the FPU tag register associated with register ST(i) to empty (11B). The contents of ST(i) and the FPU stack-top pointer (TOP) are not affected.
 
 
## Operation
 
```c
Tag(i) = 3; //11B

```
 
 
## FPU flags affected
 
C0, C1, C2, C3 undefined.

 
 
## Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
