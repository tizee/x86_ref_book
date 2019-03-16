# FXTRACT
 
## Extract Exponent and Mantissa
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 F4|FXTRACT|Separate value in ST(0) into exponent and mantissa, store exponent in ST(0), and push the mantissa onto the register stack.|
 
## Description
 
Separates the source value in the ST(0) register into its exponent and mantissa, stores the exponent in ST(0), and pushes the mantissa onto the register stack. Following this operation, the new top-of-stack register ST(0) contains the value of the original mantissa expressed as a floating-point value. The sign and mantissa of this value are the same as those found in the source operand, and the exponent is 3FFFH (biased value for a true exponent of zero). The ST(1) register contains the value of the original operand's true (unbiased) exponent expressed as a floating-point value. (The operation performed by this instruction is a superset of the IEEErecommended logb(x) function.) This instruction and the F2XM1 instruction are useful for performing power and range scaling operations. The FXTRACT instruction is also useful for converting numbers in double extended-precision floating-point format to decimal representations (e.g., for printing or displaying).
 
If the floating-point zero-divide exception (#Z) is masked and the source operand is zero, an exponent value of -infinite is stored in register ST(1) and 0 with the sign of the source operand is stored in register ST(0).
 
 
## Operation
 
```c
Temporary = GetMantissa(ST(0));
ST(0) = GetExponent(ST(0));
Top = Top - 1;
ST(0) = Temporary;

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred; set to 1 if stack overflow occurred.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow or overflow occurred.|
|#IS|Stack underflow or overflow occurred.|
|#IA|Source operand is an SNaN value or unsupported format.|
|#Z|ST(0) operand is +-0.|
 
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
