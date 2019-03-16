# COMISS
 
## Compare Scalar Ordered Single-Precision Floating- Point Values and Set EFLAGS
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 2F /r|COMISS xmm1, xmm2/m32|Compare low single-precision floating-point values in xmm1 and xmm2/mem32 and set the EFLAGS flags accordingly.|
 
## Description
 
Compares the single-precision floating-point values in the low doublewords of source operand 1 (first operand) and source operand 2 (second operand), and sets the ZF, PF, and CF flags in the EFLAGS register according to the result (unordered, greater than, less than, or equal). The OF, SF, and AF flags in the EFLAGS register are set to 0. The unordered result is returned if either source operand is a NaN (QNaN or SNaN).
 
Source operand 1 is an XMM register; source operand 2 can be an XMM register or a 32 bit memory location.
 
The COMISS instruction differs from the UCOMISS instruction in that it signals an SIMD floating-point invalid operation exception (#I) when a source operand is either a QNaN or SNaN. The UCOMISS instruction signals an invalid numeric exception only if a source operand is an SNaN.
 
The EFLAGS register is not updated if an unmasked SIMD floating-point exception is generated.
 
 
## Operation
 
```c
Result = OrderedCompare(Source1[0..31], Source2[0..31]);
switch(Result) {
	case ResultUnordered:
		ZF = 1;
		PF = 1;
		CF = 1;
		break;
	case ResultGreaterThan:
		ZF = 0;
		PF = 0;
		CF = 0;
		break;
	case ResultLessThan:
		ZF = 0;
		PF = 0;
		CF = 1;
		break;
	case ResultEqual:
		ZF = 1;
		PF = 0;
		CF = 0;
		break;
}
OF = 0;
AF = 0;
SF = 0;

```
 
 
## SIMD Floating-Point Exceptions
 
Invalid (if SNaN or QNaN operands), Denormal.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.|
|#SS(0)|For an illegal address in the SS segment.|
|#PF(fault-code)|For a page fault.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
|#UD|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 0. If EM in CR0 is set. If OSFXSR in CR4 is 0. If CPUID feature flag SSE is 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
|#XM|If an unmasked SIMD floating-point exception and OSXMMEXCPT in CR4 is 1.|
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Real Address Mode
|[]()||
|-|-|
|#PF(fault-code)|For a page fault.|
|#PF(fault-code)|For a page fault.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|COMISS xmm, xmm|7/6/1|2/2/1|FP_ADD FP_MISC|
