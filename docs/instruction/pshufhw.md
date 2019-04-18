# PSHUFHW
 
## Shuffle Packed High Words
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 0F 70 /r ib|PSHUFHW xmm1, xmm2/m128, imm8 Shuffle the high words in xmm2/m128 based on the encoding in imm8 and store the result in xmm1.||
 
## Description
 
Copies words from the high quadword of the source operand (second operand) and inserts them in the high quadword of the destination operand (first operand) at word locations selected with the order operand (third operand). This operation is similar to the operation used by the PSHUFD instruction, which is illustrated in Figure 4-6. For the PSHUFHW instruction, each 2- bit field in the order operand selects the contents of one word location in the high quadword of the destination operand. The binary encodings of the order operand fields select words (0, 1, 2 or 3, 4) from the high quadword of the source operand to be copied to the destination operand.
 
The low quadword of the source operand is copied to the low quadword of the destination operand.
 
The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. The order operand is an 8-bit immediate.
 
Note that this instruction permits a word in the high quadword of the source operand to be copied to more than one word location in the high quadword of the destination operand.
 
 
## Operation
 
```c
Destination[0..63] = Source[0..63];
Destination[64..79] = (Source >> (Order[0..1] * 16))[64..79];
Destination[80..95] = (Source >> (Order[2..3] * 16))[64..79];
Destination[96..111] = (Source >> (Order[4..5] * 16))[64..79];
Destination[112..127] = (Source >> (Order[6..7] * 16))[64..79];

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSHUFHW xmm, xmm, imm8|2/2/1|2/2/1|MMX_SHFT|
