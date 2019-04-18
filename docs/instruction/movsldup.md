# MOVSLDUP
 
## Move Packed Single-FP Low and Duplicate
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 12 /r|MOVSLDUP xmm1, xmm2/m128|Move 128 bits representing packed SP data elements from xmm2/m128 to xmm1 register and duplicate low.|
 
## Description
 
The linear address corresponds to the address of the least-significant byte of the referenced memory data. When a memory address is indicated, the 16 bytes of data at memory location m128 are loaded and the single-precision elements in positions 0 and 2 are duplicated. When the register-register form of this operation is used, the same operation is performed but with data coming from the 128-bit source register.
 
 
## Operation
 
```c
if(source == m128) {
	//load instruction
	xmm1[0..31] = m128[0..31];
	xmm1[32..63] = m128[0..31]
	xmm1[64..95] = m128[64..95];
	xmm1[96..127] = m128[64..95];
}
else {
	//move instruction
	xmm1[0..31] = xmm2[0..31];
	xmm1[32..63] = xmm2[0..31];
	xmm1[64..95] = xmm2[64..95];
	xmm1[96..127] = xmm2[64..95];
}

```
 
 
## Exceptions
 
General protection exception if not aligned on 16-byte boundary, regardless of segment.
 
## Numeric Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS bit in CR0 is set.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#NM|If TS bit in CR0 is set.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#GP(0)|If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.|
|#NM|If TS bit in CR0 is set.|
|#UD|If CR0.EM = 1. If CR4.OSFXSR(bit 9) = 0. If CPUID.SSE3(ECX bit 0) = 0.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n|0F3n|0F3n|
|MOVSLDUP xmm1, xmm2|6|2|FP_MOVE|
