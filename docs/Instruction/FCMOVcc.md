# FCMOVcc
 
## Floating-Point Conditional Move
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|DA C0+i|FCMOVB ST(0), ST(i)|Move if below (CF=1).|
|DA C8+i|FCMOVE ST(0), ST(i)|Move if equal (ZF=1).|
|DA D0+i|FCMOVBE ST(0), ST(i)|Move if below or equal (CF=1 or ZF=1).|
|DA D8+i|FCMOVU ST(0), ST(i)|Move if unordered (PF=1).|
|DB C0+i|FCMOVNB ST(0), ST(i)|Move if not below (CF=0).|
|DB C8+i|FCMOVNE ST(0), ST(i)|Move if not equal (ZF=0).|
|DB D0+i|FCMOVNBE ST(0), ST(i)|Move if not below or equal (CF=0 and ZF=0).|
|DB D8+i|FCMOVNU ST(0), ST(i)|Move if not unordered (PF=0).|
 
## Description
 
Tests the status flags in the EFLAGS register and moves the source operand (second operand) to the destination operand (first operand) if the given test condition is true. The condition for each mnemonic is given in the Descriptions column above and in Table 7-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1. The source operand is always in the ST(i) register and the destination operand is always ST(0).
 
The FCMOVcc instructions are useful for optimizing small IF constructions. They also help eliminate branching overhead for IF operations and the possibility of branch mispredictions by the processor.
 
A processor may not support the FCMOVcc instructions. Software can check if the FCMOVcc instructions are supported by checking the processor's feature information with the CPUID instruction (see "COMISS-Compare Scalar Ordered Single-Precision Floating-Point Values and Set EFLAGS" in this chapter). If both the CMOV and FPU feature bits are set, the FCMOVcc instructions are supported.
 
 
## Operation
 
```c
if(Condition == true) ST(0) = ST(i);

```
 
 
## FPU flags affected
 
C1 Set to 0 if stack underflow occurred.
C0, C2, C3 Undefined.

 
 
## IA-32 Architecture Compatibility
 
The FCMOVcc instructions were introduced to the IA-32 Architecture in the P6 family processors and are not available in earlier IA-32 processors.

 
 
## Floating-Point Exceptions
 
|[]()||
|-|-|
|#IS|Stack underflow occurred. Integer {flags} None.|
 
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
