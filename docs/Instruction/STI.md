# STI
 
## Set Interrupt Flag
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|FB|STI|Set interrupt flag; external, maskable interrupts enabled at the end of the next instruction.|
 
## Description
 
If protected-mode virtual interrupts are not enabled, STI sets the interrupt flag (IF) in the EFLAGS register. After the IF flag is set, the processor begins responding to external, maskable interrupts after the next instruction is executed. The delayed effect of this instruction is provided to allow interrupts to be enabled just before returning from a procedure (or subroutine). For instance, if an STI instruction is followed by an RET instruction, the RET instruction is allowed to execute before external interrupts are recognized.
 
Note that in a sequence of instructions that individually delay interrupts past the following instruction, only the first instruction in the sequence is guaranteed to delay the interrupt, but subsequent interrupt-delaying instructions may not delay the interrupt. Thus, in the following instruction sequence:
 
```c
STI
MOV SS, AX
MOV ESP, EBP

```
 
Interrupts may be recognized before MOV ESP, EBP executes, even though MOV SS, AX normally delays interrupts for one instruction.
 
If the STI instruction is followed by a CLI instruction (which clears the IF flag), the effect of the STI instruction is negated.
 
The IF flag and the STI and CLI instructions do not prohibit the generation of exceptions and NMI interrupts. NMI interrupts may be blocked for one macroinstruction following an STI.
 
When protected-mode virtual interrupts are enabled, CPL is 3, and IOPL is less than 3; STI sets the VIF flag in the EFLAGS register, leaving IF unaffected.
 
The following table indicates the action of the STI instruction depending on the processor's mode of operation and the CPL/IOPL settings of the running program or procedure.
 
 
## Operation
 
```c
if(PE == 0) IF = 1; //Executing in real-address mode; Set Interrupt Flag
else if(VM == 0) { //Executing in protected mode
	if(IOPL >= CPL) IF = 1; //Set Interrupt Flag
	else if(IOPL < CPL && CPL == 3 && VIP == 0) VIF = 1; //Set Virtual Interrupt Flag
	else Exception(GP(0));
}
else { //Executing in Virtual-8086 mode
	if(IOPL == 3) IF = 1; //Set Interrupt Flag
	else if(IOPL < 3 && VIP == 0 && VME == 1) VIF = 1; //Set Virtual Interrupt Flag
	else Exception(GP(0)); //Trap to virtual-8086 monitor
}

```
 
 
## Flags affected
 
The IF flag is set to 1; or the VIF flag is set to 1.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|STI|-|36|-|
