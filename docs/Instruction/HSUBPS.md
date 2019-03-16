# HSUBPS
 
## Packed Single-FP Horizontal Subtract
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F 7D /r|HSUBPS xmm1, xmm2/m128|Subtract horizontally packed SP FP numbers in xmm2/m128 from xmm1.|
 
## Description
 
Subtracts the single-precision floating-point value in the second dword of the destination operand from the first dword of the destination operand and stores the result in the first dword of the destination operand.
 
Subtracts the single-precision floating-point value in the fourth dword of the destination operand from the third dword of the destination operand and stores the result in the second dword of the destination operand.
 
Subtracts the single-precision floating-point value in the second dword of the source operand from the first dword of the source operand and stores the result in the third dword of the destination operand.
 
Subtracts the single-precision floating-point value in the fourth dword of the source operand from the third dword of the source operand and stores the result in the fourth dword of the destination operand.
 
 
## Operation
 
```c
xmm1[0..31] = xmm1[0..31] - xmm1[32..63];
xmm1[32..63] = xmm1[64..95] - xmm1[96..127];
xmm1[64..95] = xmm2/m128[0..31] - xmm2/m128[32..63];
xmm1[96..127] = xmm2/m128[64..95] - xmm2/m128[96..127];

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
|HSUBPS|13|4|FP_ADD FP_MISC|
