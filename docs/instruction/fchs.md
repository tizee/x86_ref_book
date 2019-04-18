# FCHS
 
## Change Sign
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 E0|FCHS|Complements sign of ST(0)|
 
|Description|ST(0) Source|ST(0) Destination|
|-|-|-|
|
Complements the sign bit of ST(0). This operation changes a positive value into a negative value of equal magnitude or vice versa. The following table shows the results obtained when changing the sign of various classes of numbers.


FCHS Results
ST(0) SourceST(0) Destination
-inf+inf
-F+F
-0+0
+0-0
+F-F
+inf-inf
NaNNaN

NOTE: F Means finite floating-point value.



|-inf|+inf|-F|+F|-0|+0|+0|-0|+F|-F|+inf|-inf|NaN|NaN|NOTE: F Means finite floating-point value.|
|
|-inf|+inf|
|-F|+F|
|-0|+0|
|+0|-0|
|+F|-F|
|+inf|-inf|
|NaN|NaN|
|NOTE: F Means finite floating-point value.|
 
## Operation
 
```c
SignBit(ST(0)) = ~SignBit(ST(0));

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred; otherwise, set to 0.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
 
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
|FCHS|3/2|1/1|FP_MISC|
