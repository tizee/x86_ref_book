# PMULHW
 
## Multiply Packed Signed Integers and Store High Result
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F E5 /r|PMULHW mm, mm/m64|Multiply the packed signed word integers in mm1 register and mm2/m64, and store the high 16 bits of the results in mm1.|
|66 0F E5 /r|PMULHW xmm1, xmm2/m128|Multiply the packed signed word integers in xmm1 and xmm2/m128, and store the high 16 bits of the results in xmm1.|
 
## Description
 
Performs an SIMD signed multiply of the packed signed word integers in the destination operand (first operand) and the source operand (second operand), and stores the high 16 bits of each intermediate 32-bit result in the destination operand. (Figure 4-3 shows this operation when using 64-bit operands.) The source operand can be an MMX technology register or a 64-bit memory location, or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register.
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PMULHW instruction with 64-bit operands:
	//Signed multiplication
	Temporary0[0..31] = Destination[0..15] * Source[0..15];
	Temporary1[0..31] = Destination[16..31] * Source[16..31];
	Temporary2[0..31] = Destination[32..47] * Source[32..47];
	Temporary3[0..31] = Destination[48..63] * Source[48..63];
	Destination[0..15] = Temporary0[16..31];
	Destination[16..31] = Temporary1[16..31];
	Destination[32..47] = Temporary2[16..31];
	Destination[48..63] = Temporary3[16..31];
}
else {
	//PMULHW instruction with 128-bit operands:
	//Signed multiplication
	Temporary0[0..31] = Destination[0..15] * Source[0..15];
	Temporary1[0..31] = Destination[16..31] * Source[16..31];
	Temporary2[0..31] = Destination[32..47] * Source[32..47];
	Temporary3[0..31] = Destination[48..63] * Source[48..63];
	Temporary4[0..31] = Destination[64..79] * Source[64..79];
	Temporary5[0..31] = Destination[80..95] * Source[80..95];
	Temporary6[0..31] = Destination[96..111] * Source[96..111];
	Temporary7[0..31] = Destination[112..127] * Source[112..127];
	Destination[0..15] = Temporary0[16..31];
	Destination[16..31] = Temporary1[16..31];
	Destination[32..47] = Temporary2[16..31];
	Destination[48..63] = Temporary3[16..31];
	Destination[64..79] = Temporary4[16..31];
	Destination[80..95] = Temporary5[16..31];
	Destination[96..111] = Temporary6[16..31];
	Destination[112..127] = Temporary7[16..31];
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PMULHW mm, mm|9/8/-|1/1/-|FP_MUL|
|PMULHW xmm, xmm|9/8/3+1|2/2/2|FP_MUL|
