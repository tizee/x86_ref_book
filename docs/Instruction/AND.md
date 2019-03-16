# AND
 
## Logical AND
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|24 ib|AND AL, imm8|AL AND imm8|
|25 iw|AND AX, imm16|AX AND imm16|
|25 id|AND EAX, imm32|EAX AND imm32|
|80 /4 ib|AND r/m8, imm8|r/m8 AND imm8|
|81 /4 iw|AND r/m16, imm16|r/m16 AND imm16|
|81 /4 id|AND r/m32, imm32|r/m32 AND imm32|
|83 /4 ib|AND r/m16, imm8|r/m16 AND imm8 (sign-extended)|
|83 /4 ib|AND r/m32, imm8|r/m32 AND imm8 (sign-extended)|
|20 /r|AND r/m8, r8|r/m8 AND r8|
|21 /r|AND r/m16, r16|r/m16 AND r16|
|21 /r|AND r/m32, r32|r/m32 AND r32|
|22 /r|AND r8, r/m8|r8 AND r/m8|
|23 /r|AND r16, r/m16|r16 AND r/m16|
|23 /r|AND r32, r/m32|r32 AND r/m32|
 
## Description
 
Performs a bitwise AND operation on the destination (first) and source (second) operands and stores the result in the destination operand location. The source operand can be an immediate, a register, or a memory location; the destination operand can be a register or a memory location.
 
(However, two memory operands cannot be used in one instruction.) Each bit of the result is set to 1 if both corresponding bits of the first and second operands are 1; otherwise, it is set to 0.
 
This instruction can be used with a LOCK prefix to allow the it to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination & Source;

```
 
 
## Flags affected
 
The OF and CF flags are cleared; the SF, ZF, and PF flags are set according to the result. The state of the AF flag is undefined.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the destination operand points to a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If the destination operand points to a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
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
|AND|1/0.5|0.5/0.5|ALU|
