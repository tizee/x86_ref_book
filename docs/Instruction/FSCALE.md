# FSCALE
 
## Scale
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 FD|FSCALE|Scale ST(0) by ST(1).|
 
## Description
 
Truncates the value in the source operand (toward 0) to an integral value and adds that value to the exponent of the destination operand. The destination and source operands are floating-point values located in registers ST(0) and ST(1), respectively. This instruction provides rapid multiplication or division by integral powers of 2. The following table shows the results obtained when scaling various classes of numbers, assuming that neither overflow nor underflow occurs.
 
|[]()||||||||
|-|-|-|-|-|-|-|-|
|-|ST(1): -inf|ST(1): -F|ST(1): -0|ST(1): +0|ST(1): +F|ST(1): +inf|ST(1): NaN|
|ST(0): -inf|NaN|-inf|-inf|-inf|-inf|-inf|NaN|
|ST(0): -F|-0|-F|-F|-F|-F|-inf|NaN|
|ST(0): -0|-0|-0|-0|-0|-0|NaN|NaN|
|ST(0): +0|+0|+0|+0|+0|+0|NaN|NaN|
|ST(0): +F|+0|+F|+F|+F|+F|+inf|NaN|
|ST(0): +inf|NaN|+inf|+inf|+inf|+inf|+inf|NaN|
|ST(0): NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
In most cases, only the exponent is changed and the mantissa remains unchanged.
 
However, when the value being scaled in ST(0) is a denormal value, the mantissa is also changed and the result may turn out to be a normalized number. Similarly, if overflow or underflow results from a scale operation, the resulting mantissa will differ from the source's mantissa.
 
The FSCALE instruction can also be used to reverse the action of the FXTRACT instruction, as shown in the following example: FXTRACT; FSCALE; FSTP ST(1); In this example, the FXTRACT instruction extracts the mantissa and exponent from the value in ST(0) and stores them in ST(0) and ST(1) respectively. The FSCALE then scales the mantissa in ST(0) by the exponent in ST(1), recreating the original value before the FXTRACT operation was performed. The FSTP ST(1) instruction overwrites the exponent (extracted by the FXTRACT instruction) with the recreated value, which returns the stack to its original state with only one register [ST(0)] occupied.
 
 
## Operation
 
```c
ST(0) = ST(0) * 2RoundTowardZero(ST(1));

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
Set if result was rounded up; cleared otherwise.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|Source operand is an SNaN value or unsupported format.|
|#D|Source operand is a denormal value.|
|#U|Result is too small for destination format.|
|#O|Result is too large for destination format.|
 
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
|FSCALE|60|7|-|
