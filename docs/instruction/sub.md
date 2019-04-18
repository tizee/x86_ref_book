# SUB
 
## Subtract
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|2C ib|SUB AL,imm8|Subtract imm8 from AL.|
|2D iw|SUB AX,imm16|Subtract imm16 from AX.|
|2D id|SUB EAX,imm32|Subtract imm32 from EAX.|
|80 /5 ib|SUB r/m8,imm8|Subtract imm8 from r/m8.|
|81 /5 iw|SUB r/m16,imm16|Subtract imm16 from r/m16.|
|81 /5 id|SUB r/m32,imm32|Subtract imm32 from r/m32.|
|83 /5 ib|SUB r/m16,imm8|Subtract sign-extended imm8 from r/m16.|
|83 /5 ib|SUB r/m32,imm8|Subtract sign-extended imm8 from r/m32.|
|28 /r|SUB r/m8,r8|Subtract r8 from r/m8.|
|29 /r|SUB r/m16,r16|Subtract r16 from r/m16.|
|29 /r|SUB r/m32,r32|Subtract r32 from r/m32.|
|2A /r|SUB r8,r/m8|Subtract r/m8 from r8.|
|2B /r|SUB r16,r/m16|Subtract r/m16 from r16.|
|2B /r|SUB r32,r/m32|Subtract r/m32 from r32.|
 
## Description
 
Subtracts the second operand (source operand) from the first operand (destination operand) and stores the result in the destination operand. The destination operand can be a register or a memory location; the source operand can be an immediate, register, or memory location.
 
(However, two memory operands cannot be used in one instruction.) When an immediate value is used as an operand, it is sign-extended to the length of the destination operand format.
 
The SUB instruction performs integer subtraction. It evaluates the result for both signed and unsigned integer operands and sets the OF and CF flags to indicate an overflow in the signed or unsigned result, respectively. The SF flag indicates the sign of the signed result.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination - Source;

```
 
 
## Flags affected
 
The OF, SF, ZF, AF, PF, and CF flags are set according to the result.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|SUB|1/0.5|0.5/0.5|ALU|
