# HADDPD
 
## Packed Double-FP Horizontal Add
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 7C /r|HADDPD xmm1, xmm2/m128|Add horizontally packed DP FP numbers from xmm2/m128 to xmm1.|
 
## Description
 
Adds the double-precision floating-point values in the high and low quadwords of the destination operand and stores the result in the low quadword of the destination operand.
 
Adds the double-precision floating-point values in the high and low quadwords of the source operand and stores the result in the high quadword of the destination operand.
 
 
## Operation
 
```c
xmm1[0..63] = xmm1[0..63] + xmm1[64..127];
xmm1[64..127] = xmm2/m128[0..63] + xmm2/m128[64..127];

```
 
 
## Exceptions
 
When the source operand is a memory operand, the operand must be aligned on a 16-byte boundary or a general-protection exception (#GP) will be generated.
 
## Numeric Exceptions
 
Overflow, Underflow, Invalid, Precision, Denormal.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS bit in CR0 is set.|
|#XM|For an unmasked Streaming SIMD Extensions numeric exception (CR4.OSXMMEXCPT = 1).|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#NM|If TS bit in CR0 is set.|
|#XM|For an unmasked Streaming SIMD Extensions numeric exception (CR4.OSXMMEXCPT = 1).|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#NM|If TS bit in CR0 is set.|
|#XM|For an unmasked Streaming SIMD Extensions numeric exception (CR4.OSXMMEXCPT = 1).|
|#UD|If CR0.EM = 1. For an unmasked Streaming SIMD Extensions numeric exception (CR4.OSXMMEXCPT = 0). If CR4.OSFXSR(bit 9) = 0. If CPUID.SSE3(ECX bit 0) = 0.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n|0F3n|0F3n|
|HADDPD|13|4|FP_ADD FP_MISC|
