# INC
 
## Increment by 1
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|FE /0|INC r/m8|Increment r/m byte by 1.|
|FF /0|INC r/m16|Increment r/m word by 1.|
|FF /0|INC r/m32|Increment r/m doubleword by 1.|
|40+ rw|INC r16|Increment word register by 1.|
|40+ rd|INC r32|Increment doubleword register by 1.|
 
## Description
 
Adds 1 to the destination operand, while preserving the state of the CF flag. The destination operand can be a register or a memory location. This instruction allows a loop counter to be updated without disturbing the CF flag. (Use a ADD instruction with an immediate operand of 1 to perform an increment operation that does updates the CF flag.) This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination + 1;

```
 
 
## Flags affected
 
The CF flag is not affected. The OF, SF, ZF, AF, and PF flags are set according to the result.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the destination operand is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If the destination operand is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|INC|1/1|0.5/0.5|ALU|
