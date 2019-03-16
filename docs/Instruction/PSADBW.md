# PSADBW
 
## Compute Sum of Absolute Differences
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F F6 /r|PSADBW mm1, mm2/m64|Computes the absolute differences of the packed unsigned byte integers from mm2 /m64 and mm1; differences are then summed to produce an unsigned word integer result.|
|66 0F F6 /r|PSADBW xmm1, xmm2/m128|Computes the absolute differences of the packed unsigned byte integers from xmm2/m128 and xmm1; the 8 low differences and 8 high differences are then summed separately to produce two unsigned word integer results.|
 
## Description
 
Computes the absolute value of the difference of 8 unsigned byte integers from the source operand (second operand) and from the destination operand (first operand). These 8 differences are then summed to produce an unsigned word integer result that is stored in the destination operand. The source operand can be an MMX technology register or a 64-bit memory location or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register. Figure 4-5 shows the operation of the PSADBW instruction when using 64-bit operands.
 
When operating on 64-bit operands, the word integer result is stored in the low word of the destination operand, and the remaining bytes in the destination operand are cleared to all 0s.
 
When operating on 128-bit operands, two packed results are computed. Here, the 8 low-order bytes of the source and destination operands are operated on to produce a word result that is stored in the low word of the destination operand, and the 8 high-order bytes are operated on to produce a word result that is stored in bits 64 through 79 of the destination operand. The remaining bytes of the destination operand are cleared.
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PSADBW instructions when using 64-bit operands:
	Temporary0 = GetAbsoluteValue(Destination[0..7] - Source[0..7]);
	Temporary1 = GetAbsoluteValue(Destination[8..15] - Source[8..15]);
	Temporary2 = GetAbsoluteValue(Destination[16..23] - Source[16..23]);
	Temporary3 = GetAbsoluteValue(Destination[24..31] - Source[24..31]);
	Temporary4 = GetAbsoluteValue(Destination[32..39] - Source[32..39]);
	Temporary5 = GetAbsoluteValue(Destination[40..47] - Source[40..47]);
	Temporary6 = GetAbsoluteValue(Destination[48..55] - Source[48..55]);
	Temporary7 = GetAbsoluteValue(Destination[56..63] - Source[56..63]);
	Destination[0..15] = CalculateSum(Temporary0...Temporary7);
	Destination[16..63] = 0;
}
else {
	//PSADBW instructions when using 128-bit operands:
	Temporary0 = GetAbsoluteValue(Destination[0..7] - Source[0..7]);
	Temporary1 = GetAbsoluteValue(Destination[8..15] - Source[8..15]);
	Temporary2 = GetAbsoluteValue(Destination[16..23] - Source[16..23]);
	Temporary3 = GetAbsoluteValue(Destination[24..31] - Source[24..31]);
	Temporary4 = GetAbsoluteValue(Destination[32..39] - Source[32..39]);
	Temporary5 = GetAbsoluteValue(Destination[40..47] - Source[40..47]);
	Temporary6 = GetAbsoluteValue(Destination[48..55] - Source[48..55]);
	Temporary7 = GetAbsoluteValue(Destination[56..63] - Source[56..63]);
	Temporary8 = GetAbsoluteValue(Destination[64..71] - Source[64..71]);
	Temporary9 = GetAbsoluteValue(Destination[72..79] - Source[72..79]);
	Temporary10 = GetAbsoluteValue(Destination[80..87] - Source[80..87]);
	Temporary11 = GetAbsoluteValue(Destination[88..95] - Source[88..95]);
	Temporary12 = GetAbsoluteValue(Destination[96..103] - Source[96..103]);
	Temporary13 = GetAbsoluteValue(Destination[104..111] - Source[104..111]);
	Temporary14 = GetAbsoluteValue(Destination[112..119] - Source[112..119]);
	Temporary15 = GetAbsoluteValue(Destination[120..127] - Source[120..127]);
	Destination[0..15] = CalculateSum(Temporary0...Temporary7);
	Destination[16..63] = 0;
	Destination[64..79] = CalculateSum(Temporary8...Temporary15);
	Destination[80..127] = 0;
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSADBW mm, mm|4/4/5|1/1/2|MMX_ALU|
|PSADBW xmm, xmm|4/4/5+2|2/2/4|MMX_ALU|
