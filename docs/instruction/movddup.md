# MOVDDUP
 
## Move One Double-FP and Duplicate
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F 12 /r|MOVDDUP xmm1, xmm2/m64|Move 64 bits representing the lower DP data element from xmm2/m64 to xmm1 register and duplicate.|
 
## Description
 
The linear address corresponds to the address of the least-significant byte of the referenced memory data. When a memory address is indicated, the 8 bytes of data at memory location m64 are loaded. When the register-register form of this operation is used, the lower half of the 128- bit source register is duplicated and copied into the 128-bit destination register.
 
 
## Operation
 
```c
if(Source == m64) {
	//Load instruction
	xmm1[0..63] = m64;
	xmm1[64..127] = m64;
}
else {
	//Move instruction
	xmm1[0..63] = xmm2[0..63];
	xmm1[64..127] = xmm2[0..63];
}

```
 
 
## Exceptions
 
None.
 
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
|#UD|If CR0.EM = 1. If CR4.OSFXSR(bit 9) = 0. If CPUID.SSE3(ECX bit 0) = 0.|
 
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
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n|0F3n|0F3n|
|MOVDDUP xmm1, xmm2|4|2|FP_MOVE|
