# CMPSS
 
## Compare Scalar Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F C2 /r ib|CMPSS xmm1, xmm2/m32, imm8|Compare low single-precision floating-point value in xmm2/m32 and xmm1 using imm8 as comparison predicate.|
 
|Description|Pseudo-Op|CMPSS|Implementation|
|-|-|-|-|
|
Compares the low single-precision floating-point values in the source operand (second operand) and the destination operand (first operand) and returns the results of the comparison to the destination operand. The comparison predicate operand (third operand) specifies the type of comparison performed. The comparison result is a doubleword mask of all 1s (comparison true) or all 0s (comparison false). The source operand can be an XMM register or a 32-bit memory location.
The destination operand is an XMM register. The result is stored in the low doubleword of the destination operand; the 3 high-order doublewords remain unchanged. The comparison predicate operand is an 8-bit immediate the first 3 bits of which define the type of comparison to be made (see the following table); bits 4 through 7 of the immediate are reserved.
The unordered relationship is true when at least one of the two source operands being compared is a NaN; the ordered relationship is true when neither source operand is a NaN A subsequent computational instruction that uses the mask result in the destination operand as an input operand will not generate a fault, since a mask of all 0s corresponds to a floating-point value of +0.0 and a mask of all 1s corresponds to a QNaN.
Some of the comparisons listed in the following table can be achieved only through software emulation.
For these comparisons the program must swap the operands (copying registers when necessary to protect the data that will now be in the destination operand), and then perform the compare using a different predicate. The predicate to be used for these emulations is listed in the following table under the heading Emulation.
Compilers and assemblers may implement the following two-operand pseudo-ops in addition to the three-operand CMPSS instruction. See the following table. The greater-than relations not implemented in the processor require more than one instruction to emulate in software and therefore should not be implemented as pseudo-ops. (For these, the programmer should reverse the operands of the corresponding less than relations and use move instructions to ensure that the mask is moved to the correct destination register and that the source operand is left intact.)


Pseudo-OpCMPSSImplementation
CMPEQSS xmm1, xmm2CMPSS xmm1, xmm2, 0
CMPLTSS xmm1, xmm2CMPSS xmm1, xmm2, 1
CMPLESS xmm1, xmm2CMPSS xmm1, xmm2, 2
CMPUNORDSS xmm1, xmm2CMPSS xmm1, xmm2, 3
CMPNEQSS xmm1, xmm2CMPSS xmm1, xmm2, 4
CMPNLTSS xmm1, xmm2CMPSS xmm1, xmm2, 5
CMPNLESS xmm1, xmm2CMPSS xmm1, xmm2, 6
CMPORDSS xmm1, xmm2CMPSS xmm1, xmm2, 7


The greater-than relations not implemented in the processor require more than one instruction to emulate in software and therefore should not be implemented as pseudo-ops. (For these, the programmer should reverse the operands of the corresponding less than relations and use move instructions to ensure that the mask is moved to the correct destination register and that the source operand is left intact.)
|CMPEQSS xmm1, xmm2|CMPSS xmm1, xmm2, 0|CMPLTSS xmm1, xmm2|CMPSS xmm1, xmm2, 1|CMPLESS xmm1, xmm2|CMPSS xmm1, xmm2, 2|CMPUNORDSS xmm1, xmm2|CMPSS xmm1, xmm2, 3|CMPNEQSS xmm1, xmm2|CMPSS xmm1, xmm2, 4|CMPNLTSS xmm1, xmm2|CMPSS xmm1, xmm2, 5|CMPNLESS xmm1, xmm2|CMPSS xmm1, xmm2, 6|CMPORDSS xmm1, xmm2|CMPSS xmm1, xmm2, 7|
|
|CMPEQSS xmm1, xmm2|CMPSS xmm1, xmm2, 0|
|CMPLTSS xmm1, xmm2|CMPSS xmm1, xmm2, 1|
|CMPLESS xmm1, xmm2|CMPSS xmm1, xmm2, 2|
|CMPUNORDSS xmm1, xmm2|CMPSS xmm1, xmm2, 3|
|CMPNEQSS xmm1, xmm2|CMPSS xmm1, xmm2, 4|
|CMPNLTSS xmm1, xmm2|CMPSS xmm1, xmm2, 5|
|CMPNLESS xmm1, xmm2|CMPSS xmm1, xmm2, 6|
|CMPORDSS xmm1, xmm2|CMPSS xmm1, xmm2, 7|
 
## Operation
 
```c
switch(ComparisonPredicate) {
	case 0:
		Operator = OperatorEqual;
		break;
	case 1:
		Operator = OperatorLessThan;
		break;
	case 2:
		Operator = OperatorLessOrEqual;
		break;
	case 3:
		Operator = OperatorUnordered;
		break;
	case 4:
		Operator = OperatorNotEqual;
		break;
	case 5:
		Operator = OperatorNotLessThan;
		break;
	case 6:
		Operator = OperatorNotLessOrEqual;
		break;
	case 7:
		Operator = OperatorOrdered;
		break;
	default:
		Reserved();
}
CMP0 = Destination[0..31] Operator Source[0..31];
if(CMP0 == true) Destination[0..31] = 0xFFFFFFFF;
else Destination[0..31] = 0;
//Destination[32..127] remains unchanged

```
 
 
## SIMD Floating-Point Exceptions
 
Invalid if SNaN operand, Invalid if QNaN and predicate as listed in above table, Denormal.
 
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
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If any part of the operand lies outside the effective address space from 0 to FFFFH.|
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
|CMPSS xmm, xmm|5/4/3|2/2/1|FP_ADD|
