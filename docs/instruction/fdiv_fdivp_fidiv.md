# FDIV/FDIVP/FIDIV
 
## Divide
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D8 /6|FDIV m32fp|Divide ST(0) by m32fp and store result in ST(0).|
|DC /6|FDIV m64fp|Divide ST(0) by m64fp and store result in ST(0).|
|D8 F0+i|FDIV ST(0), ST(i)|Divide ST(0) by ST(i) and store result in ST(0).|
|DC F8+i|FDIV ST(i), ST(0)|Divide ST(i) by ST(0) and store result in ST(i).|
|DE F8+i|FDIVP ST(i), ST(0)|Divide ST(i) by ST(0), store result in ST(i), and pop the register stack.|
|DE F9|FDIVP|Divide ST(1) by ST(0), store result in ST(1), and pop the register stack.|
|DA /6|FIDIV m32int|Divide ST(0) by m32int and store result in ST(0).|
|DE /6|FIDIV m16int|Divide ST(0) by m64int and store result in ST(0).|
 
## Description
 
Divides the destination operand by the source operand and stores the result in the destination location. The destination operand (dividend) is always in an FPU register; the source operand (divisor) can be a register or a memory location. Source operands in memory can be in singleprecision or double-precision floating-point format, word or doubleword integer format.
 
The no-operand version of the instruction divides the contents of the ST(1) register by the contents of the ST(0) register. The one-operand version divides the contents of the ST(0) register by the contents of a memory location (either a floating-point or an integer value). The twooperand version, divides the contents of the ST(0) register by the contents of the ST(i) register or vice versa.
 
The FDIVP instructions perform the additional operation of popping the FPU register stack after storing the result. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1. The no-operand version of the floating-point divide instructions always results in the register stack being popped. In some assemblers, the mnemonic for this instruction is FDIV rather than FDIVP.
 
The FIDIV instructions convert an integer source operand to double extended-precision floating-point format before performing the division. When the source operand is an integer 0, it is treated as a +0.
 
If an unmasked divide-by-zero exception (#Z) is generated, no result is stored; if the exception is masked, an infinite of the appropriate sign is stored in the destination operand.
 
The following table shows the results obtained when dividing various classes of numbers, assuming that neither overflow nor underflow occurs.
 
|[]()||||||||
|-|-|-|-|-|-|-|-|
|-|Destination: -inf|Destination: -F|Destination: -0|Destination: +0|Destination: +F|Destination: +inf|Destination: NaN|
|Source: -inf|*|+0|+0|-0|-0|*|NaN|
|Source: -F|+inf|+F|+0|-0|-F|-inf|NaN|
|Source: -I|+inf|+F|+0|-0|-F|-inf|NaN|
|Source: -0|+inf|**|*|*|**|-inf|NaN|
|Source: +0|-inf|**|*|*|**|+inf|NaN|
|Source: +I|-inf|-F|-0|+0|+F|+inf|NaN|
|Source: +F|-inf|-F|-0|+0|+F|+inf|NaN|
|Source: +8|*|-0|-0|+0|+0|*|NaN|
|Source: NaN NaN NaN NaN NaN NaN NaN NaN|
|F Means finite floating-point value.|
|I Means integer.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
|** Indicates floating-point zero-divide (#Z) exception.|
 
## Operation
 
```c
if(Source == 0) Exception(Z);
else {
	if(Instruction == FIDIV) Destination = ConvertToExtendedDouble(Source);
	else Destination = Destination / Source;
}
if(Instruction == FDIVP) PopRegisterStack();

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
|#IA|Operand is an SNaN value or unsupported format. +-infinite / +-infinite; +-0 / +-0|
|#D|Source is a denormal value.|
|#Z|Destination / +-0, where Destination is not equal to +-0.|
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
|FDIV SP|30/23|30/23|FP_DIV|
|FDIV DP|40/38|40/38|FP_DIV|
|FDIV EP|44/43|44/43|FP_DIV|
