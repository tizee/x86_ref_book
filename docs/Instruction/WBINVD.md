# WBINVD
 
## Write Back and Invalidate Cache
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 09|WBINVD|Write back and flush internal caches; initiate writing-back and flushing of external caches.|
 
## Description
 
Writes back all modified cache lines in the processor's internal cache to main memory and invalidates (flushes) the internal caches. The instruction then issues a special-function bus cycle that directs external caches to also write back modified data and another bus cycle to indicate that the external caches should be invalidated.
 
After executing this instruction, the processor does not wait for the external caches to complete their write-back and flushing operations before proceeding with instruction execution. It is the responsibility of hardware to respond to the cache write-back and flush signals.
 
The WBINVD instruction is a privileged instruction. When the processor is running in protected mode, the CPL of a program or procedure must be 0 to execute this instruction. This instruction is also a serializing instruction (see "Serializing Instructions" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3).
 
In situations where cache coherency with main memory is not a concern, software can use the INVD instruction.
 
 
## Operation
 
```c
WriteBack(InternalCaches);
Flush(InternalCaches);
SignalWriteBack(ExternalCaches);
SignalFlush(ExternalCaches);
ContinueExecution();

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
The WBINVD instruction is implementation dependent, and its function may be implemented differently on future IA-32 processors. The instruction is not supported on IA-32 processors earlier than the Intel486 processor.

 
