# FABS
 
## Absolute Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 E1|FABS|Replace ST with its absolute value.|
 
|Description|ST(0) Source|ST(0) Destination|
|-|-|-|
|
Clears the sign bit of ST(0) to create the absolute value of the operand. The following table shows the results obtained when creating the absolute value of various classes of numbers.


Results Obtained from FABS
ST(0) SourceST(0) Destination
-inf+inf
-F+F
-0+0
+0+0
+F+F
+inf+inf
NaNNaN

NOTE: F Means finite floating-point value.



|-inf|+inf|-F|+F|-0|+0|+0|+0|+F|+F|+inf|+inf|NaN|NaN|NOTE: F Means finite floating-point value.|
|
|-inf|+inf|
|-F|+F|
|-0|+0|
|+0|+0|
|+F|+F|
|+inf|+inf|
|NaN|NaN|
|NOTE: F Means finite floating-point value.|
 
## Operation
 
```c
ST(0) = GetAbsoluteValue(ST(0));

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
|FABS|3/2|1/1|FP_MISC|
