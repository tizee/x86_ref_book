# PUNPCKLBW/PUNPCKLWD/PUNPCKLDQ/PUNPCKLQDQ
 
##  Unpack Low Data
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 60 /r|PUNPCKLBW mm, mm/m32|Interleave low-order bytes from mm and mm/m32 into mm.|
|66 0F 60 /r|PUNPCKLBW xmm1, xmm2/m128|Interleave low-order bytes from xmm1 and xmm2/m128 into xmm1.|
|0F 61 /r|PUNPCKLWD mm, mm/m32|Interleave low-order words from mm and mm/m32 into mm.|
|66 0F 61 /r|PUNPCKLWD xmm1, xmm2/m128|Interleave low-order words from xmm1 and xmm2/m128 into xmm1.|
|0F 62 /r|PUNPCKLDQ mm, mm/m32|Interleave low-order doublewords from mm and mm/m32 into mm.|
|66 0F 62 /r|PUNPCKLDQ xmm1, xmm2/m128|Interleave low-order doublewords from xmm1 and xmm2/m128 into xmm1.|
|66 0F 6C /r|PUNPCKLQDQ xmm1, xmm2/m128|Interleave low-order quadwords from xmm1 and xmm2/m128 into xmm1.|
 
## Description
 
Unpacks and interleaves the low-order data elements (bytes, words, doublewords, and quadwords) of the destination operand (first operand) and source operand (second operand) into the destination operand. The high-order data elements are ignored.
 
The source operand can be an MMX technology register or a 32-bit memory location, or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register. When the source data comes from a 128-bit memory operand, an implementation may fetch only the appropriate 64 bits; however, alignment to a 16-byte boundary and normal segment checking will still be enforced.
 
The PUNPCKLBW instruction interleaves the low-order bytes of the source and destination operands, the PUNPCKLWD instruction interleaves the low-order words of the source and destination operands, the PUNPCKLDQ instruction interleaves the low-order doubleword (or doublewords) of the source and destination operands, and the PUNPCKLQDQ instruction interleaves the low-order quadwords of the source and destination operands.
 
These instructions can be used to convert bytes to words, words to doublewords, doublewords to quadwords, and quadwords to double quadwords, respectively, by placing all 0s in the source operand. Here, if the source operand contains all 0s, the result (stored in the destination operand) contains zero extensions of the high-order data elements from the original value in the destination operand. For example, with the PUNPCKLBW instruction the high-order bytes are zero extended (that is, unpacked into unsigned word integers), and with the PUNPCKLWD instruction, the high-order words are zero extended (unpacked into unsigned doubleword integers).
 
 
## Operation
 
```c
switch(Instruction) {
	case PUNPCKLBW:
		if(OperandSize == 16) {
			//PUNPCKLBW instruction with 64-bit operands:
			Destination[63..56] = Source[31..24];
			Destination[55..48] = Destination[31..24];
			Destination[47..40] = Source[23..16];
			Destination[39..32] = Destination[23..16];
			Destination[31..24] = Source[15..8];
			Destination[23..16] = Destination[15..8];
			Destination[15..8] = Source[7..0];
			Destination[7..0] = Destination[7..0];
		}
		else {
			//PUNPCKLBW instruction with 128-bit operands:
			Destination[0..7] = Destination[0..7];
			Destination[8..15] = Source[0..7];
			Destination[16..23] = Destination[8..15];
			Destination[24..31] = Source[8..15];
			Destination[32..39] = Destination[16..23];
			Destination[40..47] = Source[16..23];
			Destination[48..55] = Destination[24..31];
			Destination[56..63] = Source[24..31];
			Destination[64..71] = Destination[32..39];
			Destination[72..79] = Source[32..39];
			Destination[80..87] = Destination[40..47];
			Destination[88..95] = Source[40..47];
			Destination[96..103] = Destination[48..55];
			Destination[104..111] = Source[48..55];
			Destination[112..119] = Destination[56..63];
			Destination[120..127] = Source[56..63];
		}
		break;
	case PUNPCKLWD:
		if(OperandSize == 16) {
			//PUNPCKLWD instruction with 64-bit operands:
			Destination[63..48] = Source[31..16];
			Destination[47..32] = Destination[31..16];
			Destination[31..16] = Source[15..0];
			Destination[15..0] = Destination[15..0];
		}
		else {
			//PUNPCKLWD instruction with 128-bit operands:
			Destination[0..15] = Destination[0..15];
			Destination[16..31] = Source[0..15];
			Destination[32..47] = Destination[16..31];
			Destination[48..63] = Source[16..31];
			Destination[64..79] = Destination[32..47];
			Destination[80..95] = Source[32..47];
			Destination[96..111] = Destination[48..63];
			Destination[112..127] = Source[48..63];
		}
		break;
	case PUNPCKLDQ:
		if(OperandSize == 16) {
			//PUNPCKLDQ instruction with 64-bit operands:
			Destination[32..63] = Source[0..31];
			Destination[0..31] = Destination[0..31];
		}
		else {
			//PUNPCKLDQ instruction with 128-bit operands:
			Destination[0..31] = Destination[0..31];
			Destination[32..63] = Source[0..31];
			Destination[64..95] = Destination[32..63];
			Destination[96..127] = Source[32..63];
		}
		break;
	case PUNPCKLQDQ:
		//PUNPCKLQDQ instruction:
		Destination[0..63] = Destination[0..63];
		Destination[64..127] = Source[0..63];
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PUNPCKLBW/PUNPCKLWD/PUNPCKLDQ mm, mm|2/2/-|1/1/-|MMX_SHFT|
|PUNPCKLBW/PUNPCKLWD/PUNPCKLDQ xmm, xmm|2/2/2|2/2/2|MMX_SHFT|
|PUNPCKLQDQ xmm, xmm|4/4/1|1/1/1|FP_MISC|
