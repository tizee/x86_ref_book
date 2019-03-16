# NOP
 
## No Operation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|90|NOP|No operation.|
 
## Description
 
Performs no operation. This instruction is a one-byte instruction that takes up space in the instruction stream but does not affect the machine context, except the EIP register.
 
The NOP instruction is an alias mnemonic for the XCHG (E)AX, (E)AX instruction.
 
 
## Flags affected
 
None.

 
 
## Exceptions
 
None.
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|NOP|1/0.5|0.5/0.5|ALU|
