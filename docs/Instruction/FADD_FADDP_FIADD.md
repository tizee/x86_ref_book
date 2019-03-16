# FADD/FADDP/FIADD
 
## Add
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D8 /0|FADD m32fp|Add m32fp to ST(0) and store result in ST(0).|
|DC /0|FADD m64fp|Add m64fp to ST(0) and store result in ST(0).|
|D8 C0+i|FADD ST(0), ST(i)|Add ST(0) to ST(i) and store result in ST(0).|
|DC C0+i|FADD ST(i), ST(0)|Add ST(i) to ST(0) and store result in ST(i).|
|DE C0+i|FADDP ST(i), ST(0)|Add ST(0) to ST(i), store result in ST(i), and pop the register stack.|
|DE C1|FADDP|Add ST(0) to ST(1), store result in ST(1), and pop the register stack.|
|DA /0|FIADD m32int|Add m32int to ST(0) and store result in ST(0).|
|DE /0|FIADD m16int|Add m16int to ST(0) and store result in ST(0).|
 
## Description
 
Adds the destination and source operands and stores the sum in the destination location. The destination operand is always an FPU register; the source operand can be a register or a memory location. Source operands in memory can be in single-precision or double-precision floating-point format or in word or doubleword integer format.
 
The no-operand version of the instruction adds the contents of the ST(0) register to the ST(1) register. The one-operand version adds the contents of a memory location (either a floating-point or an integer value) to the contents of the ST(0) register. The two-operand version, adds the contents of the ST(0) register to the ST(i) register or vice versa. The value in ST(0) can be doubled by coding: FADD ST(0), ST(0); The FADDP instructions perform the additional operation of popping the FPU register stack after storing the result. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1. (The no-operand version of the floating-point add instructions always results in the register stack being popped. In some assemblers, the mnemonic for this instruction is FADD rather than FADDP.) The FIADD instructions convert an integer source operand to double extended-precision floating-point format before performing the addition.
 
The table on the following page shows the results obtained when adding various classes of numbers, assuming that neither overflow nor underflow occurs.
 
When the sum of two operands with opposite signs is 0, the result is +0, except for the round toward -infinite mode, in which case the result is -0. When the source operand is an integer 0, it is treated as a +0.
 
When both operand are infinities of the same sign, the result is infinite of the expected sign. If both operands are infinities of opposite signs, an invalid-operation exception is generated. See the following table.
 
|[]()||||||||
|-|-|-|-|-|-|-|-|
|-|Destination: -inf|Destination: -F|Destination: -0|Destination: +0|Destination: +F|Destination: +inf|Destination: NaN|
|Source: -inf|-inf|-inf|-inf|-inf|-inf|*|NaN|
|Source: -F or -I|-inf|-F|Source|Source|+-F or +-0|+inf|NaN|
|Source: -0|-inf|Destination|-0|+-0|Destination|+inf|NaN|
|Source: +0|-inf|Destination|+-0|+0|Destination|+inf|NaN|
|Source: +F or +I|-inf|+-F or +-0|Source|Source|+F|+inf|NaN|
|Source: +inf|*|+inf|+inf|+inf|+inf|+8|NaN|
|Source: NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|NOTES: F Means finite floating-point value.|
|I Means integer.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
 
## Operation
 
```c
if(Instruction == FIADD) Destination = Destination + ConvertToExtendedDouble(Source);
else Destination = Destination + Source; //source operand is floating-point value
if(Instruction == FADDP) PopRegisterStack();

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
|#IA|Operand is an SNaN value or unsupported format. Operands are infinities of unlike sign.|
|#D|Source operand is a denormal value.|
|#U|Result is too small for destination format.|
|#O|Result is too large for destination format.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
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
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|FADD|6/5|1/1|FP_ADD|
