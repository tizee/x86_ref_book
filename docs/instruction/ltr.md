# LTR
 
## Load Task Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 00 /3|LTR r/m16|Load r/m16 into task register.|
 
## Description
 
Loads the source operand into the segment selector field of the task register. The source operand (a general-purpose register or a memory location) contains a segment selector that points to a task state segment (TSS). After the segment selector is loaded in the task register, the processor uses the segment selector to locate the segment descriptor for the TSS in the global descriptor table (GDT). It then loads the segment limit and base address for the TSS from the segment descriptor into the task register. The task pointed to by the task register is marked busy, but a switch to the task does not occur.
 
The LTR instruction is provided for use in operating-system software; it should not be used in application programs. It can only be executed in protected mode when the CPL is 0. It is commonly used in initialization code to establish the first task to be executed.
 
The operand-size attribute has no effect on this instruction.
 
 
## Operation
 
```c
if(!IsWithinDescriptorTableLimit(Source.Offset) || Source.Type != TypeGlobal) Exception(GP(SegmentSelector));
SegmentDescriptor = ReadSegmentDescriptor();
if(!IsForAnAvailableTSS(SegmentDescriptor)) Exception(GP(SegmentSelector));
if(!IsPresent(SegmentDescriptor)) Exception(GP(SegmentSelector));
TSSSegmentDescriptor.Busy = 1;
//Locked read-modify-write operation on the entire descriptor when setting busy flag
TaskRegister.SegmentSelector = Source;
TaskRegister.SegmentDescriptor.TSSSegmentDescriptor;

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the current privilege level is not 0. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If the current privilege level is not 0. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(selector)|If the source selector points to a segment that is not a TSS or to one for a task that is already busy. If the selector points to LDT or is beyond the GDT limit.|
|#NP(selector)|If the TSS is marked not present.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|The LTR instruction is not recognized in real-address mode.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|The LTR instruction is not recognized in virtual-8086 mode.|
