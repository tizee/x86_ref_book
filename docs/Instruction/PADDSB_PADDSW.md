# PADDSB/PADDSW
 
## Add Packed Signed Integers with Signed Saturation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F EC /r|PADDSB mm, mm/m64|Add packed signed byte integers from mm/m64 and mm and saturate the results.|
|66 0F EC /r|PADDSB xmm1|Add packed signed byte integers from xmm2/m128 and xmm1 saturate the results.|
|0F ED /r|PADDSW mm, mm/m64|Add packed signed word integers from mm/m64 and mm and saturate the results.|
|66 0F ED /r|PADDSW xmm1, xmm2/m128|Add packed signed word integers from xmm2/m128 and xmm1 and saturate the results.|
 
## Description
 
Performs an SIMD add of the packed signed integers from the source operand (second operand) and the destination operand (first operand), and stores the packed integer results in the destination operand. See Figure 9-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD operation. Overflow is handled with signed saturation, as described in the following paragraphs.
 
These instructions can operate on either 64-bit or 128-bit operands. When operating on 64-bit operands, the destination operand must be an MMX technology register and the source operand can be either an MMX technology register or a 64-bit memory location. When operating on 128- bit operands, the destination operand must be an XMM register and the source operand can be either an XMM register or a 128-bit memory location.
 
The PADDSB instruction adds packed signed byte integers. When an individual byte result is beyond the range of a signed byte integer (that is, greater than 7FH or less than 80H), the saturated value of 7FH or 80H, respectively, is written to the destination operand.
 
The PADDSW instruction adds packed signed word integers. When an individual word result is beyond the range of a signed word integer (that is, greater than 7FFFH or less than 8000H), the saturated value of 7FFFH or 8000H, respectively, is written to the destination operand.
 
 
## Operation
 
```c
switch(Instruction) {
	case PADDSB:
		if(OperandSize == 64) {
			//PADDSB instruction with 64-bit operands:
			Destination[0..7] = SaturateToSignedByte(Destination[0..7] + Source[0..7]);
			Destination[8..15] = SaturateToSignedByte(Destination[8..15] + Source[8..15]);
			Destination[16..23] = SaturateToSignedByte(Destination[16..23] + Source[16..23]);
			Destination[24..31] = SaturateToSignedByte(Destination[24..31] + Source[24..31]);
			Destination[32..39] = SaturateToSignedByte(Destination[32..39] + Source[32..39]);
			Destination[40..47] = SaturateToSignedByte(Destination[40..47] + Source[40..47]);
			Destination[48..55] = SaturateToSignedByte(Destination[48..55] + Source[48..55]);
			Destination[56..63] = SaturateToSignedByte(Destination[56..63] + Source[56..63]);
		}
		else {
			//PADDSB instruction with 128-bit operands:
			Destination[0..7] = SaturateToSignedByte(Destination[0..7] + Source[0..7]);
			Destination[8..15] = SaturateToSignedByte(Destination[8..15] + Source[8..15]);
			Destination[16..23] = SaturateToSignedByte(Destination[16..23] + Source[16..23]);
			Destination[24..31] = SaturateToSignedByte(Destination[24..31] + Source[24..31]);
			Destination[32..39] = SaturateToSignedByte(Destination[32..39] + Source[32..39]);
			Destination[40..47] = SaturateToSignedByte(Destination[40..47] + Source[40..47]);
			Destination[48..55] = SaturateToSignedByte(Destination[48..55] + Source[48..55]);
			Destination[56..63] = SaturateToSignedByte(Destination[56..63] + Source[56..63]);
			Destination[64..71] = SaturateToSignedByte(Destination[64..71] + Source[64..71]);
			Destination[72..79] = SaturateToSignedByte(Destination[72..79] + Source[]72..79);
			Destination[80..87] = SaturateToSignedByte(Destination[80..87] + Source[80..87]);
			Destination[88..95] = SaturateToSignedByte(Destination[88..95] + Source[88..95]);
			Destination[96..103] = SaturateToSignedByte(Destination[96..103] + Source[96..103]);
			Destination[104..111] = SaturateToSignedByte(Destination[104..111] + Source[104..111]);
			Destination[112..119] = SaturateToSignedByte(Destination[112..119] + Source[112..119]);
			Destination[120..127] = SaturateToSignedByte(Destination[120..111] + Source[120..127]);
		}
		break;
	case PADDSW:
		if(OperandSize == 64) {
			//PADDSW instruction with 64-bit operands:
			Destination[0..15] = SaturateToSignedWord(Destination[0..15] + Source[0..15]);
			Destination[16..31] = SaturateToSignedWord(Destination[16..31] + Source[16..31]);
			Destination[32..47] = SaturateToSignedWord(Destination[32..47] + Source[32..47]);
			Destination[48..63] = SaturateToSignedWord(Destination[48..63] + Source[48..63]);
		}
		else {
			//PADDSW instruction with 128-bit operands:
			Destination[0..15] = SaturateToSignedWord(Destination[0..15] + Source[0..15]);
			Destination[16..31] = SaturateToSignedWord(Destination[16..31] + Source[16..31]);
			Destination[32..47] = SaturateToSignedWord(Destination[32..47] + Source[32..47]);
			Destination[48..63] = SaturateToSignedWord(Destination[48..63] + Source[48..63]);
			Destination[64..79] = SaturateToSignedWord(Destination[64..79] + Source[64..79]);
			Destination[80..95] = SaturateToSignedWord(Destination[80..95] + Source[80..95]);
			Destination[96..111] = SaturateToSignedWord(Destination[96..111] + Source[96..111]);
			Destination[112..127] = SaturateToSignedWord(Destination[112..127] + Source[112..127];
		}
		break;
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
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PADDSB/PADDSW mm, mm|2/2/-|1/1/-|MMX_ALU|
|PADDSB/PADDSW xmm, xmm|2/2/1|2/2/1|MMX_ALU|
