# VERR/VERW
 
## Verify a Segment for Reading or Writing
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 00 /4 VERR r/m16|Set ZF=1 if segment specified with r/m16 can be read.||
|0F 00 /5 VERW r/m16|Set ZF=1 if segment specified with r/m16 can be written.||
 
## Description
 
Verifies whether the code or data segment specified with the source operand is readable (VERR) or writable (VERW) from the current privilege level (CPL). The source operand is a 16-bit register or a memory location that contains the segment selector for the segment to be verified.
 
If the segment is accessible and readable (VERR) or writable (VERW), the ZF flag is set; otherwise, the ZF flag is cleared. Code segments are never verified as writable. This check cannot be performed on system segments.
 
To set the ZF flag, the following conditions must be met:
 
* The segment selector is not null.
* The selector must denote a descriptor within the bounds of the descriptor table (GDT or LDT).
* The selector must denote the descriptor of a code or data segment (not that of a system segment or gate).
* For the VERR instruction, the segment must be readable.
* For the VERW instruction, the segment must be a writable data segment.
* If the segment is not a conforming code segment, the segment's DPL must be greater than or equal to (have less or the same privilege as) both the CPL and the segment selector's RPL.
 
The validation performed is the same as is performed when a segment selector is loaded into the DS, ES, FS, or GS register, and the indicated access (read or write) is performed. The segment selector's value cannot result in a protection exception, enabling the software to anticipate possible segment access problems.
 
 
## Operation
 
```c
if(Source.Offset > GDTR.Limit || Source.Offset > LDTR.Limit) {
	ZF = 0;
	SegmentDescriptor = ReadSegmentDescriptor();
	if(SegmentDescriptor.Type == 0 /*system segment*/ || (!IsConformingCodeSegment(SegmentDescriptor.Type) && (CPL > DPL || RPL > DPL))) ZF = 0;
	else if((Instruction == VERR && IsReadable(Segment)) || (Instruction == VERW && IsWritable(Segment))) ZF = 1;
}

```
 
 
## Flags affected
 
The ZF flag is set to 1 if the segment is accessible and readable (VERR) or writable (VERW); otherwise, it is set to 0.

 
