# LDDQU
 
## Load Unaligned Integer 128 Bits
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F F0 /r|LDDQU xmm, mem|Load data from mem and return 128 bits in an xmm register.|
 
## Description
 
The instruction is functionally similar to MOVDQU xmm, m128 for loading from memory. That is: 16 bytes of data starting at an address specified by the source memory operand (second operand) are fetched from memory and placed in a destination register (first operand). The source operand need not be aligned on a 16-byte boundary. Up to 32 bytes may be loaded from memory; this is implementation dependent.
 
This instruction may improve performance relative to MOVDQU if the source operand crosses a cache line boundary. In situations that require the data loaded by LDDQU be modified and stored to the same location, use MOVDQU or MOVDQA instead of LDDQU. To move a double quadword to or from memory locations that are known to be aligned on 16-byte boundaries, use the MOVDQA instruction.
 
Implementation Notes - If the source is aligned to a 16-byte boundary, based on the implementation, the 16 bytes may be loaded more than once. For that reason, the usage of LDDQU should be avoided when using uncached or write-combining (WC) memory regions. For uncached or WC memory regions, keep using MOVDQU.
 
- This instruction is a replacement for MOVDQU (load) in situations where cache line splits significantly affect performance. It should not be used in situations where store-load forwarding is performance critical. If performance of store-load forwarding is critical to the application, use MOVDQA store-load pairs when data is 128-bit aligned or MOVDQU store-load pairs when data is 128-bit unaligned.
 
- If the memory address is not aligned on 16-byte boundary, some implementations may load up to 32 bytes and return 16 bytes in the destination. Some processor implementations may issue multiple loads to access the appropriate 16 bytes. Developers of multi-threaded or multi-processor software should be aware that on these processors the loads will be performed in a non-atomic way.
 
 
## Operation
 
```c
xmm[0..127] = m128;

```
 
 
## Numeric Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS bit in CR0 is set.|
|#UD|If CR4.OSFXSR(bit 9) = 0. If CR0.EM = 1. If CPUID.SSE3(ECX bit 0) = 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#NM|If TS bit in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#NM|If TS bit in CR0 is set.|
|#UD|If CR0.EM = 1. If CR4.OSFXSR(bit 9) = 0. If CPUID.SSE3(ECX bit 0) = 0.|
|#PF(fault-code)|For a page fault.|
