# PMINSW
 
## Minimum of Packed Signed Word Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F EA /r|PMINSW mm1, mm2/m64|Compare signed word integers in mm2/m64 and mm1 and return minimum values.|
|66 0F EA /r|PMINSW xmm1, xmm2/m128|Compare signed word integers in xmm2/m128 and xmm1 and return minimum values.|
 
## Description
 
Performs an SIMD compare of the packed signed word integers in the destination operand (first operand) and the source operand (second operand), and returns the minimum value for each pair of word integers to the destination operand. The source operand can be an MMX technology register or a 64-bit memory location, or it can be an XMM register or a 128-bit memory location.
 
The destination operand can be an MMX technology register or an XMM register.
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PMINSW instruction for 64-bit operands:
	if(Destination[0..15] >= Source[0..15]) Destination[0..15] = Source[0..15];
	if(Destination[16..31] >= Source[16..31]) Destination[16..31] = Source[16..31];
	if(Destination[32..47] >= Source[32..47]) Destination[32..47] = Source[32..47];
	if(Destination[48..63] >= Source[48..63]) Destination[48..63] = Source[48..63];
}
else {
	//PMINSW instruction for 128-bit operands:
	if(Destination[0..15] >= Source[0..15]) Destination[0..15] = Source[0..15];
	if(Destination[16..31] >= Source[16..31]) Destination[16..31] = Source[16..31];
	if(Destination[32..47] >= Source[32..47]) Destination[32..47] = Source[32..47];
	if(Destination[48..63] >= Source[48..63]) Destination[48..63] = Source[48..63];
	if(Destination[64..79] >= Source[64..79]) Destination[64..79] = Source[64..79];
	if(Destination[80..95] >= Source[80..95]) Destination[80..95] = Source[80..95];
	if(Destination[96..111] >= Source[96..111]) Destination[96..111] = Source[96..111];
	if(Destination[112..127] >= Source[112..127]) Destination[112..127] = Source[112..127];
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
|PMIN mm, mm|2/2|1/1|MMX_ALU|
|PMIN xmm, xmm|2/2|2/2|MMX_ALU|
