# PSLLDQ
 
## Shift Double Quadword Left Logical
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 73 /7 ib|PSLLDQ xmm1, imm8|Shift xmm1 left by imm8 bytes while shifting in 0s.|
 
## Description
 
Shifts the destination operand (first operand) to the left by the number of bytes specified in the count operand (second operand). The empty low-order bytes are cleared (set to all 0s). If the value specified by the count operand is greater than 15, the destination operand is set to all 0s.
 
The destination operand is an XMM register. The count operand is an 8-bit immediate.
 
 
## Operation
 
```c
Temporary = Count;
if(Temporary > 15) Temporary = 16;
Destination = Destination << (Temporary * 8);

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSLLDQ xmm, imm8|4/4/4|2/2/4|MMX_SHFT|
