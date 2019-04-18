# FSQRT
 
## Square Root
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 FA|FSQRT|Computes square root of ST(0) and stores the result in ST(0).|
 
|Description|Source (ST(0))|Destination (ST(0))|
|-|-|-|
|
Computes the square root of the source value in the ST(0) register and stores the result in ST(0).
The following table shows the results obtained when taking the square root of various classes of numbers, assuming that neither overflow nor underflow occurs.


FSQRT Results
Source (ST(0))Destination (ST(0))
-inf*
-F*
-0-0
+0+0
+F+F
+inf+inf
NaNNaN

F Means finite floating-point value.
* Indicates floating-point invalid-arithmetic-operand (#IA) exception.



|-inf|*|-F|*|-0|-0|+0|+0|+F|+F|+inf|+inf|NaN|NaN|F Means finite floating-point value.|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
|
|-inf|*|
|-F|*|
|-0|-0|
|+0|+0|
|+F|+F|
|+inf|+inf|
|NaN|NaN|
|F Means finite floating-point value.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
 
## Operation
 
```c
ST(0) = SquareRoot(ST(0));

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
|#IA|Source operand is an SNaN value or unsupported format. Source operand is a negative value (except for -0).|
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
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|FSQRT SP|30/23|30/23|FP_DIV|
|FSQRT DP|40/38|40/38|FP_DIV|
|FSQRT EP|44/43|44/43|FP_DIV|
