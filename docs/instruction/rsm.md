# RSM
 
## Resume from System Management Mode
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F AA|RSM|Resume operation of interrupted program.|
 
## Description
 
Returns program control from system management mode (SMM) to the application program or operating-system procedure that was interrupted when the processor received an SMM interrupt.
 
The processor's state is restored from the dump created upon entering SMM. If the processor detects invalid state information during state restoration, it enters the shutdown state.
 
The following invalid information can cause a shutdown:
 
* Any reserved bit of CR4 is set to 1.
* Any illegal combination of bits in CR0, such as (PG=1 and PE=0) or (NW=1 and CD=0).
* (Intel Pentium and Intel486 processors only.) The value stored in the state dump base field is not a 32-KByte aligned address.
 
The contents of the model-specific registers are not affected by a return from SMM.
 
See Chapter 13, System Management Mode (SMM), in the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for more information about SMM and the behavior of the RSM instruction.
 
 
## Operation
 
```c
ReturnFromSMM();
ProcessorState = Restore(SMMDump);

```
 
 
## Flags affected
 
All.

 
