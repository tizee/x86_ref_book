# PSHUFD
 
## Shuffle Packed Doublewords
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F 70 /r ib|PSHUFD xmm1, xmm2/m128, imm8|Shuffle the doublewords in xmm2/m128 based on the encoding in imm8 and store the result in xmm1.|
 
## Description
 
Copies doublewords from source operand (second operand) and inserts them in the destination operand (first operand) at the locations selected with the order operand (third operand). Figure 4-6 shows the operation of the PSHUFD instruction and the encoding of the order operand.
 
Each 2-bit field in the order operand selects the contents of one doubleword location in the destination operand. For example, bits 0 and 1 of the order operand select the contents of doubleword 0 of the destination operand. The encoding of bits 0 and 1 of the order operand (see the field encoding in Figure 4-6) determines which doubleword from the source operand will be copied to doubleword 0 of the destination operand.
 
The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. The order operand is an 8-bit immediate.
 
Note that this instruction permits a doubleword in the source operand to be copied to more than one doubleword location in the destination operand.
 
 
## Operation
 
```c
Destination[0..31] = (Source >> (Order[0..1] * 32))[0..31];
Destination[32..63] = (Source >> (Order[2..3] * 32))[0..31];
Destination[64..95] = (Source >> (Order[4..5] * 32))[0..31];
Destination[96..127] = (Source >> (Order[6..7] * 32))[0..31];

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PSHUFD xmm, xmm, imm8|4/4/2+1|2/2/2|MMX_SHFT|
