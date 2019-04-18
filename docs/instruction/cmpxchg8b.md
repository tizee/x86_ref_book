# CMPXCHG8B
 
## Compare and Exchange 8 Bytes
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F C7 /1 m64|CMPXCHG8B m64|Compare EDX:EAX with m64. If equal, set ZF and load ECX:EBX into m64. Else, clear ZF and load m64 into EDX:EAX.|
 
## Description
 
Compares the 64-bit value in EDX:EAX with the operand (destination operand). If the values are equal, the 64-bit value in ECX:EBX is stored in the destination operand. Otherwise, the value in the destination operand is loaded into EDX:EAX. The destination operand is an 8-byte memory location. For the EDX:EAX and ECX:EBX register pairs, EDX and ECX contain the high-order 32 bits and EAX and EBX contain the low-order 32 bits of a 64-bit value.
 
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
 
To simplify the interface to the processor's bus, the destination operand receives a write cycle without regard to the result of the comparison. The destination operand is written back if the comparison fails; otherwise, the source operand is written into the destination. (The processor never produces a locked read without also producing a locked write.)
 
 
## Operation
 
```c
if(EDX:EAX == Destination) {
	ZF = 1;
	Destination = ECX:EBX;
}
else {
	ZF = 0;
	EDX:EAX = Destination;
}

```
 
 
## Flags affected
 
The ZF flag is set if the destination operand and EDX:EAX are equal; otherwise it is cleared.
The CF, PF, AF, SF, and OF flags are unaffected.

 
 
## IA-32 Architecture Compatibility
 
This instruction is not supported on Intel processors earlier than the Pentium processors.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#UD|If the destination operand is not a memory location.|
|#UD|If the destination operand is not a memory location.|
|#GP(0)|If the destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|If the destination operand is not a memory location.|
|#UD|If the destination operand is not a memory location.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|If the destination operand is not a memory location.|
|#UD|If the destination operand is not a memory location.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
