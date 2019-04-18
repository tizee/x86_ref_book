# MOVDQU
 
## Move Unaligned Double Quadword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 6F /r|MOVDQU xmm1, xmm2/m128|Move unaligned double quadword from xmm2/m128 to xmm1.|
|F3 0F 7F /r|MOVDQU xmm2/m128, xmm1|Move unaligned double quadword from xmm1 to xmm2/m128.|
 
## Description
 
Moves a double quadword from the source operand (second operand) to the destination operand (first operand). This instruction can be used to load an XMM register from a 128-bit memory location, to store the contents of an XMM register into a 128-bit memory location, or to move data between two XMM registers. When the source or destination operand is a memory operand, the operand may be unaligned on a 16-byte boundary without causing a general-protection exception (#GP) to be generated.
 
To move a double quadword to or from memory locations that are known to be aligned on 16- byte boundaries, use the MOVDQA instruction.
 
While executing in 16-bit addressing mode, a linear address for a 128-bit data access that overlaps the end of a 16-bit segment is not allowed and is defined as reserved behavior. A specific processor implementation may or may not generate a general-protection exception (#GP) in this situation, and the address that spans the end of the segment may or may not wrap around to the beginning of the segment.
 
 
## Operation
 
```c
Destination = Source;

```
 
 
## SIMD Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|If TS in CR0 is set.|
|#UD|If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID.SSE = 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|MOVDQU xmm, xmm|6/6/1|1/1/1|FP_MOVE|
