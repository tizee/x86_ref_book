# MASKMOVQ
 
## Store Selected Bytes of Quadword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F F7 /r|MASKMOVQ mm1, mm2|Selectively write bytes from mm1 to memory location using the byte mask in mm2.|
 
## Description
 
Stores selected bytes from the source operand (first operand) into a 64-bit memory location. The mask operand (second operand) selects which bytes from the source operand are written to memory. The source and mask operands are MMX technology registers. The location of the first byte of the memory location is specified by DI/EDI and DS registers. (The size of the store address depends on the address-size attribute.) The most significant bit in each byte of the mask operand determines whether the corresponding byte in the source operand is written to the corresponding byte location in memory: 0 indicates no write and 1 indicates write.
 
The MASKMOVQ instruction generates a non-temporal hint to the processor to minimize cache pollution. The non-temporal hint is implemented by using a write combining (WC) memory type protocol (see "Caching of Temporal vs. Non-Temporal Data" in Chapter 10, of the IA-32 Intel Architecture Software Developer's Manual, Volume 1). Because the WC protocol uses a weakly-ordered memory consistency model, a fencing operation implemented with the SFENCE or MFENCE instruction should be used in conjunction with MASKMOVEDQU instructions if multiple processors might use different memory types to read/write the destination memory locations.
 
This instruction causes a transition from x87 FPU to MMX technology state (that is, the x87 FPU top-of-stack pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]).
 
The behavior of the MASKMOVQ instruction with a mask of all 0s is as follows:
 
* No data will be written to memory.
* Transition from x87 FPU to MMX technology state will occur.
* Exceptions associated with addressing memory and page faults may still be signaled (implementation dependent).
* Signaling of breakpoints (code or data) is not guaranteed (implementation dependent).
* If the destination memory region is mapped as UC or WP, enforcement of associated semantics for these memory types is not guaranteed (that is, is reserved) and is implementation- specific.
 
The MASKMOVQ instruction can be used to improve performance for algorithms that need to merge data on a byte-by-byte basis. It should not cause a read for ownership; doing so generates unnecessary bandwidth since data is to be written directly using the byte-mask without allocating old data prior to the store.
 
 
## Operation
 
```c
if(Mask[7] == 1) Destination[(E)DI] = Source[0..7];
if(Mask[15] == 1) Destination[(E)DI + 1] = Source[8..15];
if(Mask[23] == 1) Destination[(E)DI + 2] = Source[16..23];
if(Mask[31] == 1) Destination[(E)DI + 3] = Source[24..31];
if(Mask[39] == 1) Destination[(E)DI + 4] = Source[32..39];
if(Mask[47] == 1) Destination[(E)DI + 5] = Source[40..47];
if(Mask[55] == 1) Destination[(E)DI + 6] = Source[48..55];
if(Mask[63] == 1) Destination[(E)DI + 7] = Source[56..63];

```
 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. (even if mask is all 0s). If the destination operand is in a nonwritable segment. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. (even if mask is all 0s). If the destination operand is in a nonwritable segment. If the DS, ES, FS, or GS register contains a null segment selector.|
|#SS(0)|For an illegal address in the SS segment (even if mask is all 0s).|
|#PF(fault-code)|For a page fault (implementation specific).|
|#NM|If TS in CR0 is set.|
|#MF|If there is a pending FPU exception.|
|#UD|If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE is 0. If Mod field of the ModR/M byte not 11B|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH. (even if mask is all 0s).|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH. (even if mask is all 0s).|
|#NM|If TS in CR0 is set.|
|#MF|If there is a pending FPU exception.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault (implementation specific).|
|#PF(fault-code)|For a page fault (implementation specific).|
