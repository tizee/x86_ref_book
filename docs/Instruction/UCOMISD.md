# UCOMISD
 
## Unordered Compare Scalar Double-Precision Floating- Point Values and Set EFLAGS
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 2E /r|UCOMISD xmm1, xmm2/m64|Compare (unordered) the low double-precision floating-point values in xmm1 and xmm2/m64 and set EFLAGS accordingly.|
 
## Description
 
Performs and unordered compare of the double-precision floating-point values in the low quadwords of source operand 1 (first operand) and source operand 2 (second operand), and sets the ZF, PF, and CF flags in the EFLAGS register according to the result (unordered, greater than, less than, or equal). The OF, SF and AF flags in the EFLAGS register are set to 0. The unordered result is returned if either source operand is a NaN (QNaN or SNaN).
 
Source operand 1 is an XMM register; source operand 2 can be an XMM register or a 64 bit memory location.
 
The UCOMISD instruction differs from the COMISD instruction in that it signals an SIMD floating-point invalid operation exception (#I) only when a source operand is an SNaN. The COMISD instruction signals an invalid operation exception if a source operand is either a QNaN or an SNaN.
 
The EFLAGS register is not updated if an unmasked SIMD floating-point exception is generated.
 
 
## Operation
 
```c
Result = UnorderedCompare(Source1[0..63], Source2[0..63]);
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
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|UCOMISD xmm, xmm|7/6/1|2/2/1|FP_ADD, FP_MISC|
