# INVLPG
 
## Invalidate TLB Entry
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 01/7|INVLPG m|Invalidate TLB Entry for page that contains m.|
 
## Description
 
Invalidates (flushes) the translation lookaside buffer (TLB) entry specified with the source operand. The source operand is a memory address. The processor determines the page that contains that address and flushes the TLB entry for that page.
 
The INVLPG instruction is a privileged instruction. When the processor is running in protected mode, the CPL of a program or procedure must be 0 to execute this instruction.
 
The INVLPG instruction normally flushes the TLB entry only for the specified page; however, in some cases, it flushes the entire TLB. See "MOV-Move to/from Control Registers" in this chapter for further information on operations that flush the TLB.
 
 
## Operation
 
```c
Flush(RelevantTLBEntries);
ContinueExecution();

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
The INVLPG instruction is implementation dependent, and its function may be implemented differently on different families of IA-32 processors. This instruction is not supported on IA-32 processors earlier than the Intel486 processor.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the current privilege level is not 0.|
|#GP(0)|If the current privilege level is not 0.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|Operand is a register.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|The INVLPG instruction cannot be executed at the virtual-8086 mode.|
