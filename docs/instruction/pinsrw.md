# PINSRW
 
## Insert Word
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F C4 /r ib|PINSRW mm, r32/m16, imm8|Insert the low word from r32 or from m16 into mm at the word position specified by imm8.|
|66 0F C4 /r ib|PINSRW xmm, r32/m16, imm8|Move the low word of r32 or from m16 into xmm at the word position specified by imm8.|
 
## Description
 
Copies a word from the source operand (second operand) and inserts it in the destination operand (first operand) at the location specified with the count operand (third operand). (The other words in the destination register are left untouched.) The source operand can be a generalpurpose register or a 16-bit memory location. (When the source operand is a general-purpose register, the low word of the register is copied.) The destination operand can be an MMX technology register or an XMM register. The count operand is an 8-bit immediate. When specifying a word location in an MMX technology register, the 2 least-significant bits of the count operand specify the location; for an XMM register, the 3 least-significant bits specify the location.
 
 
## Operation
 
```c
switch(OperandSize) {
	case 8:
		//PINSRW instruction with 64-bit source operand:
		Masks[] = {
			0x000000000000FFFF,
			0x00000000FFFF0000,
			0x0000FFFF00000000,
			0xFFFF000000000000
		};
		SEL = Count & 3;
		Mask = Masks[SEL];
		Destination = (Destination & ~Mask) | (((Source << (SEL * 16)) & Mask);
		break;
	case 16:
		//PINSRW instruction with 128-bit source operand:
		Masks[] = {
			0x0000000000000000000000000000FFFF,
			0x000000000000000000000000FFFF0000,
			0x00000000000000000000FFFF00000000,
			0x0000000000000000FFFF000000000000,
			0x000000000000FFFF0000000000000000,
			0x00000000FFFF00000000000000000000,
			0x0000FFFF000000000000000000000000,
			0xFFFF0000000000000000000000000000
		};
		SEL = Count & 7;
		Mask = Masks[SEL];
		Destination = (Destination & ~Mask) | (((Source << (SEL * 16)) & Mask);
		break;
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#UD|If EM in CR0 is set. (128-bit operations only) If OSFXSR in CR4 is 0. (128-bit operations only) If CPUID feature flag SSE2 is 0.|
|#NM|If TS in CR0 is set.|
|#MF|(64-bit operations only) If there is a pending x87 FPU exception.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
|#GP(0)|If any part of the operand lies outside of the effective address space from 0 to FFFFH.|
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
|PINSRW mm, r32, imm8|4/4/1|1/1/1|MMX_SHFT MMX_MISC|
|PINSRW xmm, r32, imm8|4/4/1+1|2/2/2|MMX_SHFT MMX_MISC|
