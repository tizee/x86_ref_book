# ARPL
 
## Adjust RPL Field of Segment Selector
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|63 /r|ARPL r/m16, r16|Adjust RPL of r/m16 to not less than RPL of r16|
 
## Description
 
Compares the RPL fields of two segment selectors. The first operand (the destination operand) contains one segment selector and the second operand (source operand) contains the other. (The RPL field is located in bits 0 and 1 of each operand.) If the RPL field of the destination operand is less than the RPL field of the source operand, the ZF flag is set and the RPL field of the destination operand is increased to match that of the source operand. Otherwise, the ZF flag is cleared and no change is made to the destination operand. (The destination operand can be a word register or a memory location; the source operand must be a word register.) The ARPL instruction is provided for use by operating-system procedures (however, it can also be used by applications). It is generally used to adjust the RPL of a segment selector that has been passed to the operating system by an application program to match the privilege level of the application program. Here the segment selector passed to the operating system is placed in the destination operand and segment selector for the application program's code segment is placed in the source operand. (The RPL field in the source operand represents the privilege level of the application program.) Execution of the ARPL instruction then insures that the RPL of the segment selector received by the operating system is no lower (does not have a higher privilege) than the privilege level of the application program (the segment selector for the application program's code segment can be read from the stack following a procedure call).
 
See "Checking Caller Access Privileges" in Chapter 4 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3, for more information about the use of this instruction.
 
 
## Operation
 
```c
if(Destination.RPL < Source.RPL) {
	ZF = 1;
	Destination.RPL = Source.RPL;
}
else ZF = 0;

```
 
 
## Flags affected
 
The ZF flag is set to 1 if the RPL field of the destination operand is less than that of the source operand; otherwise, it is set to 0.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If the destination is located in a non-writable segment. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|The ARPL instruction is not recognized in real-address mode.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|The ARPL instruction is not recognized in virtual-8086 mode.|
