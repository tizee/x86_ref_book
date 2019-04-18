# MOVDQA
 
## Move Aligned Double Quadword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 6F /r|MOVDQA xmm1, xmm2/m128|Move aligned double quadword from xmm2/m128 to xmm1.|
|66 0F 7F /r|MOVDQA xmm2/m128, xmm1|Move aligned double quadword from xmm1 to xmm2/m128.|
 
## Description
 
Moves a double quadword from the source operand (second operand) to the destination operand (first operand). This instruction can be used to load an XMM register from a 128-bit memory location, to store the contents of an XMM register into a 128-bit memory location, or to move data between two XMM registers. When the source or destination operand is a memory operand, the operand must be aligned on a 16-byte boundary or a general-protection exception (#GP) will be generated.
 
To move a double quadword to or from unaligned memory locations, use the MOVDQU instruction.
 
 
## Operation
 
```c
Destination = Source;
//#GP if Source or Destination unaligned memory operand

```
 
 
## SIMD Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#PF(fault-code)|If a page fault occurs.|
|#PF(fault-code)|If a page fault occurs.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NM|If TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|MOVDQA xmm, xmm|6/6/1|1/1/1|FP_MOVE|
