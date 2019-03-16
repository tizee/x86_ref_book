# INVD
 
## Invalidate Internal Caches
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 08|INVD|Flush internal caches; initiate flushing of external caches.|
 
## Description
 
Invalidates (flushes) the processor's internal caches and issues a special-function bus cycle that directs external caches to also flush themselves. Data held in internal caches is not written back to main memory.
 
After executing this instruction, the processor does not wait for the external caches to complete their flushing operation before proceeding with instruction execution. It is the responsibility of hardware to respond to the cache flush signal.
 
The INVD instruction is a privileged instruction. When the processor is running in protected mode, the CPL of a program or procedure must be 0 to execute this instruction.
 
Use this instruction with care. Data cached internally and not written back to main memory will be lost. Unless there is a specific requirement or benefit to flushing caches without writing back modified cache lines (for example, testing or fault recovery where cache coherency with main memory is not a concern), software should use the WBINVD instruction.
 
 
## Operation
 
```c
Flush(InternalCaches);
SignalFlush(ExternalCaches);
ContinueExecution();

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
The INVD instruction is implementation dependent; it may be implemented differently on different families of IA-32 processors. This instruction is not supported on IA-32 processors earlier than the Intel486 processor.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the current privilege level is not 0.|
 
## Real-Address Mode Exceptions
 
None.
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|The INVD instruction cannot be executed in virtual-8086 mode.|
