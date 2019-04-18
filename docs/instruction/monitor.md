# MONITOR
 
## Setup Monitor Address
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 01 C8|MONITOR|Sets up a linear address range to be monitored by hardware and activates the monitor. The address range should be of a write-back memory caching type.|
 
## Description
 
The MONITOR instruction arms the address monitoring hardware using the address specified in EAX. The address range that the monitoring hardware will check for store operations can be determined by the CPUID instruction. The monitoring hardware will detect stores to an address within the address range and triggers the monitor hardware when the write is detected. The state of the monitor hardware is used by the MWAIT instruction.
 
The content of EAX is an effective address. By default, the DS segment is used to create a linear address that is then monitored. Segment overrides can be used with the MONITOR instruction.
 
ECX and EDX are used to communicate other information to the MONITOR instruction. ECX specifies optional extensions for the MONITOR instruction. EDX specifies optional hints for the MONITOR instruction and does not change the architectural behavior of the instruction. For the Pentium 4 processor with CPUID signature of family = 15 and model = 3, no extensions or hints are defined. Specifying undefined hints in EDX are ignored by the processor, whereas specifying undefined extensions in ECX will raise a general protection fault exception on the execution of the MONITOR instruction.
 
The address range must be in memory of write-back type. Only write-back memory type stores to the monitored address range will trigger the monitoring hardware. If the address range is not in memory of write-back type, the address monitor hardware may not be armed properly. The MONITOR instruction is ordered as a load operation with respect to other memory transactions.
 
Additional information for determining the address range to prevent false wake-ups is described in Chapter 7 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3.
 
The MONITOR instruction can be used at all privilege levels and is subject to all permission checking and faults associated with a byte load. Like a load, the MONITOR instruction sets the A-bit but not the D-bit in the page tables. The MONITOR CPUID feature flag (bit 3 of ECX when CPUID is executed with EAX=1) indicates the availability of MONITOR and MWAIT instructions in the processor. When set, the unconditional execution of MONITOR is supported at privilege levels 0 and conditional execution at privilege levels 1 through 3 (software should test for the appropriate support of these instructions before unconditional use). The operating system or system BIOS may disable this instruction through the IA32_MISC_ENABLES MSR; disabling the instruction clears the CPUID feature flag and causes execution of the MONITOR instruction to generate an illegal opcode exception.
 
 
## Operation
 
```c
/*
MONITOR sets up an address range for the monitor hardware using the content of EAX as an
effective address and puts the monitor hardware in armed state. The memory address range
should be within memory of the write-back caching type. A store to the specified address range
will trigger the monitor hardware. The content of ECX and EDX are used to communicate other
information to the monitor hardware.
*/

```
 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|For ECX has a value other than 0.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault (TBD).|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|For ECX has a value other than 0.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|For ECX has a value other than 0.|
|#UD|If CPUID feature flag MONITOR is 0. If executed at privilege level 1 through 3 when the instruction is not available. If LOCK, REP, REPNE/NZ and Operand Size override prefixes are used.|
