# SFENCE
 
## Store Fence
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F AE /7|SFENCE|Serializes store operations.|
 
## Description
 
Performs a serializing operation on all store-to-memory instructions that were issued prior the SFENCE instruction. This serializing operation guarantees that every store instruction that precedes in program order the SFENCE instruction is globally visible before any store instruction that follows the SFENCE instruction is globally visible. The SFENCE instruction is ordered with respect store instructions, other SFENCE instructions, any MFENCE instructions, and any serializing instructions (such as the CPUID instruction). It is not ordered with respect to load instructions or the LFENCE instruction.
 
Weakly ordered memory types can be used to achieve higher processor performance through such techniques as out-of-order issue, write-combining, and write-collapsing. The degree to which a consumer of data recognizes or knows that the data is weakly ordered varies among applications and may be unknown to the producer of this data. The SFENCE instruction provides a performance-efficient way of insuring store ordering between routines that produce weakly-ordered results and routines that consume this data.
 
 
## Operation
 
```c
WaitOnStores(PrecedingStoresGloballyVisible); //wait on following stores until the preceding stores are globally visible

```
 
