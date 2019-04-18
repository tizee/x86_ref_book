# FUCOM/FUCOMP/FUCOMPP
 
## Unordered Compare Floating Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DD E0+i|FUCOM ST(i)|Compare ST(0) with ST(i).|
|DD E1|FUCOM|Compare ST(0) with ST(1).|
|DD E8+i|FUCOMP ST(i)|Compare ST(0) with ST(i) and pop register stack.|
|DD E9|FUCOMP|Compare ST(0) with ST(1) and pop register stack.|
|DA E9|FUCOMPP|Compare ST(0) with ST(1) and pop register stack twice.|
 
|Description|Comparison Results|C3|C2|C0|
|-|-|-|-|-|
|
Performs an unordered comparison of the contents of register ST(0) and ST(i) and sets condition code flags C0, C2, and C3 in the FPU status word according to the results (see the table below).
If no operand is specified, the contents of registers ST(0) and ST(1) are compared. The sign of zero is ignored, so that -0.0 is equal to +0.0.


FUCOM/FUCOMP/FUCOMPP Results
Comparison ResultsC3C2C0
ST(0) > ST(i)000
ST(0) < ST(i)001
ST(0) = ST(i)100
Unordered111

* Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.



An unordered comparison checks the class of the numbers being compared (see "FXAM-Examine" in this chapter). The FUCOM/FUCOMP/FUCOMPP instructions perform the same operations as the FCOM/FCOMP/FCOMPP instructions. The only difference is that the FUCOM/FUCOMP/FUCOMPP instructions raise the invalid-arithmetic-operand exception (#IA) only when either or both operands are an SNaN or are in an unsupported format; QNaNs cause the condition code flags to be set to unordered, but do not cause an exception to be generated.
The FCOM/FCOMP/FCOMPP instructions raise an invalid-operation exception when either or both of the operands are a NaN value of any kind or are in an unsupported format.
As with the FCOM/FCOMP/FCOMPP instructions, if the operation results in an invalid-arithmetic- operand exception being raised, the condition code flags are set only if the exception is masked.
The FUCOMP instruction pops the register stack following the comparison operation and the FUCOMPP instruction pops the register stack twice following the comparison operation. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1.
|ST(0) > ST(i)|0|0|0|ST(0) < ST(i)|0|0|1|ST(0) = ST(i)|1|0|0|Unordered|1|1|1|* Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.|
|
|ST(0) > ST(i)|0|0|0|
|ST(0) < ST(i)|0|0|1|
|ST(0) = ST(i)|1|0|0|
|Unordered|1|1|1|
|* Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.|
 
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
}

if(IsQNaN(ST(0)) || IsQNaN(Source)) {
	C3 = 1;
	C2 = 1;
	C0 = 1;
}
else {
	Exception(IA);
	if(FPUControlWord.IM == 1) {
		C3 = 1;
		C2 = 1;
		C0 = 1;
	}
}

if(Instruction == FUCOMP) PopRegisterStack();
if(Instruction == FUCOMPP) {
	PopRegisterStack();
	PopRegisterStack();
}

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
C0, C2, C3 See table above.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|One or both operands are SNaN values or have unsupported formats. Detection of a QNaN value in and of itself does not raise an invalidoperand exception.|
 
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
