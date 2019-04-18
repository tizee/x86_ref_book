# OUT
 
## Output to Port
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|E6 ib|OUT imm8, AL|Output byte in AL to I/O port address imm8.|
|E7 ib|OUT imm8, AX|Output word in AX to I/O port address imm8.|
|E7 ib|OUT imm8, EAX|Output doubleword in EAX to I/O port address imm8.|
|EE|OUT DX, AL|Output byte in AL to I/O port address in DX.|
|EF|OUT DX, AX|Output word in AX to I/O port address in DX.|
|EF|OUT DX, EAX|Output doubleword in EAX to I/O port address in DX.|
 
## Description
 
Copies the value from the second operand (source operand) to the I/O port specified with the destination operand (first operand). The source operand can be register AL, AX, or EAX, depending on the size of the port being accessed (8, 16, or 32 bits, respectively); the destination operand can be a byte-immediate or the DX register. Using a byte immediate allows I/O port addresses 0 to 255 to be accessed; using the DX register as a source operand allows I/O ports from 0 to 65,535 to be accessed.
 
The size of the I/O port being accessed is determined by the opcode for an 8-bit I/O port or by the operand-size attribute of the instruction for a 16- or 32-bit I/O port.
 
At the machine code level, I/O instructions are shorter when accessing 8-bit I/O ports. Here, the upper eight bits of the port address will be 0.
 
This instruction is only useful for accessing I/O ports located in the processor's I/O address space. See Chapter 13, Input/Output, in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for more information on accessing I/O ports in the I/O address space.
 
 
## Operation
 
```c
if(PE == 1 && (CPL > IOPL || VM == 1)) { //Protected mode with CPL > IOPL or virtual-8086 mode
	if(!IOPermission()) Exception(GP); //Any I/O Permission Bit for I/O port being accessed = 1
	else Destination = Source; //Writes to selected I/O port
}
//Real Mode or Protected Mode with CPL <= IOPL
else Destination = Source; //Writes to selected I/O port

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
After executing an OUT instruction, the Pentium processor insures that the EWBE# pin has been sampled active before it begins to execute the next instruction. (Note that the instruction can be prefetched if EWBE# is not active, but it will not be executed until the EWBE# pin is sampled active.) Only the Pentium processor family has the EWBE# pin; the other IA-32 processors do not.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the corresponding I/O permission bits in TSS for the I/O port being accessed is 1.|
 
## Real-Address Mode Exceptions
 
None.
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If any of the I/O permission bits in the TSS for the I/O port being accessed is 1.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|OUT|<225|40|-|
