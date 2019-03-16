# POPF/POPFD
 
## Pop Stack into EFLAGS Register
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9D POPF|Pop top of stack into lower 16 bits of EFLAGS.||
|9D POPFD|Pop top of stack into EFLAGS.||
 
## Description
 
Pops a doubleword (POPFD) from the top of the stack (if the current operand-size attribute is 32) and stores the value in the EFLAGS register, or pops a word from the top of the stack (if the operand-size attribute is 16) and stores it in the lower 16 bits of the EFLAGS register (that is, the FLAGS register). These instructions reverse the operation of the PUSHF/PUSHFD instructions.
 
The POPF (pop flags) and POPFD (pop flags double) mnemonics reference the same opcode.
 
The POPF instruction is intended for use when the operand-size attribute is 16 and the POPFD instruction for when the operand-size attribute is 32. Some assemblers may force the operand size to 16 when POPF is used and to 32 when POPFD is used. Others may treat these mnemonics as synonyms (POPF/POPFD) and use the current setting of the operand-size attribute to determine the size of values to be popped from the stack, regardless of the mnemonic used.
 
The effect of the POPF/POPFD instructions on the EFLAGS register changes slightly, depending on the mode of operation of the processor. When the processor is operating in protected mode at privilege level 0 (or in real-address mode, which is equivalent to privilege level 0), all the non-reserved flags in the EFLAGS register except the VIP, VIF, and VM flags can be modified. The VIP and VIF flags are cleared, and the VM flag is unaffected.
 
When operating in protected mode, with a privilege level greater than 0, but less than or equal to IOPL, all the flags can be modified except the IOPL field and the VIP, VIF, and VM flags.
 
Here, the IOPL flags are unaffected, the VIP and VIF flags are cleared, and the VM flag is unaffected.
 
The interrupt flag (IF) is altered only when executing at a level at least as privileged as the IOPL. If a POPF/POPFD instruction is executed with insufficient privilege, an exception does not occur, but the privileged bits do not change.
 
When operating in virtual-8086 mode, the I/O privilege level (IOPL) must be equal to 3 to use POPF/POPFD instructions and the VM, RF, IOPL, VIP, and VIF flags are unaffected. If the IOPL is less than 3, the POPF/POPFD instructions cause a general-protection exception (#GP).
 
See the section titled "EFLAGS Register" in Chapter 3 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for information about the EFLAGS registers.
 
 
## Operation
 
```c
if(VM == 0) { //Not in Virtual-8086 Mode
	if(CPL == 0) {
		if(OperandSize == 32) EFLAGS = Pop(); //All non-reserved flags except VIP, VIF, and VM can be modified; VIP and VIF are cleared; VM is unaffected
		//OperandSize == 16
		else EFLAGS[0..15] = Pop(); //All non-reserved flags can be modified
	}
	else { //CPL > 0
		if(OperandSize == 32) EFLAGS = Pop(); //All non-reserved bits except IOPL, VIP, and VIF can be modified; IOPL is unaffected; VIP and VIF are cleared; VM is unaffected
		//OperandSize == 16
		else EFLAGS[0..15] = Pop(); //All non-reserved bits except IOPL can be modified; IOPL is unaffected
	}
}
else { //In Virtual-8086 Mode
	if(IOPL == 3) {
		if(OperandSize == 32) EFLAGS = Pop(); //All non-reserved bits except VM, RF, IOPL, VIP, and VIF can be modified; VM, RF, IOPL, VIP, and VIF are unaffected
		//OperandSize == 16
		else EFLAGS[0..15] = Pop(); //All non-reserved bits except IOPL can be modified; IOPL is unaffected
	}
	//IOPL > 3
	else Exception(GP(0)); //trap to virtual-8086 monitor
}

```
 
 
## Flags affected
 
All flags except the reserved bits and the VM bit.

 
