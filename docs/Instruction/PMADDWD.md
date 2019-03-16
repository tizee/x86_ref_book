# PMADDWD
 
## Multiply and Add Packed Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F F5 /r|PMADDWD mm, mm/m64|Multiply the packed words in mm by the packed words in mm/m64, add adjacent doubleword results, and store in mm.|
|66 0F F5 /r|PMADDWD xmm1, xmm2/m128|Multiply the packed word integers in xmm1 by the packed word integers in xmm2/m128, add adjacent doubleword results, and store in xmm1.|
 
## Description
 
Multiplies the individual signed words of the destination operand (first operand) by the corresponding signed words of the source operand (second operand), producing temporary signed, doubleword results. The adjacent doubleword results are then summed and stored in the destination operand. For example, the corresponding low-order words (15-0) and (31-16) in the source and destination operands are multiplied by one another and the doubleword results are added together and stored in the low doubleword of the destination register (31-0). The same operation is performed on the other pairs of adjacent words. (Figure 4-2 shows this operation when using 64-bit operands.) The source operand can be an MMX technology register or a 64- bit memory location, or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register.
 
The PMADDWD instruction wraps around only in one situation: when the 2 pairs of words being operated on in a group are all 8000H. In this case, the result wraps around to 80000000H.
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PMADDWD instruction with 64-bit operands:
	Destination[0..31] = (Destination[0..15] * Source[0..15]) + (Destination[16..31] * Source[16..31]);
	Destination[32..63] = (Destination[32..47] * Source[32..47]) + (Destination[48..63] * Source[48..63]);
}
else {
	//PMADDWD instruction with 128-bit operands:
	Destination[0..31] = (Destination[0..15] * Source[0..15]) + (Destination[16..31] * Source[16..31]);
	Destination[32..63] = (Destination[32..47] * Source[32..47]) + (Destination[48..63] * Source[48..63]);
	Destination[64..95] = (Destination[64..79] * Source[64..79]) + (Destination[80..95] * Source[80..95]);
	Destination[96..127] = (Destination[96..111] * Source[96..111]) + (Destination[112..127] * Source[112..127]);
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. (128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. (128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#UD|If EM in CR0 is set. 128-bit operations will generate #UD only if OSFXSR in CR4 is 0. Execution of 128-bit instructions on a non-SSE2 capable processor (one that is MMX technology capable) will result in the instruction operating on the mm registers, not #UD.|
|#NM|If TS in CR0 is set.|
|#MF|(64-bit operations only) If there is a pending x87 FPU exception.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#UD|If EM in CR0 is set. 128-bit operations will generate #UD only if OSFXSR in CR4 is 0. Execution of 128-bit instructions on a non-SSE2 capable processor (one that is MMX technology capable) will result in the instruction operating on the mm registers, not #UD.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
 
## Numeric Exceptions
 
None.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PMADDWD mm, mm|9/8/-|1/1/-|FP_MUL|
|PMADDWD xmm, xmm|9/8/3+1|2/2/2|FP_MUL|
