# UD2
 
## Undefined Instruction
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 0B|UD2|Raise invalid opcode exception.|
 
## Description
 
Generates an invalid opcode. This instruction is provided for software testing to explicitly generate an invalid opcode. The opcode for this instruction is reserved for this purpose.
 
Other than raising the invalid opcode exception, this instruction is the same as the NOP instruction.
 
 
## Operation
 
```c
Exception(UD); //Generates invalid opcode exception

```
 
 
## Flags affected
 
None.

 
