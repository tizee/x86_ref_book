# WRMSR
 
## Write to Model Specific Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 30|WRMSR|Write the value in EDX:EAX to MSR specified by ECX.|
 
## Description
 
Writes the contents of registers EDX:EAX into the 64-bit model specific register (MSR) specified in the ECX register. The input value loaded into the ECX register is the address of the MSR to be written to. The contents of the EDX register are copied to high-order 32 bits of the selected MSR and the contents of the EAX register are copied to low-order 32 bits of the MSR. Undefined or reserved bits in an MSR should be set to the values previously read.
 
This instruction must be executed at privilege level 0 or in real-address mode; otherwise, a general protection exception #GP(0) will be generated. Specifying a reserved or unimplemented MSR address in ECX will also cause a general protection exception. The processor may also generate a general protection exception if software attempts to write to bits in an MSR marked as Reserved.
 
When the WRMSR instruction is used to write to an MTRR, the TLBs are invalidated, including the global entries (see "Translation Lookaside Buffers (TLBs)" in Chapter 3 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3).
 
The MSRs control functions for testability, execution tracing, performance-monitoring and machine check errors. Appendix B, Model-Specific Registers (MSRs), in the IA-32 Intel Architecture Software Developer's Manual, Volume 3, lists all the MSRs that can be read with this instruction and their addresses. Note that each processor family has its own set of MSRs.
 
The WRMSR instruction is a serializing instruction (see "Serializing Instructions" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3).
 
The CPUID instruction should be used to determine whether MSRs are supported (EDX[5]=1) before using this instruction.
 
 
## Operation
 
```c
MSR[ECX] = EDX:EAX;

```
 
 
## IA-32 Architecture Compatibility
 
The MSRs and the ability to read them with the WRMSR instruction were introduced into the IA-32 architecture with the Pentium processor. Execution of this instruction by an IA-32 processor earlier than the Pentium processor results in an invalid opcode exception #UD.

 
