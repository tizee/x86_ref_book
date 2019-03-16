# OR
 
## Logical Inclusive OR
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0C ib|OR AL,imm8|AL OR imm8.|
|0D iw|OR AX,imm16|AX OR imm16.|
|0D id|OR EAX,imm32|EAX OR imm32.|
|80 /1 ib|OR r/m8,imm8|r/m8 OR imm8.|
|81 /1 iw|OR r/m16,imm16|r/m16 OR imm16.|
|81 /1 id|OR r/m32,imm32|r/m32 OR imm32|
|83 /1 ib|OR r/m16,imm8|r/m16 OR imm8 (sign-extended).|
|83 /1 ib|OR r/m32,imm8|r/m32 OR imm8 (sign-extended).|
|08 /r|OR r/m8,r8|r/m8 OR r8.|
|09 /r|OR r/m16,r16|r/m16 OR r16.|
|09 /r|OR r/m32,r32|r/m32 OR r32.|
|0A /r|OR r8,r/m8|r8 OR r/m8.|
|0B /r|OR r16,r/m16|r16 OR r/m16.|
|0B /r|OR r32,r/m32|r32 OR r/m32.|
 
## Description
 
Performs a bitwise inclusive OR operation between the destination (first) and source (second) operands and stores the result in the destination operand location. The source operand can be an immediate, a register, or a memory location; the destination operand can be a register or a memory location. (However, two memory operands cannot be used in one instruction.) Each bit of the result of the OR instruction is set to 0 if both corresponding bits of the first and second operands are 0; otherwise, each bit is set to 1.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination | Source;

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
|OR|1/0.5|0.5/0.5|ALU|
