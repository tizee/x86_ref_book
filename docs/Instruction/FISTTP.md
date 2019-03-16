# FISTTP
 
## Store Integer with Truncation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DF /1|FISTTP m16int|Store ST as a signed integer (truncate) in m16int and pop ST.|
|DB /1|FISTTP m32int|Store ST as a signed integer (truncate) in m32int and pop ST.|
|DD /1|FISTTP m64int|Store ST as a signed integer (truncate) in m64int and pop ST.|
 
|Description|ST(0)|Destination|
|-|-|-|
|
FISTTP converts the value in ST into a signed integer using truncation (chop) as rounding mode, transfers the result to the destination, and pop ST. FISTTP accepts word, short integer, and long integer destinations.
The following table shows the results obtained when storing various classes of numbers in integer format.


FISTTP Results
ST(0)Destination
-inf or Value Too Large for DestinationFormat *
F = -1-I
- 1 < F < +10
F = +1+I
+inf or Value Too Large for Destination Format*
NaN*

F Means finite floating-point value.
I Means integer.
* Indicates floating-point invalid-operation (#IA) exception.



|-inf or Value Too Large for Destination|Format *|F = -1|-I|- 1 < F < +1|0|F = +1|+I|+inf or Value Too Large for Destination Format|*|NaN|*|F Means finite floating-point value.|I Means integer.|* Indicates floating-point invalid-operation (#IA) exception.|
|
|-inf or Value Too Large for Destination|Format *|
|F = -1|-I|
|- 1 < F < +1|0|
|F = +1|+I|
|+inf or Value Too Large for Destination Format|*|
|NaN|*|
|F Means finite floating-point value.|
|I Means integer.|
|* Indicates floating-point invalid-operation (#IA) exception.|
 
## Operation
 
```c
Destination = ST;
ST = Pop();

```
 
 
## Flags affected
 
C1 is cleared; C0, C2, C3 undefined.

 
 
## Numeric Exceptions
 
Invalid, Stack Invalid (stack underflow), Precision.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the destination is in a nonwritable segment. For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|If the destination is in a nonwritable segment. For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#AC(0)|If alignment checking is enabled and an unaligned memory reference is made while the current privilege level is 3.|
|#NM|If CR0.EM = 1. If TS bit in CR0 is set.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#NM|If CR0.EM = 1. If TS bit in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#NM|If CR0.EM = 1. If TS bit in CR0 is set.|
|#UD|If CPUID.SSE3(ECX bit 0) = 0.|
|#PF(fault-code)|For a page fault.|
