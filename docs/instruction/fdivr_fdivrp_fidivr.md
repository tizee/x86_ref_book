# FDIVR/FDIVRP/FIDIVR
 
## Reverse Divide
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D8 /7|FDIVR m32fp|Divide m32fp by ST(0) and store result in ST(0)|
|DC /7|FDIVR m64fp|Divide m64fp by ST(0) and store result in ST(0)|
|D8 F8+i|FDIVR ST(0), ST(i)|Divide ST(i) by ST(0) and store result in ST(0)|
|DC F0+i|FDIVR ST(i), ST(0)|Divide ST(0) by ST(i) and store result in ST(i)|
|DE F0+i|FDIVRP ST(i), ST(0)|Divide ST(0) by ST(i), store result in ST(i), and pop the register stack|
|DE F1|FDIVRP|Divide ST(0) by ST(1), store result in ST(1), and pop the register stack|
|DA /7|FIDIVR m32int|Divide m32int by ST(0) and store result in ST(0)|
|DE /7|FIDIVR m16int|Divide m16int by ST(0) and store result in ST(0)|
 
## Description
 
Divides the source operand by the destination operand and stores the result in the destination location. The destination operand (divisor) is always in an FPU register; the source operand (dividend) can be a register or a memory location. Source operands in memory can be in singleprecision or double-precision floating-point format, word or doubleword integer format.
 
These instructions perform the reverse operations of the FDIV, FDIVP, and FIDIV instructions.
 
They are provided to support more efficient coding.
 
The no-operand version of the instruction divides the contents of the ST(0) register by the contents of the ST(1) register. The one-operand version divides the contents of a memory location (either a floating-point or an integer value) by the contents of the ST(0) register. The twooperand version, divides the contents of the ST(i) register by the contents of the ST(0) register or vice versa.
 
The FDIVRP instructions perform the additional operation of popping the FPU register stack after storing the result. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1. The no-operand version of the floating-point divide instructions always results in the register stack being popped. In some assemblers, the mnemonic for this instruction is FDIVR rather than FDIVRP.
 
The FIDIVR instructions convert an integer source operand to double extended-precision floating-point format before performing the division.
 
If an unmasked divide-by-zero exception (#Z) is generated, no result is stored; if the exception is masked, an infinite of the appropriate sign is stored in the destination operand.
 
The following table shows the results obtained when dividing various classes of numbers, assuming that neither overflow nor underflow occurs.
 
|[]()||||||||
|-|-|-|-|-|-|-|-|
|-|Destination: -inf|Destination: -F|Destination: -0|Destination: +0|Destination: +F|Destination: +inf|Destination: NaN|
|Source: -inf|*|+inf|+inf|-inf|-inf|*|NaN|
|Source: -F|+0|+F|**|**|-F|-0|NaN|
|Source: -I|+0|+F|**|**|-F|-0|NaN|
|Source: -0|+0|+0|*|*|-0|-0|NaN|
|Source: +0|-0|-0|*|*|+0|+0|NaN|
|Source: +I|-0|-F|**|**|+F|+0|NaN|
|Source: +F|-0|-F|**|**|+F|+0|NaN|
|Source: +inf|*|-inf|-inf|+inf|+inf|*|NaN|
|Source: NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|F Means finite floating-point value.|
|I Means integer.|
|* Indicates floating-point invalid-arithmetic-operand (#IA) exception.|
|** Indicates floating-point zero-divide (#Z) exception.|
[/table]
When the source operand is an integer 0, it is treated as a +0.
 
 
## Operation
 
```c
if(Destination == 0) Exception(Z);
else {
	if(Instruction == FIDIVR) Destination = ConvertToExtendedDouble(Source) / Destination;
	else Destination = Source / Destination; //source operand is floating-point value
}
if(Instruction == FDIVRP) PopRegisterStack();

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
|#Z|Source / +-0, where Source is not equal to +-0.|
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
