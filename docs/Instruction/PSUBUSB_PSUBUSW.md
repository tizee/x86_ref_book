# PSUBUSB/PSUBUSW
 
## Subtract Packed Unsigned Integers with Unsigned Saturation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F D8 /r PSUBUSB mm, mm/m64 Subtract unsigned packed bytes in mm/m64 from unsigned packed bytes in mm and saturate result.|||
|66 0F D8 /r PSUBUSB xmm1, xmm2/m128 Subtract packed unsigned byte integers in xmm2/m128 from packed unsigned byte integers in xmm1 and saturate result.|||
|0F D9 /r PSUBUSW mm, mm/m64 Subtract unsigned packed words in mm/m64 from unsigned packed words in mm and saturate result.|||
|66 0F D9 /r PSUBUSW xmm1, xmm2/m128 Subtract packed unsigned word integers in xmm2/m128 from packed unsigned word integers in xmm1 and saturate result.|||
 
## Description
 
Performs an SIMD subtract of the packed unsigned integers of the source operand (second operand) from the packed unsigned integers of the destination operand (first operand), and stores the packed unsigned integer results in the destination operand. See Figure 9-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD operation.
 
Overflow is handled with unsigned saturation, as described in the following paragraphs.
 
These instructions can operate on either 64-bit or 128-bit operands. When operating on 64-bit operands, the destination operand must be an MMX technology register and the source operand can be either an MMX technology register or a 64-bit memory location. When operating on 128-bit operands, the destination operand must be an XMM register and the source operand can be either an XMM register or a 128-bit memory location.
 
The PSUBUSB instruction subtracts packed unsigned byte integers. When an individual byte result is less than zero, the saturated value of 00H is written to the destination operand.
 
The PSUBUSW instruction subtracts packed unsigned word integers. When an individual word result is less than zero, the saturated value of 0000H is written to the destination operand.
 
 
## Operation
 
```c
switch(Instruction) {
	case PSUBUSB:
		if(OperandSize == 64) {
			//PSUBUSB instruction with 64-bit operands:
			Destination[0..7] = SaturateToUnsignedByte(Destination[0..7] - Source[0..7]);
			Destination[8..15] = SaturateToUnsignedByte(Destination[8..15] - Source[8..15]);
			Destination[16..23] = SaturateToUnsignedByte(Destination[16..23] - Source[16..23]);
			Destination[24..31] = SaturateToUnsignedByte(Destination[24..31] - Source[24..31]);
			Destination[32..39] = SaturateToUnsignedByte(Destination[32..39] - Source[32..39]);
			Destination[40..47] = SaturateToUnsignedByte(Destination[40..47] - Source[40..47]);
			Destination[48..55] = SaturateToUnsignedByte(Destination[48..55] - Source[48..55]);
			Destination[56..63] = SaturateToUnsignedByte(Destination[56..63] - Source[56..63]);
		}
		else {
			//PSUBUSB instruction with 128-bit operands:
			Destination[0..7] = SaturateToUnsignedByte(Destination[0..7] - Source[0..7]);
			Destination[8..15] = SaturateToUnsignedByte(Destination[8..15] - Source[8..15]);
			Destination[16..23] = SaturateToUnsignedByte(Destination[16..23] - Source[16..23]);
			Destination[24..31] = SaturateToUnsignedByte(Destination[24..31] - Source[24..31]);
			Destination[32..39] = SaturateToUnsignedByte(Destination[32..39] - Source[32..39]);
			Destination[40..47] = SaturateToUnsignedByte(Destination[40..47] - Source[40..47]);
			Destination[48..55] = SaturateToUnsignedByte(Destination[48..55] - Source[48..55]);
			Destination[56..63] = SaturateToUnsignedByte(Destination[56..63] - Source[56..63]);
			Destination[64..71] = SaturateToUnsignedByte(Destination[64..71] - Source[64..71]);
			Destination[72..79] = SaturateToUnsignedByte(Destination[72..79] - Source[]72..79);
			Destination[80..87] = SaturateToUnsignedByte(Destination[80..87] - Source[80..87]);
			Destination[88..95] = SaturateToUnsignedByte(Destination[88..95] - Source[88..95]);
			Destination[96..103] = SaturateToUnsignedByte(Destination[96..103] - Source[96..103]);
			Destination[104..111] = SaturateToUnsignedByte(Destination[104..111] - Source[104..111]);
			Destination[112..119] = SaturateToUnsignedByte(Destination[112..119] - Source[112..119]);
			Destination[120..127] = SaturateToUnsignedByte(Destination[120..111] - Source[120..127]);
		}
		break;
	case PSUBUSW:
		if(OperandSize == 64) {
			//PSUBUSW instruction with 64-bit operands:
			Destination[0..15] = SaturateToUnsignedWord(Destination[0..15] - Source[0..15]);
			Destination[16..31] = SaturateToUnsignedWord(Destination[16..31] - Source[16..31]);
			Destination[32..47] = SaturateToUnsignedWord(Destination[32..47] - Source[32..47]);
			Destination[48..63] = SaturateToUnsignedWord(Destination[48..63] - Source[48..63]);
		}
		else {
			//PSUBUSW instruction with 128-bit operands:
			Destination[0..15] = SaturateToUnsignedWord(Destination[0..15] - Source[0..15]);
			Destination[16..31] = SaturateToUnsignedWord(Destination[16..31] - Source[16..31]);
			Destination[32..47] = SaturateToUnsignedWord(Destination[32..47] - Source[32..47]);
			Destination[48..63] = SaturateToUnsignedWord(Destination[48..63] - Source[48..63]);
			Destination[64..79] = SaturateToUnsignedWord(Destination[64..79] - Source[64..79]);
			Destination[80..95] = SaturateToUnsignedWord(Destination[80..95] - Source[80..95]);
			Destination[96..111] = SaturateToUnsignedWord(Destination[96..111] - Source[96..111]);
			Destination[112..127] = SaturateToUnsignedWord(Destination[112..127] - Source[112..127];
		}
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSUBUSB/PSUBUSW mm, mm|2/2/-|1/1/-|MMX_ALU|
|PSUBUSB/PSUBUSW xmm, xmm|2/2/1|2/2/1|MMX_ALU|
