# PSRLW/PSRLD/PSRLQ
 
## Shift Packed Data Right Logical
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F D1 /r|PSRLW mm, mm/m64|Shift words in mm right by amount specified in mm/m64 while shifting in 0s.|
|66 0F D1 /r|PSRLW xmm1, xmm2/m128|Shift words in xmm1 right by amount specified in xmm2/m128 while shifting in 0s.|
|0F 71 /2 ib|PSRLW mm, imm8|Shift words in mm right by imm8 while shifting in 0s.|
|66 0F 71 /2 ib|PSRLW xmm1, imm8|Shift words in xmm1 right by imm8 while shifting in 0s.|
|0F D2 /r|PSRLD mm, mm/m64|Shift doublewords in mm right by amount specified in mm/m64 while shifting in 0s.|
|66 0F D2 /r|PSRLD xmm1, xmm2/m128|Shift doublewords in xmm1 right by amount specified in xmm2/m128 while shifting in 0s.|
|0F 72 /2 ib|PSRLD mm, imm8|Shift doublewords in mm right by imm8 while shifting in 0s.|
|66 0F 72 /2 ib|PSRLD xmm1, imm8|Shift doublewords in xmm1 right by imm8 while shifting in 0s.|
|0F D3 /r|PSRLQ mm, mm/m64|Shift mm right by amount specified in mm/m64 while shifting in 0s.|
|66 0F D3 /r|PSRLQ xmm1, xmm2/m128|Shift quadwords in xmm1 right by amount specified in xmm2/m128 while shifting in 0s.|
|0F 73 /2 ib|PSRLQ mm, imm8|Shift mm right by imm8 while shifting in 0s.|
|66 0F 73 /2 ib|PSRLQ xmm1, imm8|Shift quadwords in xmm1 right by imm8 while shifting in 0s.|
 
## Description
 
Shifts the bits in the individual data elements (words, doublewords, or quadword) in the destination operand (first operand) to the right by the number of bits specified in the count operand (second operand). As the bits in the data elements are shifted right, the empty high-order bits are cleared (set to 0). If the value specified by the count operand is greater than 15 (for words), 31 (for doublewords), or 63 (for a quadword), then the destination operand is set to all 0s. The destination operand may be an MMX technology register or an XMM register; the count operand can be either an MMX technology register or an 64-bit memory location, an XMM register or a 128-bit memory location, or an 8-bit immediate.
 
The PSRLW instruction shifts each of the words in the destination operand to the right by the number of bits specified in the count operand; the PSRLD instruction shifts each of the doublewords in the destination operand; and the PSRLQ instruction shifts the quadword (or quadwords) in the destination operand.
 
 
## Operation
 
```c
switch(Instruction) {
	case PSRLW:
		if(OperandSize == 64) {
			//PSRLW instruction with 64-bit operand:
			if(Count > 15) Destination[64..0] = 0;
			else {
				Destination[0..15] = ZeroExtend(Destination[0..15] >> Count);
				Destination[16..31] = ZeroExtend(Destination[16..31] >> Count);
				Destination[32..47] = ZeroExtend(Destination[32..47] >> Count);
				Destination[48..63] = ZeroExtend(Destination[48..63] >> Count);
			}
		}
		else {
			//PSRLW instruction with 128-bit operand:
			if(Count > 15) Destination[128..0] = 0;
			else {
				Destination[0..15] = ZeroExtend(Destination[0..15] >> Count);
				Destination[16..31] = ZeroExtend(Destination[16..31] >> Count);
				Destination[32..47] = ZeroExtend(Destination[32..47] >> Count);
				Destination[48..63] = ZeroExtend(Destination[48..63] >> Count);
				Destination[64..79] = ZeroExtend(Destination[64..79] >> Count);
				Destination[80..95] = ZeroExtend(Destination[80..95] >> Count);
				Destination[96..111] = ZeroExtend(Destination[96..111] >> Count);
				Destination[112..127] = ZeroExtend(Destination[112..127] >> Count);
			}
		}
		break;
	case PSRLD:
		if(OperandSize == 64) {
			//PSRLD instruction with 64-bit operand:
			if(Count > 31) Destination[64..0] = 0;
			else {
				Destination[0..31] = ZeroExtend(Destination[0..31] >> Count);
				Destination[32..63] = ZeroExtend(Destination[32..63] >> Count);
			}
		}
		else {
			//PSRLD instruction with 128-bit operand:
			if(Count > 31) Destination[128..0] = 0;
			else {
				Destination[0..31] = ZeroExtend(Destination[0..31] >> Count);
				Destination[32..63] = ZeroExtend(Destination[32..63] >> Count);
				Destination[64..95] = ZeroExtend(Destination[64..95] >> Count);
				Destination[96..127] = ZeroExtend(Destination[96..127] >> Count);
			}
		}
		break;
	case PSRLQ:
		if(OperandSize == 64) {
			//PSRLQ instruction with 64-bit operand:
			if(Count > 63) Destination[64..0] = 0;
			else Destination = ZeroExtend(Destination >> Count);
		}
		else {
			//PSRLQ instruction with 128-bit operand:
			if(Count > 15) Destination[128..0] = 0;
			else {
				Destination[0..63] = ZeroExtend(Destination[0..63] >> Count);
				Destination[64..127] = ZeroExtend(Destination[64..127] >> Count);
			}
		}
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSRLQ/PSRLW/PSRLD mm, mm/imm8|2/2/-|1/1/-|MMX_SHFT|
|PSRLW/PSRLD/PSRLQ xmm, xmm/imm8|2/2/1+1|2/2/2|MMX_SHFT|
