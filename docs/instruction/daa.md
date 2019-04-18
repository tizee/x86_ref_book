# DAA
 
## Decimal Adjust AL after Addition
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|27|DAA|Decimal adjust AL after addition.|
 
## Description
 
Adjusts the sum of two packed BCD values to create a packed BCD result. The AL register is the implied source and destination operand. The DAA instruction is only useful when it follows an ADD instruction that adds (binary addition) two 2-digit, packed BCD values and stores a byte result in the AL register. The DAA instruction then adjusts the contents of the AL register to contain the correct 2-digit, packed BCD result. If a decimal carry is detected, the CF and AF flags are set accordingly.
 
 
## Operation
 
```c
if(AL & 0xF > 9 || AF == 1) {
	CF = OldCF | GetCarry(AL = AL + 6);
	AF = 1;
}
else AF = 0;

if(OldAL > 0x99 || OldCF == 1) {
	AL = AL + 0x60;
	CF = 1;
}
else CF = 0;

```
 
 
## Flags affected
 
The CF and AF flags are set if the adjustment of the value results in a decimal carry in either digit of the result (see the "Operations" section above). The SF, ZF, and PF flags are set according to the result. The OF flag is undefined.

 
 
## Exceptions
 
None.
