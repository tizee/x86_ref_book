# FYL2XP1
 
## Compute y * log_2(x + 1)
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F9|FYL2XP1|Replace ST(1) with ST(1) * log_2(ST(0) + 1.0) and pop the register stack.|
 
## Description
 
Computes (ST(1) * log_2(ST(0) + 1.0)), stores the result in register ST(1), and pops the FPU register stack. The source operand in ST(0) must be in the range:
 
```c
sqrt(2) / 2 - 1 to 1 + sqrt(2) / 2

```
 
The source operand in ST(1) can range from -infinite to +infinite. If the ST(0) operand is outside of its acceptable range, the result is undefined and software should not rely on an exception being generated. Under some circumstances exceptions may be generated when ST(0) is out of range, but this behavior is implementation specific and not guaranteed.
 
The following table shows the results obtained when taking the log epsilon of various classes of numbers, assuming that underflow does not occur.
 
|[]()||||||
|-|-|-|-|-|-|
|-|ST(0): -(1 - sqrt(2) / 2) to -0|-0|ST(0): +0|ST(0): +0 to +(1 - sqrt(2) / 2)|ST(0): Nan|
|ST(1): -inf|+inf|*|*|-inf|NaN|
|ST(1): -F|+F|+0|-0|-F|NaN|
|ST(1): -0|+0|+0|-0|-0|NaN|
|ST(1): +0|-0|-0|+0|+0|NaN|
|ST(1): +F|-F|-0|+0|+F|NaN|
|ST(1): +inf|-inf|*|*|+inf|NaN|
|ST(1): NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
|* Indicates floating-point invalid-operation (#IA) exception.|
This instruction provides optimal accuracy for values of epsilon [the value in register ST(0)] that are close to 0. For small epsilon (?) values, more significant digits can be retained by using the FYL2XP1 instruction than by using (?+1) as an argument to the FYL2X instruction. The (?+1) expression is commonly found in compound interest and annuity calculations. The result can be simply converted into a value in another logarithm base by including a scale factor in the ST(1) source operand. The following equation is used to calculate the scale factor for a particular logarithm base, where n is the logarithm base desired for the result of the FYL2XP1 instruction:
 
```c
scale factor = log_n(2)


```
 
 
## Operation
 
```c
ST(1) = ST(1) * log_2(ST(0) + 1.0);
PopRegisterStack();
[/code]

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
|#IA|Either operand is an SNaN value or unsupported format.|
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
|FYL2XP1 140-190|85|-|
