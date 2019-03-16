# FCOMI/FCOMIP/FUCOMI/FUCOMIP
 
## Compare Floating Point Values and Set EFLAGS
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DB F0+i|FCOMI ST, ST(i)|Compare ST(0) with ST(i) and set status flags accordingly.|
|DF F0+i|FCOMIP ST, ST(i)|Compare ST(0) with ST(i), set status flags accordingly, and pop register stack.|
|DB E8+i|FUCOMI ST, ST(i)|Compare ST(0) with ST(i), check for ordered values, and set status flags accordingly.|
|DF E8+i|FUCOMIP ST, ST(i)|Compare ST(0) with ST(i), check for ordered values, set status flags accordingly, and pop register stack.|
 
|Description|Comparison Results|ZF|PF|CF|
|-|-|-|-|-|
|
Performs an unordered comparison of the contents of registers ST(0) and ST(i) and sets the status flags ZF, PF, and CF in the EFLAGS register according to the results (see the table below). The sign of zero is ignored for comparisons, so that -0.0 is equal to +0.0.


FCOMI/FCOMIP/FUCOMI/FUCOMIP Results
Comparison ResultsZFPFCF
ST0 > ST(i)000
ST0 < ST(i)001
ST0 = ST(i)100
Unordered*111

NOTE: * Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.



An unordered comparison checks the class of the numbers being compared (see "FXAM-Examine" in this chapter). The FUCOMI/FUCOMIP instructions perform the same operations as the FCOMI/FCOMIP instructions. The only difference is that the FUCOMI/FUCOMIP instructions raise the invalid-arithmetic-operand exception (#IA) only when either or both operands are an SNaN or are in an unsupported format; QNaNs cause the condition code flags to be set to unordered, but do not cause an exception to be generated. The FCOMI/FCOMIP instructions raise an invalid-operation exception when either or both of the operands are a NaN value of any kind or are in an unsupported format.
If the operation results in an invalid-arithmetic-operand exception being raised, the status flags in the EFLAGS register are set only if the exception is masked.
The FCOMI/FCOMIP and FUCOMI/FUCOMIP instructions clear the OF flag in the EFLAGS register (regardless of whether an invalid-operation exception is detected).
The FCOMIP and FUCOMIP instructions also pop the register stack following the comparison operation. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1.
|ST0 > ST(i)|0|0|0|ST0 < ST(i)|0|0|1|ST0 = ST(i)|1|0|0|Unordered*|1|1|1|NOTE: * Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.|
|
|ST0 > ST(i)|0|0|0|
|ST0 < ST(i)|0|0|1|
|ST0 = ST(i)|1|0|0|
|Unordered*|1|1|1|
|NOTE: * Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.|
 
## Operation
 
```c
OperandRelation = Compare(ST(0), ST(i));
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
}

if(Instruction == FCOMI || Instruction == FCOMIP) {
	if(IsQNaN(ST(0)) || IsQNaN(ST(i))) {
		ZF = 1;
		PF = 1;
		CF = 1;
	}
	else {
		Exception(IA);
		if(FPUControlWord.IM == 1) {
			ZF = 1;
			PF = 1;
			CF = 1;
		}
	}
}

if(Instruction == FCOMIP || Instruction == FUCOMIP) PopRegisterStack();

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred; otherwise, set to 0.
C0, C2, C3 Not affected.

 
 
## IA-32 Architecture Compatibility
 
The FCOMI/FCOMIP/FUCOMI/FUCOMIP instructions were introduced to the IA-32 Architecture in the P6 family processors and are not available in earlier IA-32 processors.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#NM|EM or TS in CR0 is set.|
