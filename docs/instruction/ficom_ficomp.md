# FICOM/FICOMP
 
## Compare Integer
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DE /2|FICOM m16int|Compare ST(0) with m16int.|
|DA /2|FICOM m32int|Compare ST(0) with m32int.|
|DE /3|FICOMP m16int|Compare ST(0) with m16int and pop stack register.|
|DA /3|FICOMP m32int|Compare ST(0) with m32int and pop stack register.|
 
|Description|Condition|C3|C2|C0|
|-|-|-|-|-|
|
Compares the value in ST(0) with an integer source operand and sets the condition code flags C0, C2, and C3 in the FPU status word according to the results (see table below). The integer value is converted to double extended-precision floating-point format before the comparison is made.


FICOM/FICOMP Results
ConditionC3C2C0
ST(0) > Source000
ST(0) < Source001
ST(0) = Source100
Unordered111


These instructions perform an "unordered comparison." An unordered comparison also checks the class of the numbers being compared (see "FXAM-Examine" in this chapter). If either operand is a NaN or is in an undefined format, the condition flags are set to "unordered." The sign of zero is ignored, so that -0.0 = +0.0.
The FICOMP instructions pop the register stack following the comparison. To pop the register stack, the processor marks the ST(0) register empty and increments the stack pointer (TOP) by 1.
|ST(0) > Source|0|0|0|ST(0) < Source|0|0|1|ST(0) = Source|1|0|0|Unordered|1|1|1|
|
|ST(0) > Source|0|0|0|
|ST(0) < Source|0|0|1|
|ST(0) = Source|1|0|0|
|Unordered|1|1|1|
 
## Operation
 
```c
OperandRelation = Compare(ST(0), Source);
switch(OperandRelation) {
	RelationGreaterThan:
		C3 = 0;
		C2 = 0;
		C0 = 0;
		break;
	RelationLessThan:
		C3 = 0;
		C2 = 0;
		C0 = 1;
		break;
	RelationEqual:
		C3 = 1;
		C2 = 0;
		C0 = 0;
		break;
	RelationUnordered:
		C3 = 1;
		C2 = 1;
		C0 = 1;
		break;
}

if(Instruction == FICOMP) PopRegisterStack();

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred; otherwise, set to 0.
C0, C2, C3 See table above.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|One or both operands are NaN values or have unsupported formats.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|EM or TS in CR0 is set.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS|If a memory operand effective address is outside the SS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|EM or TS in CR0 is set.|
|#PF(fault-code)|If a page fault occurs.|
