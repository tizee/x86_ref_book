# PACKUSWB
 
## Pack with Unsigned Saturation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 67 /r|PACKUSWB mm, mm/m64|Converts 4 signed word integers from mm and 4 signed word integers from mm/m64 into 8 unsigned byte integers in mm using unsigned saturation.|
|66 0F 67 /r|PACKUSWB xmm1, xmm2/m128|Converts 8 signed word integers from xmm1 and 8 signed word integers from xmm2/m128 into 16 unsigned byte integers in xmm1 using unsigned saturation.|
 
## Description
 
Converts 4 or 8 signed word integers from the destination operand (first operand) and 4 or 8 signed word integers from the source operand (second operand) into 8 or 16 unsigned byte integers and stores the result in the destination operand. (See Figure 4-1 for an example of the packing operation.) If a signed word integer value is beyond the range of an unsigned byte integer (that is, greater than FFH or less than 00H), the saturated unsigned byte integer value of FFH or 00H, respectively, is stored in the destination.
 
The PACKUSWB instruction operates on either 64-bit or 128-bit operands. When operating on 64-bit operands, the destination operand must be an MMX technology register and the source operand can be either an MMX technology register or a 64-bit memory location. When operating on 128-bit operands, the destination operand must be an XMM register and the source operand can be either an XMM register or a 128-bit memory location.
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PACKUSWB instruction with 64-bit operands:
	Destination[0..7] = SaturateSignedWordToUnsignedByte(Destination[0..15]);
	Destination[8..15] = SaturateSignedWordToUnsignedByte(Destination[16..31]);
	Destination[16..23] = SaturateSignedWordToUnsignedByte(Destination[32..47]);
	Destination[24..31] = SaturateSignedWordToUnsignedByte(Destination[48..63]);
	Destination[32..39] = SaturateSignedWordToUnsignedByte(Source[0..15]);
	Destination[40..47] = SaturateSignedWordToUnsignedByte(Source[16..31]);
	Destination[48..55] = SaturateSignedWordToUnsignedByte(Source[32..47]);
	Destination[56..63] = SaturateSignedWordToUnsignedByte(Source[48..63];
}
else {
	//PACKUSWB instruction with 128-bit operands:
	Destination[0..7] = SaturateSignedWordToUnsignedByte(Destination[0..15]);
	Destination[8..15] = SaturateSignedWordToUnsignedByte(Destination[16..31]);
	Destination[16..23] = SaturateSignedWordToUnsignedByte(Destination[32..47]);
	Destination[24..31] = SaturateSignedWordToUnsignedByte(Destination[48..63]);
	Destination[32..39] = SaturateSignedWordToUnsignedByte(Destination[64..79]);
	Destination[40..47] = SaturateSignedWordToUnsignedByte(Destination[80..95]);
	Destination[48..55] = SaturateSignedWordToUnsignedByte(Destination[96..111]);
	Destination[56..63] = SaturateSignedWordToUnsignedByte(Destination[112..127]);
	Destination[64..71] = SaturateSignedWordToUnsignedByte(Source[0..15]);
	Destination[72..79] = SaturateSignedWordToUnsignedByte(Source[16..31]);
	Destination[80..87] = SaturateSignedWordToUnsignedByte(Source[32..47]);
	Destination[88..95] = SaturateSignedWordToUnsignedByte(Source[48..63]);
	Destination[96..103] = SaturateSignedWordToUnsignedByte(Source[64..79]);
	Destination[104..111] = SaturateSignedWordToUnsignedByte(Source[80..95]);
	Destination[112..119] = SaturateSignedWordToUnsignedByte(Source[96..111]);
	Destination[120..127] = SaturateSignedWordToUnsignedByte(Source[112..127]);
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
|PACKUSWB mm, mm|2/2/-|1/1/-|MMX_SHFT|
|PACKUSWB xmm, xmm|4/4/2+1|2/2/2|MMX_SHFT|
