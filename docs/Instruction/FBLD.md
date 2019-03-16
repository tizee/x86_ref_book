# FBLD
 
## Load Binary Coded Decimal
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DF /4|FBLD m80|dec Convert BCD value to floating-point and push onto the FPU stack.|
 
## Description
 
Converts the BCD source operand into double extended-precision floating-point format and pushes the value onto the FPU stack. The source operand is loaded without rounding errors. The sign of the source operand is preserved, including that of -0.
 
The packed BCD digits are assumed to be in the range 0 through 9; the instruction does not check for invalid digits (AH through FH). Attempting to load an invalid encoding produces an undefined result.
 
 
## Operation
 
```c
TOP = TOP - 1;
ST(0) = ConvertToExtendedDouble(Source);

```
 
 
## FPU flags affected
 
C1 Set to 1 if stack overflow occurred; otherwise, set to 0.
C0, C2, C3 Undefined.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack overflow occurred.|
 
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
