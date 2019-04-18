# FRNDINT
 
## Round to Integer
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 FC|FRNDINT|Round ST(0) to an integer.|
 
## Description
 
Rounds the source value in the ST(0) register to the nearest integral value, depending on the current rounding mode (setting of the RC field of the FPU control word), and stores the result in ST(0).
 
If the source value is infinite, the value is not changed. If the source value is not an integral value, the floating-point inexact-result exception (#P) is generated.
 
 
## Operation
 
```c
ST(0) = RoundToIntegralValue(ST(0));

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
|FRNDINT|30|11|-|
