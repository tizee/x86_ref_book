# PMAXUB
 
## Maximum of Packed Unsigned Byte Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F DE /r|PMAXUB mm1, mm2/m64|Compare unsigned byte integers in mm2/m64 and mm1 and returns maximum values.|
|66 0F DE /r|PMAXUB xmm1, xmm2/m128|Compare unsigned byte integers in xmm2/m128 and xmm1 and returns maximum values.|
 
## Description
 
Performs an SIMD compare of the packed unsigned byte integers in the destination operand (first operand) and the source operand (second operand), and returns the maximum value for each pair of byte integers to the destination operand. The source operand can be an MMX technology register or a 64-bit memory location, or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register.
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PMAXUB instruction for 64-bit operands:
	if(Destination[0..7] <= Source[0..7]) Destination[0..7] = Source[0..7];
	if(Destination[8..15] <= Source[8..15]) Destination[8..15] = Source[8..15];
	if(Destination[16..23] <= Source[16..23]) Destination[16..23] = Source[16..23];
	if(Destination[24..31] <= Source[24..31]) Destination[24..31] = Source[24..31];
	if(Destination[32..39] <= Source[32..39]) Destination[32..39] = Source[32..39];
	if(Destination[40..47] <= Source[40..47]) Destination[40..47] = Source[40..47];
	if(Destination[48..55] <= Source[48..55]) Destination[48..55] = Source[48..55];
	if(Destination[56..63] <= Source[56..63]) Destination[56..63] = Source[56..63];
}
else {
	//PMAXUB instruction for 128-bit operands:
	if(Destination[0..7] <= Source[0..7]) Destination[0..7] = Source[0..7];
	if(Destination[8..15] <= Source[8..15]) Destination[8..15] = Source[8..15];
	if(Destination[16..23] <= Source[16..23]) Destination[16..23] = Source[16..23];
	if(Destination[24..31] <= Source[24..31]) Destination[24..31] = Source[24..31];
	if(Destination[32..39] <= Source[32..39]) Destination[32..39] = Source[32..39];
	if(Destination[40..47] <= Source[40..47]) Destination[40..47] = Source[40..47];
	if(Destination[48..55] <= Source[48..55]) Destination[48..55] = Source[48..55];
	if(Destination[56..63] <= Source[56..63]) Destination[56..63] = Source[56..63];
	if(Destination[64..71] <= Source[64..71]) Destination[64..71] = Source[64..71];
	if(Destination[72..79] <= Source[72..79]) Destination[72..79] = Source[72..79];
	if(Destination[80..87] <= Source[80..87]) Destination[80..87] = Source[80..87];
	if(Destination[88..95] <= Source[88..95]) Destination[88..95] = Source[88..95];
	if(Destination[96..103] <= Source[96..103]) Destination[96..103] = Source[96..103];
	if(Destination[104..111] <= Source[104..111]) Destination[104..111] = Source[104..111];
	if(Destination[112..119] <= Source[112..119]) Destination[112..119] = Source[112..119];
	if(Destination[120..127] <= Source[120..127]) Destination[120..127] = Source[120..127];
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. (128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. (128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#UD|If EM in CR0 is set. (128-bit operations only) If OSFXSR in CR4 is 0. (128-bit operations only) If CPUID feature flag SSE2 is 0.|
|#NM|If TS in CR0 is set.|
|#MF|(64-bit operations only) If there is a pending x87 FPU exception.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#UD|If EM in CR0 is set. (128-bit operations only) If OSFXSR in CR4 is 0. (128-bit operations only) If CPUID feature flag SSE2 is 0.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
 
## Numeric Exceptions
 
None.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|PMAX mm, mm|2/2|1/1|MMX_ALU|
|PMAX xmm, xmm|2/2|2/2|MMX_ALU|
