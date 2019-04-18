# SHUFPD
 
## Shuffle Packed Double-Precision Floating-Point Values
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|66 0F C6 /r ib|SHUFPD xmm1, xmm2/m128, imm8|Shuffle packed double-precision floating-point values selected by imm8 from xmm1 and xmm1/m128 to xmm1.|
 
## Description
 
Moves either of the two packed double-precision floating-point values from destination operand (first operand) into the low quadword of the destination operand; moves either of the two packed double-precision floating-point values from the source operand into to the high quadword of the destination operand. The select operand (third operand) determines which values are moved to the destination operand.
 
The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM register. The select operand is an 8-bit immediate: bit 0 selects which value is moved from the destination operand to the result (where 0 selects the low quadword and 1 selects the high quadword) and bit 1 selects which value is moved from the source operand to the result. Bits 2 through 7 of the select operand are reserved and must be set to 0.
 
 
## Operation
 
```c
if(Select[0] == 0) Destination[0..63] = Destination[0..63];
else Destination[0..63] = Destination[64..127];
if(Select[1] == 0) Destination[64..127] = Source[0..63];
else Destination[64..127] = Source[64..127];

```
 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|SHUFPD xmm, xmm, imm8|6/6|2/2|MMX_SHFT|
