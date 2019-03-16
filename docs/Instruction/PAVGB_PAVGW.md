# PAVGB/PAVGW
 
## Average Packed Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F E0 /r PAVGB mm1, mm2/m64 Average packed unsigned byte integers from mm2/m64 and mm1 with rounding.|||
|66 0F E0, /r PAVGB xmm1, xmm2/m128 Average packed unsigned byte integers from xmm2/m128 and xmm1 with rounding.|||
|0F E3 /r PAVGW mm1, mm2/m64 Average packed unsigned word integers from mm2/m64 and mm1 with rounding.|||
|66 0F E3 /r PAVGW xmm1, xmm2/m128 Average packed unsigned word integers from xmm2/m128 and xmm1 with rounding.|||
 
## Description
 
Performs an SIMD average of the packed unsigned integers from the source operand (second operand) and the destination operand (first operand), and stores the results in the destination operand. For each corresponding pair of data elements in the first and second operands, the elements are added together, a 1 is added to the temporary sum, and that result is shifted right one bit position. The source operand can be an MMX technology register or a 64-bit memory location or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register.
 
The PAVGB instruction operates on packed unsigned bytes and the PAVGW instruction operates on packed unsigned words.
 
 
## Operation
 
```c
switch(Instruction) {
	case PAVGB:
		if(OperandSize == 64) {
			//PAVGB instruction with 64-bit operands:
			//temporary sum before shifting is 9 bits
			Source[0..7] = (Source[0..7] + Destination[0..7] + 1) >> 1;
			Source[8..15] = (Source[8..15] + Destination[8..15] + 1) >> 1;
			Source[16..23] = (Source[16..23] + Destination[16..23] + 1) >> 1;
			Source[24..31] = (Source[24..31] + Destination[24..31] + 1) >> 1;
			Source[32..39] = (Source[32..39] + Destination[32..39] + 1) >> 1;
			Source[40..47] = (Source[40..47] + Destination[40..47] + 1) >> 1;
			Source[48..55] = (Source[48..55] + Destination[48..55] + 1) >> 1;
			Source[56..63] = (Source[56..63] + Destination[56..63] + 1) >> 1;
		}
		else {
			//PAVGB instruction with 128-bit operands:
			//temporary sum before shifting is 9 bits
			Source[0..7] = (Source[0..7] + Destination[0..7] + 1) >> 1;
			Source[8..15] = (Source[8..15] + Destination[8..15] + 1) >> 1;
			Source[16..23] = (Source[16..23] + Destination[16..23] + 1) >> 1;
			Source[24..31] = (Source[24..31] + Destination[24..31] + 1) >> 1;
			Source[32..39] = (Source[32..39] + Destination[32..39] + 1) >> 1;
			Source[40..47] = (Source[40..47] + Destination[40..47] + 1) >> 1;
			Source[48..55] = (Source[48..55] + Destination[48..55] + 1) >> 1;
			Source[56..63] = (Source[56..63] + Destination[56..63] + 1) >> 1;
			Source[64..71] = (Source[64..71] + Destination[64..71] + 1) >> 1;
			Source[72..79] = (Source[72..79] + Destination[72..79] + 1) >> 1;
			Source[80..87] = (Source[80..87] + Destination[80..87] + 1) >> 1;
			Source[88..95] = (Source[88..95] + Destination[88..95] + 1) >> 1;
			Source[96..103] = (Source[96..103] + Destination[96..103] + 1) >> 1;
			Source[104..111] = (Source[104..111] + Destination[104..111] + 1) >> 1;
			Source[112..119] = (Source[112..119] + Destination[112..119] + 1) >> 1;
			Source[120..127] = (Source[120..127] + Destination[120..127] + 1) >> 1;
		}
		break;
	case PAVGW:
		if(OperandSize == 64) {
			//PAVGW instruction with 64-bit operands:
			//temporary sum before shifting is 17 bits
			Source[0..15] = (Source[0..15] + Destination[0..15] + 1) >> 1;
			Source[16..31] = (Source[16..31] + Destination[16..31] + 1) >> 1;
			Source[32..47] = (Source[32..47] + Destination[32..47] + 1) >> 1;
			Source[48..63] = (Source[48..63] + Destination[48..63] + 1) >> 1;
		}
		else {
			//PAVGW instruction with 128-bit operands:
			//temporary sum before shifting is 17 bits
			Source[0..15] = (Source[0..15] + Destination[0..15] + 1) >> 1;
			Source[16..31] = (Source[16..31] + Destination[16..31] + 1) >> 1;
			Source[32..47] = (Source[32..47] + Destination[32..47] + 1) >> 1;
			Source[48..63] = (Source[48..63] + Destination[48..63] + 1) >> 1;
			Source[64..79] = (Source[64..79] + Destination[64..79] + 1) >> 1;
			Source[80..95] = (Source[80..95] + Destination[80..95] + 1) >> 1;
			Source[96..111] = (Source[96..111] + Destination[96..111] + 1) >> 1;
			Source[112..127] = (Source[112..127] + Destination[112..127] + 1) >> 1;
		}
		break;
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
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PAVGB/PAVGW mm, mm|2/2/-|1/1/-|MMX_ALU|
|PAVGB/PAVGW xmm, xmm|2/2/-|2/2/-|MMX_ALU|
