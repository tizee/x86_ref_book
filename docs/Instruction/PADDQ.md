# PADDQ
 
## Add Packed Quadword Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F D4 /r|PADDQ mm1,mm2/m64|Add quadword integer mm2/m64 to mm1.|
|66 0F D4 /r|PADDQ xmm1,xmm2/m128|Add packed quadword integers xmm2/m128 to xmm1.|
 
## Description
 
Adds the first operand (destination operand) to the second operand (source operand) and stores the result in the destination operand. The source operand can be a quadword integer stored in an MMX technology register or a 64-bit memory location, or it can be two packed quadword integers stored in an XMM register or an 128-bit memory location. The destination operand can be a quadword integer stored in an MMX technology register or two packed quadword integers stored in an XMM register. When packed quadword operands are used, an SIMD add is performed. When a quadword result is too large to be represented in 64 bits (overflow), the result is wrapped around and the low 64 bits are written to the destination element (that is, the carry is ignored).
 
Note that the PADDQ instruction can operate on either unsigned or signed (two's complement notation) integers; however, it does not set bits in the EFLAGS register to indicate overflow and/or a carry. To prevent undetected overflow conditions, software must control the ranges of the values operated on.
 
 
## Operation
 
```c
//PADDQ instruction with 64-Bit operands:
if(OperandSize == 64) Destination[0..63] = Destination[0..63] + Source[0..63];
//PADDQ instruction with 128-Bit operands:
else {
	Destination[0..63] = Destination[0..63] + Source[0..63];
	Destination[64..127] = Destination[64..127] + Source[64..127];
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
|PADDQ mm, mm|2/2/2|1/1/1|FP_MISC|
|PADDQ xmm, xmm|6/6/2+1|2/2/2|FP_MISC|
