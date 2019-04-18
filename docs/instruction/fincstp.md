# FINCSTP
 
## Increment Stack-Top Pointer
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F7|FINCSTP|Increment the TOP field in the FPU status register.|
 
## Description
 
Adds one to the TOP field of the FPU status word (increments the top-of-stack pointer). If the TOP field contains a 7, it is set to 0. The effect of this instruction is to rotate the stack by one position. The contents of the FPU data registers and tag register are not affected. This operation is not equivalent to popping the stack, because the tag for the previous top-of-stack register is not marked empty.
 
 
## Operation
 
```c
if(Top == 7) Top = 0;
else Top = Top + 1;

```
 
 
## FPU flags affected
 
The C1 flag is set to 0. The C0, C2, and C3 flags are undefined.

 
 
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
