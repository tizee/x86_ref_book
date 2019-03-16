# LEAVE
 
## High Level Procedure Exit
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|C9|LEAVE|Set SP to BP, then pop BP.|
|C9|LEAVE|Set ESP to EBP, then pop EBP.|
 
## Description
 
Releases the stack frame set up by an earlier ENTER instruction. The LEAVE instruction copies the frame pointer (in the EBP register) into the stack pointer register (ESP), which releases the stack space allocated to the stack frame. The old frame pointer (the frame pointer for the calling procedure that was saved by the ENTER instruction) is then popped from the stack into the EBP register, restoring the calling procedure's stack frame.
 
A RET instruction is commonly executed following a LEAVE instruction to return program control to the calling procedure.
 
See "Procedure Calls for Block-Structured Languages" in Chapter 6 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for detailed information on the use of the ENTER and LEAVE instructions.
 
 
## Operation
 
```c
if(StackAddressSize == 32) ESP = EBP;
else SP = BP; //StackAddressSize = 16

if(OperandSize == 32) EBP = Pop();
else BP = Pop(); //OperandSize == 16

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#SS(0)|If the EBP register points to a location that is not within the limits of the current stack segment.|
|#SS(0)|If the EBP register points to a location that is not within the limits of the current stack segment.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If the EBP register points to a location outside of the effective address space from 0 to FFFFH.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the EBP register points to a location outside of the effective address space from 0 to FFFFH.|
|#GP(0)|If the EBP register points to a location outside of the effective address space from 0 to FFFFH.|
|#PF(fault-code)|If a page fault occurs.|
