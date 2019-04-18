# MWAIT
 
## Monitor Wait
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 01 C9|MWAIT|A hint that allows the processor to stop instruction execution and enter an implementation-dependent optimized state until occurrence of a class of events; it is architecturally identical to a NOP instruction.|
 
## Description
 
The MWAIT instruction is designed to operate with the MONITOR instruction. The two instructions allow the definition of an address at which to 'wait' (MONITOR) and an instruction that causes a predefined 'implementation-dependent-optimized operation' to commence at the 'wait' address (MWAIT). The execution of MWAIT is a hint to the processor that it can enter an implementation-dependent-optimized state while waiting for an event or a store operation to the address range armed by the preceding MONITOR instruction in program flow.
 
EAX and ECX is used to communicate other information to the MWAIT instruction, such as the kind of optimized state the processor should enter. ECX specifies optional extensions for the MWAIT instruction. EAX may contain hints such as the preferred optimized state the processor should enter. For Pentium 4 processors with CPUID signature family = 15 and model = 3, all non-zero values for EAX and ECX are reserved. The processor will raise a general protection fault on the execution of MWAIT with reserved values in ECX, whereas it ignores the setting of reserved bits in EAX.
 
A store to the address range armed by the MONITOR instruction, an interrupt, an NMI or SMI, a debug exception, a machine check exception, the BINIT# signal, the INIT# signal, or the RESET# signal will exit the implementation-dependent-optimized state. Note that an interrupt will cause the processor to exit only if the state was entered with interrupts enabled.
 
If a store to the address range causes the processor to exit, execution will resume at the instruction following the MWAIT instruction. If an interrupt (including NMI) caused the processor to exit the implementation-dependent-optimized state, the processor will exit the state and handle the interrupt. If an SMI caused the processor to exit the implementation-dependent-optimized state, execution will resume at the instruction following MWAIT after handling of the SMI.
 
Unlike the HLT instruction, the MWAIT instruction does not support a restart at the MWAIT instruction. There may also be other implementation-dependent events or time-outs that may take the processor out of the implementation-dependent-optimized state and resume execution at the instruction following the MWAIT.
 
If the preceding MONITOR instruction did not successfully arm an address range or if the MONITOR instruction has not been executed prior to executing MWAIT, then the processor will not enter the implementation-dependent-optimized state. Execution will resume at the instruction following the MWAIT.
 
The MWAIT instruction can be executed at any privilege level. The MONITOR CPUID feature flag (ECX[bit 3] when CPUID is executed with EAX = 1) indicates the availability of the MONITOR and MWAIT instruction in a processor. When set, the unconditional execution of MWAIT is supported at privilege level 0 and conditional execution is supported at privilege levels 1 through 3 (software should test for the appropriate support of these instructions before unconditional use).
 
The operating system or system BIOS may disable this instruction using the IA32_MISC_ENABLES MSR; disabling the instruction clears the CPUID feature flag and causes execution of the MWAIT instruction to generate an illegal opcode exception.
 
 
## Operation
 
```c
/*
MWAIT takes the argument in EAX as a hint extension and is
architected to take the argument in ECX as an instruction extension
MWAIT EAX, ECX
*/

while(GetMonitorState() != StateArmed) OptimizedState(EAX, ECX); //Monitor Hardware is not in armed state yet => implementation dependent optimized state
SetMonitorState(MonitorTriggered); //Set the state of Monitor Hardware as Triggered
MONITOR(EAX, ECX, EDX);
if(!TriggerStoreHappened) MWAIT(EAX, ECX);

/*
The above code sequence makes sure that a triggering store does not happen between the first
check of the trigger and the execution of the monitor instruction. Without the second check that
triggering store would go un-noticed. Typical usage of MONITOR and MWAIT would have the
above code sequence within a loop.
*/

```
 
 
## Exceptions
 
None.
 
## Numeric Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For ECX has a value other than 0.|
|#GP(0)|For ECX has a value other than 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For ECX has a value other than 0.|
|#GP(0)|For ECX has a value other than 0.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For ECX has a value other than 0.|
|#GP(0)|For ECX has a value other than 0.|
