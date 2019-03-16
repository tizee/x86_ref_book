# MOVMSKPS
 
## Extract Packed Single-Precision Floating-Point Sign Mask
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 50 /r|MOVMSKPS r32, xmm|Extract 4-bit sign mask of from xmm and store in r32.|
 
## Description
 
Extracts the sign bits from the packed single-precision floating-point values in the source operand (second operand), formats them into a 4-bit mask, and stores the mask in the destination operand (first operand). The source operand is an XMM register, and the destination operand is a general-purpose register. The mask is stored in the 4 low-order bits of the destination operand.
 
 
## Operation
 
```c
Destination[0] = Source[31];
Destination[1] = Source[63];
Destination[2] = Source[95];
Destination[3] = Source[127];
Destination[4..31] = 0;

```
 
 
## SIMD Floating-Point Exceptions
 
None.
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#NM|If TS in CR0 is set.|
|#NM|If TS in CR0 is set.|
 
## Real-Address Mode Exceptions
 
Same exceptions as in Protected Mode
 
## Virtual-8086 Mode Exceptions
 
Same exceptions as in Protected Mode.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|MOVMSKPS r32, xmm|6/6|2/2|FP_MISC|
