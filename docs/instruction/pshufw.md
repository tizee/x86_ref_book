# PSHUFW
 
## Shuffle Packed Words
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 70 /r ib|PSHUFW mm1, mm2/m64, imm8|Shuffle the words in mm2/m64 based on the encoding in imm8 and store the result in mm1.|
 
## Description
 
Copies words from the source operand (second operand) and inserts them in the destination operand (first operand) at word locations selected with the order operand (third operand). This operation is similar to the operation used by the PSHUFD instruction, which is illustrated in Figure 4-6. For the PSHUFW instruction, each 2-bit field in the order operand selects the contents of one word location in the destination operand. The encodings of the order operand fields select words from the source operand to be copied to the destination operand.
 
The source operand can be an MMX technology register or a 64-bit memory location. The destination operand is an MMX technology register. The order operand is an 8-bit immediate.
 
Note that this instruction permits a word in the source operand to be copied to more than one word location in the destination operand.
 
 
## Operation
 
```c
Destination[0..15] = (Source >> (Order[0..1] * 16))[0..15];
Destination[16..31] = (Source >> (Order[2..3] * 16))[0..15];
Destination[32..47] = (Source >> (Order[4..5] * 16))[0..15];
Destination[48..63] = (Source >> (Order[6..7] * 16))[0..15];

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSHUFW mm, mm, imm8|2/2/1|1/1/1|MMX_SHFT|
