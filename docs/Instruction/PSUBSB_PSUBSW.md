# PSUBSB/PSUBSW
 
## Subtract Packed Signed Integers with Signed Saturation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F E8 /r PSUBSB mm, mm/m64 Subtract signed packed bytes in mm/m64 from signed packed bytes in mm and saturate results.|||
|66 0F E8 /r PSUBSB xmm1, xmm2/m128 Subtract packed signed byte integers in xmm2/m128 from packed signed byte integers in xmm1 and saturate results.|||
|0F E9 /r PSUBSW mm, mm/m64 Subtract signed packed words in mm/m64 from signed packed words in mm and saturate results.|||
|66 0F E9 /r PSUBSW xmm1, xmm2/m128 Subtract packed signed word integers in xmm2/m128 from packed signed word integers in xmm1 and saturate results.|||
 
## Description
 
Performs an SIMD subtract of the packed signed integers of the source operand (second operand) from the packed signed integers of the destination operand (first operand), and stores the packed integer results in the destination operand. See Figure 9-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD operation. Overflow is handled with signed saturation, as described in the following paragraphs.
 
These instructions can operate on either 64-bit or 128-bit operands. When operating on 64-bit operands, the destination operand must be an MMX technology register and the source operand can be either an MMX technology register or a 64-bit memory location. When operating on 128- bit operands, the destination operand must be an XMM register and the source operand can be either an XMM register or a 128-bit memory location.
 
The PSUBSB instruction subtracts packed signed byte integers. When an individual byte result is beyond the range of a signed byte integer (that is, greater than 7FH or less than 80H), the saturated value of 7FH or 80H, respectively, is written to the destination operand.
 
The PSUBSW instruction subtracts packed signed word integers. When an individual word result is beyond the range of a signed word integer (that is, greater than 7FFFH or less than 8000H), the saturated value of 7FFFH or 8000H, respectively, is written to the destination operand.
 
 
## Operation
 
```c
switch(Instruction) {
	case PSUBSB:
		if(OperandSize == 64) {
			//PSUBSB instruction with 64-bit operands:
			Destination[0..7] = SaturateToSignedByte(Destination[0..7] - Source[0..7]);
			Destination[8..15] = SaturateToSignedByte(Destination[8..15] - Source[8..15]);
			Destination[16..23] = SaturateToSignedByte(Destination[16..23] - Source[16..23]);
			Destination[24..31] = SaturateToSignedByte(Destination[24..31] - Source[24..31]);
			Destination[32..39] = SaturateToSignedByte(Destination[32..39] - Source[32..39]);
			Destination[40..47] = SaturateToSignedByte(Destination[40..47] - Source[40..47]);
			Destination[48..55] = SaturateToSignedByte(Destination[48..55] - Source[48..55]);
			Destination[56..63] = SaturateToSignedByte(Destination[56..63] - Source[56..63]);
		}
		else {
			//PSUBSB instruction with 128-bit operands:
			Destination[0..7] = SaturateToSignedByte(Destination[0..7] - Source[0..7]);
			Destination[8..15] = SaturateToSignedByte(Destination[8..15] - Source[8..15]);
			Destination[16..23] = SaturateToSignedByte(Destination[16..23] - Source[16..23]);
			Destination[24..31] = SaturateToSignedByte(Destination[24..31] - Source[24..31]);
			Destination[32..39] = SaturateToSignedByte(Destination[32..39] - Source[32..39]);
			Destination[40..47] = SaturateToSignedByte(Destination[40..47] - Source[40..47]);
			Destination[48..55] = SaturateToSignedByte(Destination[48..55] - Source[48..55]);
			Destination[56..63] = SaturateToSignedByte(Destination[56..63] - Source[56..63]);
			Destination[64..71] = SaturateToSignedByte(Destination[64..71] - Source[64..71]);
			Destination[72..79] = SaturateToSignedByte(Destination[72..79] - Source[]72..79);
			Destination[80..87] = SaturateToSignedByte(Destination[80..87] - Source[80..87]);
			Destination[88..95] = SaturateToSignedByte(Destination[88..95] - Source[88..95]);
			Destination[96..103] = SaturateToSignedByte(Destination[96..103] - Source[96..103]);
			Destination[104..111] = SaturateToSignedByte(Destination[104..111] - Source[104..111]);
			Destination[112..119] = SaturateToSignedByte(Destination[112..119] - Source[112..119]);
			Destination[120..127] = SaturateToSignedByte(Destination[120..111] - Source[120..127]);
		}
		break;
	case PSUBSW:
		if(OperandSize == 64) {
			//PSUBSW instruction with 64-bit operands:
			Destination[0..15] = SaturateToSignedWord(Destination[0..15] - Source[0..15]);
			Destination[16..31] = SaturateToSignedWord(Destination[16..31] - Source[16..31]);
			Destination[32..47] = SaturateToSignedWord(Destination[32..47] - Source[32..47]);
			Destination[48..63] = SaturateToSignedWord(Destination[48..63] - Source[48..63]);
		}
		else {
			//PSUBSW instruction with 128-bit operands:
			Destination[0..15] = SaturateToSignedWord(Destination[0..15] - Source[0..15]);
			Destination[16..31] = SaturateToSignedWord(Destination[16..31] - Source[16..31]);
			Destination[32..47] = SaturateToSignedWord(Destination[32..47] - Source[32..47]);
			Destination[48..63] = SaturateToSignedWord(Destination[48..63] - Source[48..63]);
			Destination[64..79] = SaturateToSignedWord(Destination[64..79] - Source[64..79]);
			Destination[80..95] = SaturateToSignedWord(Destination[80..95] - Source[80..95]);
			Destination[96..111] = SaturateToSignedWord(Destination[96..111] - Source[96..111]);
			Destination[112..127] = SaturateToSignedWord(Destination[112..127] - Source[112..127];
		}
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSUBSB/PSUBSW mm, mm|2/2/-|1/1/-|MMX_ALU|
|PSUBSB/PSUBSW xmm, xmm|2/2/1|2/2/1|MMX_ALU|
