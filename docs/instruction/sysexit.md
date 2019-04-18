# SYSEXIT
 
## Fast Return from Fast System Call
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 35|SYSEXIT Fast return to privilege level 3 user code.||
 
## Description
 
Executes a fast return to privilege level 3 user code. This instruction is a companion instruction to the SYSENTER instruction. The SYSEXIT instruction is optimized to provide the maximum performance for returns from system procedures executing at protections levels 0 to user procedures executing at protection level 3. This instruction must be executed from code executing at privilege level 0.
 
Prior to executing the SYSEXIT instruction, software must specify the privilege level 3 code segment and code entry point, and the privilege level 3 stack segment and stack pointer by writing values into the following MSR and general-purpose registers:
 
> * SYSENTER_CS_MSR
> Contains the 32-bit segment selector for the privilege level 0 code segment in which the processor is currently executing. (This value is used to compute the segment selectors for the privilege level 3 code and stack segments.)
> * EDX
> Contains the 32-bit offset into the privilege level 3 code segment to the first instruction to be executed in the user code.
> * ECX
> Contains the 32-bit stack pointer for the privilege level 3 stack.
The SYSENTER_CS_MSR MSR can be read from and written to using the RDMSR and WRMSR instructions. The register address is listed in Table 4-3. This address is defined to remain fixed for future IA-32 processors.
 
When the SYSEXIT instruction is executed, the processor does the following:
 
* Adds 16 to the value in SYSENTER_CS_MSR and loads the sum into the CS selector register.
* Loads the instruction pointer from the EDX register into the EIP register.
* Adds 24 to the value in SYSENTER_CS_MSR and loads the sum into the SS selector register.
* Loads the stack pointer from the ECX register into the ESP register.
* Switches to privilege level 3.
* Begins executing the user code at the EIP address.
 
See "SYSENTER-Fast System Call" for information about using the SYSENTER and SYSEXIT instructions as companion call and return instructions.
 
The SYSEXIT instruction always transfers program control to a protected-mode code segment with a DPL of 3. The instruction requires that the following conditions are met by the operating system:
 
* The segment descriptor for the selected user code segment selects a flat, 32-bit code segment of up to 4 GBytes, with execute, read, accessed, and non-conforming permissions.
* The segment descriptor for selected user stack segment selects a flat, 32-bit stack segment of up to 4 GBytes, with expand-up, read, write, and accessed permissions.
 
The SYSENTER can be invoked from all operating modes except real-address mode.
 
The SYSENTER and SYSEXIT instructions were introduced into the IA-32 architecture in the Pentium II processor. The availability of these instructions on a processor is indicated with the SYSENTER/SYSEXIT present (SEP) feature flag returned to the EDX register by the CPUID instruction. An operating system that qualifies the SEP flag must also qualify the processor family and model to ensure that the SYSENTER/SYSEXIT instructions are actually present.
 
For example:
 
IF (CPUID SEP bit is set) THEN IF (Family = 6) AND (Model < 3) AND (Stepping < 3) THEN SYSENTER/SYSEXIT_Not_Supported FI; ELSE SYSENTER/SYSEXIT_Supported FI; When the CPUID instruction is executed on the Pentium Pro processor (model 1), the processor returns a the SEP flag as set, but does not support the SYSENTER/SYSEXIT instructions.
 
 
## Operation
 
```c
if(SYSENTER_CS_MSR == 0) Exception(GP(0));
if(CR0.PE == 0) Exception(GP(0));
if(CPL != 0) Exception(GP(0));
CS.SEL = SYSENTER_CS_MSR + 16; //Segment selector for return CS
//Set rest of CS to a fixed value
CS.BASE = 0; //Flat segment
CS.LIMIT = 0xFFFF; //4 GByte limit
CS.ARbyte.G = 1; //4 KByte granularity
CS.ARbyte.S = 1;
CS.ARbyte.TYPE = 0xB; //Execute, Read, Non-Conforming Code
CS.ARbyte.D = 1; //32-bit code segment
CS.ARbyte.DPL = 3;
CS.ARbyte.RPL = 3;
CS.ARbyte.P = 1;
SS.SEL = SYSENTER_CS_MSR + 24; //Segment selector for return SS
//Set rest of SS to a fixed value
SS.BASE = 0; //Flat segment
SS.LIMIT = 0xFFFF; //4 GByte limit
SS.ARbyte.G = 1; //4 KByte granularity
SS.ARbyte.S = 1;
SS.ARbyte.TYPE = 3; //Expand Up, Read/Write, Data
SS.ARbyte.D = 1; //32-bit stack segment
SS.ARbyte.DPL = 3;
SS.ARbyte.RPL = 3;
SS.ARbyte.P = 1;
ESP = ECX;
EIP = EDX;

```
 
 
## Flags affected
 
None.

 
