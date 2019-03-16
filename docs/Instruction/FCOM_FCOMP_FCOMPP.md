# FCOM/FCOMP/FCOMPP
 
## Compare Floating Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D8 /2|FCOM m32fp|Compare ST(0) with m32fp.|
|DC /2|FCOM m64fp|Compare ST(0) with m64fp.|
|D8 D0+i|FCOM ST(i)|Compare ST(0) with ST(i).|
|D8 D1|FCOM|Compare ST(0) with ST(1).|
|D8 /3|FCOMP m32fp|Compare ST(0) with m32fp and pop register stack.|
|DC /3|FCOMP m64fp|Compare ST(0) with m64fp and pop register stack.|
|D8 D8+i|FCOMP ST(i)|Compare ST(0) with ST(i) and pop register stack.|
|D8 D9|FCOMP|Compare ST(0) with ST(1) and pop register stack.|
|DE D9|FCOMPP|Compare ST(0) with ST(1) and pop register stack twice.|
 
|Description|Condition|C3|C2|C0|
|-|-|-|-|-|
|
Compares the contents of register ST(0) and source value and sets condition code flags C0, C2, and C3 in the FPU status word according to the results (see the table below). The source operand can be a data register or a memory location. If no source operand is given, the value in ST(0) is compared with the value in ST(1). The sign of zero is ignored, so that -0.0 is equal to +0.0.


FCOM/FCOMP/FCOMPP Results
ConditionC3C2C0
ST(0) > Source000
ST(0) < Source001
ST(0) = Source100
Unordered*111

NOTE: * Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.



This instruction checks the class of the numbers being compared (see "FXAM-Examine" in this chapter). If either operand is a NaN or is in an unsupported format, an invalid-arithmeticoperand exception (#IA) is raised and, if the exception is masked, the condition flags are set to "unordered." If the invalid-arithmetic-operand exception is unmasked, the condition code flags are not set.
The FCOMP instruction pops the register stack following the comparison operation and the FCOMPP instruction pops the register stack twice following the comparison operation. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1.
The FCOM instructions perform the same operation as the FUCOM instructions. The only difference is how they handle QNaN operands. The FCOM instructions raise an invalid-arithmetic- operand exception (#IA) when either or both of the operands is a NaN value or is in an unsupported format. The FUCOM instructions perform the same operation as the FCOM instructions, except that they do not generate an invalid-arithmetic-operand exception for QNaNs.
|ST(0) > Source|0|0|0|ST(0) < Source|0|0|1|ST(0) = Source|1|0|0|Unordered*|1|1|1|NOTE: * Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.|
|
|ST(0) > Source|0|0|0|
|ST(0) < Source|0|0|1|
|ST(0) = Source|1|0|0|
|Unordered*|1|1|1|
|NOTE: * Flags not set if unmasked invalid-arithmetic-operand (#IA) exception is generated.|
 
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
if(IsNaN(ST(0)) || IsNaN(Source) || IsUnsupportedFormat(ST(0)) || IsUnsupportedFormat(Source)) Exception(IA);
if(FPUControlWord.IM == 1) {
	C3 = 1;
	C2 = 1;
	C0 = 1;
}
if(Instruction == FCOMP) PopRegisterStack();
if(Instruction == FCOMPP) {
	PopRegisterStack();
	PopRegisterStack();
}

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred; otherwise, set to 0.
C0, C2, C3 See table above.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|One or both operands are NaN values or have unsupported formats. Register is marked empty.|
 
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
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|FCOM|3/2|1/1|FP_MISC|
