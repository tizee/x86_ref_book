# MOVSX
 
## Move with Sign-Extension
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F BE /r|MOVSX r16,r/m8|Move byte to word with sign-extension.|
|0F BE /r|MOVSX r32,r/m8|Move byte to doubleword, sign-extension.|
|0F BF /r|MOVSX r32,r/m16|Move word to doubleword, sign-extension.|
 
## Description
 
Copies the contents of the source operand (register or memory location) to the destination operand (register) and sign extends the value to 16 or 32 bits (see Figure 7-6 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1). The size of the converted value depends on the operand-size attribute.
 
 
## Operation
 
```c
Destination = SignExtend(Source);

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
