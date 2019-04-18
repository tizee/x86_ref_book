# REP/REPE/REPZ/REPNE/REPNZ
 
## Repeat String Operation Prefix
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|F3 6C|REP INS m8, DX|Input (E)CX bytes from port DX into ES:[(E)DI].|
|F3 6D|REP INS m16, DX|Input (E)CX words from port DX into ES:[(E)DI].|
|F3 6D|REP INS m32, DX|Input (E)CX doublewords from port DX into ES:[(E)DI].|
|F3 A4|REP MOVS m8, m8|Move (E)CX bytes from DS:[(E)SI] to ES:[(E)DI].|
|F3 A5|REP MOVS m16, m16|Move (E)CX words from DS:[(E)SI] to ES:[(E)DI].|
|F3 A5|REP MOVS m32, m32|Move (E)CX doublewords from DS:[(E)SI] to ES:[(E)DI].|
|F3 6E|REP OUTS DX, r/m8|Output (E)CX bytes from DS:[(E)SI] to port DX.|
|F3 6F|REP OUTS DX, r/m16|Output (E)CX words from DS:[(E)SI] to port DX.|
|F3 6F|REP OUTS DX, r/m32|Output (E)CX doublewords from DS:[(E)SI] to port DX.|
|F3 AC|REP LODS AL|Load (E)CX bytes from DS:[(E)SI] to AL.|
|F3 AD|REP LODS AX|Load (E)CX words from DS:[(E)SI] to AX.|
|F3 AD|REP LODS EAX|Load (E)CX doublewords from DS:[(E)SI] to EAX.|
|F3 AA|REP STOS m8|Fill (E)CX bytes at ES:[(E)DI] with AL.|
|F3 AB|REP STOS m16|Fill (E)CX words at ES:[(E)DI] with AX.|
|F3 AB|REP STOS m32|Fill (E)CX doublewords at ES:[(E)DI] with EAX.|
|F3 A6|REPE CMPS m8, m8|Find nonmatching bytes in ES:[(E)DI] and DS:[(E)SI].|
|F3 A7|REPE CMPS m16, m16|Find nonmatching words in ES:[(E)DI] and DS:[(E)SI].|
|F3 A7|REPE CMPS m32, m32|Find nonmatching doublewords in ES:[(E)DI] and DS:[(E)SI].|
|F3 AE|REPE SCAS m8|Find non-AL byte starting at ES:[(E)DI].|
|F3 AF|REPE SCAS m16|Find non-AX word starting at ES:[(E)DI].|
|F3 AF|REPE SCAS m32|Find non-EAX doubleword starting at ES:[(E)DI].|
|F2 A6|REPNE CMPS m8, m8|Find matching bytes in ES:[(E)DI] and DS:[(E)SI].|
|F2 A7|REPNE CMPS m16, m16|Find matching words in ES:[(E)DI] and DS:[(E)SI].|
|F2 A7|REPNE CMPS m32, m32|Find matching doublewords in ES:[(E)DI] and DS:[(E)SI].|
|F2 AE|REPNE SCAS m8|Find AL, starting at ES:[(E)DI].|
|F2 AF|REPNE SCAS m16|Find AX, starting at ES:[(E)DI].|
|F2 AF|REPNE SCAS m32|Find EAX, starting at ES:[(E)DI].|
 
|Description|Repeat Prefix|Termination Condition 1|Termination Condition 2|
|-|-|-|-|
|
Repeats a string instruction the number of times specified in the count register ((E)CX) or until the indicated condition of the ZF flag is no longer met. The REP (repeat), REPE (repeat while equal), REPNE (repeat while not equal), REPZ (repeat while zero), and REPNZ (repeat while not zero) mnemonics are prefixes that can be added to one of the string instructions. The REP prefix can be added to the INS, OUTS, MOVS, LODS, and STOS instructions, and the REPE, REPNE, REPZ, and REPNZ prefixes can be added to the CMPS and SCAS instructions. (The REPZ and REPNZ prefixes are synonymous forms of the REPE and REPNE prefixes, respectively.) The behavior of the REP prefix is undefined when used with non-string instructions.
The REP prefixes apply only to one string instruction at a time. To repeat a block of instructions, use the LOOP instruction or another looping construct.
All of these repeat prefixes cause the associated instruction to be repeated until the count in register (E)CX is decremented to 0 (see table below). (If the current address-size attribute is 32, register ECX is used as a counter, and if the address-size attribute is 16, the CX register is used.) The REPE, REPNE, REPZ, and REPNZ prefixes also check the state of the ZF flag after each iteration and terminate the repeat loop if the ZF flag is not in the specified state. When both termination conditions are tested, the cause of a repeat termination can be determined either by testing the (E)CX register with a JECXZ instruction or by testing the ZF flag with a JZ, JNZ, and JNE instruction.


Repeat Prefixes
Repeat PrefixTermination Condition 1Termination Condition 2
REPECX=0None
REPE/REPZECX=0ZF=0
REPNE/REPNZECX=0ZF=1


When the REPE/REPZ and REPNE/REPNZ prefixes are used, the ZF flag does not require initialization because both the CMPS and SCAS instructions affect the ZF flag according to the results of the comparisons they make.
A repeating string operation can be suspended by an exception or interrupt. When this happens, the state of the registers is preserved to allow the string operation to be resumed upon a return from the exception or interrupt handler. The source and destination registers point to the next string elements to be operated on, the EIP register points to the string instruction, and the ECX register has the value it held following the last successful iteration of the instruction. This mechanism allows long string operations to proceed without affecting the interrupt response time of the system.
When a fault occurs during the execution of a CMPS or SCAS instruction that is prefixed with REPE or REPNE, the EFLAGS value is restored to the state prior to the execution of the instruction.
Since the SCAS and CMPS instructions do not use EFLAGS as an input, the processor can resume the instruction after the page fault handler.
Use the REP INS and REP OUTS instructions with caution. Not all I/O ports can handle the rate at which these instructions execute.
A REP STOS instruction is the fastest way to initialize a large block of memory.
|REP|ECX=0|None|REPE/REPZ|ECX=0|ZF=0|REPNE/REPNZ|ECX=0|ZF=1|
|
|REP|ECX=0|None|
|REPE/REPZ|ECX=0|ZF=0|
|REPNE/REPNZ|ECX=0|ZF=1|
 
## Operation
 
```c
if(AddressSize == 16) Counter = &CX; //use CX
else Counter = &ECX; //AddressSize == 32, use ECX

while(Counter != 0) {
	ServiceInterrupts(); //service pending interrupts (if any)
	ExecuteStringInstruction(); //execute associated string instruction
	Counter = Counter - 1;
	if(((Instruction == REPZ || Instruction == REPE) && ZF == 0) || ((Instruction == REPNZ || Instruction == REPNE) && ZF == 1) break;
}

```
 
 
## Flags affected
 
None; however, the CMPS and SCAS instructions do set the status flags in the EFLAGS register.

 
