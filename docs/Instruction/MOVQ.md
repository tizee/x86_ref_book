# MOVQ
 
## Move Quadword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 6F /r|MOVQ mm, mm/m64|Move quadword from mm/m64 to mm.|
|0F 7F /r|MOVQ mm/m64, mm|Move quadword from mm to mm/m64.|
|F3 0F 7E|MOVQ xmm1, xmm2/m64|Move quadword from xmm2/mem64 to xmm1.|
|66 0F D6|MOVQ xmm2/m64, xmm1|Move quadword from xmm1 to xmm2/mem64.|
 
## Description
 
Copies a quadword from the source operand (second operand) to the destination operand (first operand). The source and destination operands can be MMX technology registers, XMM registers, or 64-bit memory locations. This instruction can be used to move a quadword between two MMX technology registers or between an MMX technology register and a 64-bit memory location, or to move data between two XMM registers or between an XMM register and a 64-bit memory location. The instruction cannot be used to transfer data between memory locations.
 
When the source operand is an XMM register, the low quadword is moved; when the destination operand is an XMM register, the quadword is stored to the low quadword of the register, and the high quadword is cleared to all 0s.
 
 
## Operation
 
```c
//MOVQ instruction when operating on MMX technology registers and memory locations:
if(IsMMX(Source) || IsMMX(Destination)) Destination = Source;
//MOVQ instruction when source and destination operands are XMM registers:
else if(IsXMM(Source) && IsXMM(Destination)) Destination[0..63] = Source[0..63];
//MOVQ instruction when source operand is XMM register and destination operand is memory location:
else if(IsXMM(Source) && IsMemory(Destination)) Destination = Source[0..63];
//MOVQ instruction when source operand is memory location and destination operand is XMM register:
else {
	Destination[0..63] = Source;
	Destination[64..127] = 0;
}

```
 
 
## Flags affected
 
None.

 
 
## SIMD Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the destination operand is in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If the destination operand is in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#UD|If EM in CR0 is set. 128-bit operations will generate #UD only if OSFXSR in CR4 is 0. Execution of 128-bit instructions on a non-SSE2 capable processor (one that is MMX technology capable) will result in the instruction operating on the mm registers, not #UD.|
|#NM|If TS in CR0 is set.|
|#MF|(MMX technology register operations only.) If there is a pending FPU exception.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#UD|If EM in CR0 is set. 128-bit operations will generate #UD only if OSFXSR in CR4 is 0. Execution of 128-bit instructions on a non-SSE2 capable processor (one that is MMX technology capable) will result in the instruction operating on the mm registers, not #UD.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|If a page fault occurs.|
|#PF(fault-code)|If a page fault occurs.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|MOVQ mm, mm|6/6/-|1/1/-|FP_MOV|
|MOVQ xmm, xmm|2/2/1|2/2/1|MMX_SHFT|
