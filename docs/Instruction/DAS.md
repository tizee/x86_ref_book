# DAS
 
## Decimal Adjust AL after Subtraction
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|2F|DAS|Decimal adjust AL after subtraction.|
 
## Description
 
Adjusts the result of the subtraction of two packed BCD values to create a packed BCD result.
 
The AL register is the implied source and destination operand. The DAS instruction is only useful when it follows a SUB instruction that subtracts (binary subtraction) one 2-digit, packed BCD value from another and stores a byte result in the AL register. The DAS instruction then adjusts the contents of the AL register to contain the correct 2-digit, packed BCD result. If a decimal borrow is detected, the CF and AF flags are set accordingly.
 
 
## Operation
 
```c
OldAL = AL;
OldCF = CF;
CF = 0;

if(AL & 0xF > 9 || AF == 1) {
	CF = OldCF | GetBorrow(AL = AL - 6);
	AF = 1;
}
else AF = 0;

if(OldAL > 0x99 || OldCF == 1) {
	AL = AL - 0x60;
	CF = 1;
}
else CF = 0;

```
 
 
## Flags affected
 
The CF and AF flags are set if the adjustment of the value results in a decimal borrow in either digit of the result (see the "Operations" section above). The SF, ZF, and PF flags are set according to the result. The OF flag is undefined.

 
 
## Exceptions
 
None.
