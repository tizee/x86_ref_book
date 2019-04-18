# PUNPCKHBW/PUNPCKHWD/PUNPCKHDQ/PUNPCKHQDQ
 
##  Unpack High Data
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 68 /r|PUNPCKHBW mm, mm/m64|Unpack and interleave high-order bytes from mm and mm/m64 into mm.|
|66 0F 68 /r|PUNPCKHBW xmm1, xmm2/m128|Unpack and interleave high-order bytes from xmm1 and xmm2/m128 into xmm1.|
|0F 69 /r|PUNPCKHWD mm, mm/m64|Unpack and interleave high-order words from mm and mm/m64 into mm.|
|66 0F 69 /r|PUNPCKHWD xmm1, xmm2/m128|Unpack and interleave high-order words from xmm1 and xmm2/m128 into xmm1.|
|0F 6A /r|PUNPCKHDQ mm, mm/m64|Unpack and interleave high-order doublewords from mm and mm/m64 into mm.|
|66 0F 6A /r|PUNPCKHDQ xmm1, xmm2/m128|Unpack and interleave high-order doublewords from xmm1 and xmm2/m128 into xmm1.|
|66 0F 6D /r|PUNPCKHQDQ xmm1, xmm2/m128|Unpack and interleave high-order quadwords from xmm1 and xmm2/m128 into xmm1.|
 
## Description
 
Unpacks and interleaves the high-order data elements (bytes, words, doublewords, or quadwords) of the destination operand (first operand) and source operand (second operand) into the destination operand. The low-order data elements are ignored.
 
The source operand can be an MMX technology register or a 64-bit memory location, or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register. When the source data comes from a 64-bit memory operand, the full 64-bit operand is accessed from memory, but the instruction uses only the highorder 32 bits. When the source data comes from a 128-bit memory operand, an implementation may fetch only the appropriate 64 bits; however, alignment to a 16-byte boundary and normal segment checking will still be enforced.
 
The PUNPCKHBW instruction interleaves the high-order bytes of the source and destination operands, the PUNPCKHWD instruction interleaves the high-order words of the source and destination operands, the PUNPCKHDQ instruction interleaves the high-order doubleword (or doublewords) of the source and destination operands, and the PUNPCKHQDQ instruction interleaves the high-order quadwords of the source and destination operands.
 
These instructions can be used to convert bytes to words, words to doublewords, doublewords to quadwords, and quadwords to double quadwords, respectively, by placing all 0s in the source operand. Here, if the source operand contains all 0s, the result (stored in the destination operand) contains zero extensions of the high-order data elements from the original value in the destination operand. For example, with the PUNPCKHBW instruction the high-order bytes are zero extended (that is, unpacked into unsigned word integers), and with the PUNPCKHWD instruction, the high-order words are zero extended (unpacked into unsigned doubleword integers).
 
 
## Operation
 
```c
switch(Instruction) {
	case PUNPCKHBW:
		if(OperandSize == 64) {
			//PUNPCKHBW instruction with 64-bit operands:
			Destination[0..7] = Destination[32..39];
			Destination[8..15] = Source[32..39];
			Destination[16..23] = Destination[40..47];
			Destination[24..31] = Source[40..47];
			Destination[32..39] = Destination[48..55];
			Destination[40..47] = Source[48..55];
			Destination[48..55] = Destination[56..63];
			Destination[56..63] = Source[56..63];
		}
		else {
			//PUNPCKHBW instruction with 128-bit operands:
			Destination[0..7] = Destination[64..71];
			Destination[8..15] = Source[64..71];
			Destination[16..23] = Destination[72..79];
			Destination[24..31] = Source[72..79];
			Destination[32..39] = Destination[80..87];
			Destination[40..47] = Source[80..87];
			Destination[48..55] = Destination[88..95];
			Destination[56..63] = Source[88..95];
			Destination[64..71] = Destination[96..103];
			Destination[72..79] = Source[96..103];
			Destination[80..87] = Destination[104..111];
			Destination[88..95] = Source[104..111];
			Destination[96..103] = Destination[112..119];
			Destination[104..111] = Source[112..119];
			Destination[112..119] = Destination[120..127];
			Destination[120..127] = Source[120..127];
		}
		break;
	case PUNPCKHWD:
		if(OperandSize == 64) {
			//PUNPCKHWD instruction with 64-bit operands:
			Destination[0..15] = Destination[32..47];
			Destination[16..31] = Source[32..47];
			Destination[32..47] = Destination[48..63];
			Destination[48..63] = Source[48..63];
		}
		else {
			//PUNPCKHWD instruction with 128-bit operands:
			Destination[0..15] = Destination[64..79];
			Destination[16..31] = Source[64..79];
			Destination[32..47] = Destination[80..95];
			Destination[48..63] = Source[80..95];
			Destination[64..79] = Destination[96..111];
			Destination[80..95] = Source[96..111];
			Destination[96..111] = Destination[112..127];
			Destination[112..127] = Source[112..127];
		}
		break;
	case PUNPCKHDQ:
		if(OperandSize == 64) {
			//PUNPCKHDQ instruction with 64-bit operands:
			Destination[0..31] = Destination[32..63]
			Destination[32..63] = Source[32..63];
		}
		else {
			//PUNPCKHDQ instruction with 128-bit operands:
			Destination[0..31] = Destination[64..95];
			Destination[32..63] = Source[64..95];
			Destination[64..95] = Destination[96..127];
			Destination[96..127] = Source[96..127];
		}
		break;
	case PUNPCKHQDQ:
		//PUNPCKHQDQ instruction:
		Destination[0..63] = Destination[64..127];
		Destination[64..127] = Source[64..127];
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PUNPCKHBW/PUNPCKHWD/PUNPCKHDQ mm, mm|2/2/-|1/1/-|MMX_SHFT|
|PUNPCKHBW/PUNPCKHWD/PUNPCKHDQ xmm, xmm|4/4/1+1|2/2/2|MMX_SHFT|
|PUNPCKHQDQ xmm, xmm|4/4/1+1|2/2/2|MMX_SHFT|
