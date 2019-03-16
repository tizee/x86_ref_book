# FNOP
 
## No operation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 D0|FNOP|No operation is performed.|
 
## Description
 
Performs no FPU operation. This instruction takes up space in the instruction stream but does not affect the FPU or machine context, except the EIP register.
 
 
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
