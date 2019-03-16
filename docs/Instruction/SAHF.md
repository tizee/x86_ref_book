# SAHF
 
## Store AH into Flags
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|9E|SAHF|Load SF, ZF, AF, PF, and CF from AH into EFLAGS register.|
 
## Description
 
Loads the SF, ZF, AF, PF, and CF flags of the EFLAGS register with values from the corresponding bits in the AH register (bits 7, 6, 4, 2, and 0, respectively). Bits 1, 3, and 5 of register AH are ignored; the corresponding reserved bits (1, 3, and 5) in the EFLAGS register remain as shown in the "Operation" section below.
 
 
## Operation
 
```c
EFLAGS(SF:ZF:0:AF:0:PF:1:CF) = AH;

```
 
 
## Flags affected
 
The SF, ZF, AF, PF, and CF flags are loaded with values from the AH register. Bits 1, 3, and 5 of the EFLAGS register are unaffected, with the values remaining 1, 0, and 0, respectively.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n|0F3n/0F2n|0F2n|
|SAHF|1/0.5|0.5/0.5|ALU|
