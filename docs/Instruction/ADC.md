# ADC
 
## Add with Carry
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|14 ib|ADC AL, imm8|Add with carry imm8 to AL|
|15 iw|ADC AX, imm16|Add with carry imm16 to AX|
|15 id|ADC EAX, imm32|Add with carry imm32 to EAX|
|80 /2 ib|ADC r/m8, imm8|Add with carry imm8 to r/m8|
|81 /2 iw|ADC r/m16, imm16|Add with carry imm16 to r/m16|
|81 /2 id|ADC r/m32, imm32|Add with CF imm32 to r/m32|
|83 /2 ib|ADC r/m16, imm8|Add with CF sign-extended imm8 to r/m16|
|83 /2 ib|ADC r/m32, imm8|Add with CF sign-extended imm8 into r/m32|
|10 /r|ADC r/m8, r8|Add with carry byte register to r/m8|
|11 /r|ADC r/m16, r16|Add with carry r16 to r/m16|
|11 /r|ADC r/m32, r32|Add with CF r32 to r/m32|
|12 /r|ADC r8, r/m8|Add with carry r/m8 to byte register|
|13 /r|ADC r16, r/m16|Add with carry r/m16 to r16|
|13 /r|ADC r32, r/m32|Add with CF r/m32 to r32|
 
## Description
 
Adds the destination operand (first operand), the source operand (second operand), and the carry (CF) flag and stores the result in the destination operand. The destination operand can be a register or a memory location; the source operand can be an immediate, a register, or a memory location. (However, two memory operands cannot be used in one instruction.) The state of the CF flag represents a carry from a previous addition. When an immediate value is used as an operand, it is sign-extended to the length of the destination operand format.
 
The ADC instruction does not distinguish between signed or unsigned operands. Instead, the processor evaluates the result for both data types and sets the OF and CF flags to indicate a carry in the signed or unsigned result, respectively. The SF flag indicates the sign of the signed result.
 
The ADC instruction is usually executed as part of a multibyte or multiword addition in which an ADD instruction is followed by an ADC instruction.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination + Source + CF;

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
|ADC reg, reg|8/8|3/3|-|
|ADC reg, imm|8/6|2/2|ALU|
