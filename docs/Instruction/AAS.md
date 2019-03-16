# AAS
 
## ASCII Adjust AL After Subtraction
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|3F|AAS|ASCII adjust AL after subtraction|
 
## Description
 
Adjusts the result of the subtraction of two unpacked BCD values to create a unpacked BCD result. The AL register is the implied source and destination operand for this instruction. The AAS instruction is only useful when it follows a SUB instruction that subtracts (binary subtraction) one unpacked BCD value from another and stores a byte result in the AL register. The AAA instruction then adjusts the contents of the AL register to contain the correct 1-digit unpacked BCD result.
 
If the subtraction produced a decimal carry, the AH register decrements by 1, and the CF and AF flags are set. If no decimal carry occurred, the CF and AF flags are cleared, and the AH register is unchanged. In either case, the AL register is left with its top nibble set to 0.
 
 
## Operation
 
```c
if((AL & 0xF) > 9 || AF == 1) {
	AL = AL - 6;
	AH = AH - 1;
	AF = 1;
	CF = 1;
}
else {
	CF = 0;
	AF = 0;
}
AL = AL & 0xF;

```
 
 
## Flags affected
 
The AF and CF flags are set to 1 if there is a decimal borrow; otherwise, they are set to 0. The OF, SF, ZF, and PF flags are undefined.

 
 
## Exceptions
 
None.
