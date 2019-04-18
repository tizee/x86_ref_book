# MUL
 
## Unsigned Multiply
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F6 /4|MUL r/m8|Unsigned multiply (AX = AL * r/m8).|
|F7 /4|MUL r/m16|Unsigned multiply (DX:AX = AX * r/m16).|
|F7 /4|MUL r/m32|Unsigned multiply (EDX:EAX = EAX * r/m32).|
 
|Description|Operand Size|Source 1|Source 2|Destination|
|-|-|-|-|-|
|
Performs an unsigned multiplication of the first operand (destination operand) and the second operand (source operand) and stores the result in the destination operand. The destination operand is an implied operand located in register AL, AX or EAX (depending on the size of the operand); the source operand is located in a general-purpose register or a memory location. The action of this instruction and the location of the result depends on the opcode and the operand size as shown in the following table.


MUL Results
Operand SizeSource 1Source 2Destination
ByteALr/m8AX
WordAXr/m16DX:AX
DoublewordEAXr/m32EDX:EAX


The result is stored in register AX, register pair DX:AX, or register pair EDX:EAX (depending on the operand size), with the high-order bits of the product contained in register AH, DX, or EDX, respectively. If the high-order bits of the product are 0, the CF and OF flags are cleared; otherwise, the flags are set.
|Byte|AL|r/m8|AX|Word|AX|r/m16|DX:AX|Doubleword|EAX|r/m32|EDX:EAX|
|
|Byte|AL|r/m8|AX|
|Word|AX|r/m16|DX:AX|
|Doubleword|EAX|r/m32|EDX:EAX|
 
## Operation
 
```c
if(IsByteOperation()) AX = AL * Source;
else { //word or doubleword operation
	if(OperandSize == 16) DX:AX = AX * Source; //word operation
	else EDX:EAX = EAX * Source; //doubleword operation
}

```
 
 
## Flags affected
 
The OF and CF flags are set to 0 if the upper half of the result is 0; otherwise, they are set to 1.
The SF, ZF, AF, and PF flags are undefined.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit. If the DS, ES, FS, or GS register contains a null segment selector.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#GP(0)|If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.|
|#SS(0)|If a memory operand effective address is outside the SS segment limit.|
|#PF(fault-code)|If a page fault occurs.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|MUL|10/14-18|1/5|-|
