# F2XM1
 
## Compute 2x-1
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F0|F2XM1|Replace ST(0) with (2ST(0) - 1).|
 
|Description|ST(0) Source|ST(0) Destination|
|-|-|-|
|
Computes the exponential value of 2 to the power of the source operand minus 1. The source operand is located in register ST(0) and the result is also stored in ST(0). The value of the source operand must lie in the range -1.0 to +1.0. If the source value is outside this range, the result is undefined.
The following table shows the results obtained when computing the exponential value of various classes of numbers, assuming that neither overflow nor underflow occurs.


Results Obtained from F2XM1
ST(0) SourceST(0) Destination
-1.0 to -0-0.5 to -0
-0-0
+0+0
+0 to +1.0+0 to 1.0


Values other than 2 can be exponentiated using the following formula:
x^y = 2 * (y * log_2(x))

|-1.0 to -0|-0.5 to -0|-0|-0|+0|+0|+0 to +1.0|+0 to 1.0|
|
|-1.0 to -0|-0.5 to -0|
|-0|-0|
|+0|+0|
|+0 to +1.0|+0 to 1.0|
 
## Operation
 
```c
ST(0) = 2 * ST(0) - 1;

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
Set if result was rounded up; cleared otherwise.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
#IS Stack underflow occurred.
#IA Source operand is an SNaN value or unsupported format.
#D Source is a denormal value.
#U Result is too small for destination format.
#P Value cannot be represented exactly in destination format.
 
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
|F2XM1|100-200/90-150|60|-|
