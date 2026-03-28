export const navLinks = [
  { href: "/about-us", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/packages", label: "Packages" },
  { href: "/doctors-clinics", label: "Doctors & Clinics" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/international-patients", label: "International Patients" },
  { href: "/faq", label: "FAQ" }
];

export const featuredConcerns = [
  { title: "Acne & breakouts", description: "Targeted dermatology programs for active acne, congestion, and post-inflammatory marks." },
  { title: "Pigmentation & melasma", description: "Clinic-guided brightening plans with laser, topicals, and recovery support." },
  { title: "Redness & sensitivity", description: "Rosacea-aware and barrier-first treatment pathways for reactive skin." },
  { title: "Scars & texture", description: "Procedural treatment planning for acne scars, pores, and uneven texture." }
];

export const treatments = [
  {
    slug: "acne-treatment",
    title: "Acne Treatment",
    category: "Dermatology",
    audience: "Patients with active acne, clogged pores, inflammation, or acne-prone skin.",
    summary: "Physician-led acne plans combining consultation, prescription review, device-based options, and aftercare.",
    duration: "45-90 minutes per session",
    sessions: "Typically 3-6 sessions depending on severity",
    recovery: "Usually mild redness for 1-3 days depending on treatment type",
    price: "From THB 4,500",
    care: "Avoid picking, follow prescribed skincare, and protect skin from UV exposure.",
    faq: [
      "Can I start with an online consultation before flying to Thailand?",
      "How long should I stay if I am doing acne procedures?",
      "Will I receive a written treatment plan and cost estimate?"
    ]
  },
  {
    slug: "pigmentation-treatment",
    title: "Pigmentation & Melasma",
    category: "Dermatology",
    audience: "Patients concerned about melasma, uneven tone, sun spots, or post-inflammatory pigmentation.",
    summary: "Multimodal pigmentation programs designed around skin tone, sensitivity, and travel timeline.",
    duration: "30-75 minutes per session",
    sessions: "Often 3-5 sessions with topical support",
    recovery: "Minimal to moderate downtime depending on device and intensity",
    price: "From THB 5,500",
    care: "Strict sun protection and consistent pigment-safe skincare are essential.",
    faq: [
      "Is laser treatment suitable for darker skin tones?",
      "How quickly can I return to sightseeing after treatment?",
      "Do you provide aftercare recommendations in English?"
    ]
  },
  {
    slug: "anti-aging-rejuvenation",
    title: "Anti-Aging & Rejuvenation",
    category: "Aesthetic Skin Care",
    audience: "Patients seeking lifting, tightening, collagen support, glow, or fine line improvement.",
    summary: "Personalized anti-aging plans built around your goals, recovery preference, and travel schedule.",
    duration: "45-120 minutes",
    sessions: "Single-session or multi-session depending on technology used",
    recovery: "Little to moderate downtime depending on procedure",
    price: "From THB 7,500",
    care: "Hydration, sun avoidance, and post-procedure skincare guidance provided.",
    faq: [
      "Can I combine skin boosters and tightening in one trip?",
      "Which treatments are best if I only have a weekend in Bangkok?",
      "How soon will I see visible results?"
    ]
  },
  {
    slug: "laser-skin-rejuvenation",
    title: "Laser Skin Rejuvenation",
    category: "Aesthetic Skin Care",
    audience: "Patients looking for tone, texture, pores, acne marks, or skin clarity improvements.",
    summary: "Laser pathways matched to concern, skin type, recovery window, and desired intensity.",
    duration: "30-60 minutes",
    sessions: "Commonly 3-4 sessions",
    recovery: "Ranges from no downtime to several days of redness or dryness",
    price: "From THB 6,000",
    care: "Detailed before-and-after instructions are provided to reduce irritation and optimize outcomes.",
    faq: [
      "Is laser treatment in Thailand safe for travelers?",
      "How many days should I avoid the sun after treatment?",
      "Will I receive a treatment suitability check before booking?"
    ]
  },
  {
    slug: "skin-rejuvenation-facial-programs",
    title: "Skin Rejuvenation Facial Programs",
    category: "Medical Wellness Skin Programs",
    audience: "Travelers wanting lower-downtime glow, cleansing, hydration, and maintenance care.",
    summary: "Comfort-focused facial and skin maintenance plans for glow, hydration, and pre-event preparation.",
    duration: "60-90 minutes",
    sessions: "Single visit or short program",
    recovery: "Usually no downtime",
    price: "From THB 2,800",
    care: "Hydrating home care and maintenance recommendations included.",
    faq: [
      "What is the best treatment before a wedding or event?",
      "Can I do this one day before flying home?",
      "Do you offer customized plans for sensitive skin?"
    ]
  }
];

export const packages = [
  {
    slug: "acne-clear-starter",
    title: "Acne Clear Starter",
    duration: "3-5 days in Thailand",
    summary: "Designed for international patients who want dermatologist review, targeted acne treatment, and an aftercare roadmap.",
    includes: ["Video consultation before travel", "Clinic skin assessment", "Acne-focused treatment session", "Aftercare guide and follow-up check-in"],
    price: "Estimated THB 12,000-25,000"
  },
  {
    slug: "brightening-pigmentation-plan",
    title: "Brightening & Pigmentation Plan",
    duration: "4-6 days in Thailand",
    summary: "For patients seeking a structured pigmentation recovery pathway with transparent timing and travel-friendly downtime planning.",
    includes: ["Pre-arrival photo review", "Pigmentation-focused consultation", "Laser or brightening procedure plan", "Post-treatment travel guidance"],
    price: "Estimated THB 18,000-40,000"
  },
  {
    slug: "anti-aging-weekend-program",
    title: "Anti-Aging Weekend Program",
    duration: "2-3 days in Thailand",
    summary: "Short-stay package for busy travelers who want a premium rejuvenation plan with minimal disruption to travel.",
    includes: ["Online consultation", "Doctor review", "Tightening or rejuvenation treatment", "Recovery and skincare briefing"],
    price: "Estimated THB 20,000-55,000"
  }
];

export const doctors = [
  {
    name: "Dr. Araya S.",
    specialty: "Board-certified dermatologist",
    languages: "English, Thai",
    clinic: "Bangkok Aesthetic Dermatology Center",
    trust: "10+ years in acne, pigmentation, and sensitive skin management"
  },
  {
    name: "Dr. Nattapon K.",
    specialty: "Aesthetic physician",
    languages: "English, Thai, Mandarin",
    clinic: "สุขุมวิท Skin & Laser Clinic",
    trust: "Specializes in rejuvenation programs and travel-timed treatment planning"
  },
  {
    name: "Dr. Laila H.",
    specialty: "International patient consultant",
    languages: "English, Arabic, Thai",
    clinic: "Bangkok International Skin Concierge",
    trust: "Supports Middle East patient onboarding, care coordination, and aftercare communication"
  }
];

export const patientJourney = [
  "Send your skin concern, photos, and travel goals.",
  "Receive a preliminary assessment and suitable treatment directions.",
  "Book a video consultation with the care team.",
  "Get a personalized treatment plan and estimated quotation.",
  "Travel to Thailand with clinic, transport, and stay guidance.",
  "Receive treatment and digital follow-up support."
];

export const internationalSupport = [
  "Online consultation before travel",
  "Airport pickup coordination",
  "Hotel recommendations near partner clinics",
  "Travel timing guidance for downtime-sensitive treatments",
  "Multilingual support for English-first international patients",
  "Online aftercare follow-up"
];

export const reviews = [
  {
    name: "Maya, UAE",
    quote: "The team explained every step clearly before I booked my flight. I felt supported from consultation to aftercare.",
    outcome: "Pigmentation treatment trip with concierge support"
  },
  {
    name: "Lena, Singapore",
    quote: "What made the difference was the structured treatment plan and realistic recovery advice before I traveled.",
    outcome: "Weekend anti-aging program"
  },
  {
    name: "Alex, Australia",
    quote: "It felt more like a guided medical journey than a normal clinic website. Everything was clear and easy to arrange.",
    outcome: "Acne scar consultation and laser planning"
  }
];

export const faqItems = [
  {
    question: "Is this website a medical diagnosis service?",
    answer: "No. The platform provides preliminary guidance, consultation coordination, and treatment matching support. Final diagnosis and treatment decisions remain with licensed medical professionals."
  },
  {
    question: "Can I consult before flying to Thailand?",
    answer: "Yes. The platform is designed around online consultation before travel so patients can understand likely options, timing, and estimated budget first."
  },
  {
    question: "How many days should I stay in Thailand for treatment?",
    answer: "It depends on the treatment and your recovery window. Some visits can fit into a weekend, while more intensive plans may require several days."
  },
  {
    question: "Do you support international patients in English?",
    answer: "Yes. The site and lead flow are structured for international patients, with English-first messaging and room to expand to additional languages."
  },
  {
    question: "Do you arrange hotel and transport?",
    answer: "The platform is positioned as a concierge-led service, so hotel recommendations, airport pickup coordination, and local guidance can be included."
  }
];

export const blogPosts = [
  "Best acne treatment in Thailand for international patients",
  "Is laser treatment in Bangkok safe and what should travelers expect?",
  "How much does pigmentation treatment cost in Thailand?",
  "A 5-day skincare trip in Thailand: sample itinerary",
  "What to know before getting skin booster treatments in Bangkok"
];
