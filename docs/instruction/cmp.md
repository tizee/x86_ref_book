# CMP
 
## Compare Two Operands
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|3C ib|CMP AL, imm8|Compare imm8 with AL.|
|3D iw|CMP AX, imm16|Compare imm16 with AX.|
|3D id|CMP EAX, imm32|Compare imm32 with EAX.|
|80 /7 ib|CMP r/m8, imm8|Compare imm8 with r/m8.|
|81 /7 iw|CMP r/m16, imm16|Compare imm16 with r/m16.|
|81 /7 id|CMP r/m32,imm32|Compare imm32 with r/m32.|
|83 /7 ib|CMP r/m16,imm8|Compare imm8 with r/m16.|
|83 /7 ib|CMP r/m32,imm8|Compare imm8 with r/m32.|
|38 /r|CMP r/m8,r8|Compare r8 with r/m8.|
|39 /r|CMP r/m16,r16|Compare r16 with r/m16.|
|39 /r|CMP r/m32,r32|Compare r32 with r/m32.|
|3A /r|CMP r8,r/m8|Compare r/m8 with r8.|
|3B /r|CMP r16,r/m16|Compare r/m16 with r16.|
|3B /r|CMP r32,r/m32|Compare r/m32 with r32.|
 
## Description
 
Compares the first source operand with the second source operand and sets the status flags in the EFLAGS register according to the results. The comparison is performed by subtracting the second operand from the first operand and then setting the status flags in the same manner as the SUB instruction. When an immediate value is used as an operand, it is sign-extended to the length of the first operand.
 
The CMP instruction is typically used in conjunction with a conditional jump (Jcc), condition move (CMOVcc), or SETcc instruction. The condition codes used by the Jcc, CMOVcc, and SETcc instructions are based on the results of a CMP instruction. Appendix B, EFLAGS Condition Codes, in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, shows the relationship of the status flags and the condition codes.
 
 
## Operation
 
```c
temp = Source1 - SignExtend(Source2);
ModifyStatusFlags(); //Modify status flags in the same manner as the SUB instruction

```
 
 
## Flags affected
 
The CF, OF, SF, ZF, AF, and PF flags are set according to the result.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
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
|CMP|1/0.5|0.5/0.5|ALU|
