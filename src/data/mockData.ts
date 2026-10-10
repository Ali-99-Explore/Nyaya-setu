import {
  StructuredLegalResponse,
  DocumentAnalysisResult,
  LawyerProfile,
  CaseRecord,
  LawArticle,
  JudgmentBrief,
  StudentNote,
  EBook,
  MootScenario,
  AppNotification,
  ConsultationRequest
} from '../types';

export const AI_SAMPLE_RESPONSES: Record<string, StructuredLegalResponse> = {
  'landlord_vacate': {
    plainExplanation:
      'In Telangana, a landlord cannot forcefully evict a tenant without following statutory due process. If you have a valid tenancy agreement, the landlord must issue a formal written notice (typically 15 to 30 days depending on agreement terms or Section 106 of the Transfer of Property Act) stating valid grounds such as default in rent, bona fide self-requirement, or expiry of lease.',
    nextSteps: [
      'Check your current lease agreement for the notice period clause (usually 30 days).',
      'Ensure you have payment receipts or bank transaction records for all rent payments up to date.',
      'Respond in writing (or via registered post/email) denying unlawful summary eviction while citing lease terms.',
      'If faced with physical threats or illegal disconnection of water/electricity, file a representation at the local Police Station or approach the Rent Controller (City Civil Court / Munsif Court).'
    ],
    documentChecklist: [
      'Signed Residential/Commercial Rental Agreement',
      'Bank statements or UPI receipts showing rent payments',
      'Electricity / water bill receipts showing possession',
      'Copy of notice received from the landlord',
      'Written correspondence or WhatsApp messages'
    ],
    legalConcepts: [
      {
        term: 'Sec 106 Transfer of Property Act 1882',
        explanation: 'Mandates formal 15 days notice for month-to-month tenancies or as agreed contractually.'
      },
      {
        term: 'Telangana Buildings (Lease, Rent & Eviction) Control Act',
        explanation: 'Protects tenants against arbitrary eviction and unauthorized utility disconnections.'
      },
      {
        term: 'Bona Fide Requirement',
        explanation: 'A genuine, good-faith personal requirement proven by the property owner in court.'
      }
    ],
    sourceReferences: [
      'Transfer of Property Act, 1882, Section 106',
      'Supreme Court of India: Anthony v. K.C. Ittoop & Sons (2000)',
      'Telangana Buildings (Lease, Rent and Eviction) Control Act, 1960'
    ]
  },
  'salary_unpaid': {
    plainExplanation:
      'Non-payment or arbitrary withholding of wages is a violation of the Payment of Wages Act, 1936 and the Telangana Shops and Establishments Act, 1988 (for private and IT companies). Employers are legally bound to disburse earned wages by the 7th or 10th day of the succeeding month.',
    nextSteps: [
      'Send a formal demand email to HR and Management attaching your offer letter and timesheets.',
      'If unanswered after 7 business days, prepare a statutory Demand Notice via a legal advocate.',
      'File an online grievance with the Telangana Labour Department portal (labour.telangana.gov.in).',
      'For claim amounts, an application can be filed before the Authority under Section 15 of Payment of Wages Act.'
    ],
    documentChecklist: [
      'Appointment Letter / Employment Contract',
      'Monthly Salary Slips for previous months',
      'Bank statement showing salary credits and current deficit',
      'Biometric / timesheet attendance records or company email proof',
      'Copy of resignation / relieve communications if applicable'
    ],
    legalConcepts: [
      {
        term: 'Section 15, Payment of Wages Act',
        explanation: 'Empowers employees to seek delayed wages along with statutory compensation up to 10x.'
      },
      {
        term: 'Telangana Shops and Establishments Act, 1988',
        explanation: 'Applies to commercial establishments, IT firms, and shops within Telangana state.'
      }
    ],
    sourceReferences: [
      'Payment of Wages Act, 1936, Section 5 & 15',
      'Telangana Shops and Establishments Act, 1988, Section 37'
    ]
  },
  'legal_notice': {
    plainExplanation:
      'Receiving a legal notice is not a court judgment; it is a formal pre-litigation communication sent on behalf of another party setting out their grievance and demands. A structured, factual written response within the stipulated time limit (usually 15 days) prevents adverse inferences in future litigation.',
    nextSteps: [
      'Note the exact date of receipt and calculating the reply deadline immediately.',
      'Do not panic and avoid making informal phone calls admitting liability without counsel.',
      'Segregate facts into: (a) admitted facts, (b) denied claims, and (c) counter-explanations.',
      'Draft and dispatch a formal reply through a registered advocate to create an official rebuttal record.'
    ],
    documentChecklist: [
      'Original envelope showing speed post / tracking consignment number',
      'Complete copy of the received notice with annexures',
      'All underlying agreements, receipts, invoices, or message logs referenced in the notice',
      'Identification proof of recipient'
    ],
    legalConcepts: [
      {
        term: 'Adverse Inference',
        explanation: 'If a formal notice is left unanswered, a court may assume you had no valid defence.'
      },
      {
        term: 'Notice Period',
        explanation: 'The designated window specified in the notice before the sender initiates civil or criminal court action.'
      }
    ],
    sourceReferences: [
      'Code of Civil Procedure, 1908, Order VI (Pleadings)',
      'Indian Evidence Act, 1872 / Bharatiya Sakshya Adhiniyam, 2023'
    ]
  },
  'consumer_complaint': {
    plainExplanation:
      'Under the Consumer Protection Act, 2019, any individual who buys goods or hires services for personal use can file a grievance against defective products, deficient services, or misleading advertisements before the District Consumer Commission.',
    nextSteps: [
      'Gather invoice, warranty card, and proof of defective service or product failure.',
      'Send a formal grievance to customer care / nodal officer giving 7 days to rectify or refund.',
      'If unresolved, file an e-daakhil complaint online (edaakhil.nic.in) or visit your District Consumer Disputes Redressal Commission (e.g. Hyderabad District Commission at Chandra Vihar Complex, M.J. Road).',
      'Claim compensation for financial loss, mental agony, and litigation expenses.'
    ],
    documentChecklist: [
      'Original Retail Tax Invoice / Cash Receipt',
      'Proof of online payment / transaction reference',
      'Photographs or video proof of defective product',
      'Email communications with customer service tickets',
      'Aadhaar / ID copy of complainant'
    ],
    legalConcepts: [
      {
        term: 'Pecuniary Jurisdiction',
        explanation: 'District Commission handles claims up to ₹50 Lakhs; State Commission handles ₹50 Lakhs to ₹2 Crores.'
      },
      {
        term: 'Deficiency in Service',
        explanation: 'Any fault, imperfection, or inadequacy in quality, nature, and manner of performance required by law or contract.'
      }
    ],
    sourceReferences: [
      'Consumer Protection Act, 2019, Section 35 & Section 38',
      'Telangana State Consumer Disputes Redressal Commission Guidelines'
    ]
  },
  'police_notice': {
    plainExplanation:
      'A police notice (traditionally under Section 41A CrPC / now Section 35 of the Bharatiya Nagarik Suraksha Sanhita, 2023) is a formal summons requiring an individual to appear before an Investigating Officer (IO) for inquiry in an offence punishable with up to 7 years imprisonment. It is designed to prevent unnecessary arrest as long as the recipient complies.',
    nextSteps: [
      'Confirm the Police Station name, Crime / FIR Number, and Investigating Officer details from the notice.',
      'You are entitled to be accompanied by an advocate during examination within hearing distance.',
      'Cooperate with the inquiry and request an official acknowledgment / attendance slip from the IO.',
      'If you apprehend custodial torture or illegal detention, move for Anticipatory Bail before the Sessions Court or Telangana High Court.'
    ],
    documentChecklist: [
      'Original copy of Section 35 BNSS / 41A CrPC Notice',
      'Aadhaar / Voter ID proof for verification',
      'Any documentary evidence establishing your alibi or legitimate business dealing',
      'Written representation prepared with legal counsel'
    ],
    legalConcepts: [
      {
        term: 'Arnesh Kumar Guidelines',
        explanation: 'Mandate by Supreme Court preventing routine arrest for offences carrying sentence under 7 years.'
      },
      {
        term: 'Section 35 BNSS (formerly 41A CrPC)',
        explanation: 'Statutory notice of appearance issued in lieu of immediate physical custodial arrest.'
      }
    ],
    sourceReferences: [
      'Supreme Court of India: Arnesh Kumar v. State of Bihar (2014)',
      'Bharatiya Nagarik Suraksha Sanhita, 2023, Section 35'
    ]
  }
};

export const SAMPLE_DOCUMENT_ANALYSIS: DocumentAnalysisResult = {
  id: 'doc_jubilee_tenancy_notice',
  title: 'Advocate Demand Notice — Jubilee Hills Tenancy',
  documentType: 'Legal Notice under Section 106 Transfer of Property Act',
  uploadDate: '2026-10-08',
  originalText: `FROM:
Adv. G. Rama Murthy, B.Com., LL.B.
Advocate, High Court of Telangana
Chamber No. 12, High Court Complex, Hyderabad - 500066

TO:
Sri K. Venkat Reddy, S/o Late K. Narsimha Reddy,
Flat No. 402, Sai Vihar Apartments, Road No. 36, Jubilee Hills, Hyderabad - 500033

SUBJECT: LEGAL NOTICE UNDER SECTION 106 OF THE TRANSFER OF PROPERTY ACT, 1882 DETERMINING TENANCY AND CALLING UPON TO VACATE PREMISES WITHIN 15 DAYS

Under instructions from my client Sri P. Madhusudhan Rao, owner and landlord of Residential Flat No. 402, Sai Vihar Apartments, Jubilee Hills, Hyderabad:

1. You entered into a registered lease agreement dated 15th January 2024 for a period of 11 months on a monthly rent of Rs. 38,000/- payable on or before 5th of every month.
2. The said tenancy expired on 14th December 2024, and you have failed to pay the agreed monthly maintenance charges for the months of August and September 2026 amounting to Rs. 9,400/-.
3. My client has bona fide requirement of the schedule property for occupation by his son returning from abroad.
4. TAKE NOTICE that my client hereby determines your tenancy upon the expiration of 15 (fifteen) clear days from the date of receipt of this notice, and calls upon you to deliver vacant, peaceful physical possession along with arrears of maintenance.
5. In default, my client shall initiate an Eviction Petition before the Learned City Civil Court at Hyderabad and claim damages at Rs. 2,500/- per day for unauthorized occupation.`,
  summary:
    'A formal legal notice sent on behalf of landlord P. Madhusudhan Rao regarding Flat 402, Jubilee Hills. The notice claims expired lease tenure, alleged unpaid maintenance dues (₹9,400 for Aug-Sep 2026), and asserts personal bona fide requirement. Demands complete handover of vacant possession within 15 calendar days.',
  importantDates: [
    {
      label: 'Notice Dispatch Date',
      date: '2026-10-06',
      significance: 'Date of posting; marks starting baseline for 15-day statutory timeline.'
    },
    {
      label: '15-Day Eviction Deadline',
      date: '2026-10-21',
      significance: 'Expiry date after which landlord threatens filing civil eviction suit in City Civil Court.'
    },
    {
      label: 'Original Agreement Inception',
      date: '2024-01-15',
      significance: 'Establishes registered lease baseline and mutually agreed terms.'
    }
  ],
  rightsAndObligations: [
    {
      party: 'Tenant (Recipient)',
      rights: [
        'Right to statutory notice and reasonable quiet enjoyment without physical harassment.',
        'Right to dispute incorrect maintenance calculations if already paid via UPI / receipt.',
        'Right to refund of security deposit (typically 2-3 months) upon settlement of possession.'
      ],
      obligations: [
        'Obligation to submit a written rebuttal within 15 days if claims are disputed.',
        'Obligation to clear legitimate undisputed rental/maintenance arrears.'
      ]
    },
    {
      party: 'Landlord (Claimant)',
      rights: [
        'Right to seek eviction through court of competent jurisdiction on legitimate grounds.'
      ],
      obligations: [
        'Cannot forcefully lock doors, disconnect power, or seize belongings without court decree.',
        'Must account for the initial refundable caution deposit held.'
      ]
    }
  ],
  relevantProvisions: [
    {
      act: 'Transfer of Property Act, 1882',
      section: 'Section 106',
      description: 'Requirements for termination of leases; mandates minimum 15 days written notice for residential properties.'
    },
    {
      act: 'Telangana Buildings (Lease, Rent and Eviction) Control Act, 1960',
      section: 'Section 10',
      description: 'Protects tenants from arbitrary eviction and governs bona fide requirement claims.'
    },
    {
      act: 'Specific Relief Act, 1963',
      section: 'Section 6',
      description: 'Allows an illegally dispossessed tenant to recover possession through summary suit within 6 months.'
    }
  ],
  suggestedNextSteps: [
    {
      step: 'Audit UPI & Bank Transaction records for maintenance payments of Aug & Sep 2026.',
      priority: 'Immediate',
      timeline: 'Within 48 hours'
    },
    {
      step: 'Prepare written response rebutting the 15-day notice and proposing a reasonable mutual extension if required.',
      priority: 'Within 7 Days',
      timeline: 'Before 2026-10-15'
    },
    {
      step: 'Demand accounting and adjustment against Security Deposit of ₹1,14,000/- held by landlord.',
      priority: 'Within 15 Days',
      timeline: 'Before 2026-10-21'
    }
  ],
  evidenceChecklist: [
    { item: 'Registered Rental Agreement Copy', description: 'Check clause 8 on notice period and security deposit clauses.', recommended: true },
    { item: 'Maintenance Receipts / Society Bank Statement', description: 'Prove that society maintenance was paid directly or disputed due to broken amenities.', recommended: true },
    { item: 'WhatsApp & Email Logs with Landlord', description: 'Evidence of informal mutual extensions or discussions regarding son returning.', recommended: true },
    { item: 'Postal Speed Post Acknowledgment Slip', description: 'Record the exact delivery date stamped by India Post.', recommended: true }
  ],
  draftResponse: `To:
Adv. G. Rama Murthy, Advocate
Chamber No. 12, High Court Complex, Hyderabad

RE: REPLY TO UNFOUNDED LEGAL NOTICE DATED 06.10.2026 ON BEHALF OF SRI K. VENKAT REDDY

Sir,
Under instructions from my client Sri K. Venkat Reddy, tenant of Flat No. 402, Sai Vihar Apartments, Jubilee Hills, Hyderabad, I hereby reply to your notice as follows:

1. The assertions in paragraph 2 alleging unpaid maintenance charges of Rs. 9,400/- are factually erroneous. The payment for August 2026 was transferred directly to the Apartment Association via UPI Ref: 62891048201 on 04.08.2026.
2. Following the expiry of the initial 11-month term, your client continued accepting monthly rental payments by mutual consent, thereby constituting a month-to-month tenancy protected under the law.
3. My client holds a valid refundable security deposit of Rs. 1,14,000/- with your client, which has not been accounted for in your notice.
4. In the interest of cordial relations, my client is willing to hand over vacant possession upon mutual accounting and simultaneous refund of the full security deposit by 30th November 2026. Any unilateral attempt to disturb quiet possession will invite immediate injunctive relief before the competent Civil Court.

Yours faithfully,
Advocate for Tenant`,
  isSimulated: true
};

export const MOCK_LAWYERS: LawyerProfile[] = [
  {
    id: 'lawyer_1',
    name: 'Adv. K. Srinivas Rao',
    title: 'Senior Advocate · High Court of Telangana',
    barCouncilNo: 'TS/1420/2011',
    experienceYears: 15,
    practiceAreas: ['Property & Tenancy', 'Civil Litigation', 'Land Title Disputes'],
    languages: ['Telugu', 'English', 'Hindi'],
    education: 'LL.M. (Osmania University), B.A. LL.B.',
    location: 'High Court Chambers, Hyderabad / Jubilee Hills',
    consultationModes: ['In-person', 'Video consultation'],
    feeDisplay: '₹1,500 / consultation (Initial advice)',
    bio: 'Over 15 years representing clients across Telangana in civil title verification, tenancy matters, and property partitions before the High Court and District Courts.',
    verifiedStatus: 'verified'
  },
  {
    id: 'lawyer_2',
    name: 'Adv. Anuradha Varma',
    title: 'Advocate · Cyberabad Courts & NCLT',
    barCouncilNo: 'TS/2890/2016',
    experienceYears: 9,
    practiceAreas: ['Cybercrime & IT Law', 'Employment Disputes', 'Consumer Rights'],
    languages: ['English', 'Telugu', 'Hindi'],
    education: 'LL.B. (NALSAR Hyderabad), B.Tech IT',
    location: 'HITEC City, Madhapur, Hyderabad',
    consultationModes: ['Video consultation', 'In-person', 'Phone call'],
    feeDisplay: '₹1,200 / consultation',
    bio: 'Specialized in technology law, cyber fraud recovery, unpaid wage disputes in IT companies, and consumer grievances across Hyderabad and Cyberabad.',
    verifiedStatus: 'verified'
  },
  {
    id: 'lawyer_3',
    name: 'Adv. Mohammed Imran Ali',
    title: 'Advocate · Criminal & Bail Specialist',
    barCouncilNo: 'TS/0874/2014',
    experienceYears: 12,
    practiceAreas: ['Criminal Defense', 'Police Notices (Sec 35 BNSS)', 'Bail Matters'],
    languages: ['Urdu', 'English', 'Telugu', 'Hindi'],
    education: 'LL.B. (Kakatiya University, Warangal)',
    location: 'Nampally Criminal Courts & Secunderabad',
    consultationModes: ['In-person', 'Phone call'],
    feeDisplay: '₹1,000 / consultation',
    bio: 'Focuses on criminal inquiries, Section 41A/35 BNSS notice assistance, regular & anticipatory bails, and constitutional protection against wrongful detention.',
    verifiedStatus: 'verified'
  },
  {
    id: 'lawyer_4',
    name: 'Adv. S. Prameela Reddy',
    title: 'Advocate · Family & Legal Aid Panelist',
    barCouncilNo: 'TS/3105/2018',
    experienceYears: 7,
    practiceAreas: ['Family Law', "Women's Rights", 'Domestic Violence Act'],
    languages: ['Telugu', 'English'],
    education: 'B.A. LL.B. (Telangana University)',
    location: 'City Civil Court, Purani Haveli & L.B. Nagar',
    consultationModes: ['In-person', 'Video consultation'],
    feeDisplay: '₹800 / consultation (Free for Legal Aid eligible)',
    bio: 'Empanelled with Telangana State Legal Services Authority. Dedicated to matrimonial mediation, DV Act remedies, and maintenance under Section 125 CrPC / BNSS.',
    verifiedStatus: 'verified'
  },
  {
    id: 'lawyer_5',
    name: 'Adv. V. Karthik',
    title: 'Advocate · Consumer Protection & Banking',
    barCouncilNo: 'TS/4921/2020',
    experienceYears: 5,
    practiceAreas: ['Consumer Rights', 'Cheque Bounce (Sec 138)', 'Insurance Claims'],
    languages: ['Telugu', 'English', 'Hindi'],
    education: 'LL.B. (Osmania University)',
    location: 'Kukatpally & Medchal District Court',
    consultationModes: ['Video consultation', 'Phone call'],
    feeDisplay: '₹750 / consultation',
    bio: 'Passionate advocate helping consumers fight against real estate builders, medical negligence, insurance rejections, and Section 138 NI Act notices.',
    verifiedStatus: 'verified'
  }
];

export const MOCK_CASES: CaseRecord[] = [
  {
    id: 'case_1',
    caseNumber: 'OS/412/2025',
    title: 'K. Venkat Reddy vs P. Madhusudhan Rao',
    court: 'City Civil Court, Hyderabad',
    judge: 'Hon’ble V Senior Civil Judge, Hyderabad',
    courtroom: 'Court Hall No. 7, Purani Haveli',
    petitioner: 'K. Venkat Reddy (Tenant)',
    respondent: 'P. Madhusudhan Rao (Landlord)',
    stage: 'Written Statement & Issues Framing',
    nextHearingDate: '2026-10-24',
    status: 'Active',
    timeline: [
      {
        id: 'tl_1',
        date: '2025-11-12',
        stage: 'Institution of Suit',
        business: 'Plaint filed under Section 38 Specific Relief Act for permanent injunction.',
        nextDate: '2025-12-15'
      },
      {
        id: 'tl_2',
        date: '2025-12-15',
        stage: 'Summons Service',
        business: 'Summons served upon Respondent. Notice of IA for status quo ordered.',
        nextDate: '2026-02-18'
      },
      {
        id: 'tl_3',
        date: '2026-02-18',
        stage: 'Interim Injunction Order',
        business: 'Interim status quo granted directing respondent not to dispossess without due process.',
        orderSummary: 'Order on IA 1/2025: Parties directed to maintain status quo as to possession.',
        nextDate: '2026-06-10'
      },
      {
        id: 'tl_4',
        date: '2026-06-10',
        stage: 'Respondent Appearance',
        business: 'Respondent counsel filed vakalatnama. Time granted for counter and written statement.',
        nextDate: '2026-10-24'
      }
    ],
    documents: [
      { name: 'Plaint_OS_412_2025.pdf', date: '2025-11-12', size: '2.4 MB' },
      { name: 'Interim_Order_Status_Quo.pdf', date: '2026-02-18', size: '890 KB' },
      { name: 'Vakalatnama_Copy.pdf', date: '2026-06-10', size: '420 KB' }
    ],
    lawyerNotes: 'Prepare reply counter to landlord’s IA questioning rent calculation. Keep UPI ledger ready for next date.',
    isFictionalDemo: true
  },
  {
    id: 'case_2',
    caseNumber: 'CC/108/2026',
    title: 'Ananya Sharma vs Star Health Insurance Ltd',
    court: 'District Consumer Disputes Redressal Commission-I, Hyderabad',
    judge: 'President & Members, DCDRC-I',
    courtroom: 'Bench 1, Chandra Vihar Complex, M.J. Road, Hyderabad',
    petitioner: 'Ananya Sharma (Complainant)',
    respondent: 'Star Health & Allied Insurance Co Ltd (Opposite Party)',
    stage: 'Evidence of Complainant',
    nextHearingDate: '2026-11-04',
    status: 'Active',
    timeline: [
      {
        id: 'tl_21',
        date: '2026-03-05',
        stage: 'Complaint Admitted',
        business: 'Complaint admitted under Sec 35 Consumer Protection Act 2019. Notice issued to OP.',
        nextDate: '2026-05-14'
      },
      {
        id: 'tl_22',
        date: '2026-05-14',
        stage: 'Written Version Filed',
        business: 'Opposite Party filed written version pleading exclusion clause 4.2.',
        nextDate: '2026-08-20'
      },
      {
        id: 'tl_23',
        date: '2026-08-20',
        stage: 'Rejoinder & Evidence Affidavit',
        business: 'Rejoinder filed by complainant rebutting exclusion clause applicability.',
        nextDate: '2026-11-04'
      }
    ],
    documents: [
      { name: 'Consumer_Complaint_CC108.pdf', date: '2026-03-05', size: '1.8 MB' },
      { name: 'Hospital_Discharge_Summary.pdf', date: '2026-03-05', size: '3.1 MB' },
      { name: 'Repudiation_Letter.pdf', date: '2026-03-05', size: '540 KB' }
    ],
    lawyerNotes: 'Rely on Supreme Court precedent in Gurshinder Singh (2020) regarding hyper-technical repudiations.',
    isFictionalDemo: true
  },
  {
    id: 'case_3',
    caseNumber: 'WP/18920/2025',
    title: 'M/s Deccan Green Farms vs State of Telangana & 3 Others',
    court: 'High Court for the State of Telangana',
    judge: 'Hon’ble Justice C.V. Bhaskar Rao',
    courtroom: 'Court Hall 4, High Court Main Building',
    petitioner: 'M/s Deccan Green Farms (Rep by Partner)',
    respondent: 'District Collector, Medchal-Malkajgiri & Revenue Officials',
    stage: 'Final Arguments',
    nextHearingDate: '2026-10-18',
    status: 'Active',
    timeline: [
      {
        id: 'tl_31',
        date: '2025-07-22',
        stage: 'Writ Petition Registered',
        business: 'Notice before admission issued. Status quo on survey boundaries granted.',
        nextDate: '2025-09-30'
      },
      {
        id: 'tl_32',
        date: '2026-01-14',
        stage: 'Counter Affidavit of State',
        business: 'Government Pleader for Revenue filed counter affidavit with village pahani extract.',
        nextDate: '2026-04-28'
      },
      {
        id: 'tl_33',
        date: '2026-04-28',
        stage: 'Arguments Part-Heard',
        business: 'Petitioner counsel argued on Dharani portal mutation rectification.',
        nextDate: '2026-10-18'
      }
    ],
    documents: [
      { name: 'Writ_Petition_WP18920.pdf', date: '2025-07-22', size: '4.6 MB' },
      { name: 'Pahani_Survey_Map_1978.pdf', date: '2026-01-14', size: '6.2 MB' }
    ],
    lawyerNotes: 'Highlight Telangana Rights in Land and Pattadar Pass Books Act, 2020 provisions.',
    isFictionalDemo: true
  }
];

export const LAW_LIBRARY_ARTICLES: LawArticle[] = [
  {
    id: 'art_rental',
    category: 'Rental and Housing',
    title: 'Tenant Rights Against Unlawful Eviction in Telangana',
    summary: 'Everything a tenant needs to know about notice periods, security deposits, and protection from arbitrary utility cut-offs in Hyderabad.',
    plainExplanation:
      'In Telangana, residential tenants cannot be evicted through brute force, changing locks, or disconnecting electricity and water supply. Even if the rent agreement has expired, landlords must give formal notice (minimum 15 days or contractual period) and obtain an eviction decree from the competent Civil Court or Rent Controller. Disconnecting utilities is a punishable offence.',
    relevantSections: [
      {
        act: 'Transfer of Property Act, 1882',
        section: 'Section 106',
        text: 'Leases of immovable property not for agricultural or manufacturing purposes shall be deemed to be month to month terminable by 15 days notice.'
      },
      {
        act: 'Telangana Buildings (Lease, Rent & Eviction) Control Act, 1960',
        section: 'Section 14',
        text: 'Landlord shall not without reasonable cause cut off or withhold any essential supply or service enjoyed by the tenant.'
      }
    ],
    practicalExample:
      'Ravi is a software professional in Kondapur whose landlord locked the main gate demanding 40% immediate rent hike. Ravi filed a police complaint with evidence of UPI rental receipts and a petition before the Rent Controller. The landlord was ordered to restore access immediately.',
    nextSteps: [
      'Store digital copies of registered lease agreements and all transaction slips.',
      'If landlord threatens summary eviction, issue a reply notice through an advocate.',
      'Approach the local police station if physical harassment occurs to file a GD entry.'
    ],
    sourceInfo: 'Transfer of Property Act, 1882 and Telangana Rent Control Precedents (Demonstration summary).',
    readingTimeMinutes: 4
  },
  {
    id: 'art_consumer',
    category: 'Consumer Rights',
    title: 'Filing Defective Goods & Online Fraud Complaints in Consumer Courts',
    summary: 'A step-by-step citizen guide to e-daakhil filing, builder delay remedies, and compensation for defective appliances in Telangana.',
    plainExplanation:
      'The Consumer Protection Act, 2019 allows any purchaser of goods or services to approach the District Consumer Disputes Redressal Commission without complex court fees or mandatory advocates. Consumers can claim full refunds, replacement of goods, and additional punitive compensation for mental agony.',
    relevantSections: [
      {
        act: 'Consumer Protection Act, 2019',
        section: 'Section 2(11)',
        text: 'Deficiency means any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance.'
      },
      {
        act: 'Consumer Protection Act, 2019',
        section: 'Section 35',
        text: 'Manner in which a consumer complaint shall be filed before the District Commission, including electronic filing (e-daakhil).'
      }
    ],
    practicalExample:
      'Pooja in Secunderabad purchased an air conditioner that leaked water within 10 days. The manufacturer refused repair citing void warranty. Pooja filed on edaakhil.nic.in with pictures and receipts; the District Commission awarded a refund of ₹42,000 plus ₹10,000 compensation.',
    nextSteps: [
      'Preserve tax invoice, delivery chalans, and warranty cards.',
      'Send a final 7-day registered notice/email to the company nodal officer.',
      'File online at e-daakhil with complainant identity verification.'
    ],
    sourceInfo: 'Consumer Protection Act, 2019 & NCDRC Guidelines (Demonstration summary).',
    readingTimeMinutes: 5
  },
  {
    id: 'art_employment',
    category: 'Wages and Employment',
    title: 'Delayed Salaries & Full-and-Final Settlements in IT & Private Firms',
    summary: 'Statutory timelines for wage disbursement, gratuity eligibility, and resolving withheld experience letters in Telangana.',
    plainExplanation:
      'Private employers, including IT companies in Cyberabad, are bound by the Telangana Shops and Establishments Act, 1988 and the Payment of Wages Act. Employers cannot unilaterally withhold salary as "penalty" for resignations or delay full & final settlement beyond 30 days without lawful justification.',
    relevantSections: [
      {
        act: 'Telangana Shops and Establishments Act, 1988',
        section: 'Section 37',
        text: 'All accumulated wages, terminal dues, and compensation must be disbursed within statutory timelines upon termination or resignation.'
      },
      {
        act: 'Payment of Gratuity Act, 1972',
        section: 'Section 4',
        text: 'Gratuity is payable to an employee on the termination of their employment after they have rendered continuous service for not less than five years.'
      }
    ],
    practicalExample:
      'Suresh resigned from a consultancy in Gachibowli with 2 months notice. The firm withheld his final month salary and experience letter. He lodged an online complaint before the Deputy Commissioner of Labour at RTC X Roads, Hyderabad, following which the employer cleared dues within 14 days.',
    nextSteps: [
      'Document your formal notice period email and acceptance acknowledgement.',
      'Send a formal grievance to HR quoting Section 37 of Telangana Shops & Est Act.',
      'Lodge a petition before the Labour Officer, Hyderabad Division.'
    ],
    sourceInfo: 'Telangana Labour Code Regulations (Demonstration summary).',
    readingTimeMinutes: 4
  },
  {
    id: 'art_police',
    category: 'Police Matters',
    title: 'Understanding Police Notices (Sec 35 BNSS / Sec 41A CrPC)',
    summary: 'What to do when summoned by Telangana Police, your rights during examination, and protection against arbitrary arrest.',
    plainExplanation:
      'When an FIR or complaint is registered for an offence carrying a punishment up to 7 years imprisonment, police cannot arrest an accused immediately. The Investigating Officer must serve a written Notice of Appearance (Sec 35 BNSS / 41A CrPC). As long as you appear and cooperate, you cannot be arrested without prior written magistrate approval.',
    relevantSections: [
      {
        act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
        section: 'Section 35',
        text: 'Notice of appearance before police officer in all cases where arrest of a person is not required under sub-section (1).'
      },
      {
        act: 'Supreme Court Landmark Ruling',
        section: 'Arnesh Kumar v. State of Bihar',
        text: 'Police officers shall not automatically arrest accused persons without satisfying conditions under the Code; non-compliance invites departmental inquiry and contempt.'
      }
    ],
    practicalExample:
      'Venkat received a notice from Jubilee Hills Police Station regarding a civil commercial dispute. Instead of evading, he engaged an advocate, appeared on the appointed date with bank statements, and obtained an acknowledgment of appearance without being detained.',
    nextSteps: [
      'Verify the Crime Number and name of the investigating officer.',
      'Prepare a written statement under advocate guidance.',
      'Always insist on a written endorsement of appearance on your copy of the notice.'
    ],
    sourceInfo: 'Bharatiya Nagarik Suraksha Sanhita, 2023 & Supreme Court Guidelines (Demonstration summary).',
    readingTimeMinutes: 6
  },
  {
    id: 'art_cyber',
    category: 'Cybercrime',
    title: 'Immediate Action Plan for UPI, OTP & Cyber Financial Fraud',
    summary: 'How to trigger the 1930 Helpline golden hour freeze and file grievances with Telangana Cyber Security Bureau (TGCSB).',
    plainExplanation:
      'If you lose money through fraudulent UPI links, unauthorized OTP withdrawals, or fake investment tasks, the first 2 hours are the "Golden Hour". Dialing the national helpline 1930 immediately alerts the Citizen Financial Cyber Fraud Reporting System to freeze fraudulent recipient accounts before cash is withdrawn at ATMs.',
    relevantSections: [
      {
        act: 'Information Technology Act, 2000',
        section: 'Section 66D',
        text: 'Punishment for cheating by personation by using computer resource (up to 3 years imprisonment and fine).'
      },
      {
        act: 'Bharatiya Nyaya Sanhita, 2023',
        section: 'Section 318(4)',
        text: 'Cheating and dishonestly inducing delivery of property.'
      }
    ],
    practicalExample:
      'Deepa clicked an SMS link purporting to update electricity KYC and lost ₹85,000 from her bank account. Within 20 minutes she called 1930 and logged into cybercrime.gov.in. TGCSB froze ₹72,000 in the beneficiary account in Kolkata.',
    nextSteps: [
      'Call 1930 immediately and note down the acknowledgment ticket number.',
      'Report simultaneously on cybercrime.gov.in and notify your home bank branch to freeze debit card/UPI.',
      'Visit your local Cyber Crime Police Station (e.g. Cyberabad Cyber Police, Gachibowli).'
    ],
    sourceInfo: 'Telangana Cyber Security Bureau & Ministry of Home Affairs (Demonstration summary).',
    readingTimeMinutes: 5
  },
  {
    id: 'art_legal_aid',
    category: 'Legal Aid',
    title: 'Free Legal Aid Schemes: TSSLSA & District Legal Services Authorities',
    summary: 'Who qualifies for free legal representation, Lok Adalat dispute resolution, and panel advocate assistance in Telangana.',
    plainExplanation:
      'Under the Legal Services Authorities Act, 1987, free legal aid is a fundamental right. Women, children, SC/ST citizens, industrial workers, persons in custody, and individuals with annual income below ₹3,00,000 in Telangana are entitled to a court-appointed advocate and exemption from court fees.',
    relevantSections: [
      {
        act: 'Legal Services Authorities Act, 1987',
        section: 'Section 12',
        text: 'Criteria for giving legal services to eligible persons, including women, minors, custody inmates, and low-income citizens.'
      }
    ],
    practicalExample:
      'Laxmi, a domestic worker from Warangal, required legal support to claim child maintenance. She visited the District Legal Services Authority (DLSA) at Warangal Court. DLSA assigned a qualified advocate who handled the court proceedings free of charge.',
    nextSteps: [
      'Visit the DLSA office at your District Court complex or call the national toll-free helpline 15100.',
      'Carry proof of income (Ration Card / Income Certificate) or identity document.',
      'Fill the simplified legal aid application form in Telugu or English.'
    ],
    sourceInfo: 'Telangana State Legal Services Authority (TSSLSA) Guidelines (Demonstration summary).',
    readingTimeMinutes: 4
  }
];

export const MOCK_JUDGMENTS: JudgmentBrief[] = [
  {
    id: 'judg_1',
    title: 'P. Satyanarayana Murthy vs District Collector, Hyderabad & Others',
    citation: '2024 (3) ALD 412 (HC-TS)',
    court: 'High Court for the State of Telangana',
    date: '2024-04-18',
    bench: 'Hon’ble Justice P. Naveen Rao & Hon’ble Justice J. Sreenivas Rao',
    subject: 'Property Law & Revenue Records',
    quickBrief: 'Held that entries in Dharani portal cannot extinguish pre-existing registered sale deeds or title without statutory notice and quasi-judicial inquiry.',
    facts: [
      'The petitioner purchased 2 acres of land in Medchal-Malkajgiri through registered sale deed dated 12.03.1994.',
      'During implementation of the Dharani portal, the land was arbitrarily classified as government prohibited property under Section 22-A of Registration Act.',
      'The revenue authorities rejected manual representation without providing reasons or hearing.'
    ],
    issues: [
      'Whether executive classification of private registered patta land on digital revenue portals without prior notice violates Article 300A of the Constitution of India?',
      'Can Dharani portal entries supersede registered title deeds executed decades earlier?'
    ],
    argumentsPetitioner: [
      'Petitioner cited registered chain of title for over 40 years with continuous physical possession.',
      'Argued that administrative software cannot override judicial principles of natural justice and Article 300A.'
    ],
    argumentsRespondent: [
      'State claimed land belonged to ancestral endowment or ceiling surplus as per ancient Khasra Pahani of 1954-55.',
      'Contended that the portal reflects digitized revenue records automatically.'
    ],
    legalProvisions: [
      'Constitution of India, Article 300A (Right to Property)',
      'Telangana Rights in Land and Pattadar Pass Books Act, 2020',
      'Registration Act, 1908, Section 22-A'
    ],
    ratioDecidendi:
      'A citizen cannot be deprived of property rights under Article 300A by unilateral administrative clicks on an electronic portal without a speaking order and opportunity of hearing.',
    obiterDicta:
      'Digital governance platforms must enhance transparency for citizens, not act as insurmountable digital barriers depriving them of due process.',
    finalOrder:
      'Writ Petition Allowed. Classification in Dharani portal quashed; District Collector directed to conduct de novo inquiry within 8 weeks after giving notice to petitioner.',
    isFictionalDemo: true
  },
  {
    id: 'judg_2',
    title: 'Dr. Sandhya Rani vs Apollo Hospitals Enterprises & Another',
    citation: '2023 (2) CPR 188 (SCDRC-TS)',
    court: 'Telangana State Consumer Disputes Redressal Commission',
    date: '2023-09-12',
    bench: 'Hon’ble Justice M.S.K. Jaiswal (President)',
    subject: 'Consumer Protection & Medical Negligence',
    quickBrief: 'Consumer Commission reaffirmed that failure to obtain informed written consent prior to altered surgical protocol constitutes deficiency in service.',
    facts: [
      'Complainant was admitted for elective laparoscopic cholecystectomy.',
      'During procedure, surgeons altered the procedure to open laparotomy without prior documented informed consent.',
      'Post-operative complications caused prolonged hospitalization and severe financial distress.'
    ],
    issues: [
      'Did the hospital and treating surgeon breach the standard of care as laid down in Bolam / Jacob Mathew tests?',
      'Does non-disclosure of procedural risks constitute deficiency under Consumer Protection Act?'
    ],
    argumentsPetitioner: [
      'Demonstrated absence of specific risk disclosure form for emergency conversion.',
      'Submitted expert medical opinion highlighting omission of standard pre-operative scans.'
    ],
    argumentsRespondent: [
      'Argued conversion to open laparotomy was done in emergency bona fide interest to save patient’s life.',
      'Contended general admission form covered surgical contingencies.'
    ],
    legalProvisions: [
      'Consumer Protection Act, 2019, Section 2(11) & 39',
      'Supreme Court precedent: Samira Kohli v. Dr. Prabha Manchanda (2008)'
    ],
    ratioDecidendi:
      'Informed consent is an inviolable prerequisite in elective medical procedures; broad boilerplate clauses do not substitute specific procedural consent.',
    finalOrder:
      'Hospital directed to refund treatment expenses of ₹3,40,000 and pay ₹5,00,000 compensation for mental agony with 9% interest.',
    isFictionalDemo: true
  }
];

export const MOCK_STUDENT_NOTES: StudentNote[] = [
  {
    id: 'note_1',
    title: 'Key Differences: CrPC 1973 vs BNSS 2023',
    folder: 'Criminal Procedure',
    tags: ['BNSS', 'CrPC', 'Police Powers', 'Exam Prep'],
    content: `# Comparative Analysis: CrPC 1973 vs Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023

1. **Police Notice of Appearance**:
   - *Old*: Section 41A CrPC
   - *New*: Section 35 BNSS. Retains 7-year imprisonment benchmark.
   
2. **Preliminary Inquiry**:
   - Section 173(3) BNSS introduces mandatory preliminary inquiry for offences punishable with 3 to 7 years imprisonment within 14 days before registering FIR (with approval of DySP).

3. **Audio-Video Electronic Evidence**:
   - Section 105 BNSS mandates videography for search and seizure.

*Exam Tip*: Remember landmark case Arnesh Kumar (2014) remains applicable to interpretation of Section 35 BNSS!`,
    lastModified: '2026-10-09'
  },
  {
    id: 'note_2',
    title: 'Essential Ingredients of Lease under Sec 105 TPA',
    folder: 'Property Law',
    tags: ['TPA 1882', 'Lease', 'Sec 105', 'Semester 5'],
    content: `# Section 105 Transfer of Property Act, 1882: Lease Defined

A lease of immovable property is a transfer of a right to enjoy such property, made for a certain time, express or implied, or in perpetuity, in consideration of:
- Price paid or promised (Premium)
- Money, share of crops, or service (Rent)

## Five Essential Elements:
1. Transfer of right of enjoyment (not absolute ownership).
2. Competent parties (Lessor & Lessee).
3. Subject matter: Immovable property.
4. Consideration: Premium or Rent.
5. Term: Express or implied duration.

*Distinction with License (Sec 52 Easements Act)*:
Lease creates an interest in land; license merely grants personal permission to do something otherwise unlawful.`,
    lastModified: '2026-10-04'
  }
];

export const MOCK_EBOOKS: EBook[] = [
  {
    id: 'book_1',
    title: 'Constitutional Law of India: Principles & Judicial Review',
    author: 'Prof. K.V. Ramanathan (Retd. Osmania Law Faculty)',
    subject: 'Constitutional Law',
    totalPages: 340,
    coverBg: 'bg-[#142B4A]',
    readingStatus: 'In Progress',
    sampleChapters: [
      {
        chapterNumber: 1,
        title: 'Fundamental Rights & Judicial Review under Article 13 & 32',
        excerpt:
          'The doctrine of judicial review in India is not merely an imported American invention, but an inherent structural pillar embedded in Article 13 of the Constitution. Every legislative enactment and executive decree must harmonize with Part III guarantees. In Kesavananda Bharati (1973), the Supreme Court cemented that even constitutional amendments cannot abrogate the basic structure.'
      },
      {
        chapterNumber: 2,
        title: 'Right to Life and Personal Liberty: The Expanding Horizons of Article 21',
        excerpt:
          'From the narrow positivism of A.K. Gopalan (1950) to the expansive human rights jurisprudence of Maneka Gandhi (1978), Article 21 has evolved to encompass dignity, privacy (Puttaswamy 2017), clean environment, and speedy trial.'
      }
    ]
  },
  {
    id: 'book_2',
    title: 'Civil Procedure & Pleadings in Telangana District Courts',
    author: 'Justice B. Sudarshan Reddy (Foreword)',
    subject: 'Civil Procedure Code',
    totalPages: 280,
    coverBg: 'bg-[#168C88]',
    readingStatus: 'Not Started',
    sampleChapters: [
      {
        chapterNumber: 1,
        title: 'Drafting Plaints and Injunction Applications under Order XXXIX',
        excerpt:
          'A successful application for temporary injunction requires satisfying the threefold test: (1) Prima facie case in favour of petitioner, (2) Balance of convenience tilting in applicant’s favour, and (3) Irreparable injury which cannot be monetarily compensated. Precision in property schedule descriptions is paramount in Telangana land suits.'
      }
    ]
  },
  {
    id: 'book_3',
    title: 'Consumer Protection Law: Commentary on the 2019 Act',
    author: 'Adv. M. Meenakshi Sundaram',
    subject: 'Consumer Law',
    totalPages: 210,
    coverBg: 'bg-[#7C3AED]',
    readingStatus: 'Completed',
    sampleChapters: [
      {
        chapterNumber: 1,
        title: 'Product Liability and E-Commerce Redressal Mechanisms',
        excerpt:
          'Chapter VI of the 2019 Act creates direct product liability for manufacturers, service providers, and product sellers. E-commerce platforms can no longer escape liability simply by labeling themselves as passive intermediaries when they actively promote or handle transactions.'
      }
    ]
  }
];

export const MOCK_MOOT_SCENARIO: MootScenario = {
  id: 'moot_1',
  title: 'Oral Tenancy vs Electronic Lease Termination in Urban Hyderabad',
  area: 'Property Law & Specific Relief',
  facts:
    'Petitioner A entered into an unwritten oral agreement with Respondent B to occupy a commercial office in Gachibowli on a monthly rent of ₹65,000/-. After 14 months of regular UPI payments, Respondent B sent a WhatsApp message stating "Vacate within 3 days or face lock replacement". Petitioner filed for urgent status quo injunction. Respondent argues no valid lease exists without registration under Registration Act.',
  legalIssues: [
    'Whether an oral tenancy followed by acceptance of rent creates a valid monthly lease under Section 106 TPA?',
    'Is a WhatsApp message valid legal notice under Section 106 of the Transfer of Property Act?',
    'Can an unregistered commercial tenant claim protection against summary dispossession under Section 6 of Specific Relief Act?'
  ],
  simulatedJudgeQueries: [
    {
      question:
        'Counsel, look at Section 107 of the Transfer of Property Act. Leases for more than one year require a registered instrument. How can your client claim legal leasehold rights without a registered deed?',
      context: 'Judicial challenge on mandatory registration under Section 107 TPA.',
      rubricCriteria:
        'Must distinguish between an annual lease requiring registration and a monthly tenancy created by delivery of possession and payment of monthly rent as established in Ram Kumar Das v. Jagdish Chandra Deo (AIR 1952 SC 23).'
    },
    {
      question:
        'Even if tenancy is conceded, did your client have 15 days notice? Does a WhatsApp message constitute proper statutory service of notice?',
      context: 'Challenge on mode of service under Section 106(4) TPA.',
      rubricCriteria:
        'Must argue whether digital messages comply with Section 106(4) requirements (tender or delivery by post or personal service) and the inadequacy of a 3-day window.'
    }
  ]
};

export const INITIAL_CONSULTATION_REQUESTS: ConsultationRequest[] = [
  {
    id: 'req_101',
    lawyerId: 'lawyer_1',
    lawyerName: 'Adv. K. Srinivas Rao',
    clientName: 'K. Venkat Reddy',
    clientPhone: '+91 98490 *****',
    reason: 'Received 15-day notice to vacate Flat 402 Jubilee Hills. Landlord claiming unpaid maintenance.',
    practiceArea: 'Property & Tenancy',
    consultationMethod: 'In-person',
    preferredDate: '2026-10-14 11:00 AM',
    sharedItems: {
      name: true,
      phone: true,
      document: true,
      facts: true
    },
    consentGranted: true,
    status: 'pending',
    createdAt: '2026-10-09'
  },
  {
    id: 'req_102',
    lawyerId: 'lawyer_1',
    lawyerName: 'Adv. K. Srinivas Rao',
    clientName: 'Smt. G. Lakshmi',
    clientPhone: '+91 94401 *****',
    reason: 'Ancestral agricultural land in Warangal wrongly updated under Dharani portal survey number.',
    practiceArea: 'Land Title Disputes',
    consultationMethod: 'Video consultation',
    preferredDate: '2026-10-16 03:30 PM',
    sharedItems: {
      name: true,
      phone: true,
      document: false,
      facts: true
    },
    consentGranted: true,
    status: 'accepted',
    createdAt: '2026-10-08',
    notes: 'Accepted. Client advised to keep registered gift deed copy ready for video conference.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Hearing Reminder: OS/412/2025',
    message: 'Hearing scheduled on 24th October 2026 before Court Hall 7, City Civil Court Hyderabad.',
    timestamp: '2 hours ago',
    type: 'hearing',
    read: false,
    targetRole: 'citizen'
  },
  {
    id: 'notif_2',
    title: 'Document Analysis Ready',
    message: 'Your Jubilee Hills Tenancy Notice analysis and draft response is prepared.',
    timestamp: 'Yesterday',
    type: 'analysis',
    read: false,
    targetRole: 'citizen'
  },
  {
    id: 'notif_3',
    title: 'New Client Consultation Request',
    message: 'K. Venkat Reddy submitted a consultation request regarding Tenancy Notice.',
    timestamp: '3 hours ago',
    type: 'consultation',
    read: false,
    targetRole: 'lawyer'
  },
  {
    id: 'notif_4',
    title: 'Study Room: Case Brief Updated',
    message: 'High Court judgment P. Satyanarayana Murthy v. District Collector added to study syllabus.',
    timestamp: '1 day ago',
    type: 'academic',
    read: true,
    targetRole: 'student'
  }
];
