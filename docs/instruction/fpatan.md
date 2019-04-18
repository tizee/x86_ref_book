# FPATAN
 
## Partial Arctangent
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F3|FPATAN|Replace ST(1) with arctan(ST(1)/ST(0)) and pop the register stack.|
 
## Description
 
Computes the arctangent of the source operand in register ST(1) divided by the source operand in register ST(0), stores the result in ST(1), and pops the FPU register stack. The result in register ST(0) has the same sign as the source operand ST(1) and a magnitude less than +infinite.
 
The FPATAN instruction returns the angle between the X axis and the line from the origin to the point (X,Y), where Y (the ordinate) is ST(1) and X (the abscissa) is ST(0). The angle depends on the sign of X and Y independently, not just on the sign of the ratio Y/X. This is because a point (-X,Y) is in the second quadrant, resulting in an angle between pi/2 and pi, while a point (X,-Y) is in the fourth quadrant, resulting in an angle between 0 and -pi/2. A point (- X,-Y) is in the third quadrant, giving an angle between -pi/2 and -pi.
 
The following table shows the results obtained when computing the arctangent of various classes of numbers, assuming that underflow does not occur.
 
|[]()||||||||
|-|-|-|-|-|-|-|-|
|-|ST(0): -inf|ST(0): -F|ST(0): -0|ST(0): +0|ST(0): +F|ST(0): +inf|ST(0): NaN|
|ST(1): -inf|-3p/4*|-p/2|-p/2|-p/2|-p/2|-p/4*|NaN|
|ST(1): -F|-p|-p|to|-p/2|-p/2|-p/2|-p/2|to|-0|-0|NaN|
|ST(1): -0|-p|-p|-p*|-0*|-0|-0|NaN|
|ST(1): +0|+p|+p|+p*|+0*|+0|+0|NaN|
|ST(1): +F|+p|+p|to|+p/2|+p/2|+p/2|+p/2|to|+0|+0|NaN|
|ST(1): +inf|+3p/4*|+p/2|+p/2|+p/2|+p/2|+p/4*|NaN|
|ST(1): NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
|* Table 8-10 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, specifies that the ratios 0/0 and infinite/infinite generate the floating-point invalid arithmetic-operation exception and, if this exception is masked, the floating-point QNaN indefinite value is returned. With the FPATAN instruction, the 0/0 or infinite/infinite value is actually not calculated using division. Instead, the arctangent of the two variables is derived from a standard mathematical formulation that is generalized to allow complex numbers as arguments. In this complex variable formulation, arctangent(0,0) etc. has well defined values. These values are needed to develop a library to compute transcendental functions with complex arguments, based on the FPU functions that only allow floating-point values as arguments.|
There is no restriction on the range of source operands that FPATAN can accept.
 
 
## Operation
 
```c
ST(1) = ArcTangent(ST(1) / ST(0));
PopRegisterStack();

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
Set if result was rounded up; cleared otherwise.
C0, C2, C3 Undefined.

 
 
## IA-32 Architecture Compatibility
 
The source operands for this instruction are restricted for the 80287 math coprocessor to the following range:
0 <= |ST(1)| < |ST(0)| < +infinite

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|Source operand is an SNaN value or unsupported format.|
|#D|Source operand is a denormal value.|
|#U|Result is too small for destination format.|
 
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
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|FPATAN|220-300/150-300|140|-|
