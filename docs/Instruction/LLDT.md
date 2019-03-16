# LLDT
 
## Load Local Descriptor Table Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 00 /2|LLDT r/m16|Load segment selector r/m16 into LDTR.|
 
## Description
 
Loads the source operand into the segment selector field of the local descriptor table register (LDTR). The source operand (a general-purpose register or a memory location) contains a segment selector that points to a local descriptor table (LDT). After the segment selector is loaded in the LDTR, the processor uses the segment selector to locate the segment descriptor for the LDT in the global descriptor table (GDT). It then loads the segment limit and base address for the LDT from the segment descriptor into the LDTR. The segment registers DS, ES, SS, FS, GS, and CS are not affected by this instruction, nor is the LDTR field in the task state segment (TSS) for the current task.
 
If the source operand is 0, the LDTR is marked invalid and all references to descriptors in the LDT (except by the LAR, VERR, VERW or LSL instructions) cause a general protection exception (#GP).
 
The operand-size attribute has no effect on this instruction.
 
The LLDT instruction is provided for use in operating-system software; it should not be used in application programs. Also, this instruction can only be executed in protected mode.
 
 
## Operation
 
```c
if(!IsWithinDescriptorTableLimit(Source.Offset)) Exception(GP(SegmentSelector));

SegmentDescriptor = ReadSegmentDescriptor;

if(SegmentDescriptor.Type != LDT) Exception(GP(SegmentSelector));
if(!IsPresent(SegmentDescriptor)) Exception(NP(SegmentSelector));

LDTR.SegmentSelector = Source;
LDTR.SegmentDescriptor = GDTSegmentDescriptor;

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the current privilege level is not 0. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If the current privilege level is not 0. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(selector)|If the selector operand does not point into the Global Descriptor Table or if the entry in the GDT is not a Local Descriptor Table. Segment selector is beyond GDT limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#NP(selector)|If the LDT descriptor is not present.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|The LLDT instruction is not recognized in real-address mode.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|The LLDT instruction is not recognized in virtual-8086 mode.|
