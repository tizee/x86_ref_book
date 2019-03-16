# SHUFPS
 
## Shuffle Packed Single-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F C6 /r ib|SHUFPS xmm1, xmm2/m128, imm8|Shuffle packed single-precision floating-point values selected by imm8 from xmm1 and xmm1/m128 to xmm1.|
 
## Description
 
Moves two of the four packed single-precision floating-point values from the destination operand (first operand) into the low quadword of the destination operand; moves two of the four packed single-precision floating-point values from the source operand (second operand) into to the high quadword of the destination operand. The select operand (third operand) determines which values are moved to the destination operand.
 
The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. The select operand is an 8-bit immediate: bits 0 and 1 select the value to be moved from the destination operand to the low doubleword of the result, bits 2 and 3 select the value to be moved from the destination operand to the second doubleword of the result, bits 4 and 5 select the value to be moved from the source operand to the third doubleword of the result, and bits 6 and 7 select the value to be moved from the source operand to the high doubleword of the result.
 
 
## Operation
 
```c
switch(Select[0..1]) {
	case 0:
		Destination[0..31] = Destination[0..31];
		break;
	case 1:
		Destination[0..31] = Destination[32..63];
		break;
	case 2:
		Destination[0..31] = Destination[64..95];
		break;
	case 3:
		Destination[0..31] = Destination[96..127];
		break;
}
switch(Select[2..3]) {
	case 0:
		Destination[32..63] = Destination[0..31];
		break;
	case 1:
		Destination[32..63] = Destination[32..63];
		break;
	case 2:
		Destination[32..63] = Destination[64..95];
		break;
	case 3:
		Destination[32..63] = Destination[96..127];
		break;
}
switch(Select[4..5]) {
	case 0:
		Destination[64..95] = Source[0..31];
		break;
	case 1:
		Destination[64..95] = Source[32..63];
		break;
	case 2:
		Destination[64..95] = Source[64..95];
		break;
	case 3:
		Destination[64..95] = Source[96..127];
		break;
}
switch(Select[6..7]) {
	case 0:
		Destination[96..127] = Source[0..31];
		break;
	case 1:
		Destination[96..127] = Source[32..63];
		break;
	case 2:
		Destination[96..127] = Source[64..95];
		break;
	case 3:
		Destination[96..127] = Source[96..127];
		break;
}

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SHUFPS xmm, xmm, imm8|6/6/2|2/2/2|MMX_SHFT|
