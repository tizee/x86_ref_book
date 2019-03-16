# AAD
 
## ASCII Adjust AX Before Division
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D5 0A|AAD|ASCII adjust AX before division|
|D5 ib|(No mnemonic)|Adjust AX before division to number base imm8|
 
## Description
 
Adjusts two unpacked BCD digits (the least-significant digit in the AL register and the mostsignificant digit in the AH register) so that a division operation performed on the result will yield a correct unpacked BCD value. The AAD instruction is only useful when it precedes a DIV instruction that divides (binary division) the adjusted value in the AX register by an unpacked BCD value.
 
The AAD instruction sets the value in the AL register to (AL + (10 * AH)), and then clears the AH register to 00H. The value in the AX register is then equal to the binary equivalent of the original unpacked two-digit (base 10) number in registers AH and AL.
 
The generalized version of this instruction allows adjustment of two unpacked digits of any number base (see the "{operation}" section below), by setting the imm8 byte to the selected number base (for example, 08H for octal, 0AH for decimal, or 0CH for base 12 numbers). The AAD mnemonic is interpreted by all assemblers to mean adjust ASCII (base 10) values. To adjust values in another number base, the instruction must be hand coded in machine code (D5 imm8).
 
 
## Operation
 
```c
//imm8 is set to 0AH for the AAD mnemonic
TemporaryAL = AL;
TemporaryAH = AH;
AL = TemporaryAL + (TemporaryAH * imm8) & 0xFF;
AH = 0

```
 
 
## Flags affected
 
The SF, ZF, and PF flags are set according to the resulting binary value in the AL register; the OF, AF, and CF flags are undefined.

 
 
## Exceptions
 
None.
