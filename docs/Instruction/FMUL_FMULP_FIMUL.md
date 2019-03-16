# FMUL/FMULP/FIMUL
 
## Multiply
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D8 /1|FMUL m32fp|Multiply ST(0) by m32fp and store result in ST(0)|
|DC /1|FMUL m64fp|Multiply ST(0) by m64fp and store result in ST(0)|
|D8 C8+i|FMUL ST(0), ST(i)|Multiply ST(0) by ST(i) and store result in ST(0)|
|DC C8+i|FMUL ST(i), ST(0)|Multiply ST(i) by ST(0) and store result in ST(i)|
|DE C8+i|FMULP ST(i), ST(0)|Multiply ST(i) by ST(0), store result in ST(i), and pop the register stack|
|DE C9|FMULP|Multiply ST(1) by ST(0), store result in ST(1), and pop the register stack|
|DA /1|FIMUL m32int|Multiply ST(0) by m32int and store result in ST(0)|
|DE /1|FIMUL m16int|Multiply ST(0) by m16int and store result in ST(0)|
 
## Description
 
Multiplies the destination and source operands and stores the product in the destination location.
 
The destination operand is always an FPU data register; the source operand can be an FPU data register or a memory location. Source operands in memory can be in single-precision or doubleprecision floating-point format or in word or doubleword integer format.
 
The no-operand version of the instruction multiplies the contents of the ST(1) register by the contents of the ST(0) register and stores the product in the ST(1) register. The one-operand version multiplies the contents of the ST(0) register by the contents of a memory location (either a floating point or an integer value) and stores the product in the ST(0) register. The two-operand version, multiplies the contents of the ST(0) register by the contents of the ST(i) register, or vice versa, with the result being stored in the register specified with the first operand (the destination operand).
 
The FMULP instructions perform the additional operation of popping the FPU register stack after storing the product. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1. The no-operand version of the floating-point multiply instructions always results in the register stack being popped. In some assemblers, the mnemonic for this instruction is FMUL rather than FMULP.
 
The FIMUL instructions convert an integer source operand to double extended-precision floating-point format before performing the multiplication.
 
The sign of the result is always the exclusive-OR of the source signs, even if one or more of the values being multiplied is 0 or infinite. When the source operand is an integer 0, it is treated as a +0.
 
The following table shows the results obtained when multiplying various classes of numbers, assuming that neither overflow nor underflow occurs.
 
|[]()||||||||
|-|-|-|-|-|-|-|-|
|-|Destination: -inf|Destination: -F|Destination: -0|Destination: +0|Destination: +F|Destination: +inf|Destination: NaN|
|Source: -inf|+inf|+inf|*|*|-inf|-inf|NaN|
|Source: -F|+inf|+F|+0|-0|-F|-inf|NaN|
|Source: -I|+inf|+F|+0|-0|-F|-inf|NaN|
|Source: -0|*|+0|+0|-0|-0|*|NaN|
|Source: +0|*|-0|-0|+0|+0|*|NaN|
|Source: +I|-inf|-F|-0|+0|+F|+inf|NaN|
|Source: +F|-inf|-F|-0|+0|+F|+inf|NaN|
|Source: +inf|-inf|-inf|*|*|+inf|+inf|NaN|
|Source: NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
|I Means Integer.|
|* Indicates invalid-arithmetic-operand (#IA) exception.|
 
## Operation
 
```c
if(Instruction == FIMUL) Destination = Destination * ConvertToExtendedDouble(Source);
else Destination = Destination * Source; //source operand is floating-point value

if(Instruction == FMULP) PopRegisterStack();

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
|#IA|Operand is an SNaN value or unsupported format. One operand is +-0 and the other is +-infinite.|
|#D|Source operand is a denormal value.|
|#U|Result is too small for destination format.|
|#O|Result is too large for destination format.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
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
|FMUL|8/7|2/2|FP_MUL|
