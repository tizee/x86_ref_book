# PEXTRW
 
## Extract Word
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F C5 /r ib|PEXTRW r32, mm, imm8|Extract the word specified by imm8 from mm and move it to r32.|
|66 0F C5 /r ib|PEXTRW r32, xmm, imm8|Extract the word specified by imm8 from xmm and move it to a r32.|
 
## Description
 
Copies the word in the source operand (second operand) specified by the count operand (third operand) to the destination operand (first operand). The source operand can be an MMX technology register or an XMM register. The destination operand is the low word of a generalpurpose register. The count operand is an 8-bit immediate. When specifying a word location in an MMX technology register, the 2 least-significant bits of the count operand specify the location; for an XMM register, the 3 least-significant bits specify the location. The high word of the destination operand is cleared (set to all 0s).
 
 
## Operation
 
```c
if(OperandSize == 64) {
	//PEXTRW instruction with 64-bit source operand
	SEL = COUNT & 3;
	Temporary = (Source >> (SEL * 16)) & 0xFFFF;
	r32[0..15] = Temporary[0..15];
	r32[16..31] = 0;
}
else {
	//PEXTRW instruction with 128-bit source operand:
	SEL = COUNT & 7;
	Temporary = (Source >> (SEL * 16)) AND 0xFFFF;
	r32[0..15] = Temporary[0..15];
	r32[16..31] = 0;
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
|PEXTRW r32, mm, imm8|7/7/2|2/2/1|MMX_SHFT FP_MISC|
|PEXTRW r32, xmm, imm8|7/7/3|2/2/2|MMX_SHFT FP_MISC|
