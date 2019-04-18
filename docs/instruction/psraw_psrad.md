# PSRAW/PSRAD
 
## Shift Packed Data Right Arithmetic
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F E1 /r|PSRAW mm, mm/m64|Shift words in mm right by mm/m64 while shifting in sign bits.|
|66 0F E1 /r|PSRAW xmm1, xmm2/m128|Shift words in xmm1 right by xmm2/m128 while shifting in sign bits.|
|0F 71 /4 ib|PSRAW mm, imm8|Shift words in mm right by imm8 while shifting in sign bits|
|66 0F 71 /4 ib|PSRAW xmm1, imm8|Shift words in xmm1 right by imm8 while shifting in sign bits|
|0F E2 /r|PSRAD mm, mm/m64|Shift doublewords in mm right by mm/m64 while shifting in sign bits.|
|66 0F E2 /r|PSRAD xmm1, xmm2/m128|Shift doubleword in xmm1 right by xmm2/m128 while shifting in sign bits.|
|0F 72 /4 ib|PSRAD mm, imm8|Shift doublewords in mm right by imm8 while shifting in sign bits.|
|66 0F 72 /4 ib|PSRAD xmm1, imm8|Shift doublewords in xmm1 right by imm8 while shifting in sign bits.|
 
## Description
 
Shifts the bits in the individual data elements (words or doublewords) in the destination operand (first operand) to the right by the number of bits specified in the count operand (second operand).
 
As the bits in the data elements are shifted right, the empty high-order bits are filled with the initial value of the sign bit of the data element. If the value specified by the count operand is greater than 15 (for words) or 31 (for doublewords), each destination data element is filled with the initial value of the sign bit of the element.
 
The destination operand may be an MMX technology register or an XMM register; the count operand can be either an MMX technology register or an 64-bit memory location, an XMM register or a 128-bit memory location, or an 8-bit immediate.
 
The PSRAW instruction shifts each of the words in the destination operand to the right by the number of bits specified in the count operand, and the PSRAD instruction shifts each of the doublewords in the destination operand.
 
 
## Operation
 
```c
switch(Instruction) {
	case PSRAW:
		if(OperandSize == 64) {
			//PSRAW instruction with 64-bit operand:
			if(Count > 15) Count = 16;
			Destination[0..15] = SignExtend(Destination[0..15] >> Count);
			Destination[16..31] = SignExtend(Destination[16..31] >> Count);
			Destination[32..47] = SignExtend(Destination[32..47] >> Count);
			Destination[48..63] = SignExtend(Destination[48..63] >> Count);
		}
		else {
			//PSRAW instruction with 128-bit operand:
			if(Count > 15) Count = 16;
			Destination[0..15] = SignExtend(Destination[0..15] >> Count);
			Destination[16..31] = SignExtend(Destination[16..31] >> Count);
			Destination[32..63] = SignExtend(Destination[32..63] >> Count);
			Destination[64..79] = SignExtend(Destination[64..79] >> Count);
			Destination[80..95] = SignExtend(Destination[80..95] >> Count);
			Destination[96..111] = SignExtend(Destination[96..111] >> Count);
			Destination[112..127] = SignExtend(Destination[112..127] >> Count);
		break;
	case PSRAD:
		if(OperandSize == 64) {
			//PSRAD instruction with 64-bit operand:
			if(Count > 31) Count = 32;
			Destination[0..31] = SignExtend(Destination[0..31] >> Count);
			Destination[32..63] = SignExtend(Destination[32..63] >> Count);
		}
		else {
			//PSRAD instruction with 128-bit operand:
			if(Count > 31) Count = 32;
			Destination[0..31] = SignExtend(Destination[0..31] >> Count);
			Destination[32..63] = SignExtend(Destination[32..63] >> Count);
			Destination[64..95] = SignExtend(Destination[64..95] >> Count);
			Destination[96..127] = SignExtend(Destination[96..127] >>Count);
		break;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSRAW/PSRAD mm, mm/imm8|2/2/-|1/1/-|MMX_SHFT|
|PSRAW/PSRAD xmm, xmm/imm8|2/2/1+1|2/2/2|MMX_SHFT|
