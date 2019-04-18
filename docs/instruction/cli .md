# CLI 
 
##  Clear Interrupt Flag
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|FA|CLI|Clear interrupt flag; interrupts disabled when interrupt flag cleared.|
 
|Description|PE|VM|IOPL|CPL|PVI|VIP|VME|CLI Result|
|-|-|-|-|-|-|-|-|-|
|
If protected-mode virtual interrupts are not enabled, CLI clears the IF flag in the EFLAGS register. No other flags are affected. Clearing the IF flag causes the processor to ignore maskable external interrupts. The IF flag and the CLI and STI instruction have no affect on the generation of exceptions and NMI interrupts.
When protected-mode virtual interrupts are enabled, CPL is 3, and IOPL is less than 3; CLI clears the VIF flag in the EFLAGS register, leaving IF unaffected.
The following table indicates the action of the CLI instruction depending on the processor operating mode and the CPL/IOPL of the running program or procedure.
Decision Table for CLI Results:


PEVMIOPLCPLPVIVIPVMECLI Result
0XXXXXXIF = 0
10>= CPLXXXXIF = 0
10< CPL31XXVIF = 0
10< CPL< 3XXXGP Fault
10< CPLX0XXGP Fault
113XXXXIF = 0
11< 3XXX1VIF = 0
11< 3XXX0GP Fault

X = This setting has no impact.



|0|X|X|X|X|X|X|IF = 0|1|0|>= CPL|X|X|X|X|IF = 0|1|0|< CPL|3|1|X|X|VIF = 0|1|0|< CPL|< 3|X|X|X|GP Fault|1|0|< CPL|X|0|X|X|GP Fault|1|1|3|X|X|X|X|IF = 0|1|1|< 3|X|X|X|1|VIF = 0|1|1|< 3|X|X|X|0|GP Fault|X = This setting has no impact.|
|
|0|X|X|X|X|X|X|IF = 0|
|1|0|>= CPL|X|X|X|X|IF = 0|
|1|0|< CPL|3|1|X|X|VIF = 0|
|1|0|< CPL|< 3|X|X|X|GP Fault|
|1|0|< CPL|X|0|X|X|GP Fault|
|1|1|3|X|X|X|X|IF = 0|
|1|1|< 3|X|X|X|1|VIF = 0|
|1|1|< 3|X|X|X|0|GP Fault|
|X = This setting has no impact.|
 
## Operation
 
```c
if(PE == 0) IF = 0; //Reset Interrupt Flag
else {
	if(VM == 0) {
		if(IOPL != CPL) IF = 0; //Reset Interrupt Flag
		else {
			if(IOPL < CPL && CPL < 3 && PVI == 1) VIF = 0; //Reset Virtual Interrupt Flag
			else Exception(GP(0));
		}
	}
	else {
		if(IOPL == 3) IF = 0; //Reset Interrupt Flag
		else {
			if(IOPL < 3 && VME == 1) VIF = 0; //Reset Virtual Interrupt Flag
			else Exception(GP(0));
		}
	}
}

```
 
 
## Flags affected
 
If protected-mode virtual interrupts are not enabled, IF is set to 0 if the CPL is equal to or less than the IOPL; otherwise, it is not affected. The other flags in the EFLAGS register are unaffected.
When protected-mode virtual interrupts are enabled, CPL is 3, and IOPL is less than 3; CLI clears the VIF flag in the EFLAGS register, leaving IF unaffected.

 
 
## Protected Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the CPL is greater (has less privilege) than the IOPL of the current program or procedure.|
 
## Real-Address Mode Exceptions
 
None.
 
## Virtual-8086 Mode Exceptions
 
|[]()||
|-|-|
|#GP(0)|If the CPL is greater (has less privilege) than the IOPL of the current program or procedure.|
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|CLI|-|26|-|
