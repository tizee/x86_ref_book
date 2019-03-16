# PCMPGTB/PCMPGTW/PCMPGTD
 
## Compare Packed Signed Integers for Greater Than
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 64 /r|PCMPGTB mm, mm/m64|Compare packed signed byte integers in mm and mm/m64 for greater than.|
|66 0F 64 /r|PCMPGTB xmm1, xmm2/m128|Compare packed signed byte integers in xmm1 and xmm2/m128 for greater than.|
|0F 65 /r|PCMPGTW mm, mm/m64|Compare packed signed word integers in mm and mm/m64 for greater than.|
|66 0F 65 /r|PCMPGTW xmm1, xmm2/m128|Compare packed signed word integers in xmm1 and xmm2/m128 for greater than.|
|0F 66 /r|PCMPGTD mm, mm/m64|Compare packed signed doubleword integers in mm and mm/m64 for greater than.|
|66 0F 66 /r|PCMPGTD xmm1, xmm2/m128|Compare packed signed doubleword integers in xmm1 and xmm2/m128 for greater than.|
 
## Description
 
Performs an SIMD signed compare for the greater value of the packed byte, word, or doubleword integers in the destination operand (first operand) and the source operand (second operand). If a data element in the destination operand is greater than the corresponding date element in the source operand, the corresponding data element in the destination operand is set to all 1s; otherwise, it is set to all 0s. The source operand can be an MMX technology register or a 64-bit memory location, or it can be an XMM register or a 128-bit memory location. The destination operand can be an MMX technology register or an XMM register.
 
The PCMPGTB instruction compares the corresponding signed byte integers in the destination and source operands; the PCMPGTW instruction compares the corresponding signed word integers in the destination and source operands; and the PCMPGTD instruction compares the corresponding signed doubleword integers in the destination and source operands.
 
 
## Operation
 
```c
if(Instruction) {
	case PCMPGTB:
		if(OperandSize == 64) {
			//PCMPGTB instruction with 64-bit operands:
			if(Destination[0..7] > Source[0..7]) Destination[0..7] = 0xFF;
			else Destination[0..7] = 0;
			if(Destination[8..15] > Source[8..15]) Destination[8..15] = 0xFF;
			else Destination[8..15] = 0;
			if(Destination[16..23] > Source[16..23]) Destination[16..23] = 0xFF;
			else Destination[16..23] = 0;
			if(Destination[24..31] > Source[24..31]) Destination[24..31] = 0xFF;
			else Destination[24..31] = 0;
			if(Destination[32..39] > Source[32..39]) Destination[32..39] = 0xFF;
			else Destination[32..39] = 0;
			if(Destination[40..47] > Source[40..47]) Destination[40..47] = 0xFF;
			else Destination[40..47] = 0;
			if(Destination[48..55] > Source[48..55]) Destination[48..55] = 0xFF;
			else Destination[48..55] = 0;
			if(Destination[56..63] > Source[56..63]) Destination[56..63] = 0xFF;
			else Destination[56..63] = 0;
		}
		else {
			//PCMPGTB instruction with 128-bit operands:
			if(Destination[0..7] > Source[0..7]) Destination[0..7] = 0xFF;
			else Destination[0..7] = 0;
			if(Destination[8..15] > Source[8..15]) Destination[8..15] = 0xFF;
			else Destination[8..15] = 0;
			if(Destination[16..23] > Source[16..23]) Destination[16..23] = 0xFF;
			else Destination[16..23] = 0;
			if(Destination[24..31] > Source[24..31]) Destination[24..31] = 0xFF;
			else Destination[24..31] = 0;
			if(Destination[32..39] > Source[32..39]) Destination[32..39] = 0xFF;
			else Destination[32..39] = 0;
			if(Destination[40..47] > Source[40..47]) Destination[40..47] = 0xFF;
			else Destination[40..47] = 0;
			if(Destination[48..55] > Source[48..55]) Destination[48..55] = 0xFF;
			else Destination[48..55] = 0;
			if(Destination[56..63] > Source[56..63]) Destination[56..63] = 0xFF;
			else Destination[56..63] = 0;
			if(Destination[64..71] > Source[64..71]) Destination[64..71] = 0xFF;
			else Destination[64..71] = 0;
			if(Destination[72..79] > Source[72..79]) Destination[72..79] = 0xFF;
			else Destination[72..79] = 0;
			if(Destination[80..87] > Source[80..87]) Destination[80..87] = 0xFF;
			else Destination[80..87] = 0;
			if(Destination[88..95] > Source[88..95]) Destination[88..95] = 0xFF;
			else Destination[88..95] = 0;
			if(Destination[96..103] > Source[96..103]) Destination[96..103] = 0xFF;
			else Destination[96..103] = 0;
			if(Destination[104..111] > Source[104..111]) Destination[104..111] = 0xFF;
			else Destination[104..111] = 0;
			if(Destination[112..119] > Source[112..119]) Destination[112..119] = 0xFF;
			else Destination[112..119] = 0;
			if(Destination[120..127] > Source[120..127]) Destination[120..127] = 0xFF;
			else Destination[120..127] = 0;
		break;
	case PCMPGTW:
		if(OperandSize == 64) {
			//PCMPGTW instruction with 64-bit operands:
			if(Destination[0..15] > Source[0..15]) Destination[0..15] = 0xFFFF;
			else Destination[0..15] = 0;
			if(Destination[16..31] > Source[16..31]) Destination[16..31] = 0xFFFF;
			else Destination[16..31] = 0;
			if(Destination[32..47] > Source[32..47]) Destination[32..47] = 0xFFFF;
			else Destination[32..47] = 0;
			if(Destination[48..63] > Source[48..63]) Destination[48..63] = 0xFFFF;
			else Destination[48..63] = 0;
		}
		else {
			//PCMPGTW instruction with 128-bit operands:
			if(Destination[0..15] > Source[0..15]) Destination[0..15] = 0xFFFF;
			else Destination[0..15] = 0;
			if(Destination[16..31] > Source[16..31]) Destination[16..31] = 0xFFFF;
			else Destination[16..31] = 0;
			if(Destination[32..47] > Source[32..47]) Destination[32..47] = 0xFFFF;
			else Destination[32..47] = 0;
			if(Destination[48..63] > Source[48..63]) Destination[48..63] = 0xFFFF;
			else Destination[48..63] = 0;
			if(Destination[64..79] > Source[64..79]) Destination[64..79] = 0xFFFF;
			else Destination[64..79] = 0;
			if(Destination[80..95] > Source[80..95]) Destination[80..95] = 0xFFFF;
			else Destination[80..95] = 0;
			if(Destination[96..111] > Source[96..111]) Destination[96..111] = 0xFFFF;
			else Destination[96..111] = 0;
			if(Destination[112..127] > Source[112..127]) Destination[112..127] = 0xFFFF;
			else Destination[112..127] = 0;
		}
		break:
	case PCMPGTD:
		if(OperandSize == 64) {
			//PCMPGTD instruction with 64-bit operands:
			if(Destination[0..31] > Source[0..31]) Destination[0..31] = 0xFFFFFFFF;
			else Destination[0..31] = 0;
			if(Destination[32..63] > Source[32..63]) Destination[32..63] = 0xFFFFFFFF;
			else Destination[32..63] = 0;
		}
		else {
			//PCMPGTD instruction with 128-bit operands:
			if(Destination[0..31] > Source[0..31]) Destination[0..31] = 0xFFFFFFFF;
			else Destination[0..31] = 0;
			if(Destination[32..63] > Source[32..63]) Destination[32..63] = 0xFFFFFFFF;
			else Destination[32..63] = 0;
			if(Destination[64..95] > Source[64..95]) Destination[64..95] = 0xFFFFFFFF;
			else Destination[64..95] = 0;
			if(Destination[96..127] > Source[96..127]) Destination[96..127] = 0xFFFFFFFF;
			else Destination[96..127] = 0;
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
 
## Numeric Exceptions
 
None.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PCMPGTB/PCMPGTD/PCMPGTW mm, mm|2/2/-|1/1/-|MMX_ALU|
|PCMPGTB/PCMPGTD/PCMPGTW xmm, xmm|2/2/1|2/2/1|MMX_ALU|
