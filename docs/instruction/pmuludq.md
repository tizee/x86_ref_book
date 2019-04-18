# PMULUDQ
 
## Multiply Packed Unsigned Doubleword Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F F4 /r|PMULUDQ mm1, mm2/m64|Multiply unsigned doubleword integer in mm1 by unsigned doubleword integer in mm2/m64, and store the quadword result in mm1.|
|66 0F F4 /r|PMULUDQ xmm1, xmm2/m128|Multiply packed unsigned doubleword integers in xmm1 by packed unsigned doubleword integers in xmm2/m128, and store the quadword results in xmm1.|
 
## Description
 
Multiplies the first operand (destination operand) by the second operand (source operand) and stores the result in the destination operand. The source operand can be an unsigned doubleword integer stored in the low doubleword of an MMX technology register or a 64-bit memory location, or it can be two packed unsigned doubleword integers stored in the first (low) and third doublewords of an XMM register or an 128-bit memory location. The destination operand can be an unsigned doubleword integer stored in the low doubleword an MMX technology register or two packed doubleword integers stored in the first and third doublewords of an XMM register. The result is an unsigned quadword integer stored in the destination an MMX technology register or two packed unsigned quadword integers stored in an XMM register. When a quadword result is too large to be represented in 64 bits (overflow), the result is wrapped around and the low 64 bits are written to the destination element (that is, the carry is ignored).
 
For 64-bit memory operands, 64 bits are fetched from memory, but only the low doubleword is used in the computation; for 128-bit memory operands, 128 bits are fetched from memory, but only the first and third doublewords are used in the computation.
 
 
## Operation
 
```c
//PMULUDQ instruction with 64-Bit operands:
if(OperandSize == 64) Destination[0..63] = Destination[0..31] * Source[0..31];
//PMULUDQ instruction with 128-Bit operands:
else {
	Destination[0..63] = Destination[0..31] * Source[0..31];
	Destination[64..127] = Destination[64..95] * Source[64..95];
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PMULUDQ mm, mm|9/8/6|-/1/2|FP_MUL|
|PMULUDQ xmm, xmm|9/8/6+2|2/2/4|FP_MUL|
