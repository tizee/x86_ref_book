# PSLLW/PSLLD/PSLLQ
 
## Shift Packed Data Left Logical
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F F1 /r|PSLLW mm, mm/m64|Shift words in mm left mm/m64 while shifting in 0s.|
|66 0F F1 /r|PSLLW xmm1, xmm2/m128|Shift words in xmm1 left by xmm2/m128 while shifting in 0s.|
|0F 71 /6 ib|PSLLW mm, imm8|Shift words in mm left by imm8 while shifting in 0s.|
|66 0F 71 /6 ib|PSLLW xmm1, imm8|Shift words in xmm1 left by imm8 while shifting in 0s.|
|0F F2 /r|PSLLD mm, mm/m64|Shift doublewords in mm left by mm/m64 while shifting in 0s.|
|66 0F F2 /r|PSLLD xmm1, xmm2/m128|Shift doublewords in xmm1 left by xmm2/m128 while shifting in 0s.|
|0F 72 /6 ib|PSLLD mm, imm8|Shift doublewords in mm left by imm8 while shifting in 0s.|
|66 0F 72 /6 ib|PSLLD xmm1, imm8|Shift doublewords in xmm1 left by imm8 while shifting in 0s.|
|0F F3 /r|PSLLQ mm, mm/m64|Shift quadword in mm left by mm/m64 while shifting in 0s.|
|66 0F F3 /r|PSLLQ xmm1, xmm2/m128|Shift quadwords in xmm1 left by xmm2/m128 while shifting in 0s.|
|0F 73 /6 ib|PSLLQ mm, imm8|Shift quadword in mm left by imm8 while shifting in 0s.|
|66 0F 73 /6 ib|PSLLQ xmm1, imm8|Shift quadwords in xmm1 left by imm8 while shifting in 0s.|
 
## Description
 
Shifts the bits in the individual data elements (words, doublewords, or quadword) in the destination operand (first operand) to the left by the number of bits specified in the count operand (second operand). As the bits in the data elements are shifted left, the empty low-order bits are cleared (set to 0). If the value specified by the count operand is greater than 15 (for words), 31 (for doublewords), or 63 (for a quadword), then the destination operand is set to all 0s. (Figure 4-7 gives an example of shifting words in a 64-bit operand.) The destination operand may be an MMX technology register or an XMM register; the count operand can be either an MMX technology register or an 64-bit memory location, an XMM register or a 128-bit memory location, or an 8-bit immediate.
 
The PSLLW instruction shifts each of the words in the destination operand to the left by the number of bits specified in the count operand; the PSLLD instruction shifts each of the doublewords in the destination operand; and the PSLLQ instruction shifts the quadword (or quadwords) in the destination operand.
 
 
## Operation
 
```c
switch(Instruction) {
	case PSLLW:
		if(OperandSize == 64) {
			//PSLLW instruction with 64-bit operand:
			if(Count > 15) Destination[0..64] = 0;
			else {
				Destination[0..15] = ZeroExtend(Destination[0..15] << Count);
				Destination[16..31] = ZeroExtend(Destination[16..31] << Count);
				Destination[32..37] = ZeroExtend(Destination[32..37] << Count);
				Destination[48..63] = ZeroExtend(Destination[48..63] << Count);
			}
		}
		else {
			//PSLLW instruction with 128-bit operand:
			if(Count > 15) Destination[128..0] = 0;
			else {
				Destination[0..15] = ZeroExtend(Destination[0..15] << Count);
				Destination[16..31] = ZeroExtend(Destination[16..31] << Count);
				Destination[32..47] = ZeroExtend(Destination[32..47] << Count);
				Destination[48..63] = ZeroExtend(Destination[48..63] << Count);
				Destination[64..79] = ZeroExtend(Destination[64..79] << Count);
				Destination[80..95] = ZeroExtend(Destination[80..95] << Count);
				Destination[96..111] = ZeroExtend(Destination[96..111] << Count);
				Destination[112..127] = ZeroExtend(Destination[112..127] << Count);
			}
		}
		break;
	case PSLLD:
		if(OperandSize == 64) {
			//PSLLD instruction with 64-bit operand:
			if(Count > 31) Destination[64..0] = 0;
			else {
				Destination[0..31] = ZeroExtend(Destination[0..31] << Count);
				Destination[32..63] = ZeroExtend(Destination[32..63] << Count);
			}
		}
		else {
			//PSLLD instruction with 128-bit operand:
			if(Count > 31) Destination[128..0] = 0;
			else {
				Destination[0..31] = ZeroExtend(Destination[0..31] << Count);
				Destination[32..63] = ZeroExtend(Destination[32..63] << Count);
				Destination[64..95] = ZeroExtend(Destination[64..95] << Count);
				Destination[96..127] = ZeroExtend(Destination[96..127] << Count);
			}
		}
		break;
	case PSLLQ:
		if(OperandSize == 64) {
			//PSLLQ instruction with 64-bit operand:
			if(Count > 63) Destination[0..64] = 0;
			else Destination = ZeroExtend(Destination << Count);
		}
		else {
			//PSLLQ instruction with 128-bit operand:
			if(Count > 63) Destination[0..128] = 0;
			else {
				Destination[0..63] = ZeroExtend(Destination[0..63] << Count);
				Destination[64..127] = ZeroExtend(Destination[64..127] << Count);
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
|PSLLW/PSLLD/PSLLQ mm, mm/imm8|2/2/-|1/1/-|MMX_SHFT|
|PSLLW/PSLLD/PSLLQ xmm, xmm/imm8|2/2/1+1|2/2/2|MMX_SHFT|
