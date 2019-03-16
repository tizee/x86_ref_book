# PUSH
 
## Push Word or Doubleword Onto the Stack
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|FF /6|PUSH r/m16|Push r/m16.|
|FF /6|PUSH r/m32|Push r/m32.|
|50+rw|PUSH r16|Push r16.|
|50+rd|PUSH r32|Push r32.|
|6A|PUSH imm8|Push imm8.|
|68|PUSH imm16|Push imm16.|
|68|PUSH imm32|Push imm32.|
|0E|PUSH CS|Push CS.|
|16|PUSH SS|Push SS.|
|1E|PUSH DS|Push DS.|
|06|PUSH ES|Push ES.|
|0F A0|PUSH FS|Push FS.|
|0F A8|PUSH GS|Push GS.|
 
## Description
 
Decrements the stack pointer and then stores the source operand on the top of the stack. The address-size attribute of the stack segment determines the stack pointer size (16 bits or 32 bits), and the operand-size attribute of the current code segment determines the amount the stack pointer is decremented (2 bytes or 4 bytes). For example, if these address- and operand-size attributes are 32, the 32-bit ESP register (stack pointer) is decremented by 4 and, if they are 16, the 16-bit SP register is decremented by 2. (The B flag in the stack segment's segment descriptor determines the stack's address-size attribute, and the D flag in the current code segment's segment descriptor, along with prefixes, determines the operand-size attribute and also the address-size attribute of the source operand.) Pushing a 16-bit operand when the stack addresssize attribute is 32 can result in a misaligned the stack pointer (that is, the stack pointer is not aligned on a doubleword boundary).
 
The PUSH ESP instruction pushes the value of the ESP register as it existed before the instruction was executed. Thus, if a PUSH instruction uses a memory operand in which the ESP register is used as a base register for computing the operand address, the effective address of the operand is computed before the ESP register is decremented.
 
In the real-address mode, if the ESP or SP register is 1 when the PUSH instruction is executed, the processor shuts down due to a lack of stack space. No exception is generated to indicate this condition.
 
 
## Operation
 
```c
if(StackAddressSize == 32) {
	if(OperandSize == 32) {
		ESP = ESP - 4;
		SS:ESP = Source //push doubleword
	}
	else { //OperandSize == 16
		ESP = ESP - 2;
		SS:ESP = Source; //push word
	}
}
else { //StackAddressSize == 16
	if(OperandSize == 16) {
		SP = SP - 2;
		SS:ESP = Source //push word
	}
	else { //OperandSize == 32
		SP = SP - 4;
		SS:ESP = Source; //push doubleword
	}
}

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
For IA-32 processors from the Intel 286 on, the PUSH ESP instruction pushes the value of the ESP register as it existed before the instruction was executed. (This is also true in the realaddress and virtual-8086 modes.) For the Intel 8086 processor, the PUSH SP instruction pushes the new value of the SP register (that is the value after it has been decremented by 2).

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|PUSH|1.5|1|MEM_STORE ALU|
