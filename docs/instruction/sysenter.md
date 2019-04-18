# SYSENTER
 
## Fast System Call
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 34|SYSENTER|Fast call to privilege level 0 system procedures.|
 
|Description|MSR|Address|
|-|-|-|
|
Executes a fast call to a level 0 system procedure or routine. This instruction is a companion instruction to the SYSEXIT instruction. The SYSENTER instruction is optimized to provide the maximum performance for system calls from user code running at privilege level 3 to operating system or executive procedures running at privilege level 0.
Prior to executing the SYSENTER instruction, software must specify the privilege level 0 code segment and code entry point, and the privilege level 0 stack segment and stack pointer by writing values into the following MSRs:

SYSENTER_CS_MSR-Contains the 32-bit segment selector for the privilege level 0 code segment. (This value is also used to compute the segment selector of the privilege level 0 stack segment.)
SYSENTER_EIP_MSR-Contains the 32-bit offset into the privilege level 0 code segment to the first instruction of the selected operating procedure or routine.
SYSENTER_ESP_MSR-Contains the 32-bit stack pointer for the privilege level 0 stack.

These MSRs can be read from and written to using the RDMSR and WRMSR instructions. The register addresses are listed in Table 4-3. These addresses are defined to remain fixed for future IA-32 processors.


MSRs Used By the SYSENTER and SYSEXIT Instructions
MSRAddress
SYSENTER_CS_MSR174H
SYSENTER_ESP_MSR175H
SYSENTER_EIP_MSR176H


When the SYSENTER instruction is executed, the processor does the following:

Loads the segment selector from the SYSENTER_CS_MSR into the CS register.
Loads the instruction pointer from the SYSENTER_EIP_MSR into the EIP register.
Adds 8 to the value in SYSENTER_CS_MSR and loads it into the SS register.
Loads the stack pointer from the SYSENTER_ESP_MSR into the ESP register.
Switches to privilege level 0.
Clears the VM flag in the EFLAGS register, if the flag is set.
Begins executing the selected system procedure.

The processor does not save a return IP or other state information for the calling procedure.
The SYSENTER instruction always transfers program control to a protected-mode code segment with a DPL of 0. The instruction requires that the following conditions are met by the operating system:

The segment descriptor for the selected system code segment selects a flat, 32-bit code segment of up to 4 GBytes, with execute, read, accessed, and non-conforming permissions.
The segment descriptor for selected system stack segment selects a flat 32-bit stack segment of up to 4 GBytes, with read, write, accessed, and expand-up permissions.

The SYSENTER can be invoked from all operating modes except real-address mode.
The SYSENTER and SYSEXIT instructions are companion instructions, but they do not constitute a call/return pair. When executing a SYSENTER instruction, the processor does not save state information for the user code, and neither the SYSENTER nor the SYSEXIT instruction supports passing parameters on the stack.
To use the SYSENTER and SYSEXIT instructions as companion instructions for transitions between privilege level 3 code and privilege level 0 operating system procedures, the following conventions must be followed:

The segment descriptors for the privilege level 0 code and stack segments and for the privilege level 3 code and stack segments must be contiguous in the global descriptor table. This convention allows the processor to compute the segment selectors from the value entered in the SYSENTER_CS_MSR MSR.
The fast system call "stub" routines executed by user code (typically in shared libraries or DLLs) must save the required return IP and processor state information if a return to the calling procedure is required. Likewise, the operating system or executive procedures called with SYSENTER instructions must have access to and use this saved return and state information when returning to the user code.

The SYSENTER and SYSEXIT instructions were introduced into the IA-32 architecture in the Pentium II processor. The availability of these instructions on a processor is indicated with the SYSENTER/SYSEXIT present (SEP) feature flag returned to the EDX register by the CPUID instruction. An operating system that qualifies the SEP flag must also qualify the processor family and model to ensure that the SYSENTER/SYSEXIT instructions are actually present.
For example:
IF (CPUID SEP bit is set)
THEN IF (Family = 6) AND (Model < 3) AND (Stepping < 3)
THEN SYSENTER/SYSEXIT_Not_Supported
FI;
ELSE SYSENTER/SYSEXIT_Supported
FI;

When the CPUID instruction is executed on the Pentium Pro processor (model 1), the processor returns a the SEP flag as set, but does not support the SYSENTER/SYSEXIT instructions.
|SYSENTER_CS_MSR|174H|SYSENTER_ESP_MSR|175H|SYSENTER_EIP_MSR|176H|
|
|SYSENTER_CS_MSR|174H|
|SYSENTER_ESP_MSR|175H|
|SYSENTER_EIP_MSR|176H|
 
## Operation
 
```c
if(CR0.PE == 0) Exception(GP(0));
if(SYSENTER_CS_MSR == 0) Exception(GP(0));
EFLAGS.VM = 0; //Insures protected mode execution
EFLAGS.IF = 0; //Mask interrupts
EFLAGS.RF = 0;
CS.SEL = SYSENTER_CS_MSR; //Operating system provides CS
//Set rest of CS to a fixed value
CS.SEL.CPL = 0;
CS.BASE = 0; (* Flat segment *)
CS.LIMIT = 0xFFFF; //4 GByte limit
CS.ARbyte.G = 1; //4 KByte granularity
CS.ARbyte.S = 1;
CS.ARbyte.TYPE = 0xB; //Execute + Read, Accessed
CS.ARbyte.D = 1; //32-bit code segment
CS.ARbyte.DPL = 0;
CS.ARbyte.RPL = 0;
CS.ARbyte.P = 1;
SS.SEL = CS.SEL + 8;
//Set rest of SS to a fixed value
SS.BASE = 0; //Flat segment
SS.LIMIT = FFFFH; //4 GByte limit
SS.ARbyte.G = 1; //4 KByte granularity
SS.ARbyte.S = 1;
SS.ARbyte.TYPE = 3; //Read/Write, Accessed
SS.ARbyte.D = 1; //32-bit stack segment
SS.ARbyte.DPL = 0;
SS.ARbyte.RPL = 0;
SS.ARbyte.P = 1;
ESP = SYSENTER_ESP_MSR;
EIP = SYSENTER_EIP_MSR;

```
 
 
## Flags affected
 
VM, IF, RF (see Operation above) {exceptions protected}
#GP(0)	If SYSENTER_CS_MSR contains zero.

 
