# FIST/FISTP
 
## Store Integer
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DF /2|FIST m16int|Store ST(0) in m16int.|
|DB /2|FIST m32int|Store ST(0) in m32int.|
|DF /3|FISTP m16int|Store ST(0) in m16int and pop register stack.|
|DB /3|FISTP m32int|Store ST(0) in m32int and pop register stack.|
|DF /7|FISTP m64int|Store ST(0) in m64int and pop register stack.|
 
|Description|ST(0)|Destination|
|-|-|-|
|
The FIST instruction converts the value in the ST(0) register to a signed integer and stores the result in the destination operand. Values can be stored in word or doubleword integer format.
The destination operand specifies the address where the first byte of the destination value is to be stored.
The FISTP instruction performs the same operation as the FIST instruction and then pops the register stack. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1. The FISTP instruction also stores values in quadword integer format.
The following table shows the results obtained when storing various classes of numbers in integer format.


FIST/FISTP Results
ST(0)Destination
-inf or Value Too Large for Destination Format*
F = -1-I
-1 < F < -0**
-00
+00
+0 < F < +1**
F = +1+I
+inf or Value Too Large for Destination Format*
NaN*

F Means finite floating-point value.
I Means integer.
* Indicates floating-point invalid-operation (#IA) exception.
** 0 or +-1, depending on the rounding mode.



If the source value is a non-integral value, it is rounded to an integer value, according to the rounding mode specified by the RC field of the FPU control word.
If the converted value is too large for the destination format, or if the source operand is an infinite, SNaN, QNAN, or is in an unsupported format, an invalid-arithmetic-operand condition is signaled. If the invalid-operation exception is not masked, an invalid-arithmetic-operand exception (#IA) is generated and no value is stored in the destination operand. If the invalid-operation exception is masked, the integer indefinite value is stored in memory.
|-inf or Value Too Large for Destination Format|*|F = -1|-I|-1 < F < -0|**|-0|0|+0|0|+0 < F < +1|**|F = +1|+I|+inf or Value Too Large for Destination Format|*|NaN|*|F Means finite floating-point value.|I Means integer.|* Indicates floating-point invalid-operation (#IA) exception.|** 0 or +-1, depending on the rounding mode.|
|
|-inf or Value Too Large for Destination Format|*|
|F = -1|-I|
|-1 < F < -0|**|
|-0|0|
|+0|0|
|+0 < F < +1|**|
|F = +1|+I|
|+inf or Value Too Large for Destination Format|*|
|NaN|*|
|F Means finite floating-point value.|
|I Means integer.|
|* Indicates floating-point invalid-operation (#IA) exception.|
|** 0 or +-1, depending on the rounding mode.|
 
## Operation
 
```c
Destination = Integer(ST(0));
if(Instruction == FISTP) PopRegisterStack();

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
Indicates rounding direction of if the inexact exception (#P) is generated:
0 = not roundup; 1 = roundup.
Set to 0 otherwise.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|Converted value is too large for the destination format. Source operand is an SNaN, QNaN, +-infinite, or unsupported format.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If the destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
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
