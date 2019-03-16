# LSL
 
## Load Segment Limit
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 03 /r|LSL r16,r/m16|Load: r16 = segment limit, selector r/m16.|
|0F 03 /r|LSL r32,r/m32|Load: r32 = segment limit, selector r/m32.|
 
|Description|Type|Name|Valid|
|-|-|-|-|
|
Loads the unscrambled segment limit from the segment descriptor specified with the second operand (source operand) into the first operand (destination operand) and sets the ZF flag in the EFLAGS register. The source operand (which can be a register or a memory location) contains the segment selector for the segment descriptor being accessed. The destination operand is a general-purpose register.
The processor performs access checks as part of the loading process. Once loaded in the destination register, software can compare the segment limit with the offset of a pointer.
The segment limit is a 20-bit value contained in bytes 0 and 1 and in the first 4 bits of byte 6 of the segment descriptor. If the descriptor has a byte granular segment limit (the granularity flag is set to 0), the destination operand is loaded with a byte granular value (byte limit). If the descriptor has a page granular segment limit (the granularity flag is set to 1), the LSL instruction will translate the page granular limit (page limit) into a byte limit before loading it into the destination operand. The translation is performed by shifting the 20-bit "raw" limit left 12 bits and filling the low-order 12 bits with 1s.
When the operand size is 32 bits, the 32-bit byte limit is stored in the destination operand. When the operand size is 16 bits, a valid 32-bit limit is computed; however, the upper 16 bits are truncated and only the low-order 16 bits are loaded into the destination operand.
This instruction performs the following checks before it loads the segment limit into the destination register:

Checks that the segment selector is not null.
Checks that the segment selector points to a descriptor that is within the limits of the GDT or LDT being accessed
Checks that the descriptor type is valid for this instruction. All code and data segment descriptors are valid for (can be accessed with) the LSL instruction. The valid special segment and gate descriptor types are given in the following table.
If the segment is not a conforming code segment, the instruction checks that the specified segment descriptor is visible at the CPL (that is, if the CPL and the RPL of the segment selector are less than or equal to the DPL of the segment selector).

If the segment descriptor cannot be accessed or is an invalid type for the instruction, the ZF flag is cleared and no value is loaded in the destination operand.


Segment and Gate Descriptor Types
TypeNameValid
0ReservedNo
1Available 16-bit TSSYes
2LDTYes
3Busy 16-bit TSSYes
416-bit call gateYes
516-bit/32-bit task gateYes
616-bit interrupt gateNo
716-bit trap gateNo
8ReservedNo
9Available 32-bit TSSYes
AReservedNo
BBusy 32-bit TSSYes
C32-bit call gateYes
DReservedNo
E32-bit interrupt gateNo
F32-bit trap gateNo


|0|Reserved|No|1|Available 16-bit TSS|Yes|2|LDT|Yes|3|Busy 16-bit TSS|Yes|4|16-bit call gate|Yes|5|16-bit/32-bit task gate|Yes|6|16-bit interrupt gate|No|7|16-bit trap gate|No|8|Reserved|No|9|Available 32-bit TSS|Yes|A|Reserved|No|B|Busy 32-bit TSS|Yes|C|32-bit call gate|Yes|D|Reserved|No|E|32-bit interrupt gate|No|F|32-bit trap gate|No|
|
|0|Reserved|No|
|1|Available 16-bit TSS|Yes|
|2|LDT|Yes|
|3|Busy 16-bit TSS|Yes|
|4|16-bit call gate|Yes|
|5|16-bit/32-bit task gate|Yes|
|6|16-bit interrupt gate|No|
|7|16-bit trap gate|No|
|8|Reserved|No|
|9|Available 32-bit TSS|Yes|
|A|Reserved|No|
|B|Busy 32-bit TSS|Yes|
|C|32-bit call gate|Yes|
|D|Reserved|No|
|E|32-bit interrupt gate|No|
|F|32-bit trap gate|No|
 
## Operation
 
```c
if(!IsWithinDescriptorTableLimits(Source.Offset)) ZF = 0;

SegmentDescriptor = ReadSegmentDescriptor();
if(!IsConformingCodeSegment(SegmentDescriptor) && CPL > DPL || RPL > DPL || !ValidSegmentType(SegmentDescriptor) /*Segment type is not valid for instruction*/) ZF = 0;
else {
	Temporary = SegmentLimit(Source); //Source: segment relative offset
	if(G == 1) Temporary = (Temporary << 12) | 0xFFF;
	if(OperandSize == 32) Destination = Temporary;
	else Destination = Temporary & 0xFFFF; //OperandSize == 16
}

```
 
 
## Flags affected
 
The ZF flag is set to 1 if the segment limit is loaded successfully; otherwise, it is set to 0.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|The LSL instruction is not recognized in real-address mode.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|The LSL instruction is not recognized in virtual-8086 mode.|
