# STMXCSR
 
## Store MXCSR Register State
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F AE /3|STMXCSR m32|Store contents of MXCSR register to m32.|
 
## Description
 
Stores the contents of the MXCSR control and status register to the destination operand. The destination operand is a 32-bit memory location. The reserved bits in the MXCSR register are stored as 0s.
 
 
## Operation
 
```c
m32 = MXCSR;

```
 
