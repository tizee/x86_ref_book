# FPREM1
 
## Partial Remainder
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F5|FPREM1|Replace ST(0) with the IEEE remainder obtained from dividing ST(0) by ST(1).|
 
## Description
 
Computes the IEEE remainder obtained from dividing the value in the ST(0) register (the dividend) by the value in the ST(1) register (the divisor or modulus), and stores the result in ST(0).
 
The remainder represents the following value: Remainder = ST(0) - (Q * ST(1)) Here, Q is an integer value that is obtained by rounding the floating-point number quotient of [ST(0) / ST(1)] toward the nearest integer value. The magnitude of the remainder is less than or equal to half the magnitude of the modulus, unless a partial remainder was computed (as described below).
 
This instruction produces an exact result; the precision (inexact) exception does not occur and the rounding control has no effect. The following table shows the results obtained when computing the remainder of various classes of numbers, assuming that underflow does not occur.
 
|[]()||||||||
|-|-|-|-|-|-|-|-|
|-|ST(0): -inf|ST(0): -F|ST(0): -0|ST(0): +0|ST(0): +F|ST(0): +inf|ST(0): NaN|
|ST(1): -inf|*|*|*|*|*|*|NaN|
|ST(1): -F|ST(0)|-F|or|-0|**|**|-F|or|-0|ST(0)|NaN|
|ST(1): -0|-0|-0|*|*|-0|-0|NaN|
|ST(1): +0|+0|+0|*|*|+0|+0|NaN|
|ST(1): +F|ST(0)|+F|or|+0|**|**|+F|or|+0|ST(0)|NaN|
|ST(1): +inf|*|*|*|*|*|*|NaN|
|ST(1): NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
|** Indicates floating-point zero-divide (#Z) exception.|
When the result is 0, its sign is the same as that of the dividend. When the modulus is infinite, the result is equal to the value in ST(0).
 
The FPREM1 instruction computes the remainder specified in IEEE Standard 754. This instruction operates differently from the FPREM instruction in the way that it rounds the quotient of ST(0) divided by ST(1) to an integer (see the "Operations" section below).
 
Like the FPREM instruction, FPREM1 computes the remainder through iterative subtraction, but can reduce the exponent of ST(0) by no more than 63 in one execution of the instruction. If the instruction succeeds in producing a remainder that is less than one half the modulus, the operation is complete and the C2 flag in the FPU status word is cleared. Otherwise, C2 is set, and the result in ST(0) is called the partial remainder. The exponent of the partial remainder will be less than the exponent of the original dividend by at least 32. Software can re-execute the instruction (using the partial remainder in ST(0) as the dividend) until C2 is cleared. (Note that while executing such a remainder-computation loop, a higher-priority interrupting routine that needs the FPU can force a context switch in-between the instructions in the loop.) An important use of the FPREM1 instruction is to reduce the arguments of periodic functions.
 
When reduction is complete, the instruction stores the three least-significant bits of the quotient in the C3, C1, and C0 flags of the FPU status word. This information is important in argument reduction for the tangent function (using a modulus of pi/4), because it locates the original angle in the correct one of eight sectors of the unit circle.
 
 
## Operation
 
```c
D = GetExponent(ST(0)) - GetExponent(ST(1));
if(D < 64) {
	Q = Integer(RoundTowardNearestInteger(ST(0) / ST(1)));
	ST(0) = ST(0) - (ST(1) * Q);
	C0 = GetLeastSignificantBit(Q2);
	C1 = GetLeastSignificantBit(Q0);
	C2 = 0;
	C3 = GetLeastSignificantBit(Q1);
}
else {
	C2 = 1;
	N = Constant; //This is an implementation-dependent number between 32 and 63.
	QQ = Integer(TruncateTowardZero((ST(0) / ST(1)) / 2(D - N)));
	ST(0) = ST(0) - (ST(1) * QQ * 2(D - N));
}

```
 
 
## FPU flags affected
 
C0 Set to bit 2 (Q2) of the quotient.
C1 Set to 0 if stack underflow occurred; otherwise, set to least significant bit
of quotient (Q0).
C2 Set to 0 if reduction complete; set to 1 if incomplete.
C3 Set to bit 1 (Q1) of the quotient.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|Source operand is an SNaN value, modulus (divisor) is 0, dividend is infinite, or unsupported format.|
|#D|Source operand is a denormal value.|
 
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
