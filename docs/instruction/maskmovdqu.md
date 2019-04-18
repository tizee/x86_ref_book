# MASKMOVDQU
 
## Store Selected Bytes of Double Quadword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F F7 /r|MASKMOVDQU xmm1, xmm2|Selectively write bytes from xmm1 to memory|
 
## Description
 
Stores selected bytes from the source operand (first operand) into an 128-bit memory location.
 
The mask operand (second operand) selects which bytes from the source operand are written to memory. The source and mask operands are XMM registers. The location of the first byte of the memory location is specified by DI/EDI and DS registers. The memory location does not need to be aligned on a natural boundary. (The size of the store address depends on the address-size attribute.) The most significant bit in each byte of the mask operand determines whether the corresponding byte in the source operand is written to the corresponding byte location in memory: 0 indicates no write and 1 indicates write.
 
The MASKMOVEDQU instruction generates a non-temporal hint to the processor to minimize cache pollution. The non-temporal hint is implemented by using a write combining (WC) memory type protocol (see "Caching of Temporal vs. Non-Temporal Data" in Chapter 10, of the IA-32 Intel Architecture Software Developer's Manual, Volume 1). Because the WC protocol uses a weakly-ordered memory consistency model, a fencing operation implemented with the SFENCE or MFENCE instruction should be used in conjunction with MASKMOVEDQU instructions if multiple processors might use different memory types to read/write the destination memory locations.
 
Behavior with a mask of all 0s is as follows:
 
* No data will be written to memory.
* Signaling of breakpoints (code or data) is not guaranteed; different processor implementations may signal or not signal these breakpoints.
* Exceptions associated with addressing memory and page faults may still be signaled (implementation dependent).
* If the destination memory region is mapped as UC or WP, enforcement of associated semantics for these memory types is not guaranteed (that is, is reserved) and is implementation- specific.
 
The MASKMOVDQU instruction can be used to improve performance of algorithms that need to merge data on a byte-by-byte basis. MASKMOVDQU should not cause a read for ownership; doing so generates unnecessary bandwidth since data is to be written directly using the bytemask without allocating old data prior to the store.
 
location using the byte mask in xmm2.
 
 
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
if(Mask[71] == 1) Destination[(E)DI + 8] = Source[64..71];
if(Mask[79] == 1) Destination[(E)DI + 9] = Source[72..79];
if(Mask[87] == 1) Destination[(E)DI + 10] = Source[80..87];
if(Mask[95] == 1) Destination[(E)DI + 11] = Source[88..95];
if(Mask[103] == 1) Destination[(E)DI + 12] = Source[96..103];
if(Mask[111] == 1) Destination[(E)DI + 13] = Source[104..111];
if(Mask[119] == 1) Destination[(E)DI + 14] = Source[112..119];
if(Mask[127] == 1) Destination[(E)DI + 15] = Source[120..127];

```
 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. (even if mask is all 0s). If the destination operand is in a nonwritable segment. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. (even if mask is all 0s). If the destination operand is in a nonwritable segment. If the DS, ES, FS, or GS register contains a null segment selector.|
|#SS(0)|For an illegal address in the SS segment (even if mask is all 0s).|
|#PF(fault-code)|For a page fault (implementation specific).|
|#NM|If TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH. (even if mask is all 0s).|
|GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH. (even if mask is all 0s).|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault (implementation specific).|
