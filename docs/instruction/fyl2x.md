# FYL2X
 
## Compute y * log_2(x)
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F1|FYL2X|Replace ST(1) with (ST(1) * log_2(ST(0))) and pop the register stack.|
 
## Description
 
Computes (ST(1) * log_2 (ST(0))), stores the result in resister ST(1), and pops the FPU register stack. The source operand in ST(0) must be a non-zero positive number.
 
The following table shows the results obtained when taking the log of various classes of numbers, assuming that neither overflow nor underflow occurs.
 
|[]()||||||||||
|-|-|-|-|-|-|-|-|-|-|
|-|ST(0): -inf|ST(0): -F|ST(0): +-0|ST(0): +0 <|+F < +1|+1|ST(0): +F > +1|+inf|NaN|
|ST(1): -inf|*|*|+inf|+inf|*|-inf|-inf|NaN|
|ST(1): -F|*|*|**|+F|-0|-F|-inf|NaN|
|ST(1): -0|*|*|*|+0|-0|-0|*|NaN|
|ST(1): +0|*|*|*|-0|+0|+0|*|NaN|
|ST(1): +F|*|*|**|-F|+0|+F|+inf|NaN|
|ST(1): +inf|*|*|-inf|-inf|*|+inf|+inf|NaN|
|ST(1): NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
|* Indicates floating-point invalid-operation (#IA) exception.|
|** Indicates floating-point zero-divide (#Z) exception.|
|If the divide-by-zero exception is masked and register ST(0) contains +-0, the instruction returns infinite with a sign that is the opposite of the sign of the source operand in register ST(1).|
|The FYL2X instruction is designed with a built-in multiplication to optimize the calculation of logarithms with an arbitrary positive base (b):|
|[code]|
|log_b(x) = log_2(x) / log_2(b)|
|[/code]|
 
## Operation
 
```c
ST(1) = ST(1) * log_2(ST(0));
PopRegisterStack();

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
|#IA|Either operand is an SNaN or unsupported format. Source operand in register ST(0) is a negative finite value (not -0).|
|#Z|Source operand in register ST(0) is +-0.|
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
|FYL2X|100-250/140-190|85|-|
