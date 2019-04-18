# CMPPD
 
## Compare Packed Double-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F C2 /r ib|CMPPD xmm1, xmm2/m128, imm8|Compare packed double-precision floating-point values in xmm2/m128 and xmm1 using imm8 as comparison predicate.|
 
|Description|Predicate|imm8 Encoding|Description|Relation where: A Is 1st Operand, B Is 2nd Operand|Emulation|Result if NaN Operand|QNaN Operand Signals Invalid|Pseudo-Op|CMPPD Implementation|
|-|-|-|-|-|-|-|-|-|-|
|
Performs an SIMD compare of the two packed double-precision floating-point values in the source operand (second operand) and the destination operand (first operand) and returns the results of the comparison to the destination operand. The comparison predicate operand (third operand) specifies the type of comparison performed on each of the pairs of packed values. The result of each comparison is a quadword mask of all 1s (comparison true) or all 0s (comparison false). The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. The comparison predicate operand is an 8-bit immediate the first 3 bits of which define the type of comparison to be made (see the following table); bits 4 through 7 of the immediate are reserved.


Predicateimm8 EncodingDescriptionRelation where: A Is 1st Operand, B Is 2nd OperandEmulationResult if NaN OperandQNaN Operand Signals Invalid
EQ000BEqualA = B-FalseNo
LT001BLess-thanA < B-FalseYes
LE010BLess-than-or-equalA <= B-FalseYes
--Greater thanA > BSwap Operands, Use LTFalseYes
--Greater-than-or-equalA >= BSwap Operands, Use LEFalseYes
UNORD011BUnorderedA, B = Unordered-TrueNo
NEQ100BNot-equalA != B-TrueNo
NLT101BNot-less-thanNOT(A < B)-TrueYes
NLE110BNot-less-than-or-equalNOT(A != B)-TrueYes
--Not-greater-thanNOT(A > B)Swap Operands, Use NLTTrueYes
--Not-greater-than-or-equalNOT(A >= B)Swap Operands, Use NLETrueYes
ORD111BOrderedA , B = Ordered-FalseNo


The unordered relationship is true when at least one of the two source operands being compared is a NaN; the ordered relationship is true when neither source operand is a NaN.
A subsequent computational instruction that uses the mask result in the destination operand as an input operand will not generate an exception, because a mask of all 0s corresponds to a floating-point value of +0.0 and a mask of all 1s corresponds to a QNaN.
Note that the processor does not implement the greater-than, greater-than-or-equal, not-greaterthan, and not-greater-than-or-equal relations. These comparisons can be made either by using the inverse relationship (that is, use the "not-less-than-or-equal" to make a "greater-than" comparison) or by using software emulation. When using software emulation, the program must swap the operands (copying registers when necessary to protect the data that will now be in the destination), and then perform the compare using a different predicate. The predicate to be used for these emulations is listed in the following table under the heading Emulation.
Compilers and assemblers may implement the following two-operand pseudo-ops in addition to the three-operand CMPPD instruction. See the following table.


Pseudo-OpCMPPD Implementation
CMPEQPD xmm1, xmm2CMPPD xmm1, xmm2, 0
CMPLTPD xmm1, xmm2CMPPD xmm1, xmm2, 1
CMPLEPD xmm1, xmm2CMPPD xmm1, xmm2, 2
CMPUNORDPD xmm1, xmm2CMPPD xmm1, xmm2, 3
CMPNEQPD xmm1, xmm2CMPPD xmm1, xmm2, 4
CMPNLTPD xmm1, xmm2CMPPD xmm1, xmm2, 5
CMPNLEPD xmm1, xmm2CMPPD xmm1, xmm2, 6
CMPORDPD xmm1, xmm2CMPPD xmm1, xmm2, 7


The greater-than relations that the processor does not implement require more than one instruction to emulate in software and therefore should not be implemented as pseudo-ops. (For these, the programmer should reverse the operands of the corresponding less than relations and use move instructions to ensure that the mask is moved to the correct destination register and that the source operand is left intact.)
|EQ|000B|Equal|A = B|-|False|No|LT|001B|Less-than|A < B|-|False|Yes|LE|010B|Less-than-or-equal|A <= B|-|False|Yes|-|-|Greater than|A > B|Swap Operands, Use LT|False|Yes|-|-|Greater-than-or-equal|A >= B|Swap Operands, Use LE|False|Yes|UNORD|011B|Unordered|A, B = Unordered|-|True|No|NEQ|100B|Not-equal|A != B|-|True|No|NLT|101B|Not-less-than|NOT(A < B)|-|True|Yes|NLE|110B|Not-less-than-or-equal|NOT(A != B)|-|True|Yes|-|-|Not-greater-than|NOT(A > B)|Swap Operands, Use NLT|True|Yes|-|-|Not-greater-than-or-equal|NOT(A >= B)|Swap Operands, Use NLE|True|Yes|ORD|111B|Ordered|A , B = Ordered|-|False|No|CMPEQPD xmm1, xmm2|CMPPD xmm1, xmm2, 0|CMPLTPD xmm1, xmm2|CMPPD xmm1, xmm2, 1|CMPLEPD xmm1, xmm2|CMPPD xmm1, xmm2, 2|CMPUNORDPD xmm1, xmm2|CMPPD xmm1, xmm2, 3|CMPNEQPD xmm1, xmm2|CMPPD xmm1, xmm2, 4|CMPNLTPD xmm1, xmm2|CMPPD xmm1, xmm2, 5|CMPNLEPD xmm1, xmm2|CMPPD xmm1, xmm2, 6|CMPORDPD xmm1, xmm2|CMPPD xmm1, xmm2, 7|
|
|EQ|000B|Equal|A = B|-|False|No|
|LT|001B|Less-than|A < B|-|False|Yes|
|LE|010B|Less-than-or-equal|A <= B|-|False|Yes|
|-|-|Greater than|A > B|Swap Operands, Use LT|False|Yes|
|-|-|Greater-than-or-equal|A >= B|Swap Operands, Use LE|False|Yes|
|UNORD|011B|Unordered|A, B = Unordered|-|True|No|
|NEQ|100B|Not-equal|A != B|-|True|No|
|NLT|101B|Not-less-than|NOT(A < B)|-|True|Yes|
|NLE|110B|Not-less-than-or-equal|NOT(A != B)|-|True|Yes|
|-|-|Not-greater-than|NOT(A > B)|Swap Operands, Use NLT|True|Yes|
|-|-|Not-greater-than-or-equal|NOT(A >= B)|Swap Operands, Use NLE|True|Yes|
|ORD|111B|Ordered|A , B = Ordered|-|False|No|
|
|CMPEQPD xmm1, xmm2|CMPPD xmm1, xmm2, 0|
|CMPLTPD xmm1, xmm2|CMPPD xmm1, xmm2, 1|
|CMPLEPD xmm1, xmm2|CMPPD xmm1, xmm2, 2|
|CMPUNORDPD xmm1, xmm2|CMPPD xmm1, xmm2, 3|
|CMPNEQPD xmm1, xmm2|CMPPD xmm1, xmm2, 4|
|CMPNLTPD xmm1, xmm2|CMPPD xmm1, xmm2, 5|
|CMPNLEPD xmm1, xmm2|CMPPD xmm1, xmm2, 6|
|CMPORDPD xmm1, xmm2|CMPPD xmm1, xmm2, 7|
 
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
CMP0 = Destination[0..63] Operator Source[0..63];
CMP1 = Destination[64..127] Operator Source[64..127];
if(CMP0 == true) Destination[0..64] = 0xFFFFFFFFFFFFFFFF;
else Destination[0..63] = 0;
if(CMP1 == true) Destination[64..127] = 0xFFFFFFFFFFFFFFFF;
else Destination[64..127] = 0;

```
 
 
## SIMD Floating-Point Exceptions
 
Invalid if SNaN operand and invalid if QNaN and predicate as listed in above table, Denormal.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#GP(0)|For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments. If a memory operand is not aligned on a 16-byte boundary, regardless of segment.|
|#SS(0)|For an illegal address in the SS segment.|
|#SS(0)|For an illegal address in the SS segment.|
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
