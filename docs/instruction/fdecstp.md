# FDECSTP
 
## Decrement Stack-Top Pointer
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F6|FDECSTP|Decrement TOP field in FPU status word.|
 
## Description
 
Subtracts one from the TOP field of the FPU status word (decrements the top-of-stack pointer).
 
If the TOP field contains a 0, it is set to 7. The effect of this instruction is to rotate the stack by one position. The contents of the FPU data registers and tag register are not affected.
 
 
## Operation
 
```c
if(Top == 0) Top = 7;
else Top = Top - 1;

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
