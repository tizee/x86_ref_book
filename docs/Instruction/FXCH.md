# FXCH
 
## Exchange Register Contents
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 C8+i|FXCH ST(i)|Exchange the contents of ST(0) and ST(i).|
|D9 C9|FXCH|Exchange the contents of ST(0) and ST(1).|
 
## Description
 
Exchanges the contents of registers ST(0) and ST(i). If no source operand is specified, the contents of ST(0) and ST(1) are exchanged.
 
This instruction provides a simple means of moving values in the FPU register stack to the top of the stack [ST(0)], so that they can be operated on by those floating-point instructions that can only operate on values in ST(0). For example, the following instruction sequence takes the square root of the third register from the top of the register stack:
 
FXCH ST(3);
 
FSQRT;
 
FXCH ST(3);
 
 
## Operation
 
```c
if(NumberOfOperands == 1) {
	Temporary = ST(0);
	ST(0) = Source;
	Source = Temporary;
}
else {
	Temporary = ST(0);
	ST(0) = ST(1);
	ST(1) = Temporary;
}

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
|FXCH|0|1|FP_MOVE|
