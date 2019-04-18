# FSUBR/FSUBRP/FISUBR
 
## Reverse Subtract
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D8 /5|FSUBR m32fp|Subtract ST(0) from m32fp and store result in ST(0).|
|DC /5|FSUBR m64fp|Subtract ST(0) from m64fp and store result in ST(0).|
|D8 E8+i|FSUBR ST(0), ST(i)|Subtract ST(0) from ST(i) and store result in ST(0).|
|DC E0+i|FSUBR ST(i), ST(0)|Subtract ST(i) from ST(0) and store result in ST(i).|
|DE E0+i|FSUBRP ST(i), ST(0)|Subtract ST(i) from ST(0), store result in ST(i), and pop register stack.|
|DE E1|FSUBRP|Subtract ST(1) from ST(0), store result in ST(1), and pop register stack.|
|DA /5|FISUBR m32int|Subtract ST(0) from m32int and store result in ST(0).|
|DE /5|FISUBR m16int|Subtract ST(0) from m16int and store result in ST(0).|
 
## Description
 
Subtracts the destination operand from the source operand and stores the difference in the destination location. The destination operand is always an FPU register; the source operand can be a register or a memory location. Source operands in memory can be in single-precision or doubleprecision floating-point format or in word or doubleword integer format.
 
These instructions perform the reverse operations of the FSUB, FSUBP, and FISUB instructions.
 
They are provided to support more efficient coding.
 
The no-operand version of the instruction subtracts the contents of the ST(1) register from the ST(0) register and stores the result in ST(1). The one-operand version subtracts the contents of the ST(0) register from the contents of a memory location (either a floating-point or an integer value) and stores the result in ST(0). The two-operand version, subtracts the contents of the ST(i) register from the ST(0) register or vice versa.
 
The FSUBRP instructions perform the additional operation of popping the FPU register stack following the subtraction. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1. The no-operand version of the floating-point reverse subtract instructions always results in the register stack being popped. In some assemblers, the mnemonic for this instruction is FSUBR rather than FSUBRP.
 
The FISUBR instructions convert an integer source operand to double extended-precision floating-point format before performing the subtraction.
 
The following table shows the results obtained when subtracting various classes of numbers from one another, assuming that neither overflow nor underflow occurs. Here, the Destination value is subtracted from the Source value (Source - Destination = result).
 
When the difference between two operands of like sign is 0, the result is +0, except for the round toward -infinite mode, in which case the result is -0. This instruction also guarantees that +0 - (-0) = +0, and that -0 - (+0) = -0. When the source operand is an integer 0, it is treated as a +0.
 
When one operand is infinite, the result is infinite of the expected sign. If both operands are infinite of the same sign, an invalid-operation exception is generated.
 
|[]()|||||||
|-|-|-|-|-|-|-|
|- Source: -inf|Source: -F or -I|Source: -0|Source: +0|Source: +F or +I|Source: +inf|Source: NaN|
|Destination: -inf|*|-inf|-inf|-inf|-inf|-inf|NaN|
|Destination: -F|+inf|Ãï¿½âï¿½ï¿½Ãï¿½Â±F|or|Ãï¿½âï¿½ï¿½Ãï¿½Â±0|Destination|Destination|-F|-inf|NaN|
|Destination: -0|+inf|-Source|Ãï¿½âï¿½ï¿½Ãï¿½Â±0|-0|-Source|-inf|NaN|
|Destination: +0|+inf|-Source|+0|Ãï¿½âï¿½ï¿½Ãï¿½Â±0|-Source|-inf|NaN|
|Destination: +F|+inf|+F|Destination|Destination|Ãï¿½âï¿½ï¿½Ãï¿½Â±F|or|Ãï¿½âï¿½ï¿½Ãï¿½Â±0|-inf|NaN|
|Destination: +inf|+inf|+inf|+inf|+inf|+8|*|NaN|
|Destination: NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
|I Means integer.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
 
## Operation
 
```c
if(Instruction = FISUBR) Destination = ConvertToExtendedDouble(Source) - Destination;
else Destination = Source - Destination; //source operand is floating-point value

if(Instruction == FSUBRP) PopRegisterStack();

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
|#IA|Operand is an SNaN value or unsupported format. Operands are infinities of like sign.|
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
