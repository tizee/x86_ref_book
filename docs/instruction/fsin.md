# FSIN
 
## Sine
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 FE|FSIN|Replace ST(0) with its sine.|
 
|Description|Source (ST(0))|Destination (ST(0))|
|-|-|-|
|
Computes the sine of the source operand in register ST(0) and stores the result in ST(0). The source operand must be given in radians and must be within the range -2^63 to +2^63. The following table shows the results obtained when taking the sine of various classes of numbers, assuming that underflow does not occur.


FSIN Results
Source (ST(0))Destination (ST(0))
-inf*
-F-1 to +1
-0-0
+0+0
+F-1 to +1
+inf*
NaNNaN

F Means finite floating-point value.
* Indicates floating-point invalid-arithmetic-operand (#IA) exception.



If the source operand is outside the acceptable range, the C2 flag in the FPU status word is set, and the value in register ST(0) remains unchanged. The instruction does not raise an exception when the source operand is out of range. It is up to the program to check the C2 flag for out-ofrange conditions. Source values outside the range -2^63 to +2^63 can be reduced to the range of the instruction by subtracting an appropriate integer multiple of 2Pi or by using the FPREM instruction with a divisor of 2Pi. See the section titled "Pi" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a discussion of the proper value to use for pi in performing such reductions.
|-inf|*|-F|-1 to +1|-0|-0|+0|+0|+F|-1 to +1|+inf|*|NaN|NaN|F Means finite floating-point value.|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
|
|-inf|*|
|-F|-1 to +1|
|-0|-0|
|+0|+0|
|+F|-1 to +1|
|+inf|*|
|NaN|NaN|
|F Means finite floating-point value.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
 
## Operation
 
```c
if(ST(0) < (1 << 63)) {
	C2 = 0;
	ST(0) = Sine(ST(0));
}
else C2 = 1; //source operand out of range

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
Set if result was rounded up; cleared otherwise.
C2 Set to 1 if outside range (-2^63 < source operand < +2^63); otherwise, set to 0.
C0, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|Source operand is an SNaN value, infinite, or unsupported format.|
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
|FSIN|160-200/160-180|130|-|
