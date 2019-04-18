# BSWAP
 
## Byte Swap
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F C8+rd|BSWAP r32|Reverses the byte order of a 32-bit register.|
 
## Description
 
Reverses the byte order of a 32-bit (destination) register: bits 0 through 7 are swapped with bits 24 through 31, and bits 8 through 15 are swapped with bits 16 through 23. This instruction is provided for converting little-endian values to big-endian format and vice versa.
 
To swap bytes in a word value (16-bit register), use the XCHG instruction. When the BSWAP instruction references a 16-bit register, the result is undefined.
 
The BSWAP instruction is not supported on IA-32 processors earlier than the Intel486 processor family. For compatibility with this instruction, include functionally equivalent code for execution on Intel processors earlier than the Intel486 processor family.
 
 
## Operation
 
```c
Temporary = Destination;
Destination[0..7] = Temporary[24..31];
Destination[8..15] = Temporary[16..23];
Destination[16..23] = Temporary[8..15];
Destination[24..31] = Temporary[0..7];

```
 
 
## Flags affected
 
None.

 
 
## Exceptions
 
None.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|BSWAP|1/7|0.5/1|ALU|
