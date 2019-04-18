# PACKSSWB/PACKSSDW
 
## Pack with Signed Saturation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 63 /r PACKSSWB mm1, mm2/m64 Converts 4 packed signed word integers from mm1 and from mm2/m64 into 8 packed signed byte integers in mm1 using signed saturation.|||
|66 0F 63 /r PACKSSWB xmm1, xmm2/m128 Converts 8 packed signed word integers from xmm1 and from xmm2/m128 into 16 packed signed byte integers in xmm1 using signed saturation.|||
|0F 6B /r PACKSSDW mm1, mm2/m64 Converts 2 packed signed doubleword integers from mm1 and from mm2/m64 into 4 packed signed word integers in mm1 using signed saturation.|||
|66 0F 6B /r PACKSSDW xmm1, xmm2/m128 Converts 4 packed signed doubleword integers from xmm1 and from xmm2/m128 into 8 packed signed word integers in xmm1 using signed saturation.|||
 
## Description
 
Converts packed signed word integers into packed signed byte integers (PACKSSWB) or converts packed signed doubleword integers into packed signed word integers (PACKSSDW), using saturation to handle overflow conditions. See Figure 4-1 for an example of the packing operation.
 
The PACKSSWB instruction converts 4 or 8 signed word integers from the destination operand (first operand) and 4 or 8 signed word integers from the source operand (second operand) into 8 or 16 signed byte integers and stores the result in the destination operand. If a signed word integer value is beyond the range of a signed byte integer (that is, greater than 7FH for a positive integer or greater than 80H for a negative integer), the saturated signed byte integer value of 7FH or 80H, respectively, is stored in the destination.
 
The PACKSSDW instruction packs 2 or 4 signed doublewords from the destination operand (first operand) and 2 or 4 signed doublewords from the source operand (second operand) into 4 or 8 signed words in the destination operand. If a signed doubleword integer value is beyond the range of a signed word (that is, greater than 7FFFH for a positive integer or greater than 8000H for a negative integer), the saturated signed word integer value of 7FFFH or 8000H, respectively, is stored into the destination.
 
The PACKSSWB and PACKSSDW instructions operate on either 64-bit or 128-bit operands. When operating on 64-bit operands, the destination operand must be an MMX technology register and the source operand can be either an MMX technology register or a 64-bit memory location. When operating on 128-bit operands, the destination operand must be an XMM register and the source operand can be either an XMM register or a 128-bit memory location.
 
 
## Operation
 
```c
switch(Instruction) {
	case PACKSSWB:
		if(OperandSize == 64) {
			//PACKSSWB instruction with 64-bit operands
			Destination[0..7] = SaturateSignedWordToSignedByte(Destination[0..15]);
			Destination[8..15] = SaturateSignedWordToSignedByte(Destination[16..31]);
			Destination[16..23] = SaturateSignedWordToSignedByte(Destination[32..47]);
			Destination[24..31] = SaturateSignedWordToSignedByte(Destination[48..63]);
			Destination[32..39] = SaturateSignedWordToSignedByte(Source[0..15]);
			Destination[40..47] = SaturateSignedWordToSignedByte(Source[16..31]);
			Destination[48..55] = SaturateSignedWordToSignedByte(Source[32..47]);
			Destination[56..63] = SaturateSignedWordToSignedByte(Source[48..63]);
		}
		else {
			//PACKSSWB instruction with 128-bit operands
			Destination[0..7] = SaturateSignedWordToSignedByte(Destination[0..15]);
			Destination[8..15] = SaturateSignedWordToSignedByte(Destination[16..31]);
			Destination[16..23] = SaturateSignedWordToSignedByte(Destination[32..47]);
			Destination[24..31] = SaturateSignedWordToSignedByte(Destination[48..63]);
			Destination[32..39] = SaturateSignedWordToSignedByte(Destination[64..79]);
			Destination[40..47] = SaturateSignedWordToSignedByte(Destination[80..95]);
			Destination[48..55] = SaturateSignedWordToSignedByte(Destination[96..111]);
			Destination[56..63] = SaturateSignedWordToSignedByte(Destination[112..127]);
			Destination[64..71] = SaturateSignedWordToSignedByte(Source[0..15]);
			Destination[72..79] = SaturateSignedWordToSignedByte(Source[16..31]);
			Destination[80..87] = SaturateSignedWordToSignedByte(Source[32..47]);
			Destination[88..95] = SaturateSignedWordToSignedByte(Source[48..63]);
			Destination[96..103] = SaturateSignedWordToSignedByte(Source[64..79]);
			Destination[104..111] = SaturateSignedWordToSignedByte(Source[80..95]);
			Destination[112..119] = SaturateSignedWordToSignedByte(Source[96..111]);
			Destination[120..127] = SaturateSignedWordToSignedByte(Source[112..127]);
		}
		break;
	case PACKSSDW:
		if(OperandSize == 64) {
			//PACKSSDW instruction with 64-bit operands
			Destination[0..15] = SaturateSignedDoublewordToSignedWord(Destination[0..31]);
			Destination[16..31] = SaturateSignedDoublewordToSignedWord(Destination[32..63]);
			Destination[32..47] = SaturateSignedDoublewordToSignedWord(Source[0..31]);
			Destination[48..63] = SaturateSignedDoublewordToSignedWord(Source[32..63]);
		}
		else {
			//PACKSSDW instruction with 128-bit operands
			Destination[0..15] = SaturateSignedDwordToSignedWord(Destination[0..31]);
			Destination[16..31] = SaturateSignedDwordToSignedWord(Destination[32..63]);
			Destination[32..47] = SaturateSignedDwordToSignedWord(Destination[64..95]);
			Destination[48..63] = SaturateSignedDwordToSignedWord(Destination[96..127]);
			Destination[64..79] = SaturateSignedDwordToSignedWord(Source[0..31]);
			Destination[80..95] = SaturateSignedDwordToSignedWord(Source[32..63]);
			Destination[96..111] = SaturateSignedDwordToSignedWord(Source[64..95]);
			Destination[112..127] = SaturateSignedDwordToSignedWord Source[96..127]);
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
|#UD|If EM in CR0 is set. (128-bit operations only) If OSFXSR in CR4 is 0.|
|#NM|If TS in CR0 is set.|
|#MF|(64-bit operations only) If there is a pending x87 FPU exception.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#UD|If EM in CR0 is set. (128-bit operations only) If OSFXSR in CR4 is 0.|
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
|PACKSSWB/PACKSSDW mm, mm|2/2/-|1/1/-|MMX_SHFT|
|PACKSSWB/PACKSSDW xmm, xmm|4/4/2+1|2/2/2|MMX_SHFT|
