# ENTER
 
## Make Stack Frame for Procedure Parameters
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|C8 iw 00|ENTER imm16,0|Create a stack frame for a procedure.|
|C8 iw 01|ENTER imm16,1|Create a nested stack frame for a procedure.|
|C8 iw ib|ENTER imm16,imm8|Create a nested stack frame for a procedure.|
 
## Description
 
Creates a stack frame for a procedure. The first operand (size operand) specifies the size of the stack frame (that is, the number of bytes of dynamic storage allocated on the stack for the procedure).
 
The second operand (nesting level operand) gives the lexical nesting level (0 to 31) of the procedure. The nesting level determines the number of stack frame pointers that are copied into the "display area" of the new stack frame from the preceding frame. Both of these operands are immediate values.
 
The stack-size attribute determines whether the BP (16 bits) or EBP (32 bits) register specifies the current frame pointer and whether SP (16 bits) or ESP (32 bits) specifies the stack pointer.
 
The ENTER and companion LEAVE instructions are provided to support block structured languages. The ENTER instruction (when used) is typically the first instruction in a procedure and is used to set up a new stack frame for a procedure. The LEAVE instruction is then used at the end of the procedure (just before the RET instruction) to release the stack frame.
 
If the nesting level is 0, the processor pushes the frame pointer from the EBP register onto the stack, copies the current stack pointer from the ESP register into the EBP register, and loads the ESP register with the current stack-pointer value minus the value in the size operand. For nesting levels of 1 or greater, the processor pushes additional frame pointers on the stack before adjusting the stack pointer. These additional frame pointers provide the called procedure with access points to other nested frames on the stack. See "Procedure Calls for Block-Structured Languages" in Chapter 6 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for more information about the actions of the ENTER instruction.
 
 
## Operation
 
```c
NestingLevel = NestingLevel % 32;

if(StackSize == 32) {
	Push(EBP);
	FrameTemp = ESP;
}
else { //StackSize = 16
	Push(BP);
	FrameTemp = SP;
}

if(NestingLevel == 0) goto Continue;
else {
	for(i = 1; i < NestingLevel; ++i) {
		if(OperandSize == 32) {
			if(StackSize == 32) {
				EBP = EBP - 4;
				Push(EBP); //doubleword push
			}
			else { //StackSize == 16
				BP = BP - 4;
				Push(BP); //doubleword push
			}
		}
		else { //OperandSize = 16
			if(StackSize == 32) {
				EBP = EBP - 2;
				Push(EBP); //doubleword push
			}
			else { //StackSize == 16
				BP = BP - 2;
				Push(BP); //doubleword push
			}
		}
	}
	
	if(OperandSize == 32) Push(FrameTemp); //doubleword push
	else Push(FrameTemp); //OperandSize == 16, word push
}

Continue:
if(StackSize == 32) {
	EBP = FramTemp;
	ESP = EBP - Size;
}
else { //StackSize == 16
	BP = FramTemp;
	SP = BP - Size;
}

```
 
 
## Flags affected
 
None.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#SS(0)|If the new value of the SP or ESP register is outside the stack segment limit.|
|#SS(0)|If the new value of the SP or ESP register is outside the stack segment limit.|
 
## Real-Address Mode Exceptions
 
|[]()||
|-|-|
|#SS(0)|If the new value of the SP or ESP register is outside the stack segment limit.|
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#SS(0)|If the new value of the SP or ESP register is outside the stack segment limit.|
|#SS(0)|If the new value of the SP or ESP register is outside the stack segment limit.|
