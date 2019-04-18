# SHLD
 
## Double Precision Shift Left
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F A4|SHLD r/m16, r16, imm8|Shift r/m16 to left imm8 places while shifting bits from r16 in from the right.|
|0F A5|SHLD r/m16, r16, CL|Shift r/m16 to left CL places while shifting bits from r16 in from the right.|
|0F A4|SHLD r/m32, r32, imm8|Shift r/m32 to left imm8 places while shifting bits from r32 in from the right.|
|0F A5|SHLD r/m32, r32, CL|Shift r/m32 to left CL places while shifting bits from r32 in from the right.|
 
## Description
 
Shifts the first operand (destination operand) to the left the number of bits specified by the third operand (count operand). The second operand (source operand) provides bits to shift in from the right (starting with bit 0 of the destination operand). The destination operand can be a register or a memory location; the source operand is a register. The count operand is an unsigned integer that can be an immediate byte or the contents of the CL register. Only bits 0 through 4 of the count are used, which masks the count to a value between 0 and 31. If the count is greater than the operand size, the result in the destination operand is undefined.
 
If the count is 1 or greater, the CF flag is filled with the last bit shifted out of the destination operand. For a 1-bit shift, the OF flag is set if a sign change occurred; otherwise, it is cleared. If the count operand is 0, the flags are not affected. 
 
The SHLD instruction is useful for multi-precision shifts of 64 bits or more.
 
 
## Operation
 
```c
Count = Count % 32;
if(Count != 0) {
	if(Count > OperandSize) { //Bad parameters
		Destination = Undefined;
		(CF, OF, SF, ZF, AF, PF) = Undefined;
	}
	else { //Perform the shift
		//Last bit shifted out on exit
		for(i = OperandSize - 1; i >= Count; --i) Destination[i] = Destination[i - Count];
		for(i = Count - 1; i >= 0; --i) Destination[i] = Source[i - Count + OperandSize];
	}
}

```
 
 
## Flags affected
 
If the count is 1 or greater, the CF flag is filled with the last bit shifted out of the destination operand and the SF, ZF, and PF flags are set according to the value of the result. For a 1-bit shift, the OF flag is set if a sign change occurred; otherwise, it is cleared. For shifts greater than 1 bit, the OF flag is undefined. If a shift occurs, the AF flag is undefined. If the count operand is 0, the flags are not affected. If the count is greater than the operand size, the flags are undefined.

 
