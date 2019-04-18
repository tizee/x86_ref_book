# LAR
 
## Load Access Rights Byte
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 02 /r|LAR r16,r/m16|r16 = r/m16 masked by FF00H.|
|0F 02 /r|LAR r32,r/m32|r32 = r/m32 masked by 00FxFF00H.|
 
|Description|Type|Name|Valid|
|-|-|-|-|
|
Loads the access rights from the segment descriptor specified by the second operand (source operand) into the first operand (destination operand) and sets the ZF flag in the EFLAGS register. The source operand (which can be a register or a memory location) contains the segment selector for the segment descriptor being accessed. The destination operand is a general-purpose register.
The processor performs access checks as part of the loading process. Once loaded in the destination register, software can perform additional checks on the access rights information.
When the operand size is 32 bits, the access rights for a segment descriptor include the type and DPL fields and the S, P, AVL, D/B, and G flags, all of which are located in the second doubleword (bytes 4 through 7) of the segment descriptor. The doubleword is masked by 00FXFF00H before it is loaded into the destination operand. When the operand size is 16 bits, the access rights include the type and DPL fields. Here, the two lower-order bytes of the doubleword are masked by FF00H before being loaded into the destination operand.
This instruction performs the following checks before it loads the access rights in the destination register:

Checks that the segment selector is not null.
Checks that the segment selector points to a descriptor that is within the limits of the GDT or LDT being accessed - Checks that the descriptor type is valid for this instruction. All code and data segment descriptors are valid for (can be accessed with) the LAR instruction. The valid system segment and gate descriptor types are given in Table 3-53.
If the segment is not a conforming code segment, it checks that the specified segment descriptor is visible at the CPL (that is, if the CPL and the RPL of the segment selector are less than or equal to the DPL of the segment selector).

If the segment descriptor cannot be accessed or is an invalid type for the instruction, the ZF flag is cleared and no access rights are loaded in the destination operand.
The LAR instruction can only be executed in protected mode.


Segment and Gate Types
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
if(Source.Offset > DescriptorTableLimit) ZF = 0;
SegmentDescriptor = ReadSegmentDescriptor();
if(SegmentDescriptor.Type != TypeConformingCodeSegment && CPL > DPL || RPL > DPL || !CheckInstructionValidity(SegmentDescriptor.Type) /*Segment type is not valid for instruction*/) ZF = 0;
else {
	//Source: segment relative offset
	if(OperandSize == 32) Destination = Source & 0xFXFF00; //X: undefined?
	else Destination = Source & 0xFF00; //OperandSize == 16
}

```
 
 
## Flags affected
 
The ZF flag is set to 1 if the access rights are loaded successfully; otherwise, it is set to 0.

 
 
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
|#UD|The LAR instruction is not recognized in real-address mode.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|The LAR instruction cannot be executed in virtual-8086 mode.|
