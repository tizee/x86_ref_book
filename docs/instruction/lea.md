# LEA
 
## Load Effective Address
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|8D /r|LEA r16,m|Store effective address for m in register r16.|
|8D /r|LEA r32,m|Store effective address for m in register r32.|
 
|Description|Operand Size|Address Size|Action Performed|
|-|-|-|-|
|
Computes the effective address of the second operand (the source operand) and stores it in the first operand (destination operand). The source operand is a memory address (offset part) specified with one of the processors addressing modes; the destination operand is a general-purpose register. The address-size and operand-size attributes affect the action performed by this instruction, as shown in the following table. The operand-size attribute of the instruction is determined by the chosen register; the address-size attribute is determined by the attribute of the code segment.


Address and Operand Size Attributes
Operand SizeAddress SizeAction Performed
161616-bit effective address is calculated and stored in requested 16-bit register destination.
163232-bit effective address is calculated. The lower 16 bits of the address are stored in the requested 16-bit register destination.
321616-bit effective address is calculated. The 16-bit address is zeroextended and stored in the requested 32-bit register destination.
323232-bit effective address is calculated and stored in the requested 32-bit register destination.


Different assemblers may use different algorithms based on the size attribute and symbolic reference of the source operand.
|16|16|16-bit effective address is calculated and stored in requested 16-bit register destination.|16|32|32-bit effective address is calculated. The lower 16 bits of the address are stored in the requested 16-bit register destination.|32|16|16-bit effective address is calculated. The 16-bit address is zeroextended and stored in the requested 32-bit register destination.|32|32|32-bit effective address is calculated and stored in the requested 32-bit register destination.|
|
|16|16|16-bit effective address is calculated and stored in requested 16-bit register destination.|
|16|32|32-bit effective address is calculated. The lower 16 bits of the address are stored in the requested 16-bit register destination.|
|32|16|16-bit effective address is calculated. The 16-bit address is zeroextended and stored in the requested 32-bit register destination.|
|32|32|32-bit effective address is calculated and stored in the requested 32-bit register destination.|
 
## Operation
 
```c
if(OperandSize == 16 && AddressSize == 16) Destination = EffectiveAddress(Source); //16-bit address
else if(OperandSize == 16 && AddressSize == 32) {
	Temporary = EffectiveAddress(Source); //32-bit address
	Destination = Temporary[0..15]; //16-bit address
}
else if(OperandSize == 32 && AddressSize == 16) {
	Temporary = EffectiveAddress(Source); //16-bit address;
	Destination = ZeroExtend(Temporary); //32-bit address
}
else if(OperandSize == 32 && AddressSize == 32) Destination = EffectiveAddress(Source) //32-bit address

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#UD|If source operand is not a memory location.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#UD|If source operand is not a memory location.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#UD|If source operand is not a memory location.|
