# ADD
 
## Add
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|04 ib|ADD AL, imm8|Add imm8 to AL|
|05 iw|ADD AX, imm16|Add imm16 to AX|
|05 id|ADD EAX, imm32|Add imm32 to EAX|
|80 /0 ib|ADD r/m8, imm8|Add imm8 to r/m8|
|81 /0 iw|ADD r/m16, imm16|Add imm16 to r/m16|
|81 /0 id|ADD r/m32, imm32|Add imm32 to r/m32|
|83 /0 ib|ADD r/m16, imm8|Add sign-extended imm8 to r/m16|
|83 /0 ib|ADD r/m32, imm8|Add sign-extended imm8 to r/m32|
|00 /r|ADD r/m8, r8|Add r8 to r/m8|
|01 /r|ADD r/m16, r16|Add r16 to r/m16|
|01 /r|ADD r/m32, r32|Add r32 to r/m32|
|02 /r|ADD r8, r/m8|Add r/m8 to r8|
|03 /r|ADD r16, r/m16|Add r/m16 to r16|
|03 /r|ADD r32, r/m32|Add r/m32 to r32|
 
## Description
 
Adds the first operand (destination operand) and the second operand (source operand) and stores the result in the destination operand. The destination operand can be a register or a memory location; the source operand can be an immediate, a register, or a memory location. (However, two memory operands cannot be used in one instruction.) When an immediate value is used as an operand, it is sign-extended to the length of the destination operand format.
 
The ADD instruction performs integer addition. It evaluates the result for both signed and unsigned integer operands and sets the OF and CF flags to indicate a carry (overflow) in the signed or unsigned result, respectively. The SF flag indicates the sign of the signed result.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination + Source;

```
 
 
## Flags affected
 
The OF, SF, ZF, AF, CF, and PF flags are set according to the result.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If the destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
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
|ADD|1/0.5|0.5/0.5|ALU|
