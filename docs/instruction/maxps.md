# MAXPS
 
## Return Maximum Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 5F /r|MAXPS xmm1, xmm2/m128|Return the maximum single-precision floating-point|
 
## Description
 
Performs an SIMD compare of the packed single-precision floating-point values in the destination operand (first operand) and the source operand (second operand), and returns the maximum value for each pair of values to the destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register.
 
If the values being compared are both 0.0s (of either sign), the value in the second operand (source operand) is returned. If a value in the second operand is an SNaN, that SNaN is returned unchanged to the destination (that is, a QNaN version of the SNaN is not returned).
 
If only one value is a NaN (SNaN or QNaN) for this instruction, the second operand (source operand), either a NaN or a valid floating-point value, is written to the result. If instead of this behavior, it is required that the NaN source operand (from either the first or second operand) be returned, the action of MAXPS can be emulated using a sequence of instructions, such as, a comparison followed by AND, ANDN and OR.
 
 
## Operation
 
```c
if((Destination[0..31] == 0.0 && Source[0..31] == 0.0) || IsSNaN(Destination[0..31]) || IsSNaN(Source[0..31]) || Destination[0..31] <= Source[0..31]) Destination[0..31] = Source[0..31];
if((Destination[32..63] == 0.0 && Source[32..63] == 0.0) || IsSNaN(Destination[32..63]) || IsSNaN(Source[32..63]) || Destination[32..63] <= Source[32..63]) Destination[32..63] = Source[32..63];
if((Destination[64..95] == 0.0 && Source[64..95] == 0.0) || IsSNaN(Destination[64..95]) || IsSNaN(Source[64..95]) || Destination[64..95] <= Source[64..95]) Destination[64..95] = Source[64..95];
if((Destination[96..127] == 0.0 && Source[96..127] == 0.0) || IsSNaN(Destination[96..127]) || IsSNaN(Source[96..127]) || Destination[96..127] <= Source[96..127]) Destination[96..127] = Source[96..127];

```
 
 
## SIMD Floating-Point Exceptions
 
|[]()||
|-|-|
|Invalid|(including QNaN source operand), Denormal.|
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|MAXPS xmm, xmm|5/4|2/2|FP_ADD|
