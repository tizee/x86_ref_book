# SBB
 
## Integer Subtraction with Borrow
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|1C ib|SBB AL,imm8|Subtract with borrow imm8 from AL.|
|1D iw|SBB AX,imm16|Subtract with borrow imm16 from AX.|
|1D id|SBB EAX,imm32|Subtract with borrow imm32 from EAX.|
|80 /3 ib|SBB r/m8,imm8|Subtract with borrow imm8 from r/m8.|
|81 /3 iw|SBB r/m16,imm16|Subtract with borrow imm16 from r/m16.|
|81 /3 id|SBB r/m32,imm32|Subtract with borrow imm32 from r/m32.|
|83 /3 ib|SBB r/m16,imm8|Subtract with borrow sign-extended imm8 from r/m16.|
|83 /3 ib|SBB r/m32,imm8|Subtract with borrow sign-extended imm8 from r/m32.|
|18 /r|SBB r/m8,r8|Subtract with borrow r8 from r/m8.|
|19 /r|SBB r/m16,r16|Subtract with borrow r16 from r/m16.|
|19 /r|SBB r/m32,r32|Subtract with borrow r32 from r/m32.|
|1A /r|SBB r8,r/m8|Subtract with borrow r/m8 from r8.|
|1B /r|SBB r16,r/m16|Subtract with borrow r/m16 from r16.|
|1B /r|SBB r32,r/m32|Subtract with borrow r/m32 from r32.|
 
## Description
 
Adds the source operand (second operand) and the carry (CF) flag, and subtracts the result from the destination operand (first operand). The result of the subtraction is stored in the destination operand. The destination operand can be a register or a memory location; the source operand can be an immediate, a register, or a memory location. (However, two memory operands cannot be used in one instruction.) The state of the CF flag represents a borrow from a previous subtraction.
 
When an immediate value is used as an operand, it is sign-extended to the length of the destination operand format.
 
The SBB instruction does not distinguish between signed or unsigned operands. Instead, the processor evaluates the result for both data types and sets the OF and CF flags to indicate a borrow in the signed or unsigned result, respectively. The SF flag indicates the sign of the signed result.
 
The SBB instruction is usually executed as part of a multibyte or multiword subtraction in which a SUB instruction is followed by a SBB instruction.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
 
## Operation
 
```c
Destination = Destination - (Source + CF);

```
 
 
## Flags affected
 
The OF, SF, ZF, AF, PF, and CF flags are set according to the result.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|SBB reg, reg|8/8|3/3|-|
|SBB reg, imm|8/6|2/2|ALU|
