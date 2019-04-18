# CPUID
 
## CPU Identification
 
 
|Opcode|Mnemonic|Description|
|-|-|-|
|0F A2|CPUID|Returns processor identification and feature information to the EAX, EBX, ECX, and EDX registers, according to the input value entered initially in the EAX register.|
 
|Description|Initial EAX Value|Register|Information Provided about the Processor|Initial EAX Value|Register|Information Provided about the Processor|IA-32 Processors|Basic Information|Extended Function Information|Bit #|Information|Type|Encoding|Bit #|Mnemonic|Description|Bit #|Mnemonic|Description|Descriptor|Value Cache or TLB Description|EAX Input Value|Return Values|ASCII Equivalent|Brand Index|Brand String|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|
The ID flag (bit 21) in the EFLAGS register indicates support for the CPUID instruction. If a software procedure can set and clear this flag, the processor executing the procedure supports the CPUID instruction.
CPUID returns processor identification and feature information in the EAX, EBX, ECX, and EDX registers. The instruction's output is dependent on the contents of the EAX register upon execution. For example, the following pseudocode loads EAX with 00H and causes CPUID to return a Maximum Return Value and the Vendor Identification String in the appropriate registers: MOV EAX, 00H CPUID. The following shows information returned, depending on the initial value loaded into the EAX register. The second table shows the maximum CPUID input value recognized for each family of IA- 32 processors on which CPUID is implemented.
Two types of information are returned: basic and extended function information. If a higher value entered than is valid for a particular processor, the information for the highest useful basic information value is returned. For example, if an input value of 5 is entered in EAX for a Pentium 4 processor, the information for an input value of 2 is returned. The exception to this rule is the input values that return extended function information. For a Pentium 4 processor, entering an input value of 80000005H or above returns the information for an input value of 2.
CPUID can be executed at any privilege level to serialize instruction execution. Serializing instruction execution guarantees that any modifications to flags, registers, and memory for previous instructions are completed before the next instruction is fetched and executed.
See also: "Serializing Instructions" in Chapter 7 of the IA-32 Intel Architecture Software Developer's Manual, Volume 3 AP-485, Intel Processor Identification and the CPUID Instruction (Order Number 241618)
INPUT EAX = 0: Returns CPUID's Highest Value for Basic Processor Information and the Vendor Identification StringWhen CPUID executes with EAX set to 0, the processor returns the highest value the CPUID recognizes for returning basic processor information. The value is returned in the EAX register (see second table) and is processor specific.
Information Returned by CPUID Instruction


Basic CPUID Information
Initial EAX ValueRegisterInformation Provided about the Processor
0HEAXMaximum Input Value for Basic CPUID Information (see second table)
-EBX"Genu"
-ECX"ntel"
-EDX"ineI"
01HEAXVersion Information: Type, Family, Model, and Stepping ID
-EBXBits 7-0: Brand Index
--Bits 15-8: CLFLUSH line size (Value . 8 = cache line size in bytes)
--Bits 23-16: Number of logical processors per physical processor; two for the Pentium 4 processor supporting Hyper-Threading Technology
--Bits 31-24: Local APIC ID
-ECXExtended Feature Information (see fourth table)
-EDXFeature Information (see fifth table)
02HEAXCache and TLB Information (see sixth table)
-EBXCache and TLB Information
-ECXCache and TLB Information
-EDXCache and TLB Information
03HEAXReserved.
-EBXReserved.
-ECXBits 00-31 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.)
-EDXBits 32-63 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.)
--NOTE: Processor serial number (PSN) is not supported in the Pentium 4 processor or later. On all models, use the PSN flag (returned using CPUID) to check for PSN support before accessing the feature. See AP-485, Intel Processor Identification and the CPUID Instruction (Order Number 241618) for more information on PSN.
04HEAXBits 4-0: Cache Type**
--Bits 7-5: Cache Level (starts at 1)
--Bits 8: Self Initializing cache level (does not need SW initialization)
--Bits 9: Fully Associative cache
--Bits 13-10: Reserved
--Bits 25-14: Number of threads sharing this cache*
--Bits 31-26: Number of processor cores on this die (Multicore)*
-EBXBits 11-00: L = System Coherency Line Size*
--Bits 21-12: P = Physical Line partitions*
--Bits 31-22: W = Ways of associativity*
-ECXBits 31-00: S = Number of Sets*
-EDXReserved = 0
--0 = Null - No more caches
--1 = Data Cache
--2 = Instruction Cache
--3 = Unified Cache
--4-31 = Reserved
--NOTE: CPUID leaves > 3 < 80000000 are only visible when IA32_CR_MISC_ENABLES.BOOT_NT4 (bit 22) is clear (Default)
5HEAXBits 15-00: Smallest monitor-line size in bytes (default is processor's monitor granularity)
--Bits 31-16: Reserved = 0
-EBXBits 15-00: Largest monitor-line size in bytes (default is processor's monitor granularity)
--Bits 31-16: Reserved = 0
-ECXReserved = 0
-EDXReserved = 0

*Add one to the value in the register file to get the number. For example, the number of processor cores is EAX[31:26]+1.
** Cache Types fields





Extended Function CPUID Information
Initial EAX ValueRegisterInformation Provided about the Processor
80000000HEAXMaximum Input Value for Extended Function CPUID Information (see second table).
-EBXReserved
-ECXReserved
-EDXReserved
80000001HEAXExtended Processor Signature and Extended Feature Bits. (Currently reserved)
-EBXReserved
-ECXReserved
-EDXReserved
80000002HEAXProcessor Brand String
-EBXProcessor Brand String Continued
-ECXProcessor Brand String Continued
-EDXProcessor Brand String Continued
80000003HEAXProcessor Brand String Continued
-EBXProcessor Brand String Continued
-ECXProcessor Brand String Continued
-EDXProcessor Brand String Continued
80000004HEAXProcessor Brand String Continued
-EBXProcessor Brand String Continued
-ECXProcessor Brand String Continued
-EDXProcessor Brand String Continued
80000005HEAXReserved = 0
-EBXReserved = 0
-ECXReserved = 0
-EDXReserved = 0
80000006HEAXReserved = 0
-EBXReserved = 0
-ECXBits 0-7: Cache Line Size
--Bits 15-12: L2 Associativity
--Bits 31-16: Cache size in 1K units
-EDXReserved = 0
-80000007H EAXReserved = 0
-EBXReserved = 0
-ECXReserved = 0
-EDXReserved = 0
80000008HEAXReserved = 0
-EBXReserved = 0
-ECXReserved = 0
-EDXReserved = 0


A vendor identification string is also returned in EBX, EDX, and ECX. For Intel processors, the string is "GenuineIntel" and is expressed: EBX = 756e6547h (* "Genu", with G in the low nibble of BL *) EDX = 49656e69h (* "ineI", with i in the low nibble of DL *) ECX = 6c65746eh (* "ntel", with n in the low nibble of CL *)
INPUT EAX = 80000000H: Returns CPUID's Highest Value for Extended Processor InformationWhen CPUID executes with EAX set to 0, the processor returns the highest value the processor recognizes for returning extended processor information. The value is returned in the EAX register (see second table) and is processor specific.


Highest CPUID Source Operand for IA-32 Processors
IA-32 ProcessorsBasic InformationExtended Function Information
Earlier Intel486 ProcessorsCPUID Not ImplementedCPUID Not Implemented
Later Intel486 Processors and Pentium Processors01HNot Implemented
Pentium Pro and Pentium II Processors, IntelÃï¿½âï¿½ï¿½Ãï¿½Â® CeleronÃï¿½Â¢Ã¢âï¿½¬Å¾Ãï¿½Â¢ Processors02HNot Implemented
Pentium III Processors03HNot Implemented
Pentium 4 Processors02H80000004H
Intel Xeon Processors02H80000004H
Pentium M Processor02H80000004H
Pentium 4 Processor supporting Hyper-Threading Technology05H80000008H


Returns Microcode Update Signature For processors that support the microcode update facility, the IA32_BIOS_SIGN_ID MSR is loaded with the update signature whenever CPUID executes. The signature is returned in the upper DWORD. For details, see Chapter 9 in the IA-32 Intel Architecture Software Developer's Manual, Volume 3.
INPUT EAX = 1: Returns Model, Family, Stepping InformationWhen CPUID executes with EAX set to 1, version information is returned in EAX. For example: model, family, and processor type for the first processor in the Intel Pentium 4 family is returned as follows:

Model - 0000B
Family - 1111B
Processor Type - 00B

See third table for available processor type values. Stepping IDs are provided as needed.


Version Information Returned by CPUID in EAX
Bit #Information
0-3Stepping ID
4-7Model
8-11Family ID
12-13Processor Type
14-15Reserved
16-19Extended Model ID
20-27Extended Family ID
28-31Reserved




Processor Type Field
TypeEncoding
Original OEM Processor00B
Intel OverDriveÃï¿½âï¿½ï¿½Ãï¿½Â® Processor01B
Dual processor (not applicable to Intel486 processors)10B
Intel reserved11B

NOTE See AP-485, Intel Processor Identification and the CPUID Instruction (Order Number 241618) and Chapter 14 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for information on identifying earlier IA-32 processors.



The Extended Family ID and Extended Model ID need be examined only if the Family ID reaches 0FH. Always display processor information as a combination of family, model, and stepping.
Integrate the ID fields into a display as: Displayed family = ((Extended Family ID(4-bits) << 4)) (8-bits) + Family ID (4-bits zero extended to 8-bits).
Compute the displayed model from the Model ID and the Extended Model ID as: Displayed Model = ((Extended Model ID (4-bits) << 4))(8-bits) + Model (4-bits zero extended to 8-bits)
INPUT EAX = 1: Returns Additional Information in EBXWhen CPUID executes with EAX set to 1, additional information is returned to the EBX register: - Brand index (low byte of EBX) - this number provides an entry into a brand string table that contains brand strings for IA-32 processors. More information about this field is provided later in this section.

CLFLUSH instruction cache line size (second byte of EBX)
this number indicates the size of the cache line flushed with CLFLUSH instruction in 8-byte increments. This field was introduced in the Pentium 4 processor.
Local APIC ID (high byte of EBX)
this number is the 8-bit ID that is assigned to the local APIC on the processor during power up. This field was introduced in the Pentium 4 processor.

INPUT EAX = 1: Returns Feature Information in ECX and EDXWhen CPUID executes with EAX set to 1, feature information is returned in ECX and EDX.

Table four shows encodings for ECX.
Table five shows encodings for EDX.

For all feature flags, a 1 indicates that the feature is supported. Use Intel to properly interpret feature flags.
NOTE Software must confirm that a processor feature is present using feature flags returned by CPUID prior to using the feature. Software should not depend on future offerings retaining all features.


Extended Feature Information Returned in the ECX Register
Bit #MnemonicDescription
0SSE3Streaming SIMD Extensions 3 (SSE3). A value of 1 indicates the processor supports this technology.
1-2-Reserved
3MONITORMONITOR/MWAIT. A value of 1 indicates the processor supports this feature.
4DS-CPLCPL Qualified Debug Store. A value of 1 indicates the processor supports the extensions to the Debug Store feature to allow for branch message storage qualified by CPL.
5-6-Reserved
7ESTEnhanced Intel SpeedStepÃï¿½âï¿½ï¿½Ãï¿½Â® technology. A value of 1 indicates that the processor supports this technology.
8TM2Thermal Monitor 2. A value of 1 indicates whether the processor supports this technology.
9-Reserved
10CNXT-IDL1 Context ID. A value of 1 indicates the L1 data cache mode can be set to either adaptive mode or shared mode. A value of 0 indicates this feature is not supported. See definition of the IA32_MISC_ENABLE MSR Bit 24 (L1 Data Cache Context Mode) for details.
11-31-Reserved




Feature Information Returned in the EDX Register
Bit #MnemonicDescription
0FPUFloating Point Unit On-Chip. The processor contains an x87 FPU.
1VMEVirtual 8086 Mode Enhancements. Virtual 8086 mode enhancements, including CR4.VME for controlling the feature, CR4.PVI for protected mode virtual interrupts, software interrupt indirection, expansion of the TSS with the software indirection bitmap, and EFLAGS.VIF and EFLAGS.VIP flags.
2DEDebugging Extensions. Support for I/O breakpoints, including CR4.DE for controlling the feature, and optional trapping of accesses to DR4 and DR5.
3PSEPage Size Extension. Large pages of size 4 MByte are supported, including CR4.PSE for controlling the feature, the defined dirty bit in PDE (Page Directory Entries), optional reserved bit trapping in CR3, PDEs, and PTEs.
4TSCTime Stamp Counter. The RDTSC instruction is supported, including CR4.TSD for controlling privilege.
5MSRModel Specific Registers RDMSR and WRMSR Instructions. The RDMSR and WRMSR instructions are supported. Some of the MSRs are implementation dependent.
6PAEPhysical Address Extension. Physical addresses greater than 32 bits are supported: extended page table entry formats, an extra level in the page translation tables is defined, 2-MByte pages are supported instead of 4 Mbyte pages if PAE bit is 1. The actual number of address bits beyond 32 is not defined, and is implementation specific.
7MCEMachine Check Exception. Exception 18 is defined for Machine Checks, including CR4.MCE for controlling the feature. This feature does not define the model-specific implementations of machine-check error logging, reporting, and processor shutdowns. Machine Check exception handlers may have to depend on processor version to do model specific processing of the exception, or test for the presence of the Machine Check feature.
8CX8CMPXCHG8B Instruction. The compare-and-exchange 8 bytes (64 bits) instruction is supported (implicitly locked and atomic).
9APICAPIC On-Chip. The processor contains an Advanced Programmable Interrupt Controller (APIC), responding to memory mapped commands in the physical address range FFFE0000H to FFFE0FFFH (by default - some processors permit the APIC to be relocated).
10-Reserved
11SEPSYSENTER and SYSEXIT Instructions. The SYSENTER and SYSEXIT and associated MSRs are supported. 12 MTRR Memory Type Range Registers. MTRRs are supported. The MTRRcap MSR contains feature bits that describe what memory types are supported, how many variable MTRRs are supported, and whether fixed MTRRs are supported.
13PGEPTE Global Bit. The global bit in page directory entries (PDEs) and page table entries (PTEs) is supported, indicating TLB entries that are common to different processes and need not be flushed. The CR4.PGE bit controls this feature.
14MCAMachine Check Architecture. The Machine Check Architecture, which provides a compatible mechanism for error reporting in P6 family, Pentium 4, Intel Xeon processors, and future processors, is supported. The MCG_CAP MSR contains feature bits describing how many banks of error reporting MSRs are supported.
15CMOVConditional Move Instructions. The conditional move instruction CMOV is supported. In addition, if x87 FPU is present as indicated by the CPUID.FPU feature bit, then the FCOMI and FCMOV instructions are supported
16PATPage Attribute Table. Page Attribute Table is supported. This feature augments the Memory Type Range Registers (MTRRs), allowing an operating system to specify attributes of memory on a 4K granularity through a linear address.
17PSE-3636-Bit Page Size Extension. Extended 4-MByte pages that are capable of addressing physical memory beyond 4 GBytes are supported. This feature indicates that the upper four bits of the physical address of the 4-MByte page is encoded by bits 13-16 of the page directory entry.
18PSNProcessor Serial Number. The processor supports the 96-bit processor identification number feature and the feature is enabled.
19CLFSHCLFLUSH Instruction. CLFLUSH Instruction is supported. 20 Reserved Reserved
21DSDebug Store. The processor supports the ability to write debug information into a memory resident buffer. This feature is used by the branch trace store (BTS) and precise event-based sampling (PEBS) facilities (see Chapter 15, Debugging and Performance Monitoring, in the IA-32 Intel Architecture Software Developer's Manual, Volume 3).
22ACPIThermal Monitor and Software Controlled Clock Facilities. The processor implements internal MSRs that allow processor temperature to be monitored and processor performance to be modulated in predefined duty cycles under software control.
23MMXIntel MMX Technology. The processor supports the Intel MMX technology.
24FXSRFXSAVE and FXRSTOR Instructions. The FXSAVE and FXRSTOR instructions are supported for fast save and restore of the floating point context. Presence of this bit also indicates that CR4.OSFXSR is available for an operating system to indicate that it supports the FXSAVE and FXRSTOR instructions.
25SSESSE. The processor supports the SSE extensions.
26SSE2SSE2. The processor supports the SSE2 extensions.
27SSSelf Snoop. The processor supports the management of conflicting memory types by performing a snoop of its own cache structure for transactions issued to the bus.
28HTTHyper-Threading Technology. The processor supports Hyper-Threading Technology.
29TMThermal Monitor. The processor implements the thermal monitor automatic thermal control circuitry (TCC).
30-Reserved
31PBEPending Break Enable. The processor supports the use of the FERR#/PBE# pin when the processor is in the stop-clock state (STPCLK# is asserted) to signal the processor that an interrupt is pending and that the processor should return to normal operation to handle the interrupt. Bit 10 (PBE enable) in the IA32_MISC_ENABLE MSR enables this capability.


INPUT EAX = 2: Cache and TLB Information Returned in EAX, EBX, ECX, EDXWhen CPUID executes with EAX set to 2, the processor returns information about the processor's internal caches and TLBs in the EAX, EBX, ECX, and EDX registers.
The encoding is as follows: - The least-significant byte in register EAX (register AL) indicates the number of times the CPUID instruction must be executed with an input value of 2 to get a complete description of the processor's caches and TLBs. The first member of the family of Pentium 4 processors will return a 1.

The most significant bit (bit 31) of each register indicates whether the register contains valid information (set to 0) or is reserved (set to 1).
If a register contains valid information, the information is contained in 1 byte descriptors.

Table six shows the encoding of these descriptors. Note that the order of descriptors in the EAX, EBX, ECX, and EDX registers is not defined; that is, specific bytes are not designated to contain descriptors for specific cache or TLB types. The descriptors may appear in any order.


Encoding of Cache and TLB Descriptors
DescriptorValue Cache or TLB Description
00HNull descriptor
01HInstruction TLB: 4 KByte Pages, 4-way set associative, 32 entries
02HInstruction TLB: 4 MByte Pages, 4-way set associative, 2 entries
03HData TLB: 4KByte Pages, 4-way set associative, 64 entries
04HData TLB: 4MByte Pages, 4-way set associative, 8 entries
06H1st-level instruction cache: 8 KBytes, 4-way set associative, 32 byte line size
08H1st-level instruction cache: 16 KBytes, 4-way set associative, 32 byte line size
0AH1st-level data cache: 8 KBytes, 2-way set associative, 32 byte line size
0CH1st-level data cache: 16 KBytes, 4-way set associative, 32 byte line size
22H3rd-level cache: 512 KBytes, 4-way set associative, 64 byte line size, 2 lines per sector
23H3rd-level cache: 1 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector
25H3rd-level cache: 2 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector
29H3rd-level cache: 4M Bytes, 8-way set associative, 64 byte line size, 2 lines per sector
2CH1st-level data cache: 32K Bytes, 8-way set associative, 64 byte line size
30H1st-level instruction cache: 32K Bytes, 8-way set associative, 64 byte line size
40HNo 2nd-level cache or, if processor contains a valid 2nd-level cache, no 3rd-level cache
41H2nd-level cache: 128 KBytes, 4-way set associative, 32 byte line size
42H2nd-level cache: 256 KBytes, 4-way set associative, 32 byte line size
43H2nd-level cache: 512 KBytes, 4-way set associative, 32 byte line size
44H2nd-level cache: 1 MByte, 4-way set associative, 32 byte line size
45H2nd-level cache: 2 MByte, 4-way set associative, 32 byte line size
50HInstruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 64 entries
51HInstruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 128 entries
52HInstruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 256 entries
5BHData TLB: 4 KByte and 4 MByte pages, 64 entries
5CHData TLB: 4 KByte and 4 MByte pages,128 entries
5DHData TLB: 4 KByte and 4 MByte pages,256 entries
60H1st-level data cache: 16 KByte, 8-way set associative, 64 byte line size
66H1st-level data cache: 8 KByte, 4-way set associative, 64 byte line size
67H1st-level data cache: 16 KByte, 4-way set associative, 64 byte line size
68H1st-level data cache: 32 KByte, 4-way set associative, 64 byte line size
70HTrace cache: 12 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative
71HTrace cache: 16 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative
72HTrace cache: 32 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative
78H2nd-level cache: 1 MByte, 4-way set associative, 64byte line size
79H2nd-level cache: 128 KByte, 8-way set associative, 64 byte line size, 2 lines per sector
7AH2nd-level cache: 256 KByte, 8-way set associative, 64 byte line size, 2 lines per sector
7BH2nd-level cache: 512 KByte, 8-way set associative, 64 byte line size, 2 lines per sector
7CH2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size, 2 lines per sector
7DH2nd-level cache: 2 MByte, 8-way set associative, 64byte line size
7FH2nd-level cache: 512 KByte, 2-way set associative, 64-byte line size
82H2nd-level cache: 256 KByte, 8-way set associative, 32 byte line size
83H2nd-level cache: 512 KByte, 8-way set associative, 32 byte line size
84H2nd-level cache: 1 MByte, 8-way set associative, 32 byte line size
85H2nd-level cache: 2 MByte, 8-way set associative, 32 byte line size
86H2nd-level cache: 512 KByte, 4-way set associative, 64 byte line size
87H2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size
B0HInstruction TLB: 4 KByte Pages, 4-way set associative, 128 entries
B3HData TLB: 4 KByte Pages, 4-way set associative, 128 entries
F0H64-Byte Prefetching
F1H128-Byte Prefetching


Example of Cache and TLB Interpretation The first member of the family of Pentium 4 processors returns the following information about caches and TLBs when the CPUID executes with an input value of 2: EAX 66 5B 50 01H EBX 0H ECX 0H EDX 00 7A 70 00H Which means: - The least-significant byte (byte 0) of register EAX is set to 01H. This indicates that CPUID needs to be executed once with an input value of 2 to retrieve complete information about caches and TLBs.

The most-significant bit of all four registers (EAX, EBX, ECX, and EDX) is set to 0, indicating that each register contains valid 1-byte descriptors.
Bytes 1, 2, and 3 of register EAX indicate that the processor has: 50H -> a 64-entry instruction TLB, for mapping 4-KByte and 2-MByte or 4-MByte pages;	5BH -> a 64-entry data TLB, for mapping 4-KByte and 4-MByte pages; 66H -> an 8-KByte 1st level data cache, 4-way set associative, with a 64-Byte cache line size.
The descriptors in registers EBX and ECX are valid, but contain NULL descriptors.
Bytes 0, 1, 2, and 3 of register EDX indicate that the processor has: 00H -> NULL descriptor; 70H -> a 12-KByte 1st level code cache, 4-way set associative, with a 64-byte cache line size; 7AH -> a 256-KByte 2nd level cache, 8-way set associative, with a sectored, 64-byte cache line size; 00H -> NULL descriptor.

Methods for returning branding informationUse the following techniques to access branding information: 1. Processor brand string method; this method also returns the processor's maximum operating frequency 2. Processor brand index; this method uses a software supplied brand string table.
These two methods are discussed in the following sections. For methods that are available in early processors, see Section: "Identification of Earlier IA-32 Processors" in Chapter 14 of the IA-32 Intel Architecture Software Developer's Manual, Volume 1.
The Processor Brand String Method describes the algorithm used for detection of the brand string. Processor brand identification software should execute this algorithm on all IA-32 architecture compatible processors.
This method (introduced with Pentium 4 processors) returns an ASCII brand identification string and the maximum operating frequency of the processor to the EAX, EBX, ECX, and EDX registers.
Determination of Support for the Processor Brand StringEAX = 1
CPUID
IF (EAX >= 080000004H)
THEN
	* Processor Brand String Supported *
ELSE
	* Processor Brand String Not Supported *
FI;

How Brand Strings Work To use the brand string method, execute CPUID with EAX input of 8000002H through 80000004H. For each input value, CPUID returns 16 ASCII characters using EAX, EBX, ECX, and EDX. The returned string will be NULL terminated.
Table seven shows the brand string that is returned by the first processor in the Pentium 4 processor family.


Processor Brand String Returned with Pentium 4 Processor
EAX Input ValueReturn ValuesASCII Equivalent
80000002HEAX = 20202020H" "
-EBX = 20202020H" "
-ECX = 20202020H" "
-EDX = 6E492020H"nI "
80000003HEAX = 286C6574H"(let"
-EBX = 50202952H"P )R"
-ECX = 69746E65H"itne"
-EDX = 52286D75H"R(mu"
80000004HEAX = 20342029H" 4 )"
-EBX = 20555043H" UPC"
-ECX = 30303531H"0051"
-EDX = 007A484DH" zHM"


Extracting the Maximum Processor Frequency from Brand Strings provides an algorithm which software can use to extract the maximum processor operating frequency from the processor brand string.
NOTE When a frequency is given in a brand string, it is the maximum qualified frequency of the processor, not the frequency at which the processor is currently running.
Algorithm for Extracting Maximum Processor FrequencyScan "Brand String" in Reverse Byte Order for ("zHM", "zHG", "zHT")
IF Substring Matched
	SWITCH Substring
		CASE "zHM": Multiplier = 10^6
		CASE "zHG": Multiplier = 10^9
		CASE "zHT": Multiplier = 10^12
	Scan Digits Until Blank In Reverse Order
	Freq = Reverse Digits To Decimal Value
	(* "Freq" = XY.Z if Digits = "Z.YX" *)
	Max. Qualifed Frequency = "Freq" x "Multiplier"
ELSE Report Error

The Processor Brand Index Method The brand index method (introduced with Pentium III Xeon processors) provides an entry point into a brand identification table that is maintained in memory by system software and is accessible from system- and user-level code. In this table, each brand index is associate with an ASCII brand identification string that identifies the official Intel family and model number of a processor.
When CPUID executes with EAX set to 1, the processor returns a brand index to the low byte in EBX. Software can then use this index to locate the brand identification string for the processor in the brand identification table. The first entry (brand index 0) in this table is reserved, allowing for backward compatibility with processors that do not support the brand identification feature.
Table eight shows brand indices that have identification strings associated with them.


Mapping of Brand Indices and IA-32 Processor Brand Strings
Brand IndexBrand String
00HThis processor does not support the brand identification feature
01HIntel(R) Celeron(R) processor
02HIntel(R) Pentium(R) III processor
03HIntel(R) Pentium(R) III XeonTM processor; If processor signature = 000006B1h, then Intel(R) Celeron(R) processor
04HIntel(R) Pentium(R) III processor
06HMobile Intel(R) Pentium(R) III processor-M
07HMobile Intel(R) Celeron(R) processor
08HIntel(R) Pentium(R) 4 processor
09HIntel(R) Pentium(R) 4 processor
0AHIntel(R) Celeron(R) processor
0BHIntel(R) Xeon(TM) processor; If processor signature = 00000F13h, then Intel(R) Xeon(TM) processor MP
0CHIntel(R) Xeon(TM) processor MP
0EHMobile Intel(R) Pentium(R) 4 processor-M; If processor signature = 00000F13h, then Intel(R) Xeon(TM) processor
0FHMobile Intel(R) Celeron(R) processor
11HMobile Genuine Intel(R) processor
12HIntel(R) Celeron(R) M processor
13HMobile Intel(R) Celeron(R) processor
14HIntel(R) Celeron(R) processor
15HMobile Genuine Intel(R) processor
16HIntel(R) Pentium(R) M processor
17HMobile Intel(R) Celeron(R) processor
18H-0FFHRESERVED


|0H|EAX|Maximum Input Value for Basic CPUID Information (see second table)|-|EBX|"Genu"|-|ECX|"ntel"|-|EDX|"ineI"|01H|EAX|Version Information: Type, Family, Model, and Stepping ID|-|EBX|Bits 7-0: Brand Index|-|-|Bits 15-8: CLFLUSH line size (Value . 8 = cache line size in bytes)|-|-|Bits 23-16: Number of logical processors per physical processor; two for the Pentium 4 processor supporting Hyper-Threading Technology|-|-|Bits 31-24: Local APIC ID|-|ECX|Extended Feature Information (see fourth table)|-|EDX|Feature Information (see fifth table)|02H|EAX|Cache and TLB Information (see sixth table)|-|EBX|Cache and TLB Information|-|ECX|Cache and TLB Information|-|EDX|Cache and TLB Information|03H|EAX|Reserved.|-|EBX|Reserved.|-|ECX|Bits 00-31 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.)|-|EDX|Bits 32-63 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.)|-|-|NOTE: Processor serial number (PSN) is not supported in the Pentium 4 processor or later. On all models, use the PSN flag (returned using CPUID) to check for PSN support before accessing the feature. See AP-485, Intel Processor Identification and the CPUID Instruction (Order Number 241618) for more information on PSN.|04H|EAX|Bits 4-0: Cache Type**|-|-|Bits 7-5: Cache Level (starts at 1)|-|-|Bits 8: Self Initializing cache level (does not need SW initialization)|-|-|Bits 9: Fully Associative cache|-|-|Bits 13-10: Reserved|-|-|Bits 25-14: Number of threads sharing this cache*|-|-|Bits 31-26: Number of processor cores on this die (Multicore)*|-|EBX|Bits 11-00: L = System Coherency Line Size*|-|-|Bits 21-12: P = Physical Line partitions*|-|-|Bits 31-22: W = Ways of associativity*|-|ECX|Bits 31-00: S = Number of Sets*|-|EDX|Reserved = 0|-|-|0 = Null - No more caches|-|-|1 = Data Cache|-|-|2 = Instruction Cache|-|-|3 = Unified Cache|-|-|4-31 = Reserved|-|-|NOTE: CPUID leaves > 3 < 80000000 are only visible when IA32_CR_MISC_ENABLES.BOOT_NT4 (bit 22) is clear (Default)|5H|EAX|Bits 15-00: Smallest monitor-line size in bytes (default is processor's monitor granularity)|-|-|Bits 31-16: Reserved = 0|-|EBX|Bits 15-00: Largest monitor-line size in bytes (default is processor's monitor granularity)|-|-|Bits 31-16: Reserved = 0|-|ECX|Reserved = 0|-|EDX|Reserved = 0|*Add one to the value in the register file to get the number. For example, the number of processor cores is EAX[31:26]+1.|** Cache Types fields|80000000H|EAX|Maximum Input Value for Extended Function CPUID Information (see second table).|-|EBX|Reserved|-|ECX|Reserved|-|EDX|Reserved|80000001H|EAX|Extended Processor Signature and Extended Feature Bits. (Currently reserved)|-|EBX|Reserved|-|ECX|Reserved|-|EDX|Reserved|80000002H|EAX|Processor Brand String|-|EBX|Processor Brand String Continued|-|ECX|Processor Brand String Continued|-|EDX|Processor Brand String Continued|80000003H|EAX|Processor Brand String Continued|-|EBX|Processor Brand String Continued|-|ECX|Processor Brand String Continued|-|EDX|Processor Brand String Continued|80000004H|EAX|Processor Brand String Continued|-|EBX|Processor Brand String Continued|-|ECX|Processor Brand String Continued|-|EDX|Processor Brand String Continued|80000005H|EAX|Reserved = 0|-|EBX|Reserved = 0|-|ECX|Reserved = 0|-|EDX|Reserved = 0|80000006H|EAX|Reserved = 0|-|EBX|Reserved = 0|-|ECX|Bits 0-7: Cache Line Size|-|-|Bits 15-12: L2 Associativity|-|-|Bits 31-16: Cache size in 1K units|-|EDX|Reserved = 0|-|80000007H EAX|Reserved = 0|-|EBX|Reserved = 0|-|ECX|Reserved = 0|-|EDX|Reserved = 0|80000008H|EAX|Reserved = 0|-|EBX|Reserved = 0|-|ECX|Reserved = 0|-|EDX|Reserved = 0|Earlier Intel486 Processors|CPUID Not Implemented|CPUID Not Implemented|Later Intel486 Processors and Pentium Processors|01H|Not Implemented|Pentium Pro and Pentium II Processors, IntelÃï¿½âï¿½ï¿½Ãï¿½Â® CeleronÃï¿½Â¢Ã¢âï¿½¬Å¾Ãï¿½Â¢ Processors|02H|Not Implemented|Pentium III Processors|03H|Not Implemented|Pentium 4 Processors|02H|80000004H|Intel Xeon Processors|02H|80000004H|Pentium M Processor|02H|80000004H|Pentium 4 Processor supporting Hyper-Threading Technology|05H|80000008H|0-3|Stepping ID|4-7|Model|8-11|Family ID|12-13|Processor Type|14-15|Reserved|16-19|Extended Model ID|20-27|Extended Family ID|28-31|Reserved|Original OEM Processor|00B|Intel OverDriveÃï¿½âï¿½ï¿½Ãï¿½Â® Processor|01B|Dual processor (not applicable to Intel486 processors)|10B|Intel reserved|11B|NOTE See AP-485, Intel Processor Identification and the CPUID Instruction (Order Number 241618) and Chapter 14 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for information on identifying earlier IA-32 processors.|0|SSE3|Streaming SIMD Extensions 3 (SSE3). A value of 1 indicates the processor supports this technology.|1-2|-|Reserved|3|MONITOR|MONITOR/MWAIT. A value of 1 indicates the processor supports this feature.|4|DS-CPL|CPL Qualified Debug Store. A value of 1 indicates the processor supports the extensions to the Debug Store feature to allow for branch message storage qualified by CPL.|5-6|-|Reserved|7|EST|Enhanced Intel SpeedStepÃï¿½âï¿½ï¿½Ãï¿½Â® technology. A value of 1 indicates that the processor supports this technology.|8|TM2|Thermal Monitor 2. A value of 1 indicates whether the processor supports this technology.|9|-|Reserved|10|CNXT-ID|L1 Context ID. A value of 1 indicates the L1 data cache mode can be set to either adaptive mode or shared mode. A value of 0 indicates this feature is not supported. See definition of the IA32_MISC_ENABLE MSR Bit 24 (L1 Data Cache Context Mode) for details.|11-31|-|Reserved|0|FPU|Floating Point Unit On-Chip. The processor contains an x87 FPU.|1|VME|Virtual 8086 Mode Enhancements. Virtual 8086 mode enhancements, including CR4.VME for controlling the feature, CR4.PVI for protected mode virtual interrupts, software interrupt indirection, expansion of the TSS with the software indirection bitmap, and EFLAGS.VIF and EFLAGS.VIP flags.|2|DE|Debugging Extensions. Support for I/O breakpoints, including CR4.DE for controlling the feature, and optional trapping of accesses to DR4 and DR5.|3|PSE|Page Size Extension. Large pages of size 4 MByte are supported, including CR4.PSE for controlling the feature, the defined dirty bit in PDE (Page Directory Entries), optional reserved bit trapping in CR3, PDEs, and PTEs.|4|TSC|Time Stamp Counter. The RDTSC instruction is supported, including CR4.TSD for controlling privilege.|5|MSR|Model Specific Registers RDMSR and WRMSR Instructions. The RDMSR and WRMSR instructions are supported. Some of the MSRs are implementation dependent.|6|PAE|Physical Address Extension. Physical addresses greater than 32 bits are supported: extended page table entry formats, an extra level in the page translation tables is defined, 2-MByte pages are supported instead of 4 Mbyte pages if PAE bit is 1. The actual number of address bits beyond 32 is not defined, and is implementation specific.|7|MCE|Machine Check Exception. Exception 18 is defined for Machine Checks, including CR4.MCE for controlling the feature. This feature does not define the model-specific implementations of machine-check error logging, reporting, and processor shutdowns. Machine Check exception handlers may have to depend on processor version to do model specific processing of the exception, or test for the presence of the Machine Check feature.|8|CX8|CMPXCHG8B Instruction. The compare-and-exchange 8 bytes (64 bits) instruction is supported (implicitly locked and atomic).|9|APIC|APIC On-Chip. The processor contains an Advanced Programmable Interrupt Controller (APIC), responding to memory mapped commands in the physical address range FFFE0000H to FFFE0FFFH (by default - some processors permit the APIC to be relocated).|10|-|Reserved|11|SEP|SYSENTER and SYSEXIT Instructions. The SYSENTER and SYSEXIT and associated MSRs are supported. 12 MTRR Memory Type Range Registers. MTRRs are supported. The MTRRcap MSR contains feature bits that describe what memory types are supported, how many variable MTRRs are supported, and whether fixed MTRRs are supported.|13|PGE|PTE Global Bit. The global bit in page directory entries (PDEs) and page table entries (PTEs) is supported, indicating TLB entries that are common to different processes and need not be flushed. The CR4.PGE bit controls this feature.|14|MCA|Machine Check Architecture. The Machine Check Architecture, which provides a compatible mechanism for error reporting in P6 family, Pentium 4, Intel Xeon processors, and future processors, is supported. The MCG_CAP MSR contains feature bits describing how many banks of error reporting MSRs are supported.|15|CMOV|Conditional Move Instructions. The conditional move instruction CMOV is supported. In addition, if x87 FPU is present as indicated by the CPUID.FPU feature bit, then the FCOMI and FCMOV instructions are supported|16|PAT|Page Attribute Table. Page Attribute Table is supported. This feature augments the Memory Type Range Registers (MTRRs), allowing an operating system to specify attributes of memory on a 4K granularity through a linear address.|17|PSE-36|36-Bit Page Size Extension. Extended 4-MByte pages that are capable of addressing physical memory beyond 4 GBytes are supported. This feature indicates that the upper four bits of the physical address of the 4-MByte page is encoded by bits 13-16 of the page directory entry.|18|PSN|Processor Serial Number. The processor supports the 96-bit processor identification number feature and the feature is enabled.|19|CLFSH|CLFLUSH Instruction. CLFLUSH Instruction is supported. 20 Reserved Reserved|21|DS|Debug Store. The processor supports the ability to write debug information into a memory resident buffer. This feature is used by the branch trace store (BTS) and precise event-based sampling (PEBS) facilities (see Chapter 15, Debugging and Performance Monitoring, in the IA-32 Intel Architecture Software Developer's Manual, Volume 3).|22|ACPI|Thermal Monitor and Software Controlled Clock Facilities. The processor implements internal MSRs that allow processor temperature to be monitored and processor performance to be modulated in predefined duty cycles under software control.|23|MMX|Intel MMX Technology. The processor supports the Intel MMX technology.|24|FXSR|FXSAVE and FXRSTOR Instructions. The FXSAVE and FXRSTOR instructions are supported for fast save and restore of the floating point context. Presence of this bit also indicates that CR4.OSFXSR is available for an operating system to indicate that it supports the FXSAVE and FXRSTOR instructions.|25|SSE|SSE. The processor supports the SSE extensions.|26|SSE2|SSE2. The processor supports the SSE2 extensions.|27|SS|Self Snoop. The processor supports the management of conflicting memory types by performing a snoop of its own cache structure for transactions issued to the bus.|28|HTT|Hyper-Threading Technology. The processor supports Hyper-Threading Technology.|29|TM|Thermal Monitor. The processor implements the thermal monitor automatic thermal control circuitry (TCC).|30|-|Reserved|31|PBE|Pending Break Enable. The processor supports the use of the FERR#/PBE# pin when the processor is in the stop-clock state (STPCLK# is asserted) to signal the processor that an interrupt is pending and that the processor should return to normal operation to handle the interrupt. Bit 10 (PBE enable) in the IA32_MISC_ENABLE MSR enables this capability.|00H|Null descriptor|01H|Instruction TLB: 4 KByte Pages, 4-way set associative, 32 entries|02H|Instruction TLB: 4 MByte Pages, 4-way set associative, 2 entries|03H|Data TLB: 4KByte Pages, 4-way set associative, 64 entries|04H|Data TLB: 4MByte Pages, 4-way set associative, 8 entries|06H|1st-level instruction cache: 8 KBytes, 4-way set associative, 32 byte line size|08H|1st-level instruction cache: 16 KBytes, 4-way set associative, 32 byte line size|0AH|1st-level data cache: 8 KBytes, 2-way set associative, 32 byte line size|0CH|1st-level data cache: 16 KBytes, 4-way set associative, 32 byte line size|22H|3rd-level cache: 512 KBytes, 4-way set associative, 64 byte line size, 2 lines per sector|23H|3rd-level cache: 1 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector|25H|3rd-level cache: 2 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector|29H|3rd-level cache: 4M Bytes, 8-way set associative, 64 byte line size, 2 lines per sector|2CH|1st-level data cache: 32K Bytes, 8-way set associative, 64 byte line size|30H|1st-level instruction cache: 32K Bytes, 8-way set associative, 64 byte line size|40H|No 2nd-level cache or, if processor contains a valid 2nd-level cache, no 3rd-level cache|41H|2nd-level cache: 128 KBytes, 4-way set associative, 32 byte line size|42H|2nd-level cache: 256 KBytes, 4-way set associative, 32 byte line size|43H|2nd-level cache: 512 KBytes, 4-way set associative, 32 byte line size|44H|2nd-level cache: 1 MByte, 4-way set associative, 32 byte line size|45H|2nd-level cache: 2 MByte, 4-way set associative, 32 byte line size|50H|Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 64 entries|51H|Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 128 entries|52H|Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 256 entries|5BH|Data TLB: 4 KByte and 4 MByte pages, 64 entries|5CH|Data TLB: 4 KByte and 4 MByte pages,128 entries|5DH|Data TLB: 4 KByte and 4 MByte pages,256 entries|60H|1st-level data cache: 16 KByte, 8-way set associative, 64 byte line size|66H|1st-level data cache: 8 KByte, 4-way set associative, 64 byte line size|67H|1st-level data cache: 16 KByte, 4-way set associative, 64 byte line size|68H|1st-level data cache: 32 KByte, 4-way set associative, 64 byte line size|70H|Trace cache: 12 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative|71H|Trace cache: 16 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative|72H|Trace cache: 32 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative|78H|2nd-level cache: 1 MByte, 4-way set associative, 64byte line size|79H|2nd-level cache: 128 KByte, 8-way set associative, 64 byte line size, 2 lines per sector|7AH|2nd-level cache: 256 KByte, 8-way set associative, 64 byte line size, 2 lines per sector|7BH|2nd-level cache: 512 KByte, 8-way set associative, 64 byte line size, 2 lines per sector|7CH|2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size, 2 lines per sector|7DH|2nd-level cache: 2 MByte, 8-way set associative, 64byte line size|7FH|2nd-level cache: 512 KByte, 2-way set associative, 64-byte line size|82H|2nd-level cache: 256 KByte, 8-way set associative, 32 byte line size|83H|2nd-level cache: 512 KByte, 8-way set associative, 32 byte line size|84H|2nd-level cache: 1 MByte, 8-way set associative, 32 byte line size|85H|2nd-level cache: 2 MByte, 8-way set associative, 32 byte line size|86H|2nd-level cache: 512 KByte, 4-way set associative, 64 byte line size|87H|2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size|B0H|Instruction TLB: 4 KByte Pages, 4-way set associative, 128 entries|B3H|Data TLB: 4 KByte Pages, 4-way set associative, 128 entries|F0H|64-Byte Prefetching|F1H|128-Byte Prefetching|80000002H|EAX = 20202020H|" "|-|EBX = 20202020H|" "|-|ECX = 20202020H|" "|-|EDX = 6E492020H|"nI "|80000003H|EAX = 286C6574H|"(let"|-|EBX = 50202952H|"P )R"|-|ECX = 69746E65H|"itne"|-|EDX = 52286D75H|"R(mu"|80000004H|EAX = 20342029H|" 4 )"|-|EBX = 20555043H|" UPC"|-|ECX = 30303531H|"0051"|-|EDX = 007A484DH|" zHM"|00H|This processor does not support the brand identification feature|01H|Intel(R) Celeron(R) processor|02H|Intel(R) Pentium(R) III processor|03H|Intel(R) Pentium(R) III XeonTM processor; If processor signature = 000006B1h, then Intel(R) Celeron(R) processor|04H|Intel(R) Pentium(R) III processor|06H|Mobile Intel(R) Pentium(R) III processor-M|07H|Mobile Intel(R) Celeron(R) processor|08H|Intel(R) Pentium(R) 4 processor|09H|Intel(R) Pentium(R) 4 processor|0AH|Intel(R) Celeron(R) processor|0BH|Intel(R) Xeon(TM) processor; If processor signature = 00000F13h, then Intel(R) Xeon(TM) processor MP|0CH|Intel(R) Xeon(TM) processor MP|0EH|Mobile Intel(R) Pentium(R) 4 processor-M; If processor signature = 00000F13h, then Intel(R) Xeon(TM) processor|0FH|Mobile Intel(R) Celeron(R) processor|11H|Mobile Genuine Intel(R) processor|12H|Intel(R) Celeron(R) M processor|13H|Mobile Intel(R) Celeron(R) processor|14H|Intel(R) Celeron(R) processor|15H|Mobile Genuine Intel(R) processor|16H|Intel(R) Pentium(R) M processor|17H|Mobile Intel(R) Celeron(R) processor|18H-0FFH|RESERVED|
|
|0H|EAX|Maximum Input Value for Basic CPUID Information (see second table)|
|-|EBX|"Genu"|
|-|ECX|"ntel"|
|-|EDX|"ineI"|
|01H|EAX|Version Information: Type, Family, Model, and Stepping ID|
|-|EBX|Bits 7-0: Brand Index|
|-|-|Bits 15-8: CLFLUSH line size (Value . 8 = cache line size in bytes)|
|-|-|Bits 23-16: Number of logical processors per physical processor; two for the Pentium 4 processor supporting Hyper-Threading Technology|
|-|-|Bits 31-24: Local APIC ID|
|-|ECX|Extended Feature Information (see fourth table)|
|-|EDX|Feature Information (see fifth table)|
|02H|EAX|Cache and TLB Information (see sixth table)|
|-|EBX|Cache and TLB Information|
|-|ECX|Cache and TLB Information|
|-|EDX|Cache and TLB Information|
|03H|EAX|Reserved.|
|-|EBX|Reserved.|
|-|ECX|Bits 00-31 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.)|
|-|EDX|Bits 32-63 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.)|
|-|-|NOTE: Processor serial number (PSN) is not supported in the Pentium 4 processor or later. On all models, use the PSN flag (returned using CPUID) to check for PSN support before accessing the feature. See AP-485, Intel Processor Identification and the CPUID Instruction (Order Number 241618) for more information on PSN.|
|04H|EAX|Bits 4-0: Cache Type**|
|-|-|Bits 7-5: Cache Level (starts at 1)|
|-|-|Bits 8: Self Initializing cache level (does not need SW initialization)|
|-|-|Bits 9: Fully Associative cache|
|-|-|Bits 13-10: Reserved|
|-|-|Bits 25-14: Number of threads sharing this cache*|
|-|-|Bits 31-26: Number of processor cores on this die (Multicore)*|
|-|EBX|Bits 11-00: L = System Coherency Line Size*|
|-|-|Bits 21-12: P = Physical Line partitions*|
|-|-|Bits 31-22: W = Ways of associativity*|
|-|ECX|Bits 31-00: S = Number of Sets*|
|-|EDX|Reserved = 0|
|-|-|0 = Null - No more caches|
|-|-|1 = Data Cache|
|-|-|2 = Instruction Cache|
|-|-|3 = Unified Cache|
|-|-|4-31 = Reserved|
|-|-|NOTE: CPUID leaves > 3 < 80000000 are only visible when IA32_CR_MISC_ENABLES.BOOT_NT4 (bit 22) is clear (Default)|
|5H|EAX|Bits 15-00: Smallest monitor-line size in bytes (default is processor's monitor granularity)|
|-|-|Bits 31-16: Reserved = 0|
|-|EBX|Bits 15-00: Largest monitor-line size in bytes (default is processor's monitor granularity)|
|-|-|Bits 31-16: Reserved = 0|
|-|ECX|Reserved = 0|
|-|EDX|Reserved = 0|
|*Add one to the value in the register file to get the number. For example, the number of processor cores is EAX[31:26]+1.|
|** Cache Types fields|
|
|80000000H|EAX|Maximum Input Value for Extended Function CPUID Information (see second table).|
|-|EBX|Reserved|
|-|ECX|Reserved|
|-|EDX|Reserved|
|80000001H|EAX|Extended Processor Signature and Extended Feature Bits. (Currently reserved)|
|-|EBX|Reserved|
|-|ECX|Reserved|
|-|EDX|Reserved|
|80000002H|EAX|Processor Brand String|
|-|EBX|Processor Brand String Continued|
|-|ECX|Processor Brand String Continued|
|-|EDX|Processor Brand String Continued|
|80000003H|EAX|Processor Brand String Continued|
|-|EBX|Processor Brand String Continued|
|-|ECX|Processor Brand String Continued|
|-|EDX|Processor Brand String Continued|
|80000004H|EAX|Processor Brand String Continued|
|-|EBX|Processor Brand String Continued|
|-|ECX|Processor Brand String Continued|
|-|EDX|Processor Brand String Continued|
|80000005H|EAX|Reserved = 0|
|-|EBX|Reserved = 0|
|-|ECX|Reserved = 0|
|-|EDX|Reserved = 0|
|80000006H|EAX|Reserved = 0|
|-|EBX|Reserved = 0|
|-|ECX|Bits 0-7: Cache Line Size|
|-|-|Bits 15-12: L2 Associativity|
|-|-|Bits 31-16: Cache size in 1K units|
|-|EDX|Reserved = 0|
|-|80000007H EAX|Reserved = 0|
|-|EBX|Reserved = 0|
|-|ECX|Reserved = 0|
|-|EDX|Reserved = 0|
|80000008H|EAX|Reserved = 0|
|-|EBX|Reserved = 0|
|-|ECX|Reserved = 0|
|-|EDX|Reserved = 0|
|
|Earlier Intel486 Processors|CPUID Not Implemented|CPUID Not Implemented|
|Later Intel486 Processors and Pentium Processors|01H|Not Implemented|
|Pentium Pro and Pentium II Processors, IntelÃï¿½âï¿½ï¿½Ãï¿½Â® CeleronÃï¿½Â¢Ã¢âï¿½¬Å¾Ãï¿½Â¢ Processors|02H|Not Implemented|
|Pentium III Processors|03H|Not Implemented|
|Pentium 4 Processors|02H|80000004H|
|Intel Xeon Processors|02H|80000004H|
|Pentium M Processor|02H|80000004H|
|Pentium 4 Processor supporting Hyper-Threading Technology|05H|80000008H|
|
|0-3|Stepping ID|
|4-7|Model|
|8-11|Family ID|
|12-13|Processor Type|
|14-15|Reserved|
|16-19|Extended Model ID|
|20-27|Extended Family ID|
|28-31|Reserved|
|
|Original OEM Processor|00B|
|Intel OverDriveÃï¿½âï¿½ï¿½Ãï¿½Â® Processor|01B|
|Dual processor (not applicable to Intel486 processors)|10B|
|Intel reserved|11B|
|NOTE See AP-485, Intel Processor Identification and the CPUID Instruction (Order Number 241618) and Chapter 14 in the IA-32 Intel Architecture Software Developer's Manual, Volume 1, for information on identifying earlier IA-32 processors.|
|
|0|SSE3|Streaming SIMD Extensions 3 (SSE3). A value of 1 indicates the processor supports this technology.|
|1-2|-|Reserved|
|3|MONITOR|MONITOR/MWAIT. A value of 1 indicates the processor supports this feature.|
|4|DS-CPL|CPL Qualified Debug Store. A value of 1 indicates the processor supports the extensions to the Debug Store feature to allow for branch message storage qualified by CPL.|
|5-6|-|Reserved|
|7|EST|Enhanced Intel SpeedStepÃï¿½âï¿½ï¿½Ãï¿½Â® technology. A value of 1 indicates that the processor supports this technology.|
|8|TM2|Thermal Monitor 2. A value of 1 indicates whether the processor supports this technology.|
|9|-|Reserved|
|10|CNXT-ID|L1 Context ID. A value of 1 indicates the L1 data cache mode can be set to either adaptive mode or shared mode. A value of 0 indicates this feature is not supported. See definition of the IA32_MISC_ENABLE MSR Bit 24 (L1 Data Cache Context Mode) for details.|
|11-31|-|Reserved|
|
|0|FPU|Floating Point Unit On-Chip. The processor contains an x87 FPU.|
|1|VME|Virtual 8086 Mode Enhancements. Virtual 8086 mode enhancements, including CR4.VME for controlling the feature, CR4.PVI for protected mode virtual interrupts, software interrupt indirection, expansion of the TSS with the software indirection bitmap, and EFLAGS.VIF and EFLAGS.VIP flags.|
|2|DE|Debugging Extensions. Support for I/O breakpoints, including CR4.DE for controlling the feature, and optional trapping of accesses to DR4 and DR5.|
|3|PSE|Page Size Extension. Large pages of size 4 MByte are supported, including CR4.PSE for controlling the feature, the defined dirty bit in PDE (Page Directory Entries), optional reserved bit trapping in CR3, PDEs, and PTEs.|
|4|TSC|Time Stamp Counter. The RDTSC instruction is supported, including CR4.TSD for controlling privilege.|
|5|MSR|Model Specific Registers RDMSR and WRMSR Instructions. The RDMSR and WRMSR instructions are supported. Some of the MSRs are implementation dependent.|
|6|PAE|Physical Address Extension. Physical addresses greater than 32 bits are supported: extended page table entry formats, an extra level in the page translation tables is defined, 2-MByte pages are supported instead of 4 Mbyte pages if PAE bit is 1. The actual number of address bits beyond 32 is not defined, and is implementation specific.|
|7|MCE|Machine Check Exception. Exception 18 is defined for Machine Checks, including CR4.MCE for controlling the feature. This feature does not define the model-specific implementations of machine-check error logging, reporting, and processor shutdowns. Machine Check exception handlers may have to depend on processor version to do model specific processing of the exception, or test for the presence of the Machine Check feature.|
|8|CX8|CMPXCHG8B Instruction. The compare-and-exchange 8 bytes (64 bits) instruction is supported (implicitly locked and atomic).|
|9|APIC|APIC On-Chip. The processor contains an Advanced Programmable Interrupt Controller (APIC), responding to memory mapped commands in the physical address range FFFE0000H to FFFE0FFFH (by default - some processors permit the APIC to be relocated).|
|10|-|Reserved|
|11|SEP|SYSENTER and SYSEXIT Instructions. The SYSENTER and SYSEXIT and associated MSRs are supported. 12 MTRR Memory Type Range Registers. MTRRs are supported. The MTRRcap MSR contains feature bits that describe what memory types are supported, how many variable MTRRs are supported, and whether fixed MTRRs are supported.|
|13|PGE|PTE Global Bit. The global bit in page directory entries (PDEs) and page table entries (PTEs) is supported, indicating TLB entries that are common to different processes and need not be flushed. The CR4.PGE bit controls this feature.|
|14|MCA|Machine Check Architecture. The Machine Check Architecture, which provides a compatible mechanism for error reporting in P6 family, Pentium 4, Intel Xeon processors, and future processors, is supported. The MCG_CAP MSR contains feature bits describing how many banks of error reporting MSRs are supported.|
|15|CMOV|Conditional Move Instructions. The conditional move instruction CMOV is supported. In addition, if x87 FPU is present as indicated by the CPUID.FPU feature bit, then the FCOMI and FCMOV instructions are supported|
|16|PAT|Page Attribute Table. Page Attribute Table is supported. This feature augments the Memory Type Range Registers (MTRRs), allowing an operating system to specify attributes of memory on a 4K granularity through a linear address.|
|17|PSE-36|36-Bit Page Size Extension. Extended 4-MByte pages that are capable of addressing physical memory beyond 4 GBytes are supported. This feature indicates that the upper four bits of the physical address of the 4-MByte page is encoded by bits 13-16 of the page directory entry.|
|18|PSN|Processor Serial Number. The processor supports the 96-bit processor identification number feature and the feature is enabled.|
|19|CLFSH|CLFLUSH Instruction. CLFLUSH Instruction is supported. 20 Reserved Reserved|
|21|DS|Debug Store. The processor supports the ability to write debug information into a memory resident buffer. This feature is used by the branch trace store (BTS) and precise event-based sampling (PEBS) facilities (see Chapter 15, Debugging and Performance Monitoring, in the IA-32 Intel Architecture Software Developer's Manual, Volume 3).|
|22|ACPI|Thermal Monitor and Software Controlled Clock Facilities. The processor implements internal MSRs that allow processor temperature to be monitored and processor performance to be modulated in predefined duty cycles under software control.|
|23|MMX|Intel MMX Technology. The processor supports the Intel MMX technology.|
|24|FXSR|FXSAVE and FXRSTOR Instructions. The FXSAVE and FXRSTOR instructions are supported for fast save and restore of the floating point context. Presence of this bit also indicates that CR4.OSFXSR is available for an operating system to indicate that it supports the FXSAVE and FXRSTOR instructions.|
|25|SSE|SSE. The processor supports the SSE extensions.|
|26|SSE2|SSE2. The processor supports the SSE2 extensions.|
|27|SS|Self Snoop. The processor supports the management of conflicting memory types by performing a snoop of its own cache structure for transactions issued to the bus.|
|28|HTT|Hyper-Threading Technology. The processor supports Hyper-Threading Technology.|
|29|TM|Thermal Monitor. The processor implements the thermal monitor automatic thermal control circuitry (TCC).|
|30|-|Reserved|
|31|PBE|Pending Break Enable. The processor supports the use of the FERR#/PBE# pin when the processor is in the stop-clock state (STPCLK# is asserted) to signal the processor that an interrupt is pending and that the processor should return to normal operation to handle the interrupt. Bit 10 (PBE enable) in the IA32_MISC_ENABLE MSR enables this capability.|
|
|00H|Null descriptor|
|01H|Instruction TLB: 4 KByte Pages, 4-way set associative, 32 entries|
|02H|Instruction TLB: 4 MByte Pages, 4-way set associative, 2 entries|
|03H|Data TLB: 4KByte Pages, 4-way set associative, 64 entries|
|04H|Data TLB: 4MByte Pages, 4-way set associative, 8 entries|
|06H|1st-level instruction cache: 8 KBytes, 4-way set associative, 32 byte line size|
|08H|1st-level instruction cache: 16 KBytes, 4-way set associative, 32 byte line size|
|0AH|1st-level data cache: 8 KBytes, 2-way set associative, 32 byte line size|
|0CH|1st-level data cache: 16 KBytes, 4-way set associative, 32 byte line size|
|22H|3rd-level cache: 512 KBytes, 4-way set associative, 64 byte line size, 2 lines per sector|
|23H|3rd-level cache: 1 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector|
|25H|3rd-level cache: 2 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector|
|29H|3rd-level cache: 4M Bytes, 8-way set associative, 64 byte line size, 2 lines per sector|
|2CH|1st-level data cache: 32K Bytes, 8-way set associative, 64 byte line size|
|30H|1st-level instruction cache: 32K Bytes, 8-way set associative, 64 byte line size|
|40H|No 2nd-level cache or, if processor contains a valid 2nd-level cache, no 3rd-level cache|
|41H|2nd-level cache: 128 KBytes, 4-way set associative, 32 byte line size|
|42H|2nd-level cache: 256 KBytes, 4-way set associative, 32 byte line size|
|43H|2nd-level cache: 512 KBytes, 4-way set associative, 32 byte line size|
|44H|2nd-level cache: 1 MByte, 4-way set associative, 32 byte line size|
|45H|2nd-level cache: 2 MByte, 4-way set associative, 32 byte line size|
|50H|Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 64 entries|
|51H|Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 128 entries|
|52H|Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 256 entries|
|5BH|Data TLB: 4 KByte and 4 MByte pages, 64 entries|
|5CH|Data TLB: 4 KByte and 4 MByte pages,128 entries|
|5DH|Data TLB: 4 KByte and 4 MByte pages,256 entries|
|60H|1st-level data cache: 16 KByte, 8-way set associative, 64 byte line size|
|66H|1st-level data cache: 8 KByte, 4-way set associative, 64 byte line size|
|67H|1st-level data cache: 16 KByte, 4-way set associative, 64 byte line size|
|68H|1st-level data cache: 32 KByte, 4-way set associative, 64 byte line size|
|70H|Trace cache: 12 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative|
|71H|Trace cache: 16 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative|
|72H|Trace cache: 32 K-Ãï¿½âï¿½ï¿½Ãï¿½Âµop, 8-way set associative|
|78H|2nd-level cache: 1 MByte, 4-way set associative, 64byte line size|
|79H|2nd-level cache: 128 KByte, 8-way set associative, 64 byte line size, 2 lines per sector|
|7AH|2nd-level cache: 256 KByte, 8-way set associative, 64 byte line size, 2 lines per sector|
|7BH|2nd-level cache: 512 KByte, 8-way set associative, 64 byte line size, 2 lines per sector|
|7CH|2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size, 2 lines per sector|
|7DH|2nd-level cache: 2 MByte, 8-way set associative, 64byte line size|
|7FH|2nd-level cache: 512 KByte, 2-way set associative, 64-byte line size|
|82H|2nd-level cache: 256 KByte, 8-way set associative, 32 byte line size|
|83H|2nd-level cache: 512 KByte, 8-way set associative, 32 byte line size|
|84H|2nd-level cache: 1 MByte, 8-way set associative, 32 byte line size|
|85H|2nd-level cache: 2 MByte, 8-way set associative, 32 byte line size|
|86H|2nd-level cache: 512 KByte, 4-way set associative, 64 byte line size|
|87H|2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size|
|B0H|Instruction TLB: 4 KByte Pages, 4-way set associative, 128 entries|
|B3H|Data TLB: 4 KByte Pages, 4-way set associative, 128 entries|
|F0H|64-Byte Prefetching|
|F1H|128-Byte Prefetching|
|
|80000002H|EAX = 20202020H|" "|
|-|EBX = 20202020H|" "|
|-|ECX = 20202020H|" "|
|-|EDX = 6E492020H|"nI "|
|80000003H|EAX = 286C6574H|"(let"|
|-|EBX = 50202952H|"P )R"|
|-|ECX = 69746E65H|"itne"|
|-|EDX = 52286D75H|"R(mu"|
|80000004H|EAX = 20342029H|" 4 )"|
|-|EBX = 20555043H|" UPC"|
|-|ECX = 30303531H|"0051"|
|-|EDX = 007A484DH|" zHM"|
|
|00H|This processor does not support the brand identification feature|
|01H|Intel(R) Celeron(R) processor|
|02H|Intel(R) Pentium(R) III processor|
|03H|Intel(R) Pentium(R) III XeonTM processor; If processor signature = 000006B1h, then Intel(R) Celeron(R) processor|
|04H|Intel(R) Pentium(R) III processor|
|06H|Mobile Intel(R) Pentium(R) III processor-M|
|07H|Mobile Intel(R) Celeron(R) processor|
|08H|Intel(R) Pentium(R) 4 processor|
|09H|Intel(R) Pentium(R) 4 processor|
|0AH|Intel(R) Celeron(R) processor|
|0BH|Intel(R) Xeon(TM) processor; If processor signature = 00000F13h, then Intel(R) Xeon(TM) processor MP|
|0CH|Intel(R) Xeon(TM) processor MP|
|0EH|Mobile Intel(R) Pentium(R) 4 processor-M; If processor signature = 00000F13h, then Intel(R) Xeon(TM) processor|
|0FH|Mobile Intel(R) Celeron(R) processor|
|11H|Mobile Genuine Intel(R) processor|
|12H|Intel(R) Celeron(R) M processor|
|13H|Mobile Intel(R) Celeron(R) processor|
|14H|Intel(R) Celeron(R) processor|
|15H|Mobile Genuine Intel(R) processor|
|16H|Intel(R) Pentium(R) M processor|
|17H|Mobile Intel(R) Celeron(R) processor|
|18H-0FFH|RESERVED|
 
## Operation
 
```c
switch(EAX) {
	case 0:
		EAX = HighestCPUIDInput(); //highest basic function input value understood by CPUID
		EBX = VendorIdentificationString[0..3];
		EDX = VendorIdentificationString[4..7];
		ECX = VendorIdentificationString[8..11];
		break;
	case 1:
		EAX[0..3] = SteppingID;
		EAX[4..7] = Model;
		EAX[8..11] = Family;
		EAX[12..13] = ProcessorType;
		EAX[14..15] = Reserved;
		EAX[16..19] = ExtendedModel;
		EAX[20..23] = ExtendedFamily;
		EAX[24..31] = Reserved;
		EBX[0..7] = BrandIndex;
		EBX[8..15] = CLFLUSHLineSize;
		EBX[16..23] = Reserved;
		EBX[24..31] = InitialAPICID;
		ECX = ExtendedFeatureFlags;
		EDX = FeatureFlags;
		break;
	case 2:
		EAX = CacheAndTLBInformation();
		EBX = CacheAndTLBInformation(); //0
		ECX = CacheAndTLBInformation(); //0
		EDX = CacheAndTLBInformation();
		break;
	case 3:
		EAX = Reserved;
		EBX = Reserved;
#ifdef PentiumIII
		ECX = ProcessorSerialNumber[0..31];
		EDX = ProcessorSerialNumber[32..63];
#else
		ECX = Reserved;
		EDX = Reserved;
#endif
		break;
	case 4:
		EAX = DeterministicCacheParametersLeaf();
		EBX = DeterministicCacheParametersLeaf();
		ECX = DeterministicCacheParametersLeaf();
		EDX = DeterministicCacheParametersLeaf();
		break;
	case 5:
		EAX = MONITORMWAITLeaf();
		EBX = MONITORMWAITLeaf();
		ECX = MONITORMWAITLeaf();
		EDX = MONITORMWAITLeaf();
		break;
	case 0x80000000:
		EAX = HighestExtendedCPUIDInput(); //highest extended function input value understood by CPUID
		EBX = Reserved;
		ECX = Reserved;
		EDX = Reserved;
		break;
	case 0x80000001:
		EAX = ExtendedProcessorFeatureSignature; //Currently Reserved
		EBX = Reserved;
		ECX = Reserved;
		EDX = Reserved;
		break;
	case 0x80000002:
		EAX = ProcessorBrandString[0..3];
		EBX = ProcessorBrandString[4..7];
		ECX = ProcessorBrandString[8..11];
		EDX = ProcessorBrandString[12..15];
		break;
	case 0x80000003:
		EAX = ProcessorBrandString[16..19];
		EBX = ProcessorBrandString[20..23];
		ECX = ProcessorBrandString[24..27];
		EDX = ProcessorBrandString[28..31];
		break;		
	case 0x80000004:
		EAX = Reserved;
		EBX = Reserved;
		ECX = Reserved;
		EDX = Reserved;
		break;
	case 0x80000006:
		EAX = Reserved;
		EBX = Reserved;
		ECX = CacheInformation;
		EDX = Reserved;
		break;
	case 0x80000007:
		EAX = Reserved;
		EBX = Reserved;
		ECX = Reserved;
		EDX = Reserved;
		break;
	case 0x80000008:
		EAX = Reserved;
		EBX = Reserved;
		ECX = Reserved;
		EDX = Reserved;
		break;
	default: //EAX > highest value recognized by CPUID
		//undefined
		EAX = Reserved;
		EBX = Reserved;
		ECX = Reserved;
		EDX = Reserved;
		break;
}

```
 
 
## Flags affected
 
None.

 
 
## IA-32 Architecture Compatibility
 
CPUID is not supported in early models of the Intel486 processor or in any IA-32 processor earlier than the Intel486 processor.

 
 
## Exceptions
 
None.
NOTE In earlier IA-32 processors that do not support the CPUID instruction, execution of the instruction results in an invalid opcode (#UD) exception being generated.
