module.exports = {
    //=== basic configuration
    base: '/x86_ref_book_web/',
    title: 'x86 Instruction Set Reference',
    description: 'a web book of x86 instruction set reference based on vuepress',
    head: [
        ['link', {
            rel: 'icon',
            href: '/book.png'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }]
    ],
    serviceWorker: true,
    //=== default theme configuration
    themeConfig: {
        repo: 'lifedrainfrog/x86_ref_book',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit this page on Github',
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: "Refresh"
            }
        },
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated', // string | boolean
        // navbar links
        nav: [{
                text: 'Instruction ref',
                link: '/instruction/'
            },
            {
                text: 'Resources',
                items: [{
                        text: 'Wiki Book',
                        link: 'https://en.wikibooks.org/wiki/X86_Assembly'
                    },
                    {
                        text: 'felixcloutier x86 ref',
                        link: 'https://www.felixcloutier.com/x86/'
                    },
                    {
                        text: 'MazeGen x86 ref',
                        link: 'http://ref.x86asm.net/'
                    }
                ]
            }
        ],
        sidebar: {
            '/instruction/': getInstrSidebar(),
	    '/':['']
        }
    },
    //=== Markdown,
    markdown: {
        lineNumbers: true // show line numbers of the code block,
    }
}

function getInstrSidebar() {
    return [
	    {
		    title: 'Intro',
		    collapsable: false,
		    children:[
		    ''
		    ]
	    },
	    {
            title: 'A',
            collapsable: false,
            children: [
                'aaa',
                'aad',
                'aas',
                'adc',
                'add',
                'addpd',
                'addps',
                'addsd',
                'addss',
                'addsubpd',
                'addsubps',
                'and',
                'andnpd',
                'andnps',
                'andpd',
                'andps',
                'arpl',
            ]
        },
        {
            title: 'B',
            collapsable: false,
            children: [
                'bound',
                'bsf',
                'bsr',
                'bswap',
                'bt',
                'btc',
                'btr',
                'bts'
            ]
        },
        {
            title: 'C',
            collapsable: false,
            children: [
                'call',
                'cbw_cwde',
                'clc',
                'cld',
                'clflush',
                'cli ',
                'clts',
                'cmc',
                'cmovcc',
                'cmp',
                'cmppd',
                'cmpps',
                'cmpsd',
                'cmpss',
                'cmps_cmpsb_cmpsw_cmpsd',
                'cmpxchg',
                'cmpxchg8b',
                'comisd',
                'comiss',
                'cpuid',
                'cvtdq2pd',
                'cvtdq2ps',
                'cvtpd2dq',
                'cvtpd2pi',
                'cvtpd2ps',
                'cvtpi2pd',
                'cvtpi2ps',
                'cvtps2dq',
                'cvtps2pd',
                'cvtps2pi',
                'cvtsd2si',
                'cvtsd2ss',
                'cvtsi2sd',
                'cvtsi2ss',
                'cvtss2sd',
                'cvtss2si',
                'cvttpd2dq',
                'cvttpd2pi',
                'cvttps2dq',
                'cvttps2pi',
                'cvttsd2si',
                'cvttss2si',
                'cwd_cdq',
            ]
        },
        {
            title: 'D',
            collapsable: false,
            children: [
                'daa',
                'das',
                'dec',
                'div',
                'divpd',
                'divps',
                'divsd',
                'divss',
            ]
        },
        {
            title: 'E',
            collapsable: false,
            children: [
                'emms',
                'enter',
            ]
        },
        {
            title: 'F',
            collapsable: false,
            children: [
                'f2xm1',
                'fabs',
                'fadd_faddp_fiadd',
                'fbld',
                'fbstp',
                'fchs',
                'fclex_fnclex',
                'fcmovcc',
                'fcomi_fcomip_fucomi_fucomip',
                'fcom_fcomp_fcompp',
                'fcos',
                'fdecstp',
                'fdivr_fdivrp_fidivr',
                'fdiv_fdivp_fidiv',
                'ffree',
                'ficom_ficomp',
                'fild',
                'fincstp',
                'finit_fninit',
                'fisttp',
                'fist_fistp',
                'fld',
                'fld1_fldl2t_fldl2e_fldpi_fldlg2_fldln2_fldz',
                'fldcw',
                'fldenv',
                'fmul_fmulp_fimul',
                'fnop',
                'fpatan',
                'fprem',
                'fprem1',
                'fptan',
                'frndint',
                'frstor',
                'fsave_fnsave',
                'fscale',
                'fsin',
                'fsincos',
                'fsqrt',
                'fstcw_fnstcw',
                'fstenv_fnstenv',
                'fstsw_fnstsw',
                'fst_fstp',
                'fsubr_fsubrp_fisubr',
                'fsub_fsubp_fisub',
                'ftst',
                'fucom_fucomp_fucompp',
                'fxam',
                'fxch',
                'fxrstor',
                'fxsave',
                'fxtract',
                'fyl2x',
                'fyl2xp1',
            ]
        },
        {
            title: 'H',
            collapsable: false,
            children: [
                'haddpd',
                'haddps',
                'hlt',
                'hsubpd',
                'hsubps',
            ]
        },
        {
            title: 'I',
            collapsable: false,
            children: [
                'idiv',
                'imul',
                'in',
                'inc',
                'ins_insb_insw_insd',
                'int n_into_int 3',
                'invd',
                'invlpg',
                'iret_iretd',
            ]
        },
        {
            title: 'J',
            collapsable: false,
            children: [
                'jcc',
                'jmp',
            ]
        },
        {
            title: 'L',
            collapsable: false,
            children: [
                'lahf',
                'lar',
                'lddqu',
                'ldmxcsr',
                'lds_les_lfs_lgs_lss',
                'lea',
                'leave',
                'lfence',
                'lgdt_lidt',
                'lldt',
                'lmsw',
                'lock',
                'lods_lodsb_lodsw_lodsd',
                'loop_loopcc',
                'lsl',
                'ltr',
            ]
        },
        {
            title: 'M',
            collapsable: false,
            children: [
                'maskmovdqu',
                'maskmovq',
                'maxpd',
                'maxps',
                'maxsd',
                'maxss',
                'mfence',
                'minpd',
                'minps',
                'minsd',
                'minss',
                'monitor',
                'mov',
                'movapd',
                'movaps',
                'movd',
                'movddup',
                'movdq2q',
                'movdqa',
                'movdqu',
                'movhlps',
                'movhpd',
                'movhps',
                'movlhps',
                'movlpd',
                'movlps',
                'movmskpd',
                'movmskps',
                'movntdq',
                'movnti',
                'movntpd',
                'movntps',
                'movntq',
                'movq',
                'movq2dq',
                'movsd',
                'movshdup',
                'movsldup',
                'movss',
                'movsx',
                'movs_movsb_movsw_movsd',
                'movupd',
                'movups',
                'movzx',
                'mul',
                'mulpd',
                'mulps',
                'mulsd',
                'mulss',
                'mwait',
            ]
        },
        {
            title: 'N',
            collapsable: false,
            children: [
                'neg',
                'nop',
                'not',
            ]
        },
        {
            title: 'O',
            collapsable: false,
            children: [
                'or',
                'orpd',
                'orps',
                'out',
                'outs_outsb_outsw_outsd',
            ]
        },
        {
            title: 'P',
            collapsable: false,
            children: [
                'packsswb_packssdw',
                'packuswb',
                'paddb_paddw_paddd',
                'paddq',
                'paddsb_paddsw',
                'paddusb_paddusw',
                'pand',
                'pandn',
                'pause',
                'pavgb_pavgw',
                'pcmpeqb_pcmpeqw_pcmpeqd',
                'pcmpgtb_pcmpgtw_pcmpgtd',
                'pextrw',
                'pinsrw',
                'pmaddwd',
                'pmaxsw',
                'pmaxub',
                'pminsw',
                'pminub',
                'pmovmskb',
                'pmulhuw',
                'pmulhw',
                'pmullw',
                'pmuludq',
                'pop',
                'popa_popad',
                'popf_popfd',
                'por',
                'prefetchh',
                'psadbw',
                'pshufd',
                'pshufhw',
                'pshuflw',
                'pshufw',
                'pslldq',
                'psllw_pslld_psllq',
                'psraw_psrad',
                'psrldq',
                'psrlw_psrld_psrlq',
                'psubb_psubw_psubd',
                'psubq',
                'psubsb_psubsw',
                'psubusb_psubusw',
                'punpckhbw_punpckhwd_punpckhdq_punpckhqdq',
                'punpcklbw_punpcklwd_punpckldq_punpcklqdq',
                'push',
                'pusha_pushad',
                'pushf_pushfd',
                'pxor',
            ]
        },
        {
            title: 'R',
            collapsable: false,
            children: [
                'rcl_rcr_rol_ror',
                'rcpps',
                'rcpss',
                'rdmsr',
                'rdpmc',
                'rdtsc',
                'rep_repe_repz_repne_repnz',
                'ret',
                'rsm',
                'rsqrtps',
                'rsqrtss',
            ]
        },
        {
            title: 'S',
            collapsable: false,
            children: [
                'sahf',
                'sal_sar_shl_shr',
                'sbb',
                'scas_scasb_scasw_scasd',
                'setcc',
                'sfence',
                'sgdt',
                'shld',
                'shrd',
                'shufpd',
                'shufps',
                'sidt',
                'sldt',
                'smsw',
                'sqrtpd',
                'sqrtps',
                'sqrtsd',
                'sqrtss',
                'stc',
                'std',
                'sti',
                'stmxcsr',
                'stos_stosb_stosw_stosd',
                'str',
                'sub',
                'subpd',
                'subps',
                'subsd',
                'subss',
                'sysenter',
                'sysexit',
            ]
        },
        {
            title: 'T',
            collapsable: false,
            children: [
                'test'
            ]
        },
        {
            title: 'U',
            collapsable: false,
            children: [
                'ucomisd',
                'ucomiss',
                'ud2',
                'unpckhpd',
                'unpckhps',
                'unpcklpd',
                'unpcklps'
            ]
        },
        {
            title: 'V',
            collapsable: false,
            children: [
                'verr_verw'
            ]
        },
        {
            title: 'W',
            collapsable: false,
            children: [
                'wait_fwait',
                'wbinvd',
                'wrmsr'
            ]
        },
        {
            title: 'X',
            collapsable: false,
            children: [
                'xadd',
                'xchg',
                'xlat_xlatb',
                'xor',
                'xorpd',
                'xorps'
            ]
        }
    ]
}
