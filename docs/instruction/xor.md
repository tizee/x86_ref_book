# XOR
 
## Logical Exclusive OR
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|34 ib|XOR AL,imm8|AL XOR imm8.|
|35 iw|XOR AX,imm16|AX XOR imm16.|
|35 id|XOR EAX,imm32|EAX XOR imm32.|
|80 /6 ib|XOR r/m8,imm8 r/m8|XOR imm8.|
|81 /6 iw|XOR r/m16,imm16|r/m16 XOR imm16.|
|81 /6 id|XOR r/m32,imm32|r/m32 XOR imm32.|
|83 /6 ib|XOR r/m16,imm8|r/m16 XOR imm8 (sign-extended).|
|83 /6 ib|XOR r/m32,imm8|r/m32 XOR imm8 (sign-extended).|
|30 /r|XOR r/m8,r8|r/m8 XOR r8.|
|31 /r|XOR r/m16,r16|r/m16 XOR r16.|
|31 /r|XOR r/m32,r32|r/m32 XOR r32.|
|32 /r|XOR r8,r/m8|r8 XOR r/m8.|
|33 /r|XOR r16,r/m16|r16 XOR r/m16.|
|33 /r|XOR r32,r/m32|r32 XOR r/m32.|
 
## Description
 
Performs a bitwise exclusive OR (XOR) operation on the destination (first) and source (second) operands and stores the result in the destination operand location. The source operand can be an immediate, a register, or a memory location; the destination operand can be a register or a memory location. (However, two memory operands cannot be used in one instruction.) Each bit of the result is 1 if the corresponding bits of the operands are different; each bit is 0 if the corresponding bits are the same.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination ^ Source;

```
 
 
## Flags affected
 
The OF and CF flags are cleared; the SF, ZF, and PF flags are set according to the result. The state of the AF flag is undefined.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|XOR|1/0.5|0.5/0.5|ALU|
