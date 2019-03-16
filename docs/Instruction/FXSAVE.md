# FXSAVE
 
## Save x87 FPU, MMX Technology, SSE, and SSE2 State
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F AE /0|FXSAVE m512byte|Save the x87 FPU, MMX technology, XMM, and MXCSR register state to m512byte.|
 
|Description|Bit #|Description|R7|R6|R5|R4|R3|R2|R1|R0|R7|R6|R5|R4|R3|R2|R1|R0|Exponent all 1's|Exponent all 0's|Fraction all 0's|J and M bits|FTW valid bit|x87 FTW|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|
Saves the current state of the x87 FPU, MMX technology, XMM, and MXCSR registers to a 512-byte memory location specified in the destination operand. The following table shows the layout of the state information in memory.


Layout of FXSAVE and FXRSTOR Memory Region
Bit #Description
0-1FCW
2-3FSW
4FTW
5Reserved
6-7FOP
8-11FPU IP
12-13CS
14-15Reserved
16-19FPU DP
20-21DS
22-23Reserved
24-27MXCSR
28-31MXCSR_MASK
32-41ST0/MM0
42-47Reserved
48-57ST1/MM1
58-63Reserved
64-73ST2/MM2
74-79Reserved
80-89ST3/MM3
90-95Reserved
96-105ST4/MM4
106-111Reserved
112-121ST5/MM5
122-127Reserved
128-137ST6/MM6
138-143Reserved
144-153ST7/MM7
154-159Reserved
160-175XMM0
176-191XMM1
192-207XMM2
208-223XMM3
224-239XMM4
240-255XMM5
256-271XMM6
272-287XMM7
288-512Reserved


The destination operand contains the first byte of the memory image, and it must be aligned on a 16-byte boundary. A misaligned destination operand will result in a general-protection (#GP) exception being generated (or in some cases, an alignment check exception [#AC]).
The FXSAVE instruction is used when an operating system needs to perform a context switch or when an exception handler needs to save and examine the current state of the x87 FPU, MMX technology, and/or XMM and MXCSR registers.
The fields in the table above are as follows:

FCW
x87 FPU Control Word (16 bits). See Figure 8-6 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for the layout of the x87 FPU control word.
FSW
x87 FPU Status Word (16 bits). See Figure 8-4 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for the layout of the x87 FPU status word.
FTW
x87 FPU Tag Word (8 bits). The tag information saved here is abridged, as described in the following paragraphs. See Figure 8-7 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for the layout of the x87 FPU tag word.
FOP
x87 FPU Opcode (16 bits). The lower 11 bits of this field contain the opcode, upper 5 bits are reserved. See Figure 8-8 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for the layout of the x87 FPU opcode field.
FPU
IP x87 FPU Instruction Pointer Offset (32 bits). The contents of this field differ depending on the current addressing mode (32-bit or 16-bit) of the processor when the FXSAVE instruction was executed: 32-bit mode -> 32-bit IP offset, 16-bit mode -> low 16 bits are IP offset with the high 16 bits being reserved. See "x87 FPU Instruction and Operand (Data) Pointers" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a description of the x87 FPU instruction pointer.
CS
x87 FPU Instruction Pointer Selector (16 bits).
FPU
DP x87 FPU Instruction Operand (Data) Pointer Offset (32 bits). The contents of this field differ depending on the current addressing mode (32-bit or 16- bit) of the processor when the FXSAVE instruction was executed: 32-bit mode -> 32-bit IP offset, 16-bit mode -> low 16 bits are IP offset with the high 16 bits being reserved. See "x87 FPU Instruction and Operand (Data) Pointers" in Chapter 8 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for a description of the x87 FPU operand pointer.
DS
x87 FPU Instruction Operand (Data) Pointer Selector (16 bits).
MXCSR
MXCSR Register State (32 bits). See Figure 10-3 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for the layout of the MXCSR register. If the OSFXSR bit in control register CR4 is not set, the FXSAVE instruction may not save this register. This behavior is implementation dependent.
MXCSR_MASK
MXCSR_MASK (32 bits). This mask can be used to adjust values written to the MXCSR register, ensuring that reserved bits are set to 0. Set the mask bits and flags in MXCSR to the mode of operation desired for SSE and SSE2 SIMD floating-point instructions. See "Guidelines for Writing to the MXCSR Register" in Chapter 11 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for instructions for how to determine and use the MXCSR_MASK value.
ST0/MM0 through ST7/MM7
x87 FPU or MMX technology registers. These 80-bit fields contain the x87 FPU data registers or the MMX technology registers, depending on the state of the processor prior to the execution of the FXSAVE instruction. If the processor had been executing x87 FPU instruction prior to the FXSAVE instruction, the x87 FPU data registers are saved; if it had been executing MMX instructions (or SSE or SSE2 instructions that operated on the MMX technology registers), the MMX technology registers are saved. When the MMX technology registers are saved, the high 16 bits of the field are reserved.
XMM0 through XMM7
XMM registers (128 bits per field). If the OSFXSR bit in control register CR4 is not set, the FXSAVE instruction may not save these registers. This behavior is implementation dependent.

The FXSAVE instruction saves an abridged version of the x87 FPU tag word in the FTW field (unlike the FSAVE instruction, which saves the complete tag word). The tag information is saved in physical register order (R0 through R7), rather than in top-of-stack (TOS) order. With the FXSAVE instruction, however, only a single bit (1 for valid or 0 for empty) is saved for each tag. For example, assume that the tag word is currently set as follows:


R7R6R5R4R3R2R1R0
[body]11xxxxxx11111111[/body]

Here, 11B indicates empty stack elements and "xx" indicates valid (00B), zero (01B), or special (10B).



For this example, the FXSAVE instruction saves only the following 8 bits of information:


R7R6R5R4R3R2R1R0
[body]01110000[/body]

Here, a 1 is saved for any valid, zero, or special tag, and a 0 is saved for any empty tag.



The operation of the FXSAVE instruction differs from that of the FSAVE instruction, the as follows:

FXSAVE instruction does not check for pending unmasked floating-point exceptions. (The FXSAVE operation in this regard is similar to the operation of the FNSAVE instruction).
After the FXSAVE instruction has saved the state of the x87 FPU, MMX technology, XMM, and MXCSR registers, the processor retains the contents of the registers. Because of this behavior, the FXSAVE instruction cannot be used by an application program to pass a "clean" x87 FPU state to a procedure, since it retains the current state. To clean the x87 FPU state, an application must explicitly execute an FINIT instruction after an FXSAVE instruction to reinitialize the x87 FPU state.
The format of the memory image saved with the FXSAVE instruction is the same regardless of the current addressing mode (32-bit or 16-bit) and operating mode (protected, real address, or system management). This behavior differs from the FSAVE instructions, where the memory image format is different depending on the addressing mode and operating mode. Because of the different image formats, the memory image saved with the FXSAVE instruction cannot be restored correctly with the FRSTOR instruction, and likewise the state saved with the FSAVE instruction cannot be restored correctly with the FXRSTOR instruction.

Note that The FSAVE format for FTW can be recreated from the FTW valid bits and the stored 80-bit FP data (assuming the stored data was not the contents of MMX technology registers) using the following table:


Recreating FSAVE Format
Exponent all 1'sExponent all 0'sFraction all 0'sJ and M bitsFTW valid bitx87 FTW
0000x1Special 10
0001x1Valid 00
001001Special 10
001101Valid 00
0100x1Special 10
0101x1Special 10
011001Zero 01
011101Special 10
1001x1Special 10
1001x1Special 10
101001Special 10
101101Special 10
Any legalAny legalAny legalAny legal0Empty 11


The J-bit is defined to be the 1-bit binary integer to the left of the decimal place in the mantissa.
The M-bit is defined to be the most significant bit of the fractional portion of the mantissa (i.e., the bit immediately to the right of the decimal place).
When the M-bit is the most significant bit of the fractional portion of the mantissa, it must be 0 if the fraction is all 0's.
|0-1|FCW|2-3|FSW|4|FTW|5|Reserved|6-7|FOP|8-11|FPU IP|12-13|CS|14-15|Reserved|16-19|FPU DP|20-21|DS|22-23|Reserved|24-27|MXCSR|28-31|MXCSR_MASK|32-41|ST0/MM0|42-47|Reserved|48-57|ST1/MM1|58-63|Reserved|64-73|ST2/MM2|74-79|Reserved|80-89|ST3/MM3|90-95|Reserved|96-105|ST4/MM4|106-111|Reserved|112-121|ST5/MM5|122-127|Reserved|128-137|ST6/MM6|138-143|Reserved|144-153|ST7/MM7|154-159|Reserved|160-175|XMM0|176-191|XMM1|192-207|XMM2|208-223|XMM3|224-239|XMM4|240-255|XMM5|256-271|XMM6|272-287|XMM7|288-512|Reserved|[body]11|xx|xx|xx|11|11|11|11[/body]|Here, 11B indicates empty stack elements and "xx" indicates valid (00B), zero (01B), or special (10B).|[body]0|1|1|1|0|0|0|0[/body]|Here, a 1 is saved for any valid, zero, or special tag, and a 0 is saved for any empty tag.|0|0|0|0x|1|Special 10|0|0|0|1x|1|Valid 00|0|0|1|00|1|Special 10|0|0|1|10|1|Valid 00|0|1|0|0x|1|Special 10|0|1|0|1x|1|Special 10|0|1|1|00|1|Zero 01|0|1|1|10|1|Special 10|1|0|0|1x|1|Special 10|1|0|0|1x|1|Special 10|1|0|1|00|1|Special 10|1|0|1|10|1|Special 10|Any legal|Any legal|Any legal|Any legal|0|Empty 11|
|
|0-1|FCW|
|2-3|FSW|
|4|FTW|
|5|Reserved|
|6-7|FOP|
|8-11|FPU IP|
|12-13|CS|
|14-15|Reserved|
|16-19|FPU DP|
|20-21|DS|
|22-23|Reserved|
|24-27|MXCSR|
|28-31|MXCSR_MASK|
|32-41|ST0/MM0|
|42-47|Reserved|
|48-57|ST1/MM1|
|58-63|Reserved|
|64-73|ST2/MM2|
|74-79|Reserved|
|80-89|ST3/MM3|
|90-95|Reserved|
|96-105|ST4/MM4|
|106-111|Reserved|
|112-121|ST5/MM5|
|122-127|Reserved|
|128-137|ST6/MM6|
|138-143|Reserved|
|144-153|ST7/MM7|
|154-159|Reserved|
|160-175|XMM0|
|176-191|XMM1|
|192-207|XMM2|
|208-223|XMM3|
|224-239|XMM4|
|240-255|XMM5|
|256-271|XMM6|
|272-287|XMM7|
|288-512|Reserved|
|
|[body]11|xx|xx|xx|11|11|11|11[/body]|
|Here, 11B indicates empty stack elements and "xx" indicates valid (00B), zero (01B), or special (10B).|
|
|[body]0|1|1|1|0|0|0|0[/body]|
|Here, a 1 is saved for any valid, zero, or special tag, and a 0 is saved for any empty tag.|
|
|0|0|0|0x|1|Special 10|
|0|0|0|1x|1|Valid 00|
|0|0|1|00|1|Special 10|
|0|0|1|10|1|Valid 00|
|0|1|0|0x|1|Special 10|
|0|1|0|1x|1|Special 10|
|0|1|1|00|1|Zero 01|
|0|1|1|10|1|Special 10|
|1|0|0|1x|1|Special 10|
|1|0|0|1x|1|Special 10|
|1|0|1|00|1|Special 10|
|1|0|1|10|1|Special 10|
|Any legal|Any legal|Any legal|Any legal|0|Empty 11|
 
## Operation
 
```c
Destination = Save(x87 FPU, MMX, XMM7-XMM0, MXCSR);

```
 
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#GP(0)|If a memory operand is not aligned on a 16-byte boundary, regardless of segment. If any part of the operand lies outside the effective address space from 0 to FFFFH.|
|#NM|If TS in CR0 is set.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|FXSAVE|100|-|-|
