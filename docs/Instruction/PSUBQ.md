# PSUBQ
 
## Subtract Packed Quadword Integers
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F FB /r|PSUBQ mm1, mm2/m64|Subtract quadword integer in mm1 from mm2 /m64.|
|66 0F FB /r|PSUBQ xmm1, xmm2/m128|Subtract packed quadword integers in xmm1 from xmm2/m128.|
 
## Description
 
Subtracts the second operand (source operand) from the first operand (destination operand) and stores the result in the destination operand. The source operand can be a quadword integer stored in an MMX technology register or a 64-bit memory location, or it can be two packed quadword integers stored in an XMM register or an 128-bit memory location. The destination operand can be a quadword integer stored in an MMX technology register or two packed quadword integers stored in an XMM register. When packed quadword operands are used, an SIMD subtract is performed. When a quadword result is too large to be represented in 64 bits (overflow), the result is wrapped around and the low 64 bits are written to the destination element (that is, the carry is ignored).
 
Note that the PSUBQ instruction can operate on either unsigned or signed (two's complement notation) integers; however, it does not set bits in the EFLAGS register to indicate overflow and/or a carry. To prevent undetected overflow conditions, software must control the ranges of the values operated on.
 
 
## Operation
 
```c
//PSUBQ instruction with 64-Bit operands:
if(OperandSize == 64) Destination[0..63] = Destination[0..63] - Source[0..63];
//PSUBQ instruction with 128-Bit operands:
else {
	Destination[0..63] = Destination[0..63] - Source[0..63];
	Destination[64..127] = Destination[64..127] - Source[64..127];
}

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSUBQ mm, mm|2/2/2+1|1/1/2|FP_MISC|
|PSUBQ xmm, xmm|6/6/2+1|2/2/2|FP_MISC|
