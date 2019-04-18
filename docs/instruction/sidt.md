# SIDT
 
## Store Interrupt Descriptor Table Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 01 /1|SIDT m|Store IDTR to m.|
 
## Description
 
Stores the content the interrupt descriptor table register (IDTR) in the destination operand. The destination operand specifies a 6-byte memory location. If the operand-size attribute is 32 bits, the 16-bit limit field of the register is stored in the low 2 bytes of the memory location and the 32-bit base address is stored in the high 4 bytes. If the operand-size attribute is 16 bits, the limit is stored in the low 2 bytes and the 24-bit base address is stored in the third, fourth, and fifth byte, with the sixth byte filled with 0s.
 
SIDT is only useful in operating-system software; however, it can be used in application programs without causing an exception to be generated.
 
See "LGDT/LIDT-Load Global/Interrupt Descriptor Table Register" in Chapter 4 for information on loading the GDTR and IDTR.
 
 
## Operation
 
```c
if(OperandSize == 16) {
	Destination[0..15] = IDTR.Limit;
	Destination[16..39] = IDTR.Base; //24 bits of base address loaded
	Destination[40..47] = 0;
}
else { //32-bit Operand Size
	Destination[0..15] = IDTR.Limit;
	Destination[16..47] = IDTR.Base; //full 32-bit base address loaded *)
}

```
 
 
## IA-32 Architecture Compatibility
 
The 16-bit form of SIDT is compatible with the Intel 286 processor if the upper 8 bits are not referenced. The Intel 286 processor fills these bits with 1s; the Pentium 4, Intel Xeon, P6 family, Pentium, Intel486, and Intel386 processors fill these bits with 0s.

 
