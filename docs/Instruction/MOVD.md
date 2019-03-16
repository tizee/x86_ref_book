# MOVD
 
## Move Doubleword
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 6E /r|MOVD mm, r/m32|Move doubleword from r/m32 to mm.|
|0F 7E /r|MOVD r/m32, mm|Move doubleword from mm to r/m32.|
|66 0F 6E /r|MOVD xmm, r/m32|Move doubleword from r/m32 to xmm.|
|66 0F 7E /r|MOVD r/m32, xmm|Move doubleword from xmm register to r/m32.|
 
## Description
 
Copies a doubleword from the source operand (second operand) to the destination operand (first operand). The source and destination operands can be general-purpose registers, MMX technology registers, XMM registers, or 32-bit memory locations. This instruction can be used to move a doubleword to and from the low doubleword of an MMX technology register and a general-purpose register or a 32-bit memory location, or to and from the low doubleword of an XMM register and a general-purpose register or a 32-bit memory location. The instruction cannot be used to transfer data between MMX technology registers, between XMM registers, between general-purpose registers, or between memory locations.
 
When the destination operand is an MMX technology register, the source operand is written to the low doubleword of the register, and the register is zero-extended to 64 bits. When the destination operand is an XMM register, the source operand is written to the low doubleword of the register, and the register is zero-extended to 128 bits.
 
 
## Operation
 
```c
//MOVD instruction when destination operand is MMX technology register:
if(IsMMXRegister(Destination)) {
	Destination[0..31] = Source;
	Destination[32..63] = 0;
}
//MOVD instruction when destination operand is XMM register:
else if(IsXMMRegister(Destination)) {
	Destination[0..31] = Source;
	Destination[32..127] = 0;
}
//MOVD instruction when source operand is MMX technology or XMM register:
else Destination = Source[0..31];

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
|MOVD mm, r32|2/2/-|1/1/-|MMX_ALU|
|MOVD r32, mm|5/5/-|1/1/-|FP_MISC|
|MOVD xmm, r32|6/6/1|2/2/2|MMX_MISC MMX_SHFT|
|MOVD r32, xmm|10/10/1+1|1/1/2|FP_MOVE FP_MISC|
