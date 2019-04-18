# PSHUFLW
 
## Shuffle Packed Low Words
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F2 0F 70 /r ib|PSHUFLW xmm1, xmm2/m128, imm8|Shuffle the low words in xmm2/m128 based on the encoding in imm8 and store the result in xmm1.|
 
## Description
 
Copies words from the low quadword of the source operand (second operand) and inserts them in the low quadword of the destination operand (first operand) at word locations selected with the order operand (third operand). This operation is similar to the operation used by the PSHUFD instruction, which is illustrated in Figure 4-6. For the PSHUFLW instruction, each 2- bit field in the order operand selects the contents of one word location in the low quadword of the destination operand. The binary encodings of the order operand fields select words (0, 1, 2, or 3) from the low quadword of the source operand to be copied to the destination operand. The high quadword of the source operand is copied to the high quadword of the destination operand.
 
The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. The order operand is an 8-bit immediate.
 
Note that this instruction permits a word in the low quadword of the source operand to be copied to more than one word location in the low quadword of the destination operand.
 
 
## Operation
 
```c
Destination[0..15] = (Source >> (Order[0..1] * 16))[0..15];
Destination[16..31] = (Source >> (Order[2..3] * 16))[0..15];
Destination[32..47] = (Source >> (Order[4..5] * 16))[0..15];
Destination[48..63] = (Source >> (Order[6..7] * 16))[0..15];
Destination[64..127] = Source[64..127];

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSHUFLW xmm, xmm, imm8|2/2/1|2/2/1|MMX_SHFT|
