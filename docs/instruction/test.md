# TEST
 
## Logical Compare
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|A8 ib|TEST AL,imm8|AND imm8 with AL; set SF, ZF, PF according to result.|
|A9 iw|TEST AX,imm16|AND imm16 with AX; set SF, ZF, PF according to result.|
|A9 id|TEST EAX,imm32|AND imm32 with EAX; set SF, ZF, PF according to result.|
|F6 /0 ib|TEST r/m8,imm8|AND imm8 with r/m8; set SF, ZF, PF according to result.|
|F7 /0 iw|TEST r/m16,imm16|AND imm16 with r/m16; set SF, ZF, PF according to result.|
|F7 /0 id|TEST r/m32,imm32|AND imm32 with r/m32; set SF, ZF, PF according to result.|
|84 /r|TEST r/m8,r8|AND r8 with r/m8; set SF, ZF, PF according to result.|
|85 /r|TEST r/m16,r16|AND r16 with r/m16; set SF, ZF, PF according to result.|
|85 /r|TEST r/m32,r32|AND r32 with r/m32; set SF, ZF, PF according to result.|
 
## Description
 
Computes the bit-wise logical AND of first operand (source 1 operand) and the second operand (source 2 operand) and sets the SF, ZF, and PF status flags according to the result. The result is then discarded.
 
 
## Operation
 
```c
Temporary = Source1 & Source2;
SF = MSB(Temporary);
if(Temporary = 0) ZF = 1;
else ZF = 0;
PF = BitwiseXNOR(Temporary[0:7]);
for(PF = 1, i = 0; i < 8; ++i) PF ^= Temporary[i];
CF = 0;
OF = 0;
AF = Undefined;

```
 
 
## Flags affected
 
The OF and CF flags are set to 0. The SF, ZF, and PF flags are set according to the result (see the "Operation" section above). The state of the AF flag is undefined.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|TEST|1/0.5|0.5/0.5|ALU|
