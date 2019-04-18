# FXAM
 
## Examine Floating Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 E5|FXAM|Classify value or number in ST(0).|
 
|Description|Class|C3|C2|C0|
|-|-|-|-|-|
|
Examines the contents of the ST(0) register and sets the condition code flags C0, C2, and C3 in the FPU status word to indicate the class of value or number in the register (see the table below).


FXAM Results
ClassC3C2C0
Unsupported000
NaN001
Normal finite number010
Infinity011
Zero100
Empty101
Denormal number110


The C1 flag is set to the sign of the value in ST(0), regardless of whether the register is empty or full.
|Unsupported|0|0|0|NaN|0|0|1|Normal finite number|0|1|0|Infinity|0|1|1|Zero|1|0|0|Empty|1|0|1|Denormal number|1|1|0|
|
|Unsupported|0|0|0|
|NaN|0|0|1|
|Normal finite number|0|1|0|
|Infinity|0|1|1|
|Zero|1|0|0|
|Empty|1|0|1|
|Denormal number|1|1|0|
 
## Operation
 
```c
C1 = GetSignBit(ST(0));
switch(GetClass(ST(0))) {
	case ClassUnsupported:
		C3 = 0;
		C2 = 0;
		C0 = 0;
		break;
	case ClassNormal:
		C3 = 0;
		C2 = 1;
		C0 = 0;
		break;
	case ClassInfinity:
		C3 = 0;
		C2 = 1;
		C0 = 1;
		break;
	case ClassZero:
		C3 = 1;
		C2 = 0;
		C0 = 0;
		break;
	case ClassEmpty:
		C3 = 1;
		C2 = 0;
		C0 = 1;
		break;
	case ClassDenormal:
		C3 = 1;
		C2 = 1;
		C0 = 0;
		break;
}

```
 
 
## FPU flags affected
 
C1 Sign of value in ST(0).
C0, C2, C3 See table above.

 
 
## Floating-Point Exceptions
 
None.
 
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
