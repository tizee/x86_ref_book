# RDPMC
 
## Read Performance-Monitoring Counters
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 33|RDPMC|Read performance-monitoring counter specified by ECX into EDX:EAX.|
 
## Description
 
Loads the contents of the 40-bit performance-monitoring counter specified in the ECX register into registers EDX:EAX. The EDX register is loaded with the high-order 8 bits of the counter and the EAX register is loaded with the low-order 32 bits. The counter to be read is specified with an unsigned integer placed in the ECX register. The P6 family processors and Pentium processors with MMX technology have two performance-monitoring counters (0 and 1), which are specified by placing 0000H or 0001H, respectively, in the ECX register. The Pentium 4 and Intel Xeon processors have 18 counters (0 through 17), which are specified with 0000H through 0011H, respectively The Pentium 4 and Intel Xeon processors also support "fast" (32-bit) and "slow" (40-bit) reads of the performance counters, selected with bit 31 of the ECX register. If bit 31 is set, the RDPMC instruction reads only the low 32 bits of the selected performance counter; if bit 31 is clear, all 40 bits of the counter are read. The 32-bit counter result is returned in the EAX register, and the EDX register is set to 0. A 32-bit read executes faster on a Pentium 4 or Intel Xeon processor than a full 40-bit read.
 
When in protected or virtual 8086 mode, the performance-monitoring counters enabled (PCE) flag in register CR4 restricts the use of the RDPMC instruction as follows. When the PCE flag is set, the RDPMC instruction can be executed at any privilege level; when the flag is clear, the instruction can only be executed at privilege level 0. (When in real-address mode, the RDPMC instruction is always enabled.) The performance-monitoring counters can also be read with the RDMSR instruction, when executing at privilege level 0.
 
The performance-monitoring counters are event counters that can be programmed to count events such as the number of instructions decoded, number of interrupts received, or number of cache loads. Appendix A, Performance-Monitoring Events, in the IA-32 Intel Architecture Software Developer's Manual, Volume 3, lists the events that can be counted for the Pentium 4, Intel Xeon, and earlier IA-32 processors.
 
The RDPMC instruction is not a serializing instruction; that is, it does not imply that all the events caused by the preceding instructions have been completed or that events caused by subsequent instructions have not begun. If an exact event count is desired, software must insert a serializing instruction (such as the CPUID instruction) before and/or after the RDPCM instruction.
 
In the Pentium 4 and Intel Xeon processors, performing back-to-back fast reads are not guaranteed to be monotonic. To guarantee monotonicity on back-to-back reads, a serializing instruction must be placed between the tow RDPMC instructions.
 
The RDPMC instruction can execute in 16-bit addressing mode or virtual-8086 mode; however, the full contents of the ECX register are used to select the counter, and the event count is stored in the full EAX and EDX registers.
 
The RDPMC instruction was introduced into the IA-32 Architecture in the Pentium Pro processor and the Pentium processor with MMX technology. The earlier Pentium processors have performance-monitoring counters, but they must be read with the RDMSR instruction.
 
 
## Operation
 
```c
//P6 family processors and Pentium processor with MMX technology
if(ECX <= 1 && (CR4.PCE == 1 || CPL == 0 || CR0.PE == 0)) {
	EAX = PMC(ECX)[0..31];
	EDX = PMC(ECX)[32..39];
}
else Exception(GP(0)); //ECX is not 0 or 1 or CR4.PCE is 0 and CPL is 1, 2, or 3 and CR0.PE is 1

//Pentium 4 and Intel Xeon processor
if(ECX[0..30] <= 17) && (CR4.PCE == 1 || CPL == 0 || CR0.PE == 0)) {
	if(ECX[31] == 0) {
		EAX = PMC(ECX[0..30])[0..31]; //40-bit read
		EDX = PMC(ECX[0..30])[32..39];
	}
	else if(ECX[31] == 1) {
		EAX = PMC(ECX[0..30])[0..31]; //32-bit read
		EDX = 0;
	}
}
else Exception(GP(0)); //ECX[30:0] is not 0...17 or CR4.PCE is 0 and CPL is 1, 2, or 3 and CR0.PE is 1

```
 
 
## Flags affected
 
None.

 
