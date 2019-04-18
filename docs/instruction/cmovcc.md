# CMOVcc
 
## Conditional Move
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 47 |CMOVA r16, r/m16|Move if above (CF=0 and ZF=0).|
|0F 47 |CMOVA r32, r/m32|Move if above (CF=0 and ZF=0).|
|0F 43 |CMOVAE r16, r/m16|Move if above or equal (CF=0).|
|0F 43 |CMOVAE r32, r/m32|Move if above or equal (CF=0).|
|0F 42 |CMOVB r16, r/m16|Move if below (CF=1).|
|0F 42 |CMOVB r32, r/m32|Move if below (CF=1).|
|0F 46 |CMOVBE r16, r/m16|Move if below or equal (CF=1 or ZF=1).|
|0F 46 |CMOVBE r32, r/m32|Move if below or equal (CF=1 or ZF=1).|
|0F 42 |CMOVC r16, r/m16|Move if carry (CF=1).|
|0F 42 |CMOVC r32, r/m32|Move if carry (CF=1).|
|0F 44 |CMOVE r16, r/m16|Move if equal (ZF=1).|
|0F 44 |CMOVE r32, r/m32|Move if equal (ZF=1).|
|0F 4F |CMOVG r16, r/m16|Move if greater (ZF=0 and SF=OF).|
|0F 4F |CMOVG r32, r/m32|Move if greater (ZF=0 and SF=OF).|
|0F 4D |CMOVGE r16, r/m16|Move if greater or equal (SF=OF).|
|0F 4D |CMOVGE r32, r/m32|Move if greater or equal (SF=OF).|
|0F 4C |CMOVL r16, r/m16|Move if less (SF<>OF).|
|0F 4C |CMOVL r32, r/m32|Move if less (SF<>OF).|
|0F 4E |CMOVLE r16, r/m16|Move if less or equal (ZF=1 or SF<>OF).|
|0F 4E |CMOVLE r32, r/m32|Move if less or equal (ZF=1 or SF<>OF).|
|0F 46 |CMOVNA r16, r/m16|Move if not above (CF=1 or ZF=1).|
|0F 46 |CMOVNA r32, r/m32|Move if not above (CF=1 or ZF=1).|
|0F 42 |CMOVNAE r16, r/m16|Move if not above or equal (CF=1).|
|0F 42 |CMOVNAE r32, r/m32|Move if not above or equal (CF=1).|
|0F 43 |CMOVNB r16, r/m16|Move if not below (CF=0).|
|0F 43 |CMOVNB r32, r/m32|Move if not below (CF=0).|
|0F 47 |CMOVNBE r16, r/m16|Move if not below or equal (CF=0 and ZF=0).|
|0F 47 |CMOVNBE r32, r/m32|Move if not below or equal (CF=0 and ZF=0).|
|0F 43 |CMOVNC r16, r/m16|Move if not carry (CF=0).|
|0F 43 |CMOVNC r32, r/m32|Move if not carry (CF=0).|
|0F 45 |CMOVNE r16, r/m16|Move if not equal (ZF=0).|
|0F 45 |CMOVNE r32, r/m32|Move if not equal (ZF=0).|
|0F 4E |CMOVNG r16, r/m16|Move if not greater (ZF=1 or SF<>OF).|
|0F 4E |CMOVNG r32, r/m32|Move if not greater (ZF=1 or SF<>OF).|
|0F 4C |CMOVNGE r16, r/m16|Move if not greater or equal (SF<>OF.)|
|0F 4C |CMOVNGE r32, r/m32|Move if not greater or equal (SF<>OF).|
|0F 4D |CMOVNL r16, r/m16|Move if not less (SF=OF).|
|0F 4D |CMOVNL r32, r/m32|Move if not less (SF=OF).|
|0F 4F |CMOVNLE r16, r/m16|Move if not less or equal (ZF=0 and SF=OF).|
|0F 4F |CMOVNLE r32, r/m32|Move if not less or equal (ZF=0 and SF=OF).|
|0F 41 |CMOVNO r16, r/m16|Move if not overflow (OF=0).|
|0F 41 |CMOVNO r32, r/m32|Move if not overflow (OF=0).|
|0F 4B |CMOVNP r16, r/m16|Move if not parity (PF=0).|
|0F 4B |CMOVNP r32, r/m32|Move if not parity (PF=0).|
|0F 49 |CMOVNS r16, r/m16|Move if not sign (SF=0).|
|0F 49 |CMOVNS r32, r/m32|Move if not sign (SF=0).|
|0F q5 |CMOVNZ r16, r/m16|Move if not zero (ZF=0).|
|0F 45 |CMOVNZ r32, r/m32|Move if not zero (ZF=0).|
|0F 40 |CMOVO r16, r/m16|Move if overflow (OF=1).|
|0F 40 |CMOVO r32, r/m32|Move if overflow (OF=1).|
|0F 4A |CMOVP r16, r/m16|Move if parity (PF=1).|
|0F 4A |CMOVP r32, r/m32|Move if parity (PF=1).|
|0F 4A |CMOVPE r16, r/m16|Move if parity even (PF=1).|
|0F 4A |CMOVPE r32, r/m32|Move if parity even (PF=1).|
|0F 4B |CMOVPO r16, r/m16|Move if parity odd (PF=0).|
|0F 4B |CMOVPO r32, r/m32|Move if parity odd (PF=0).|
|0F 48 |CMOVS r16, r/m16|Move if sign (SF=1).|
|0F 48 |CMOVS r32, r/m32|Move if sign (SF=1).|
|0F 44 |CMOVZ r16, r/m16|Move if zero (ZF=1).|
|0F 44 |CMOVZ r32, r/m32|Move if zero (ZF=1).|
 
## Description
 
The CMOVcc instructions check the state of one or more of the status flags in the EFLAGS register (CF, OF, PF, SF, and ZF) and perform a move operation if the flags are in a specified state (or condition). A condition code (cc) is associated with each instruction to indicate the condition being tested for. If the condition is not satisfied, a move is not performed and execution continues with the instruction following the CMOVcc instruction.
 
These instructions can move a 16- or 32-bit value from memory to a general-purpose register or from one general-purpose register to another. Conditional moves of 8-bit register operands are not supported.
 
The conditions for each CMOVcc mnemonic is given in the description column of the above table. The terms "less" and "greater" are used for comparisons of signed integers and the terms "above" and "below" are used for unsigned integers.
 
Because a particular state of the status flags can sometimes be interpreted in two ways, two mnemonics are defined for some opcodes. For example, the CMOVA (conditional move if above) instruction and the CMOVNBE (conditional move if not below or equal) instruction are alternate mnemonics for the opcode 0F 47H.
 
The CMOVcc instructions were introduced in the P6 family processors; however, these instructions may not be supported by all IA-32 processors. Software can determine if the CMOVcc instructions are supported by checking the processor's feature information with the CPUID instruction (see "COMISS-Compare Scalar Ordered Single-Precision Floating-Point Values and Set EFLAGS" in this chapter).
 
 
## Operation
 
```c
Temporary = Source;
if(Condition == true) Destination = temp;
temp = Source;

```
 
 
## Flags affected
 
None.

 
 
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
