# FTST
 
## Test Floating Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 E4|FTST|Compare ST(0) with 0.0.|
 
|Description|Condition|C3|C2|C0|
|-|-|-|-|-|
|
Compares the value in the ST(0) register with 0.0 and sets the condition code flags C0, C2, and C3 in the FPU status word according to the results (see table below).


FTST Results
ConditionC3C2C0
ST(0) > 0.0000
ST(0) < 0.0001
ST(0) = 0.0100
Unordered111


This instruction performs an "unordered comparison." An unordered comparison also checks the class of the numbers being compared (see "FXAM-Examine" in this chapter). If the value in register ST(0) is a NaN or is in an undefined format, the condition flags are set to "unordered" and the invalid operation exception is generated.
The sign of zero is ignored, so that -0.0 = +0.0.
|ST(0) > 0.0|0|0|0|ST(0) < 0.0|0|0|1|ST(0) = 0.0|1|0|0|Unordered|1|1|1|
|
|ST(0) > 0.0|0|0|0|
|ST(0) < 0.0|0|0|1|
|ST(0) = 0.0|1|0|0|
|Unordered|1|1|1|
 
## Operation
 
```c
OperandRelation = Compare(ST(0), 0.0);
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
	RelationUnordered
		C3 = 1;
		C2 = 1;
		C0 = 1;
		break;
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
|#IA|The source operand is a NaN value or is in an unsupported format.|
 
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
