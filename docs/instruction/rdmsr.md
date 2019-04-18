# RDMSR
 
## Read from Model Specific Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 32|RDMSR|Load MSR specified by ECX into EDX:EAX.|
 
## Description
 
Loads the contents of a 64-bit model specific register (MSR) specified in the ECX register into registers EDX:EAX. The input value loaded into the ECX register is the address of the MSR to be read. The EDX register is loaded with the high-order 32 bits of the MSR and the EAX register is loaded with the low-order 32 bits. If fewer than 64 bits are implemented in the MSR being read, the values returned to EDX:EAX in unimplemented bit locations are undefined.
 
This instruction must be executed at privilege level 0 or in real-address mode; otherwise, a general protection exception #GP(0) will be generated. Specifying a reserved or unimplemented MSR address in ECX will also cause a general protection exception.
 
The MSRs control functions for testability, execution tracing, performance-monitoring, and machine check errors. Appendix B, Model-Specific Registers (MSRs), in the IA-32 Intel Architecture Software Developer's Manual, Volume 3, lists all the MSRs that can be read with this instruction and their addresses. Note that each processor family has its own set of MSRs.
 
The CPUID instruction should be used to determine whether MSRs are supported (EDX[5]=1) before using this instruction.
 
 
## Operation
 
```c
EDX:EAX = MSR[ECX];

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
The MSRs and the ability to read them with the RDMSR instruction were introduced into the IA-32 Architecture with the Pentium processor. Execution of this instruction by an IA-32 processor earlier than the Pentium processor results in an invalid opcode exception #UD.

 
