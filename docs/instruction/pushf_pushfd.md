# PUSHF/PUSHFD
 
## Push EFLAGS Register onto the Stack
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9C|PUSHF|Push lower 16 bits of EFLAGS.|
|9C|PUSHFD|Push EFLAGS.|
 
## Description
 
Decrements the stack pointer by 4 (if the current operand-size attribute is 32) and pushes the entire contents of the EFLAGS register onto the stack, or decrements the stack pointer by 2 (if the operand-size attribute is 16) and pushes the lower 16 bits of the EFLAGS register (that is, the FLAGS register) onto the stack. (These instructions reverse the operation of the POPF/POPFD instructions.) When copying the entire EFLAGS register to the stack, the VM and RF flags (bits 16 and 17) are not copied; instead, the values for these flags are cleared in the EFLAGS image stored on the stack. See the section titled "EFLAGS Register" in Chapter 3 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for information about the EFLAGS registers.
 
The PUSHF (push flags) and PUSHFD (push flags double) mnemonics reference the same opcode. The PUSHF instruction is intended for use when the operand-size attribute is 16 and the PUSHFD instruction for when the operand-size attribute is 32. Some assemblers may force the operand size to 16 when PUSHF is used and to 32 when PUSHFD is used. Others may treat these mnemonics as synonyms (PUSHF/PUSHFD) and use the current setting of the operand-size attribute to determine the size of values to be pushed from the stack, regardless of the mnemonic used.
 
When in virtual-8086 mode and the I/O privilege level (IOPL) is less than 3, the PUSHF/PUSHFD instruction causes a general protection exception (#GP).
 
In the real-address mode, if the ESP or SP register is 1, 3, or 5 when the PUSHA/PUSHAD instruction is executed, the processor shuts down due to a lack of stack space. No exception is generated to indicate this condition.
 
 
## Operation
 
```c
if(PE == 0 || (PE == 1 && (VM == 0 || (VM == 1 && IOPL == 3)))) {
	if(OperandSize == 32) Push(EFLAGS & 0xFCFFFF); //VM and RF EFLAG bits are cleared in image stored on the stack
	else Push(EFLAGS[0..15]);
}
//In Virtual-8086 Mode with IOPL less than 3
else Exception(GP(0)); //Trap to virtual-8086 monitor

```
 
 
## Flags affected
 
None.

 
