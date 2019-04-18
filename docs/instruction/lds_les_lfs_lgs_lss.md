# LDS/LES/LFS/LGS/LSS
 
## Load Far Pointer
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|C5 /r|LDS r16,m16:16|Load DS:r16 with far pointer from memory.|
|C5 /r|LDS r32,m16:32|Load DS:r32 with far pointer from memory.|
|0F B2 /r|LSS r16,m16:16|Load SS:r16 with far pointer from memory.|
|0F B2 /r|LSS r32,m16:32|Load SS:r32 with far pointer from memory.|
|C4 /r|LES r16,m16:16|Load ES:r16 with far pointer from memory.|
|C4 /r|LES r32,m16:32|Load ES:r32 with far pointer from memory.|
|0F B4 /r|LFS r16,m16:16|Load FS:r16 with far pointer from memory.|
|0F B4 /r|LFS r32,m16:32|Load FS:r32 with far pointer from memory.|
|0F B5 /r|LGS r16,m16:16|Load GS:r16 with far pointer from memory.|
|0F B5 /r|LGS r32,m16:32|Load GS:r32 with far pointer from memory.|
 
## Description
 
Loads a far pointer (segment selector and offset) from the second operand (source operand) into a segment register and the first operand (destination operand). The source operand specifies a 48-bit or a 32-bit pointer in memory depending on the current setting of the operand-size attribute (32 bits or 16 bits, respectively). The instruction opcode and the destination operand specify a segment register/general-purpose register pair. The 16-bit segment selector from the source operand is loaded into the segment register specified with the opcode (DS, SS, ES, FS, or GS). The 32-bit or 16-bit offset is loaded into the register specified with the destination operand.
 
If one of these instructions is executed in protected mode, additional information from the segment descriptor pointed to by the segment selector in the source operand is loaded in the hidden part of the selected segment register.
 
Also in protected mode, a null selector (values 0000 through 0003) can be loaded into DS, ES, FS, or GS registers without causing a protection exception. (Any subsequent reference to a segment whose corresponding segment register is loaded with a null selector, causes a generalprotection exception (#GP) and no memory reference to the segment occurs.)
 
 
## Operation
 
```c
if(IsProtectedMode()) {
	if(IsLoaded(SS)) {
		if(SegmentSelector == 0) Exception(GP(0));
		if(!IsWithinDescriptorTableLimits(SegmentSelector.Index) || SegmentSelector.RPL != CPL || !IndicatesWritableDataSegment(SegmentSelector) || DPL != CPL) Exception(GP(Selector));
		if(!IsPresent(Segment)) Exception(SS(Selector));
		SS = SegmentSelector.Source;
		SS = SegmentDescriptor.Source; //Source: segment relative offset
	}
	else if((IsLoaded(DS) || IsLoaded(ES) || IsLoaded(FS) || IsLoaded(GS)) && SegmentSelector != 0) { //DS, ES, FS, or GS is loaded with non-null segment selector
		if(!IsWithinDescriptorTableLimits(SegmentSelector.Index) || IsData(SegmentSelector) || IsReadableCodeSegment(SegmentSelector) || (IsData(Segment) || !IsConformingCodeSegment(Segment) && RPL > DPL && CPL > DPL)) Exception(GP(Selector));
		if(!IsPresent(Segment)) Exception(GP(Selector));
		SegmentRegister = SegmentSelector.Source & RPL;
		SegmentRegister = SegmenDescriptor.Source; //Source: segment relative offset
	}
	else if((IsLoaded(DS) || IsLoaded(ES) || IsLoaded(FS) || IsLoaded(GS)) && SegmentSelector == 0) { //DS, ES, FS, or GS is loaded with a null selector
		SegmentRegister = NullSelector;
		SegmentRegister.DescriptorValidBit = 0; //hidden flag, not accessible by software
	}
}
if(IsRealAddressMode() || IsVirtual8086Mode()) SegmentRegister = SegmentSelector.Source;
Destination = Offset(Source);

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#UD|If source operand is not a memory location.|
|#UD|If source operand is not a memory location.|
|#GP(0)|If a null selector is loaded into the SS register. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#GP(selector)|If the SS register is being loaded and any of the following is true: the segment selector index is not within the descriptor table limits, the segment selector RPL is not equal to CPL, the segment is a non-writable data segment, or DPL is not equal to CPL. If the DS, ES, FS, or GS register is being loaded with a non-null segment selector and any of the following is true: the segment selector index is not within descriptor table limits, the segment is neither a data nor a readable code segment, or the segment is a data or nonconforming-code segment and both RPL and CPL are greater than DPL.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#SS(selector)|If the SS register is being loaded and the segment is marked not present.|
|#NP(selector)|If DS, ES, FS, or GS register is being loaded with a non-null segment selector and the segment is marked not present.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS|If a memory operand effective address is outside the SS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|If source operand is not a memory location.|
|#UD|If source operand is not a memory location.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
