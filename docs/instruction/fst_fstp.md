# FST/FSTP
 
## Store Floating Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 /2|FST m32fp|Copy ST(0) to m32fp.|
|DD /2|FST m64fp|Copy ST(0) to m64fp.|
|DD D0+i|FST ST(i)|Copy ST(0) to ST(i).|
|D9 /3|FSTP m32fp|Copy ST(0) to m32fp and pop register stack.|
|DD /3|FSTP m64fp|Copy ST(0) to m64fp and pop register stack.|
|DB /7|FSTP m80fp|Copy ST(0) to m80fp and pop register stack.|
|DD D8+i|FSTP ST(i)|Copy ST(0) to ST(i) and pop register stack.|
 
## Description
 
The FST instruction copies the value in the ST(0) register to the destination operand, which can be a memory location or another register in the FPU register stack. When storing the value in memory, the value is converted to single-precision or double-precision floating-point format.
 
The FSTP instruction performs the same operation as the FST instruction and then pops the register stack. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1. The FSTP instruction can also store values in memory in double extended-precision floating-point format.
 
If the destination operand is a memory location, the operand specifies the address where the first byte of the destination value is to be stored. If the destination operand is a register, the operand specifies a register in the register stack relative to the top of the stack.
 
If the destination size is single-precision or double-precision, the mantissa of the value being stored is rounded to the width of the destination (according to the rounding mode specified by the RC field of the FPU control word), and the exponent is converted to the width and bias of the destination format. If the value being stored is too large for the destination format, a numeric overflow exception (#O) is generated and, if the exception is unmasked, no value is stored in the destination operand. If the value being stored is a denormal value, the denormal exception (#D) is not generated. This condition is simply signaled as a numeric underflow exception (#U) condition.
 
If the value being stored is +-0, +-infinite, or a NaN, the least-significant bits of the mantissa and the exponent are truncated to fit the destination format. This operation preserves the value's identity as a 0, infinite, or NaN.
 
If the destination operand is a non-empty register, the invalid-operation exception is not generated.
 
 
## Operation
 
```c
Destination = ST(0);
if(Instruction == FSTP) PopRegisterStack();

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
Indicates rounding direction of if the floating-point inexact exception (#P)
is generated: 0 = not roundup; 1 = roundup.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred.|
|#IS|Stack underflow occurred.|
|#IA|Source operand is an SNaN value or unsupported format. Does not occur if the source operand is in double extended-precision floating-point format.|
|#U|Result is too small for the destination format.|
|#O|Result is too large for the destination format.|
 
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
