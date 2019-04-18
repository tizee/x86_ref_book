# FPTAN
 
## Partial Tangent
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F2|FPTAN Replace ST(0) with its tangent and push 1 onto the FPU stack.||
 
|Description|ST(0) Source|ST(0) Destination|
|-|-|-|
|
Computes the tangent of the source operand in register ST(0), stores the result in ST(0), and pushes a 1.0 onto the FPU register stack. The source operand must be given in radians and must be less than +-2^63. The following table shows the unmasked results obtained when computing the partial tangent of various classes of numbers, assuming that underflow does not occur.


FPTAN Results
ST(0) SourceST(0) Destination
-inf*
-F-F to +F
-0-0
+0+0
+F-F to +F
+inf*
NaNNaN

F Means finite floating-point value.
* Indicates floating-point invalid-arithmetic-operand (#IA) exception.



If the source operand is outside the acceptable range, the C2 flag in the FPU status word is set, and the value in register ST(0) remains unchanged. The instruction does not raise an exception when the source operand is out of range. It is up to the program to check the C2 flag for out-ofrange conditions. Source values outside the range -2^63 to +2^63 can be reduced to the range of the instruction by subtracting an appropriate integer multiple of 2 * pi or by using the FPREM instruction with a divisor of 2 * pi. See the section titled "Pi" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a discussion of the proper value to use for pi in performing such reductions.
The value 1.0 is pushed onto the register stack after the tangent has been computed to maintain compatibility with the Intel 8087 and Intel287 math coprocessors. This operation also simplifies the calculation of other trigonometric functions. For instance, the cotangent (which is the reciprocal of the tangent) can be computed by executing a FDIVR instruction after the FPTAN instruction.
|-inf|*|-F|-F to +F|-0|-0|+0|+0|+F|-F to +F|+inf|*|NaN|NaN|F Means finite floating-point value.|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
|
|-inf|*|
|-F|-F to +F|
|-0|-0|
|+0|+0|
|+F|-F to +F|
|+inf|*|
|NaN|NaN|
|F Means finite floating-point value.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
 
## Operation
 
```c
if(ST(0) < (1 << 63)) {
	C2 = 0;
	ST(0) = Tangens(ST(0));
	Top = Top - 1;
	ST(0) = 1.0;
}
else C2 = 1; //source operand is out-of-range

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred; set to 1 if stack overflow occurred.
Set if result was rounded up; cleared otherwise.
C2 Set to 1 if outside range (-2^63 < source operand < +2^63); otherwise, set to 0.
C0, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow or overflow occurred.|
|#IS|Stack underflow or overflow occurred.|
|#IA|Source operand is an SNaN value, pi, or unsupported format.|
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
|FPTAN|240-300/225-250|170|-|
