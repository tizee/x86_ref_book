# XLAT/XLATB
 
## Table Look-up Translation
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|D7|XLAT m8|Set AL to memory byte DS:[(E)BX + unsigned AL].|
|D7|XLATB|Set AL to memory byte DS:[(E)BX + unsigned AL].|
 
## Description
 
Locates a byte entry in a table in memory, using the contents of the AL register as a table index, then copies the contents of the table entry back into the AL register. The index in the AL register is treated as an unsigned integer. The XLAT and XLATB instructions get the base address of the table in memory from either the DS:EBX or the DS:BX registers (depending on the addresssize attribute of the instruction, 32 or 16, respectively). (The DS segment may be overridden with a segment override prefix.) At the assembly-code level, two forms of this instruction are allowed: the "explicit-operand" form and the "no-operand" form. The explicit-operand form (specified with the XLAT mnemonic) allows the base address of the table to be specified explicitly with a symbol. This explicit-operands form is provided to allow documentation; however, note that the documentation provided by this form can be misleading. That is, the symbol does not have to specify the correct base address. The base address is always specified by the DS:(E)BX registers, which must be loaded correctly before the XLAT instruction is executed.
 
The no-operands form (XLATB) provides a "short form" of the XLAT instructions. Here also the processor assumes that the DS:(E)BX registers contain the base address of the table.
 
 
## Operation
 
```c
if(AddressSize == 16) AL = DS:BX + ZeroExtend(AL);
//AddressSize = 32
else AL = DS:EBX + ZeroExtend(AL);

```
 
 
## Flags affected
 
None.

 
