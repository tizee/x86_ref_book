# IMUL
 
## Signed Multiply
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F6 /5|IMUL r/m8|AX = AL * r/m byte.|
|F7 /5|IMUL r/m16|DX:AX = AX * r/m word.|
|F7 /5|IMUL r/m32|EDX:EAX = EAX * r/m doubleword.|
|0F AF /r|IMUL r16,r/m16|word register = word register * r/m word.|
|0F AF /r|IMUL r32,r/m32|doubleword register = doubleword register * r/m doubleword.|
|6B /r ib|IMUL r16,r/m16,imm8|word register = r/m16 * sign-extended immediate byte.|
|6B /r ib|IMUL r32,r/m32,imm8|doubleword register = r/m32 * sign-extended immediate byte.|
|6B /r ib|IMUL r16,imm8|word register = word register * sign-extended immediate byte.|
|6B /r ib|IMUL r32,imm8|doubleword register = doubleword register * signextended immediate byte.|
|69 /r iw|IMUL r16,r/m16,imm16|word register = r/m16 * immediate word.|
|69 /r id|IMUL r32,r/m32,imm32|doubleword register = r/m32 * immediate doubleword.|
|69 /r iw|IMUL r16,imm16|word register = r/m16 * immediate word.|
|69 /r id|IMUL r32,imm32|doubleword register = r/m32 * immediate doubleword.|
 
## Description
 
Performs a signed multiplication of two operands. This instruction has three forms, depending on the number of operands.
 
- One-operand form. This form is identical to that used by the MUL instruction. Here, the source operand (in a general-purpose register or memory location) is multiplied by the value in the AL, AX, or EAX register (depending on the operand size) and the product is stored in the AX, DX:AX, or EDX:EAX registers, respectively.
 
- Two-operand form. With this form the destination operand (the first operand) is multiplied by the source operand (second operand). The destination operand is a generalpurpose register and the source operand is an immediate value, a general-purpose register, or a memory location. The product is then stored in the destination operand location.
 
- Three-operand form. This form requires a destination operand (the first operand) and two source operands (the second and the third operands). Here, the first source operand (which can be a general-purpose register or a memory location) is multiplied by the second source operand (an immediate value). The product is then stored in the destination operand (a general-purpose register).
 
When an immediate value is used as an operand, it is sign-extended to the length of the destination operand format.
 
The CF and OF flags are set when significant bit (including the sign bit) are carried into the upper half of the result. The CF and OF flags are cleared when the result (including the sign bit) fits exactly in the lower half of the result.
 
The three forms of the IMUL instruction are similar in that the length of the product is calculated to twice the length of the operands. With the one-operand form, the product is stored exactly in the destination. With the two- and three- operand forms, however, the result is truncated to the length of the destination before it is stored in the destination register. Because of this truncation, the CF or OF flag should be tested to ensure that no significant bits are lost.
 
The two- and three-operand forms may also be used with unsigned operands because the lower half of the product is the same regardless if the operands are signed or unsigned. The CF and OF flags, however, cannot be used to determine if the upper half of the result is non-zero.
 
 
## Operation
 
```c
switch(NumberOfOperands) {
	case 1:
		if(OperandSize == 8) {
			AX = AL * Source; //signed multiplication
			if(AL == AX) {
				CF = 0;
				OF = 0;
			}
			else {
				CF = 1;
				OF = 1;
			}
		}
		else if(OperandSize == 16) {
			DX:AX = AX * Source; //signed multiplication
			if(SignExtendTo32(AX) == DX:AX) {
				CF = 0;
				OF = 0;
			}
			else {
				CF = 1;
				OF = 1;
			}
		}
		else { //OperandSize == 32
			EDX:EAX = EAX * Source; //signed multiplication
			if(EAX == EDX:EAX) {
				CF = 0;
				OF = 0;
			}
			else {
				CF = 1;
				OF = 1;
			}
		}
		break;
	case 2:
		Temporary = Destination * Source; //signed multiplication; Temporary is twice twice the Destination size
		Destination = Destination * Source; //signed multiplication
		if(Temporary == Destination) {
			CF = 0;
			OF = 0;
		}
		else {
			CF = 1;
			OF = 1;
		}
		break;
	case 3:
		Destination = Source1 * Source2; //signed multiplication
		Temporary = Source1 * Source2; ///signed multiplication; Temporary is twice twice the Source1 size
		if(Temporary == Destination) {
			CF = 0;
			OF = 0;
		}
		else {
			CF = 1;
			OF = 1;
		}
		break;
}

```
 
 
## Flags affected
 
For the one operand form of the instruction, the CF and OF flags are set when significant bits are carried into the upper half of the result and cleared when the result fits exactly in the lower half of the result. For the two- and three-operand forms of the instruction, the CF and OF flags are set when the result must be truncated to fit in the destination operand size and cleared when the result fits exactly in the destination operand size. The SF, ZF, AF, and PF flags are undefined.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
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
|CPUID|0F3n/0F2n/069n|0F3n/0F2n|0F2n|
|IMUL r32|10/14/4|1/3|FP_MUL|
|IMUL imm32|-/14/4|1/3|FP_MUL|
|IMUL|-/15-18/4|-/5|-|
