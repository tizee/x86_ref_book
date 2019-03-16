# FLD
 
## Load Floating Point Value
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 /0|FLD m32fp|Push m32fp onto the FPU register stack.|
|DD /0|FLD m64fp|Push m64fp onto the FPU register stack.|
|DB /5|FLD m80fp|Push m80fp onto the FPU register stack.|
|D9 C0+i|FLD ST(i)|Push ST(i) onto the FPU register stack.|
 
## Description
 
Pushes the source operand onto the FPU register stack. The source operand can be in singleprecision, double-precision, or double extended-precision floating-point format. If the source operand is in single-precision or double-precision floating-point format, it is automatically converted to the double extended-precision floating-point format before being pushed on the stack.
 
The FLD instruction can also push the value in a selected FPU register [ST(i)] onto the stack.
 
Here, pushing register ST(0) duplicates the stack top.
 
 
## Operation
 
```c
if(Source == ST(i)) Temporary = ST(i);
Top = Top - 1;
if(IsMemoryOperand(Source)) ST(0) = ConvertToExtendedDouble(Source);
else ST(0) = Temporary;

```
 
 
## FPU flags affected
 
C1 Set to 1 if stack overflow occurred; otherwise, set to 0.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack overflow occurred.|
|#IS|Stack overflow occurred.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#D|Source operand is a denormal value. Does not occur if the source operand is in double extended-precision floating-point format.|
|#D|Source operand is a denormal value. Does not occur if the source operand is in double extended-precision floating-point format.|
|#GP(0)|If destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
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
