# FLD1/FLDL2T/FLDL2E/FLDPI/FLDLG2/FLDLN2/FLDZ
 
## Load Constant
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D9 E8|FLD1|Push +1.0 onto the FPU register stack.|
|D9 E9|FLDL2T|Push log_2(10) onto the FPU register stack.|
|D9 EA|FLDL2E|Push log_2(e) onto the FPU register stack.|
|D9 EB|FLDPI|Push pi onto the FPU register stack.|
|D9 EC|FLDLG2|Push log_10(2) onto the FPU register stack.|
|D9 ED|FLDLN2|Push log_e(2) onto the FPU register stack.|
|D9 EE|FLDZ|Push +0.0 onto the FPU register stack.|
 
## Description
 
Push one of seven commonly used constants (in double extended-precision floating-point format) onto the FPU register stack. The constants that can be loaded with these instructions include +1.0, +0.0, log_10(2), log_e(2), pi, log_2(10), and log_2(e). For each constant, an internal 66-bit constant is rounded (as specified by the RC field in the FPU control word) to double extendedprecision floating-point format. The inexact-result exception (#P) is not generated as a result of the rounding, nor is the C1 flag set in the x87 FPU status word if the value is rounded up.
 
See the section titled "Pi" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a description of the pi constant.
 
 
## Operation
 
```c
Top = Top - 1;
ST(0) = Constant;

```
 
 
## FPU flags affected
 
C1 Set to 1 if stack overflow occurred; otherwise, set to 0.
C0, C2, C3 Undefined.

 
 
## IA-32 Architecture Compatibility
 
When the RC field is set to round-to-nearest, the FPU produces the same constants that is produced by the Intel 8087 and Intel 287 math coprocessors.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack overflow occurred.|
 
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
