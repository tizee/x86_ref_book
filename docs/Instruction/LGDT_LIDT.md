# LGDT/LIDT
 
## Load Global/Interrupt Descriptor Table Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 01 /2|LGDT m16&32|Load m into GDTR.|
|0F 01 /3|LIDT m16&32|Load m into IDTR.|
 
## Description
 
Loads the values in the source operand into the global descriptor table register (GDTR) or the interrupt descriptor table register (IDTR). The source operand specifies a 6-byte memory location that contains the base address (a linear address) and the limit (size of table in bytes) of the global descriptor table (GDT) or the interrupt descriptor table (IDT). If operand-size attribute is 32 bits, a 16-bit limit (lower 2 bytes of the 6-byte data operand) and a 32-bit base address (upper 4 bytes of the data operand) are loaded into the register. If the operand-size attribute is 16 bits, a 16-bit limit (lower 2 bytes) and a 24-bit base address (third, fourth, and fifth byte) are loaded. Here, the high-order byte of the operand is not used and the high-order byte of the base address in the GDTR or IDTR is filled with zeros.
 
The LGDT and LIDT instructions are used only in operating-system software; they are not used in application programs. They are the only instructions that directly load a linear address (that is, not a segment-relative address) and a limit in protected mode. They are commonly executed in real-address mode to allow processor initialization prior to switching to protected mode.
 
See "SGDT-Store Global Descriptor Table Register" in Chapter 4 for information on storing the contents of the GDTR and IDTR.
 
 
## Operation
 
```c
if(Instruction == LIDT) {
	if(OperandSize == 16) {
		IDT.Limit = Source[0..15];
		IDTR.Base = Source[16..47] & 0xFFFFFF;
	}
	else { //OperandSize == 32
		IDTR.Limit = Source[0..15];
		IDTR.Base = Source[16..47];
	}
}
else { //Instruction == LGDT
	if(OperandSize == 16) {
		GDT.Limit = Source[0..15];
		GDTR.Base = Source[16..47] & 0xFFFFFF;
	}
	else { //OperandSize == 32
		GDTR.Limit = Source[0..15];
		GDTR.Base = Source[16..47];
	}
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#UD|If source operand is not a memory location.|
|#UD|If source operand is not a memory location.|
|#GP(0)|If the current privilege level is not 0. If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register is used to access memory and it contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|If source operand is not a memory location.|
|#UD|If source operand is not a memory location.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|The LGDT and LIDT instructions are not recognized in virtual-8086 mode.|
|#GP(0)|The LGDT and LIDT instructions are not recognized in virtual-8086 mode.|
