# PSUBB/PSUBW/PSUBD
 
## Subtract Packed Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F F8 /r|PSUBB mm, mm/m64|Subtract packed byte integers in mm/m64 from packed byte integers in mm.|
|66 0F F8 /r|PSUBB xmm1, xmm2/m128|Subtract packed byte integers in xmm2/m128 from packed byte integers in xmm1.|
|0F F9 /r|PSUBW mm, mm/m64|Subtract packed word integers in mm/m64 from packed word integers in mm.|
|66 0F F9 /r|PSUBW xmm1, xmm2/m128|Subtract packed word integers in xmm2/m128 from packed word integers in xmm1.|
|0F FA /r|PSUBD mm, mm/m64|Subtract packed doubleword integers in mm/m64 from packed doubleword integers in mm.|
|66 0F FA /r|PSUBD xmm1, xmm2/m128|Subtract packed doubleword integers in xmm2/mem128 from packed doubleword integers in xmm1.|
 
## Description
 
Performs an SIMD subtract of the packed integers of the source operand (second operand) from the packed integers of the destination operand (first operand), and stores the packed integer results in the destination operand. See Figure 9-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD operation. Overflow is handled with wraparound, as described in the following paragraphs.
 
These instructions can operate on either 64-bit or 128-bit operands. When operating on 64-bit operands, the destination operand must be an MMX technology register and the source operand can be either an MMX technology register or a 64-bit memory location. When operating on 128-bit operands, the destination operand must be an XMM register and the source operand can be either an XMM register or a 128-bit memory location.
 
The PSUBB instruction subtracts packed byte integers. When an individual result is too large or too small to be represented in a byte, the result is wrapped around and the low 8 bits are written to the destination element.
 
The PSUBW instruction subtracts packed word integers. When an individual result is too large or too small to be represented in a word, the result is wrapped around and the low 16 bits are written to the destination element.
 
The PSUBD instruction subtracts packed doubleword integers. When an individual result is too large or too small to be represented in a doubleword, the result is wrapped around and the low 32 bits are written to the destination element.
 
Note that the PSUBB, PSUBW, and PSUBD instructions can operate on either unsigned or signed (two's complement notation) packed integers; however, it does not set bits in the EFLAGS register to indicate overflow and/or a carry. To prevent undetected overflow conditions, software must control the ranges of values operated on.
 
 
## Operation
 
```c
switch(Instruction) {
	case PSUBB:
		if(OperandSize == 64) {
			//PSUBB instruction with 64-bit operands:
			Destination[0..7] = Destination[0..7] - Source[0..7];
			Destination[8..15] = Destination[8..15] - Source[8..15];
			Destination[16..23] = Destination[16..23] - Source[16..23];
			Destination[24..31] = Destination[24..31] - Source[24..31];
			Destination[32..39] = Destination[32..39] - Source[32..39];
			Destination[40..47] = Destination[40..47] - Source[40..47];
			Destination[48..55] = Destination[48..55] - Source[48..55];
			Destination[56..63] = Destination[56..63] - Source[56..63];
		}
		else {
			//PSUBB instruction with 128-bit operands:
			Destination[0..7] = Destination[0..7] - Source[0..7];
			Destination[8..15] = Destination[8..15] - Source[8..15];
			Destination[16..23] = Destination[16..23] - Source[16..23];
			Destination[24..31] = Destination[24..31] - Source[24..31];
			Destination[32..39] = Destination[32..39] - Source[32..39];
			Destination[40..47] = Destination[40..47] - Source[40..47];
			Destination[48..55] = Destination[48..55] - Source[48..55];
			Destination[56..63] = Destination[56..63] - Source[56..63];
			Destination[64..71] = Destination[64..71] - Source[64..71];
			Destination[72..79] = Destination[72..79] - Source[]72..79;
			Destination[80..87] = Destination[80..87] - Source[80..87];
			Destination[88..95] = Destination[88..95] - Source[88..95];
			Destination[96..103] = Destination[96..103] - Source[96..103];
			Destination[104..111] = Destination[104..111] - Source[104..111];
			Destination[112..119] = Destination[112..119] - Source[112..119];
			Destination[120..127] = Destination[120..111] - Source[120..127];
		}
		break;
	case PSUBW:
		if(OperandSize == 64) {
			//PSUBW instruction with 64-bit operands:
			Destination[0..15] = Destination[0..15] - Source[0..15];
			Destination[16..31] = Destination[16..31] - Source[16..31];
			Destination[32..47] = Destination[32..47] - Source[32..47];
			Destination[48..63] = Destination[48..63] - Source[48..63];
		}
		else {
			//PSUBW instruction with 128-bit operands:
			Destination[0..15] = Destination[0..15] - Source[0..15];
			Destination[16..31] = Destination[16..31] - Source[16..31];
			Destination[32..47] = Destination[32..47] - Source[32..47];
			Destination[48..63] = Destination[48..63] - Source[48..63];
			Destination[64..79] = Destination[64..79] - Source[64..79];
			Destination[80..95] = Destination[80..95] - Source[80..95];
			Destination[96..111] = Destination[96..111] - Source[96..111];
			Destination[112..127] = Destination[112..127] - Source[112..127];
		}
		break;
	case PSUBD:
		if(OperandSize == 64) {
			//PSUBD instruction with 64-bit operands:
			Destination[31..0] = Destination[31..0] - Source[31..0];
			Destination[63..32] = Destination[63..32] - Source[63..32];
		}
		else {
			//PSUBD instruction with 128-bit operands:
			Destination[0..31] = Destination[0..31] - Source[0..31];
			Destination[32..63] = Destination[32..63] - Source[32..63];
			Destination[64..95] = Destination[64..95] - Source[64..95];
			Destination[96..127] = Destination[96..127] - Source[96..127];
		}
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSUBB/PSUBW/PSUBD mm, mm|2/2/-|1/1/-|MMX_ALU|
|PSUBB/PSUBW/PSUBD xmm, xmm|2/2/1|2/2/1|MMX_ALU|
