# FBSTP
 
## Store BCD Integer and Pop
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DF /6|FBSTP m80bcd|Store ST(0) in m80bcd and pop ST(0).|
 
|Description|ST(0)|Destination|
|-|-|-|
|
Converts the value in the ST(0) register to an 18-digit packed BCD integer, stores the result in the destination operand, and pops the register stack. If the source value is a non-integral value, it is rounded to an integer value, according to rounding mode specified by the RC field of the FPU control word. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1.
The destination operand specifies the address where the first byte destination value is to be stored. The BCD value (including its sign bit) requires 10 bytes of space in memory.
The following table shows the results obtained when storing various classes of numbers in packed BCD format.


FBSTP Results
ST(0)Destination
-inf or Value Too Large for Destination Format*
F <= -1-D
-1 < F < -0**
-0-0
+0+0
+0 < F < +1**
F >= +1+D
+inf or Value Too Large for Destination Format*
NaN*

NOTES: F Means finite floating-point value.
D Means packed-BCD number.
* Indicates floating-point invalid-operation (#IA) exception.
** +-0 or +-1, depending on the rounding mode.



If the converted value is too large for the destination format, or if the source operand is an infinite, SNaN, QNAN, or is in an unsupported format, an invalid-arithmetic-operand condition is signaled. If the invalid-operation exception is not masked, an invalid-arithmetic-operand exception (#IA) is generated and no value is stored in the destination operand. If the invalid-operation exception is masked, the packed BCD indefinite value is stored in memory.
|-inf or Value Too Large for Destination Format|*|F <= -1|-D|-1 < F < -0|**|-0|-0|+0|+0|+0 < F < +1|**|F >= +1|+D|+inf or Value Too Large for Destination Format|*|NaN|*|NOTES: F Means finite floating-point value.|D Means packed-BCD number.|* Indicates floating-point invalid-operation (#IA) exception.|** +-0 or +-1, depending on the rounding mode.|
|
|-inf or Value Too Large for Destination Format|*|
|F <= -1|-D|
|-1 < F < -0|**|
|-0|-0|
|+0|+0|
|+0 < F < +1|**|
|F >= +1|+D|
|+inf or Value Too Large for Destination Format|*|
|NaN|*|
|NOTES: F Means finite floating-point value.|
|D Means packed-BCD number.|
|* Indicates floating-point invalid-operation (#IA) exception.|
|** +-0 or +-1, depending on the rounding mode.|
 
## Operation
 
```c
Destination = BCD(ST(0));
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
|#IA|Converted value that exceeds 18 BCD digits in length. Source operand is an SNaN, QNaN, +-infinite, or in an unsupported format.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a segment register is being loaded with a segment selector that points to a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If a segment register is being loaded with a segment selector that points to a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|EM or TS in CR0 is set.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS|If a memory operand effective address is outside the SS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|EM or TS in CR0 is set.|
|#PF(fault-code)|If a page fault occurs.|
