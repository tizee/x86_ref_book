# XCHG
 
## Exchange Register/Memory with Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|90+rw|XCHG AX, 16|Exchange r16 with AX.|
|90+rw|XCHG r16, X|Exchange AX with r16.|
|90+rd|XCHG EAX, r32|Exchange r32 with EAX.|
|90+rd|XCHG r32, EAX|Exchange EAX with r32.|
|86 /r|XCHG r/m8, r8|Exchange r8 (byte register) with byte from r/m8.|
|86 /r|XCHG r8, r/m8|Exchange byte from r/m8 with r8 (byte register).|
|87 /r|XCHG r/m16, r16|Exchange r16 with word from r/m16.|
|87 /r|XCHG r16, r/m16|Exchange word from r/m16 with r16.|
|87 /r|XCHG r/m32, r32|Exchange r32 with doubleword from r/m32.|
|87 /r|XCHG r32, r/m32|Exchange doubleword from r/m32 with r32.|
 
## Description
 
Exchanges the contents of the destination (first) and source (second) operands. The operands can be two general-purpose registers or a register and a memory location. If a memory operand is referenced, the processor's locking protocol is automatically implemented for the duration of the exchange operation, regardless of the presence or absence of the LOCK prefix or of the value of the IOPL. (See the LOCK prefix description in this chapter for more information on the locking protocol.) This instruction is useful for implementing semaphores or similar data structures for process synchronization. (See "Bus Locking" in Chapter 7 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for more information on bus locking.) The XCHG instruction can also be used instead of the BSWAP instruction for 16-bit operands.
 
 
## Operation
 
```c
Temporary = Destination;
Destination = Source;
Source = Temporary;

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|XCHG|1.5/1.5|1/1|ALU|
