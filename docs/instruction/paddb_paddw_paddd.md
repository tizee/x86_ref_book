# PADDB/PADDW/PADDD
 
## Add Packed Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F FC /r PADDB mm, mm/m64|Add packed byte integers from mm/m64 and mm.||
|66 0F FC /r PADDB xmm1,xmm2/m128|Add packed byte integers from xmm2/m128 and xmm1.||
|0F FD /r PADDW mm, mm/m64|Add packed word integers from mm/m64 and mm.||
|66 0F FD /r PADDW xmm1, xmm2/m128|Add packed word integers from xmm2/m128 and xmm1.||
|0F FE /r PADDD mm, mm/m64|Add packed doubleword integers from mm/m64 and mm.||
|66 0F FE /r PADDD xmm1, xmm2/m128|Add packed doubleword integers from xmm2/m128 and xmm1.||
 
## Description
 
Performs an SIMD add of the packed integers from the source operand (second operand) and the destination operand (first operand), and stores the packed integer results in the destination operand. See Figure 9-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1 for an illustration of an SIMD operation. Overflow is handled with wraparound, as described in the following paragraphs.
 
These instructions can operate on either 64-bit or 128-bit operands. When operating on 64-bit operands, the destination operand must be an MMX technology register and the source operand can be either an MMX technology register or a 64-bit memory location. When operating on 128- bit operands, the destination operand must be an XMM register and the source operand can be either an XMM register or a 128-bit memory location.
 
The PADDB instruction adds packed byte integers. When an individual result is too large to be represented in 8 bits (overflow), the result is wrapped around and the low 8 bits are written to the destination operand (that is, the carry is ignored).
 
The PADDW instruction adds packed word integers. When an individual result is too large to be represented in 16 bits (overflow), the result is wrapped around and the low 16 bits are written to the destination operand.
 
The PADDD instruction adds packed doubleword integers. When an individual result is too large to be represented in 32 bits (overflow), the result is wrapped around and the low 32 bits are written to the destination operand.
 
Note that the PADDB, PADDW, and PADDD instructions can operate on either unsigned or signed (two's complement notation) packed integers; however, it does not set bits in the EFLAGS register to indicate overflow and/or a carry. To prevent undetected overflow conditions, software must control the ranges of values operated on.
 
 
## Operation
 
```c
switch(Instruction) {
	case PADDB:
		if(OperandSize == 64) {
			//PADDB instruction with 64-bit operands:
			Destination[0..7] = Destination[0..7] + Source[0..7];
			Destination[8..15] = Destination[8..15] + Source[8..15];
			Destination[16..23] = Destination[16..23] + Source[16..23];
			Destination[24..31] = Destination[24..31] + Source[24..31];
			Destination[32..39] = Destination[32..39] + Source[32..39];
			Destination[40..47] = Destination[40..47] + Source[40..47];
			Destination[48..55] = Destination[48..55] + Source[48..55];
			Destination[56..63] = Destination[56..63] + Source[56..63];
		}
		else {
			//PADDB instruction with 128-bit operands:
			Destination[0..7] = Destination[0..7] + Source[0..7];
			Destination[8..15] = Destination[8..15] + Source[8..15];
			Destination[16..23] = Destination[16..23] + Source[16..23];
			Destination[24..31] = Destination[24..31] + Source[24..31];
			Destination[32..39] = Destination[32..39] + Source[32..39];
			Destination[40..47] = Destination[40..47] + Source[40..47];
			Destination[48..55] = Destination[48..55] + Source[48..55];
			Destination[56..63] = Destination[56..63] + Source[56..63];
			Destination[64..71] = Destination[64..71] + Source[64..71];
			Destination[72..79] = Destination[72..79] + Source[]72..79;
			Destination[80..87] = Destination[80..87] + Source[80..87];
			Destination[88..95] = Destination[88..95] + Source[88..95];
			Destination[96..103] = Destination[96..103] + Source[96..103];
			Destination[104..111] = Destination[104..111] + Source[104..111];
			Destination[112..119] = Destination[112..119] + Source[112..119];
			Destination[120..127] = Destination[120..111] + Source[120..127];
		}
		break;
	case PADDW:
		if(OperandSize == 64) {
			//PADDW instruction with 64-bit operands:
			Destination[0..15] = Destination[0..15] + Source[0..15];
			Destination[16..31] = Destination[16..31] + Source[16..31];
			Destination[32..47] = Destination[32..47] + Source[32..47];
			Destination[48..63] = Destination[48..63] + Source[48..63];
		}
		else {
			//PADDW instruction with 128-bit operands:
			Destination[0..15] = Destination[0..15] + Source[0..15];
			Destination[16..31] = Destination[16..31] + Source[16..31];
			Destination[32..47] = Destination[32..47] + Source[32..47];
			Destination[48..63] = Destination[48..63] + Source[48..63];
			Destination[64..79] = Destination[64..79] + Source[64..79];
			Destination[80..95] = Destination[80..95] + Source[80..95];
			Destination[96..111] = Destination[96..111] + Source[96..111];
			Destination[112..127] = Destination[112..127] + Source[112..127];
		}
		break;
	case PADDD:
		if(OperandSize == 64) {
			//PADDD instruction with 64-bit operands:
			Destination[31..0] = Destination[31..0] + Source[31..0];
			Destination[63..32] = Destination[63..32] + Source[63..32];
		}
		else {
			//PADDD instruction with 128-bit operands:
			Destination[0..31] = Destination[0..31] + Source[0..31];
			Destination[32..63] = Destination[32..63] + Source[32..63];
			Destination[64..95] = Destination[64..95] + Source[64..95];
			Destination[96..127] = Destination[96..127] + Source[96..127];
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
|#UD|If EM in CR0 is set. 128-bit operations will generate #UD only if OSFXSR in CR4 is 0. Execution of 128-bit instructions on a non-SSE2 capable processor (one that is MMX technology capable) will result in the instruction operating on the mm registers, not #UD.|
|#NM|If TS in CR0 is set.|
|#MF|(64-bit operations only) If there is a pending x87 FPU exception.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|(128-bit operations only) If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#UD|If EM in CR0 is set. 128-bit operations will generate #UD only if OSFXSR in CR4 is 0. Execution of 128-bit instructions on a non-SSE2 capable processor (one that is MMX technology capable) will result in the instruction operating on the mm registers, not #UD.|
|#NM|If TS in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PADDB/PADDW/PADDD mm, mm|2/2/-|1/1/-|MMX_ALU|
|PADDB/PADDW/PADDD xmm, xmm|2/2/1|2/2/1|MMX_ALU|
