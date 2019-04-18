# SETcc
 
## Set Byte on Condition
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F 97|SETA r/m8|Set byte if above (CF=0 and ZF=0).|
|0F 93|SETAE r/m8|Set byte if above or equal (CF=0).|
|0F 92|SETB r/m8|Set byte if below (CF=1).|
|0F 96|SETBE r/m8|Set byte if below or equal (CF=1 or ZF=1).|
|0F 92|SETC r/m8|Set if carry (CF=1).|
|0F 94|SETE r/m8|Set byte if equal (ZF=1).|
|0F 9F|SETG r/m8|Set byte if greater (ZF=0 and SF=OF).|
|0F 9D|SETGE r/m8|Set byte if greater or equal (SF=OF).|
|0F 9C|SETL r/m8|Set byte if less (SF<>OF).|
|0F 9E|SETLE r/m8|Set byte if less or equal (ZF=1 or SF<>OF).|
|0F 96|SETNA r/m8|Set byte if not above (CF=1 or ZF=1).|
|0F 92|SETNAE r/m8|Set byte if not above or equal (CF=1).|
|0F 93|SETNB r/m8|Set byte if not below (CF=0).|
|0F 97|SETNBE r/m8|Set byte if not below or equal (CF=0 and ZF=0).|
|0F 93|SETNC r/m8|Set byte if not carry (CF=0).|
|0F 95|SETNE r/m8|Set byte if not equal (ZF=0).|
|0F 9E|SETNG r/m8|Set byte if not greater (ZF=1 or SF<>OF).|
|0F 9C|SETNGE r/m8|Set if not greater or equal (SF<>OF).|
|0F 9D|SETNL r/m8|Set byte if not less (SF=OF).|
|0F 9F|SETNLE r/m8|Set byte if not less or equal (ZF=0 and SF=OF).|
|0F 91|SETNO r/m8|Set byte if not overflow (OF=0).|
|0F 9B|SETNP r/m8|Set byte if not parity (PF=0).|
|0F 99|SETNS r/m8|Set byte if not sign (SF=0).|
|0F 95|SETNZ r/m8|Set byte if not zero (ZF=0).|
|0F 90|SETO r/m8|Set byte if overflow (OF=1).|
|0F 9A|SETP r/m8|Set byte if parity (PF=1).|
|0F 9A|SETPE r/m8|Set byte if parity even (PF=1).|
|0F 9B|SETPO r/m8|Set byte if parity odd (PF=0).|
|0F 98|SETS r/m8|Set byte if sign (SF=1).|
|0F 94|SETZ r/m8|Set byte if zero (ZF=1).|
 
## Description
 
Sets the destination operand to 0 or 1 depending on the settings of the status flags (CF, SF, OF, ZF, and PF) in the EFLAGS register. The destination operand points to a byte register or a byte in memory. The condition code suffix (cc) indicates the condition being tested for.
 
The terms "above" and "below" are associated with the CF flag and refer to the relationship between two unsigned integer values. The terms "greater" and "less" are associated with the SF and OF flags and refer to the relationship between two signed integer values.
 
Many of the SETcc instruction opcodes have alternate mnemonics. For example, SETG (set byte if greater) and SETNLE (set if not less or equal) have the same opcode and test for the same condition: ZF equals 0 and SF equals OF. These alternate mnemonics are provided to make code more intelligible. Appendix B, EFLAGS Condition Codes, in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, shows the alternate mnemonics for various test conditions.
 
Some languages represent a logical one as an integer with all bits set. This representation can be obtained by choosing the logically opposite condition for the SETcc instruction, then decrementing the result. For example, to test for overflow, use the SETNO instruction, then decrement the result.
 
 
## Operation
 
```c
if(Condition == true) Destination = 1;
else Destination = 0;

```
 
 
## Flags affected
 
None.

 
 
|Instruction|Latency|Throughput|Execution Unit|
|-|-|-|-|
|CPUID|0F3n/0F2n/069n|0F3n/0F2n/069n|0F2n|
|SETcc|5|1.5|ALU|
