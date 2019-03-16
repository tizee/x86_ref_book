# IDIV
 
## Signed Divide
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F6 /7|IDIV r/m8|Signed divide AX by r/m8, with result stored in AL = Quotient, AH = Remainder.|
|F7 /7|IDIV r/m16|Signed divide DX:AX by r/m16, with result stored in AX = Quotient, DX = Remainder.|
|F7 /7|IDIV r/m32|Signed divide EDX:EAX by r/m32, with result stored in EAX = Quotient, EDX = Remainder.|
 
## Description
 
Divides (signed) the value in the AX, DX:AX, or EDX:EAX registers (dividend) by the source operand (divisor) and stores the result in the AX (AH:AL), DX:AX, or EDX:EAX registers. The source operand can be a general-purpose register or a memory location. The action of this instruction depends on the operand size (dividend/divisor), as shown in the following table:
 
|[]()||||||
|-|-|-|-|-|-|
|[header]Operand Size|Dividend|Divisor|Quotient|Remainder|Quotient Range[/header]|
|Word/byte|AX|r/m8|AL|AH|-2^8 to +2^8 - 1|
|Doubleword/word|DX:AX|r/m16|AX|DX|-2^16 to +2^16 - 1|
|Quadword/doubleword|EDX:EAX|r/m32|EAX|EDX|-2^31 to +2^32 - 1|
Non-integral results are truncated (chopped) towards 0. The sign of the remainder is always the same as the sign of the dividend. The absolute value of the remainder is always less than the absolute value of the divisor. Overflow is indicated with the #DE (divide error) exception rather than with the OF (overflow) flag.
 
 
## Operation
 
```c
if(Source == 0) Exception(DE); //divide error

if(OperandSize == 8) { //word/byte operation
	Temporary = AX / Source; //signed division
	if(Temporary > 0x7F || Temporary < 0x80) Exception(DE); //f a positive result is greater than 7FH or a negative result is less than 80H
	else {
		AL = Temporary;
		AH = AX % Source; //signed modulus
	}
}
else if(OperandSize == 16) { //doubleword/word operation
	Temporary = DX:AX / Source; //signed division
	if(Temporary > 0x7FFF || Temporary < 0x8000) Exception(DE); //f a positive result is greater than 7FFFH or a negative result is less than 8000H
	else {
		AX = Temporary;
		DX = DX:AX % Source; //signed modulus
	}
}
else { //quadword/doubleword operation
	Temporary = EDX:EAX / Source; //signed division
	if(Temporary > 0x7FFFFFFF || Temporary < 0x80000000) Exception(DE); //f a positive result is greater than 7FFFFFFFH or a negative result is less than 80000000H
	else {
		EAX = Temporary;
		EDX = EDX:EAX % Source; //signed modulus
	}
}

```
 
 
## Flags affected
 
The CF, OF, SF, ZF, AF, and PF flags are undefined.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#DE|If the source operand (divisor) is 0. The signed result (quotient) is too large for the destination.|
|#DE|If the source operand (divisor) is 0. The signed result (quotient) is too large for the destination.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#DE|If the source operand (divisor) is 0. The signed result (quotient) is too large for the destination.|
|#DE|If the source operand (divisor) is 0. The signed result (quotient) is too large for the destination.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#DE|If the source operand (divisor) is 0. The signed result (quotient) is too large for the destination.|
|#DE|If the source operand (divisor) is 0. The signed result (quotient) is too large for the destination.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|IDIV|66-80/56-70|30/23|-|
