# PMOVMSKB
 
## Move Byte Mask
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F D7 /r|PMOVMSKB r32, mm Move a byte mask of mm to r32.||
|66 0F D7 /r|PMOVMSKB r32, xmm Move a byte mask of xmm to r32.||
 
## Description
 
Creates a mask made up of the most significant bit of each byte of the source operand (second operand) and stores the result in the low byte or word of the destination operand (first operand).
 
The source operand is an MMX technology register or an XMM register; the destination operand is a general-purpose register. When operating on 64-bit operands, the byte mask is 8 bits; when operating on 128-bit operands, the byte mask is 16-bits.
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PMOVMSKB instruction with 64-bit source operand:
	r32[0] = Source[7];
	r32[1] = Source[15];
	r32[2] = Source[23];
	r32[3] = Source[31];
	r32[4] = Source[39];
	r32[5] = Source[47];
	r32[6] = Source[55];
	r32[7] = Source[63];
	r32[8..31] = 0;
}
else {
	//PMOVMSKB instruction with 128-bit source operand:
	r32[0] = Source[7];
	r32[1] = Source[15];
	r32[2] = Source[23];
	r32[3] = Source[31];
	r32[4] = Source[39];
	r32[5] = Source[47];
	r32[6] = Source[55];
	r32[7] = Source[63];
	r32[8] = Source[71];
	r32[9] = Source[79];
	r32[10] = Source[87];
	r32[11] = Source[95];
	r32[12] = Source[103];
	r32[13] = Source[111];
	r32[14] = Source[119];
	r32[15] = Source[127];
	r32[16..31] = 0;
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#UD|If EM in CR0 is set. (128-bit operations only) If OSFXSR in CR4 is 0. (128-bit operations only) If CPUID feature flag SSE2 is 0.|
|#UD|If EM in CR0 is set. (128-bit operations only) If OSFXSR in CR4 is 0. (128-bit operations only) If CPUID feature flag SSE2 is 0.|
|#NM|If TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
Same exceptions as in Protected Mode
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Protected Mode
 
## Numeric Exceptions
 
None.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PMOVMSKB r32, mm|7/7/1|2/2/1|FP_MISC|
|PMOVMSKB r32, xmm|7/7/-|2/2/-|FP_MISC|
