"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundComponent } from "./ui/BackgroundComponent";
import { ZoomParallax } from "./ui/zoom-parallax";
import LocationSection from "./LocationSection";
import { DottedSurface } from "./ui/dotted-surface";
import { Boxes } from "./ui/background-boxes";

const TOTAL_FRAMES = 31;
const FRAME_PREFIX = "ezgif-frame-";
const FRAME_SUFFIX = ".jpg";
const FRAME_OFFSET = 1;
const FRAME_PAD_LENGTH = 3;

const FRAME_PATH = (index: number) =>
  `/D_school-jpg/${FRAME_PREFIX}${String(index + FRAME_OFFSET).padStart(
    FRAME_PAD_LENGTH,
    "0"
  )}${FRAME_SUFFIX}`;

type Language = "en" | "gu";

const TRANSLATIONS = {
  en: {
    navItems: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#courses" },
      { label: "Why Us", href: "#why" },
      { label: "Location", href: "#location" },
      { label: "Contact", href: "#contact" },
    ],
    enroll: "Enroll",
    languageLabel: "Language",
    english: "English",
    gujarati: "Gujarati",
    scrollHint: "Scroll to explore",
    ctaBook: "Book Your First Lesson",
    loadingTitle: "Tech Driving",
    loadingStatus: "Loading experience",
    about: {
      eyebrow: "About Driving School",
      title: "Learn with confidence, technology, and tailored coaching.",
      description:
        "Tech Driving combines modern simulators, certified instructors, and personalised lessons so every student reaches the road with skill and calm.",
      features: [
        "Flexible training plans",
        "AI-backed road preparation",
        "Certified local instructors",
        "Test-focused driving practice",
      ],
    },
    courses: {
      eyebrow: "Courses & Services",
      title: "Choose the programme that fits your driving goals.",
      products: [
        {
          title: "Beginner",
          price: "₹4,999",
          features: ["12 driving sessions", "Theory classes", "RTO guidance", "Mock test"],
          accent: false,
        },
        {
          title: "Advanced",
          price: "₹8,999",
          features: [
            "20 driving sessions",
            "Highway driving",
            "Night driving",
            "Defensive techniques",
            "Priority scheduling",
          ],
          accent: true,
        },
        {
          title: "Pro Track",
          price: "₹14,999",
          features: [
            "Unlimited sessions",
            "1-on-1 coaching",
            "AI simulation access",
            "RTO test guaranteed",
            "Lifetime support",
          ],
          accent: false,
        },
      ],
    },
    why: {
      eyebrow: "Why Choose Us",
      title: "Smart training for safe, confident drivers.",
      reasons: [
        {
          title: "Modern simulator practice",
          description:
            "Gain real driving confidence with safe scenario training for rain, traffic and highway conditions.",
        },
        {
          title: "Certified local instructors",
          description:
            "Experienced teachers guide every student from first steps to full road readiness.",
        },
        {
          title: "Focused test prep",
          description:
            "Structured lessons, mock tests, and RTO readiness help you pass with confidence.",
        },
        {
          title: "Flexible scheduling",
          description:
            "Weekend, evening and weekday sessions fit around your lifestyle.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact Section",
      title: "Ready to start your driving journey?",
      description:
        "Reach out and we’ll help you choose the right package, schedule your first lesson, and begin a safer, smarter driving experience.",
      phone: "Call us",
      email: "Email",
      location: "Location",
      phoneNumber: "+91 12345 67890",
      emailAddress: "hello@techdriving.com",
      place: "Bangalore, India",
      contactCardTitle: "Book your first session today",
      contactCardDesc:
        "Send a quick message and we’ll get back to you with the best available slot.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Email address",
      messagePlaceholder: "Message",
      sendButton: "Send message",
    },
    footer: {
      brand: "Tech Driving",
      copyright: "© 2026 Tech Driving. All rights reserved.",
      links: ["About", "Courses", "Why Us", "Contact"],
    },
    quality: {
      bannerLabel: "🚙 QUALITY ISN'T EXPENSIVE IT'S PRICELESS 🚗",
      bannerHeadline: "Trusted driving training built for every learner.",
      features: [
        {
          label: "પારદર્શક / TRANSPARENT",
          description: "Clear pricing, clear progress, no hidden surprises.",
        },
        {
          label: "પ્રમાણિત / CERTIFIED",
          description: "Certified instructors and structured lessons for every student.",
        },
        {
          label: "પ્રમાણિક / HONEST",
          description: "Straightforward coaching and dependable support throughout.",
        },
        {
          label: "વચનબદ્ધતા / COMMITTED",
          description: "Committed to safe, confident drivers and lasting results.",
        },
      ],
      quote:
        "I have my own organization with 20 years experience and have personally trained 5000+ people.",
      trainingStructureTitle: "Training Structure",
      trainingStructure: [
        "25 Days Full Training",
        "21 Days On Road",
        "4 Days RTO Exam Training (Jawahar Medan)",
      ],
      highlightsTitle: "Extra Highlights",
      highlights: [
        "More Critical Traffic Classes",
        "Special Training: 90° & 360° (God Gift Skill & Master Key)",
        "Homely Atmosphere",
        "Flexible Timing: 7 AM – 7 PM (Sunday Closed)",
      ],
      pricingTitle: "Training Packages",
      pricing: [
        { title: "₹4000", label: "Without License" },
        { title: "₹5500", label: "With License (Car)" },
        { title: "₹6500", label: "With License (Bike/Car)" },
      ],
      tagline: "Perfection Beyond Your Imagination",
    },
    training: {
      title: "Structured Training Systems",
      single: {
        heading: "Single Person Training",
        subtitle: "21 Days Plan",
        steps: [
          "Day 1 - 7: basic controls, clutch, braking, and traffic awareness.",
          "Day 8 - 14: city driving, lane discipline, and junction work.",
          "Day 15 - 18: parking, reverse practice, and narrow road confidence.",
          "Day 19 - 21: full route practice, mock tests, and exam readiness.",
        ],
      },
      duo: {
        heading: "Two Person Training",
        subtitle: "10KM Route Plan",
        routePoints: [
          "Start from our training center and warm up on calm roads.",
          "Practice 90° turns, U-turns, and slow traffic handling.",
          "Navigate main arteries with instructor guidance.",
          "Finish with RTO segment and test route shaping.",
        ],
      },
    },
    gallery: {
      eyebrow: "Gallery",
      title:
        "Experience our training, vehicles, and safe practice environment.",
      preview: "View image",
      close: "Close preview",
    },
    rto: {
      eyebrow: "RTO Information",
      title: "Prepare, practice and pass with the right support.",
      appLinkText: "RTO Exam App",
      examDetails: [
        "600 questions available",
        "15 questions in exam",
        "Need 9 correct to pass",
        "48 seconds per question",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Appointment booking after preparation",
        "Exam location: ITI Vidyanagar",
      ],
      mapLinkText: "View RTO location",
      documentsTitle: "Documents Required",
      documents: [
        "Aadhaar Card / Leaving Certificate / Passport",
        "Xerox copies (2, blank backside)",
        "Passport photo (1)",
        "Original documents required",
        "Aadhaar must have correct DOB (MM-DD-YYYY)",
      ],
    },
    location: {
      eyebrow: "Our Location",
      title: "Find us at the heart of your next driving milestone.",
      mapNote: "Tap to open in Google Maps",
      mapLink: "https://maps.app.goo.gl/foJyNVmg9jrgpABW7",
    },
  },
  gu: {
    navItems: [
      { label: "વિશે", href: "#about" },
      { label: "સેવાઓ", href: "#courses" },
      { label: "શા માટે અમે", href: "#why" },
      { label: "સ્થળ", href: "#location" },
      { label: "સંપર્ક", href: "#contact" },
    ],
    enroll: "નોંધણી",
    languageLabel: "ભાષા",
    english: "English",
    gujarati: "ગુજરાતી",
    scrollHint: "અનુભવ માટે સ્ક્રોલ કરો",
    ctaBook: "તમારી પ્રથમ લેસન બુક કરો",
    loadingTitle: "ટેક ડ્રાઇવિંગ",
    loadingStatus: "અનુભવ લોડ થઈ રહ્યો છે",
    about: {
      eyebrow: "ડ્રાઇવિંગ સ્કૂલ વિશે",
      title: "વિશ્વાસ સાથે શીખો, ટેકનોલોજી અને વ્યક્તિગત માર્ગદર્શન સાથે.",
      description:
        "ટેક ડ્રાઇવિંગ આધુનિક સિમ્યુલેટરો, પ્રમાણિત ઇન્સ્ટ્રક્ટરો અને વ્યક્તિગત પાઠો સાથે દરેક વિદ્યાર્થીને કુશળતા અને શાંતિથી રસ્તા સુધી પહોંચાડે છે.",
      features: [
        "લવચીક તાલીમ યોજના",
        "AI આધારિત માર્ગદર્શન",
        "પ્રમાણિત સ્થાનિક ઇન્સ્ટ્રક્ટરો",
        "પરિક્ષા પર ધ્યાન કેન્દ્રિત પ્રેક્ટિસ",
      ],
    },
    courses: {
      eyebrow: "કોર્સ અને સેવાઓ",
      title: "તમારા ડ્રાઇવિંગ લક્ષ્યાંક માટે યોગ્ય પ્રોગ્રામ પસંદ કરો.",
      products: [
        {
          title: "શરૂઆત",
          price: "₹4,999",
          features: ["12 ડ્રાઇવિંગ સેશન", "સિદ્ધાંત વર્ગો", "RTO માર્ગદર્શન", "મોક ટેસ્ટ"],
          accent: false,
        },
        {
          title: "ઉન્નત",
          price: "₹8,999",
          features: [
            "20 ડ્રાઇવિંગ સેશન",
            "હાઇવે ડ્રાઇવિંગ",
            "રાત્રી ડ્રાઇવિંગ",
            "રક્ષણાત્મક તકનીકો",
            "પ્રાથમિકતા શેડ્યૂલિંગ",
          ],
          accent: true,
        },
        {
          title: "પ્રો ટ્રેક",
          price: "₹14,999",
          features: [
            "અનંત સેશન",
            "1-ઓન-1 કોચિંગ",
            "AI સિમ્યુલેશન ઍક્સેસ",
            "RTO ટેસ્ટ ગેરન્ટી",
            "લાઈફટાઇમ સપોર્ટ",
          ],
          accent: false,
        },
      ],
    },
    why: {
      eyebrow: "શા માટે અમે",
      title: "સુરક્ષિત અને આત્મવિશ્વાસભર્યા ડ્રાઇવરો માટે સ્માર્ટ તાલીમ.",
      reasons: [
        {
          title: "આધુનિક સિમ્યુલેટર પ્રેક્ટિસ",
          description:
            "જોવ, ટ્રાફિક અને હાઇવે પરિસ્થિતિઓ માટે સલામત પ્રસ્તુતિ સાથે વાસ્તવિક કોનફિડન્સ મેળવો.",
        },
        {
          title: "પ્રમાણિત સ્થાનિક ઇન્સ્ટ્રક્ટરો",
          description:
            "અનુભવી શિક્ષકો દરેક વિદ્યાર્થીને પ્રથમ પગલાંથી પૂર્ણ તૈયારીઓ સુધી માર્ગદર્શન આપે છે.",
        },
        {
          title: "કેન્દ્રિત પરીક્ષા તૈયારી",
          description:
            "ઢાંચાબદ્ધ પાઠો, મોક ટેસ્ટ અને RTO તૈયારી તમને વિશ્વાસથી પાસ કરવા મદદ કરે છે.",
        },
        {
          title: "લવચીક સમયગાળો",
          description:
            "સંડે બંધ, વીકએન્ડ, ઇવનિંગ અને હફ્તાવારી સત્રો તમારા સમયસૂચીને અનુરૂપ.",
        },
      ],
    },
    contact: {
      eyebrow: "સંપર્ક વિભાગ",
      title: "તમારી ડ્રાઇવિંગ મુસાફરી શરૂ કરવા તૈયાર?",
      description:
        "સાચો પેકેજ પસંદ કરવા, તમારી પ્રથમ લેસન શેડ્યૂલ કરવા અને સલામત, સ્માર્ટ અનુભવ શરૂ કરવા અમારો સંપર્ક કરો.",
      phone: "અમને કોલ કરો",
      email: "ઇમેઇલ",
      location: "સ્થળ",
      phoneNumber: "+91 12345 67890",
      emailAddress: "hello@techdriving.com",
      place: "બેંગલોર, ભારત",
      contactCardTitle: "આજેજ તમારી પ્રથમ સેશન બુક કરો",
      contactCardDesc:
        "ઝડપી સંદેશ મોકલો અને અમે તમને શ્રેષ્ઠ ઉપલબ્ધ સ્લોટ સાથે સંપર્ક કરીશું.",
      namePlaceholder: "તમારું નામ",
      emailPlaceholder: "ઇમેઇલ સરનામું",
      messagePlaceholder: "સંદેશ",
      sendButton: "સંદેશ મોકલો",
    },
    footer: {
      brand: "ટેક ડ્રાઇવિંગ",
      copyright: "© 2026 ટેક ડ્રાઇવિંગ. સકળ હક્કો સુરક્ષિત.",
      links: ["વિશે", "કોર્સ", "શા માટે અમે", "સંપર્ક"],
    },
    quality: {
      bannerLabel: "🚙 ગુણવત્તા મોંઘી નથી, તે અમૂલ્ય છે 🚗",
      bannerHeadline: "દરેક શીખનાર માટે વિશ્વસનીય ડ્રાઇવિંગ તાલીમ.",
      features: [
        {
          label: "પારદર્શક / TRANSPARENT",
          description: "સ્પષ્ટ ભુક્કો અને પ્રગતિ, કોઈ છુપાવેલ ખર્ચ નથી.",
        },
        {
          label: "પ્રમાણિત / CERTIFIED",
          description: "પ્રમાણિત ઇન્સ્ટ્રક્ટરો અને રચિત પાઠો દરેક માટે.",
        },
        {
          label: "પ્રમાણિક / HONEST",
          description: "સિક્કાં અને નિર્ભર માર્ગદર્શન દરેક પગલાં.",
        },
        {
          label: "વચનબદ્ધતા / COMMITTED",
          description: "સલામત, આત્મવિશ્વાસભર્યા ડ્રાઇવરો માટે પ્રતિબદ્ધ.",
        },
      ],
      quote:
        "મારી પોતાની સંસ્થા છે 20 વર્ષનો અનુભવ અને મેં વ્યક્તિગત રીતે 5000+ લોકોકે તાલીમ આપી છે.",
      trainingStructureTitle: "પ્રશિક્ષણની રચના",
      trainingStructure: [
        "25 દિવસનું પૂર્ણ તાલીમ",
        "21 દિવસ રોેડ પર",
        "4 દિવસ RTO પરીક્ષા તાલીમ (જવહાર મેદાન)",
      ],
      highlightsTitle: "વધારે હાઇલાઇટ્સ",
      highlights: [
        "વધારે ગંભીર ટ્રાફિક વર્ગો",
        "વિશેષ તાલીમ: 90° & 360° (ગોડ ગિફ્ટ સ્કિલ & માસ્ટર કી)",
        "ઘર જેવી વાતાવરણ",
        "લવચીક સમય: સવારે 7 થી સાંજે 7 (રવિવાર બંધ)",
      ],
      pricingTitle: "પ્રશિક્ષણ પેકેજ",
      pricing: [
        { title: "₹4000", label: "લાઈસન્સ વગર" },
        { title: "₹5500", label: "લાઈસન્સ સાથે (કાર)" },
        { title: "₹6500", label: "લાઈસન્સ સાથે (બાઈક/કાર)" },
      ],
      tagline: "તમારી કલ્પનાથી વધુ પૂર્ણતા",
    },
    training: {
      title: "રચિત તાલીમ વ્યવસ્થા",
      single: {
        heading: "એક વ્યક્તિ માટે તાલીમ",
        subtitle: "21 દિવસ યોજના",
        steps: [
          "દિવસ 1 - 7: મૂળ નિયંત્રણ, ક્લચ, બ્રેક અને ટ્રાફિક અવેરનેસ.",
          "દિવસ 8 - 14: શહેર ડ્રાઇવિંગ, લેન ડિસિપ્લિન અને ચોરસીઓ પર કામ.",
          "દિવસ 15 - 18: પાર્કિંગ, રિવર્સ પ્રેક્ટિસ અને સંકુક માર્ગમાં વિશ્વાસ.",
          "દિવસ 19 - 21: પૂર્ણ રૂટ પ્રેક્ટિસ, મોક ટેસ્ટ અને પરીક્ષા તૈયારી.",
        ],
      },
      duo: {
        heading: "બે વ્યક્તિ માટે તાલીમ",
        subtitle: "10KM રૂટ યોજના",
        routePoints: [
          "અમારા તાલીમ કેન્દ્રથી પ્રારંભ કરીને શાંત રસ્તાઓ પર વોર્મ અપ.",
          "90° વળાંક, U-ટર્ન અને ધીમી ટ્રાફિક હેન્ડલિંગનો અભ્યાસ.",
          "ઇન્સ્ટ્રક્ટર માર્ગદર્શન સાથે મુખ્ય માર્ગો નેવિગેટ કરો.",
          "RTO વિભાગ અને ટેસ્ટ રૂટ સાથે પૂર્ણ કરો.",
        ],
      },
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Experience our training, vehicles, and safe practice environment.",
      preview: "View image",
      close: "Close preview",
    },
    rto: {
      eyebrow: "RTO Information",
      title: "Prepare, practice and pass with the right support.",
      appLinkText: "RTO Exam App",
      examDetails: [
        "600 questions available",
        "15 questions in exam",
        "Need 9 correct to pass",
        "48 seconds per question",
      ],
      instructionsTitle: "Instructions",
      instructions: [
        "Appointment booking after preparation",
        "Exam location: ITI Vidyanagar",
      ],
      mapLinkText: "View RTO location",
      documentsTitle: "Documents Required",
      documents: [
        "Aadhaar Card / Leaving Certificate / Passport",
        "Xerox copies (2, blank backside)",
        "Passport photo (1)",
        "Original documents required",
        "Aadhaar must have correct DOB (MM-DD-YYYY)",
      ],
    },
    location: {
      eyebrow: "Our Location",
      title: "Find us at the heart of your next driving milestone.",
      mapNote: "Tap to open in Google Maps",
      mapLink: "https://maps.app.goo.gl/foJyNVmg9jrgpABW7",
    },
  },
};

function StoryPanel({
  section,
  scrollProgress,
  strings,
}: {
  section: (typeof STORY_SECTIONS)[number];
  scrollProgress: number;
  strings: typeof TRANSLATIONS["en"];
}) {
  const [start, end] = section.range;
  const midpoint = (start + end) / 2;
  const fadeInEnd = start + (midpoint - start) * 0.5;
  const fadeOutStart = midpoint + (end - midpoint) * 0.5;

  let opacity = 0;
  let translateY = 0;

  if (scrollProgress < start) {
    opacity = 0;
    translateY = 28;
  } else if (scrollProgress <= fadeInEnd) {
    const t = (scrollProgress - start) / (fadeInEnd - start);
    opacity = easeInOut(t);
    translateY = 28 * (1 - easeInOut(t));
  } else if (scrollProgress <= fadeOutStart) {
    opacity = 1;
    translateY = 0;
  } else if (scrollProgress <= end) {
    const t = (scrollProgress - fadeOutStart) / (end - fadeOutStart);
    opacity = 1 - easeInOut(t);
    translateY = -20 * easeInOut(t);
  } else {
    opacity = 0;
    translateY = -20;
  }

  const isVisible = opacity >= 0.01;

  const alignClass =
    section.align === "center"
      ? "items-center text-center"
      : section.align === "left"
      ? "items-start text-left pl-8 md:pl-20"
      : "items-end text-right pr-8 md:pr-20";

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none select-none ${alignClass}`}
      style={{ 
        opacity, 
        transform: `translateY(${translateY}px)`,
        display: isVisible ? "flex" : "none" 
      }}
    >
      <div
        className={`max-w-lg ${
          section.align === "center" ? "mx-auto px-6" : "px-0"
        }`}
      >
        <span
          className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          {section.eyebrow}
        </span>

        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] mb-5"
          style={{ color: "rgba(255,255,255,0.92)" }}
        >
          {section.headline.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p
          className="text-sm md:text-base font-light leading-relaxed max-w-sm"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          {section.body}
        </p>

        {section.cta && (
          <div className="mt-9 pointer-events-auto">
            <button
              className="group relative px-8 py-3.5 text-sm font-semibold tracking-wider uppercase overflow-hidden rounded-full transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "#050505",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)";
              }}
            >
              {strings.ctaBook}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)",
                }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function LoadingScreen({
  progress,
  strings,
}: {
  progress: number;
  strings: typeof TRANSLATIONS["en"];
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "var(--surface)" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-center mb-2">
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            {strings.loadingTitle}
          </span>
        </div>

        <div className="loading-ring" />

        <div className="text-center">
          <span
            className="text-3xl font-black tabular-nums"
            style={{ color: "var(--text-primary)" }}
          >
            {Math.round(progress)}%
          </span>
          <p
            className="text-xs mt-1 tracking-widest uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            {strings.loadingStatus}
          </p>
        </div>

        <div
          className="w-48 h-px rounded-full overflow-hidden"
          style={{ background: "rgba(15,23,42,0.08)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--accent), #ffdd6a)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Navbar({
  scrollProgress,
  strings,
  language,
  setLanguage,
}: {
  scrollProgress: number;
  strings: typeof TRANSLATIONS["en"];
  language: Language;
  setLanguage: (lang: Language) => void;
}) {
  const navOpacity = scrollProgress > 0.05 ? 1 : 0;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex flex-wrap items-center justify-between gap-3 px-6 md:px-16 py-4 transition-opacity duration-500 backdrop-blur-xl"
      style={{
        opacity: navOpacity,
        background: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(15,23,42,0.08)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="text-sm font-bold tracking-[0.2em] uppercase"
          style={{ color: "var(--text-primary)" }}
        >
          Tech Driving
        </div>

        <div className="hidden md:flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 p-1">
          {(["en", "gu"] as Language[]).map((langKey) => (
            <button
              key={langKey}
              type="button"
              onClick={() => setLanguage(langKey)}
              className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                language === langKey
                  ? "bg-slate-900 text-white"
                  : "text-slate-500"
              } rounded-full`}
            >
              {langKey === "en" ? strings.english : strings.gujarati}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {strings.navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color =
                "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color =
                "var(--text-secondary)")
            }
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex md:hidden items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1">
          {(["en", "gu"] as Language[]).map((langKey) => (
            <button
              key={langKey}
              type="button"
              onClick={() => setLanguage(langKey)}
              className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                language === langKey
                  ? "bg-slate-900 text-white"
                  : "text-slate-500"
              } rounded-full`}
            >
              {langKey === "en" ? "EN" : "GU"}
            </button>
          ))}
        </div>

        <Link
          href="/enroll"
          className="text-xs font-bold tracking-widest uppercase px-9 py-2 rounded-full border transition-all duration-200"
          style={{
            borderColor: "rgba(0, 0, 0, 0.45)",
            color: "var(--accent)",
            background: "rgba(255, 255, 255, 0.95)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "var(--accent)";
            el.style.color = "#0f172a";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.95)";
            el.style.color = "var(--accent)";
          }}
        >
          {strings.enroll}
        </Link>
      </div>
    </nav>
  );
}

export default function DrivingScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [language, setLanguage] = useState<Language>("en");

  const strings = TRANSLATIONS[language];

  useEffect(() => {
    let completed = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = img.onerror = () => {
        completed++;
        setLoadProgress(Math.round((completed / TOTAL_FRAMES) * 100));
        if (completed === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images[i] = img;
    }
  }, []);

  const updateDimensions = useCallback(() => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[index];
      if (!canvas || !img || !img.complete) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w, h } = dimensions;
      if (w === 0 || h === 0) return;

      canvas.width = w;
      canvas.height = h;

      ctx.fillStyle = "#f7fbff";
      ctx.fillRect(0, 0, w, h);

      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;
      if (!imgW || !imgH) return;

      const scale = Math.max(w / imgW, h / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const offsetX = (w - drawW) / 2;
      const offsetY = (h - drawH) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [dimensions]
  );

  useEffect(() => {
    if (!loaded) return;

    gsap.registerPlugin(ScrollTrigger);
    const trigger = containerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5, // Numeric value adds smooth scrubbing
        onUpdate: (self) => {
          setScrollProgress(self.progress);

          const targetFrame = Math.min(
            Math.max(Math.floor(self.progress * (TOTAL_FRAMES - 1)), 0),
            TOTAL_FRAMES - 1
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
          }
        },
      });
    }, trigger);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, [loaded, drawFrame]);

  useEffect(() => {
    if (loaded && dimensions.w > 0) {
      drawFrame(0);
    }
  }, [loaded, dimensions, drawFrame]);

  const progressBarWidth = `${scrollProgress * 100}%`;

  return (
    <>
      {!loaded && <LoadingScreen progress={loadProgress} strings={strings} />}

      <div className="scroll-progress" style={{ width: progressBarWidth }} />

      <Navbar
        scrollProgress={scrollProgress}
        strings={strings}
        language={language}
        setLanguage={setLanguage}
      />

      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <>
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: "20%",
              background:
                "linear-gradient(to bottom, rgba(247,251,255,0.95) 0%, transparent 100%)",
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: "20%",
              background:
                "linear-gradient(to top, rgba(247,251,255,0.95) 0%, transparent 100%)",
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              background: "#f7fbff",
            }}
          />

          <div className="absolute inset-0 z-20">
            {loaded &&
              STORY_SECTIONS.map((section) => (
                <StoryPanel
                  key={section.id}
                  section={section}
                  scrollProgress={scrollProgress}
                  strings={strings}
                />
              ))}
          </div>

          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700"
            style={{ opacity: scrollProgress > 0.04 ? 0 : 1 }}
          >
            <span
              className="text-[14px] tracking-[0.5em] uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              {strings.scrollHint}
            </span>
            <div className="w-px h-8 overflow-hidden relative">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--accent), transparent)",
                  animation: "scrollHint 1.4s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </>
      </div>

      <BelowFold strings={strings} />

      <style jsx global>{`
        @keyframes scrollHint {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  );
}

function QualitySection({
  strings,
}: {
  strings: typeof TRANSLATIONS["en"];
}) {
  const featureIcons = ["✦", "◈", "◉", "❋"];

  return (
    <section
      id="quality"
      className="relative w-full py-28 px-6 overflow-hidden bg-slate-950 text-white"
    >
      {/* Ambient Glow Orbs for depth */}
      <div className="absolute top-[-80px] left-[10%] w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none z-0 -translate-x-1/2" />

      {/* Soft top gradient fade */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white/8 to-transparent z-10 pointer-events-none" />

      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-950/40 z-[1] pointer-events-none" />

      <DottedSurface className="opacity-40" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.35em] uppercase text-amber-300">
            {strings.quality.bannerLabel}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl mb-5 bg-gradient-to-br from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          {strings.quality.bannerHeadline}
        </h2>

        {/* Subtle faded divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mb-14" />

        {/* Feature Cards */}
        <div className="grid gap-5 w-full md:grid-cols-2 lg:grid-cols-4 text-left">
          {strings.quality.features.map((feature, idx) => (
            <div
              key={feature.label}
              className="group relative rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 transition-all duration-500 hover:border-amber-400/40 hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(251,191,36,0.08)] overflow-hidden"
            >
              {/* Card glow on hover */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <span className="text-2xl mb-4 block text-amber-400/80 group-hover:scale-110 transition-transform duration-300">
                {featureIcons[idx]}
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300 mb-3">
                {feature.label}
              </p>
              <div className="w-8 h-px bg-amber-400/30 mb-3" />
              <p className="text-sm leading-relaxed text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Training Structure + Highlights */}
        <div className="grid gap-5 w-full lg:grid-cols-[1.35fr_0.9fr] mt-5 text-left">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-9 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-xl text-amber-400">📋</span>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-300">
                {strings.quality.trainingStructureTitle}
              </p>
            </div>
            <ul className="space-y-3">
              {strings.quality.trainingStructure.map((item, i) => (
                <li key={item} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4 flex items-center gap-4 hover:bg-white/[0.07] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-amber-400/40 bg-amber-400/10 flex items-center justify-center text-[10px] font-bold text-amber-400">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-9 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-xl text-amber-400">⭐</span>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-300">
                {strings.quality.highlightsTitle}
              </p>
            </div>
            <ul className="space-y-3">
              {strings.quality.highlights.map((item) => (
                <li key={item} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4 flex items-start gap-4 hover:bg-white/[0.07] transition-colors duration-200">
                  <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <span className="text-sm text-slate-200 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote Block */}
        <div className="mt-12 w-full rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-10 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          <span className="text-5xl text-amber-400/30 font-serif leading-none block mb-3">"</span>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-200 italic max-w-3xl">
            {strings.quality.quote}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-8 w-full">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400 mb-6">
            {strings.quality.pricingTitle}
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {strings.quality.pricing.map((packageItem) => {
              const isPopular = packageItem.title === "₹5500";
              return (
                <div
                  key={packageItem.title}
                  className={`relative rounded-[32px] border p-10 transition-all duration-400 hover:-translate-y-2 text-center overflow-hidden group ${
                    isPopular
                      ? "border-amber-400/60 bg-gradient-to-b from-amber-400/15 to-amber-400/5 shadow-[0_0_40px_rgba(251,191,36,0.18)]"
                      : "bg-white/[0.04] border-white/10 hover:border-white/20"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  )}
                  {isPopular && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.25em] uppercase bg-amber-400 text-slate-900 rounded-full px-3 py-1">
                      Popular
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 group-hover:from-amber-400/5 to-transparent transition-all duration-500 pointer-events-none rounded-[32px]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-5">
                    {packageItem.label}
                  </p>
                  <h3 className={`text-5xl font-black tracking-tight mb-1 ${isPopular ? "text-amber-300" : "text-white"}`}>
                    {packageItem.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
          <p className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            {strings.quality.tagline}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}


function TrainingSystemSection({
  strings,
}: {
  strings: typeof TRANSLATIONS["en"];
}) {
  return (
    <section
      id="training"
      className="relative py-28 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f8faff 0%, #f0f4ff 40%, #faf8ff 100%)",
      }}
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-[-60px] right-[5%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-400/8 blur-[120px] pointer-events-none" />

      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-50 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-amber-600">
              {strings.training.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] mb-4">
            {strings.training.title}
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 mb-6" />
          <p className="text-base leading-8 text-slate-500 max-w-xl">
            {strings.quality.quote}
          </p>
        </div>

        {/* Two-column cards */}
        <div className="grid gap-6 items-stretch lg:grid-cols-2">

          {/* Single Person Training Card */}
          <div className="group relative rounded-[36px] border border-white/80 bg-white/70 backdrop-blur-xl p-9 shadow-[0_4px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_60px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            {/* Corner glow */}
            <div className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full bg-amber-400/10 blur-[60px] group-hover:bg-amber-400/20 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Card header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-900 shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-600 mb-1">
                    {strings.training.single.heading}
                  </p>
                  <h3 className="text-2xl font-black text-slate-900">
                    {strings.training.single.subtitle}
                  </h3>
                </div>
              </div>

              {/* Steps with visual timeline */}
              <ol className="space-y-3 relative">
                <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-amber-300/60 to-transparent" />
                {strings.training.single.steps.map((step, index) => (
                  <li key={step} className="flex gap-4 items-start group/item">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-amber-300/60 flex items-center justify-center text-[11px] font-black text-amber-600 shadow-sm group-hover/item:border-amber-400 group-hover/item:bg-amber-50 transition-all duration-200 z-10">
                      {index + 1}
                    </span>
                    <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/80 px-5 py-3.5 text-sm text-slate-600 leading-relaxed group-hover/item:border-amber-200/40 group-hover/item:bg-amber-50/50 transition-all duration-200">
                      {step}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Two Person / Route Training Card */}
          <div className="group relative rounded-[36px] border border-white/80 bg-white/70 backdrop-blur-xl p-9 shadow-[0_4px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_60px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            {/* Corner glow */}
            <div className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full bg-blue-400/8 blur-[60px] group-hover:bg-blue-400/15 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Card header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-white shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">
                    {strings.training.duo.heading}
                  </p>
                  <h3 className="text-2xl font-black text-slate-900">
                    {strings.training.duo.subtitle}
                  </h3>
                </div>
              </div>

              {/* Route points with map pin aesthetic */}
              <ul className="space-y-3 relative">
                <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-slate-300/60 to-transparent" />
                {strings.training.duo.routePoints.map((point, idx) => (
                  <li key={point} className="flex gap-4 items-start group/item">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm group-hover/item:border-slate-400 transition-all duration-200 z-10">
                      <span className="w-3 h-3 rounded-full bg-slate-400 group-hover/item:bg-amber-500 transition-colors duration-200" />
                    </span>
                    <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/80 px-5 py-3.5 text-sm text-slate-600 leading-relaxed group-hover/item:border-slate-200 group-hover/item:bg-white transition-all duration-200">
                      {point}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function GallerySection({
  strings,
}: {
  strings: typeof TRANSLATIONS["en"];
}) {
  const images = [
    { src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1280&h=720&fit=crop&q=80', alt: 'Person driving' },
    { src: 'https://images.unsplash.com/photo-1463620910506-d0458143143e?w=1280&h=720&fit=crop&q=80', alt: 'Car on road' },
    { src: 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=800&h=800&fit=crop&q=80', alt: 'Driving instructor' },
    { src: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1280&h=720&fit=crop&q=80', alt: 'Car interior dashboard' },
    { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=800&fit=crop&q=80', alt: 'Traffic lights' },
    { src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1280&h=720&fit=crop&q=80', alt: 'Modern car on street' },
    { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1280&h=720&fit=crop&q=80', alt: 'Sports car rear view' },
  ];

  return (
    <section id="gallery" className="pt-24 pb-0 max-w-[100vw] mx-auto z-20 relative bg-[var(--bg)]">
      <div className="mb-14 max-w-2xl px-6 md:px-12 lg:px-16 text-center mx-auto relative z-30">
        <span className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--accent)] block mb-4">
          {strings.gallery.eyebrow}
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
          {strings.gallery.title}
        </h2>
      </div>

      <ZoomParallax images={images} />
    </section>
  );
}

function RTOInfoSection({
  strings,
}: {
  strings: typeof TRANSLATIONS["en"];
}) {
  return (
    <section
      id="rto"
      className="relative py-28 px-6 md:px-12 lg:px-16 overflow-hidden mt-16 bg-slate-950 rounded-[48px] mx-4 md:mx-12 lg:mx-20 shadow-2xl"
    >
      {/* Radial Mask for Readability */}
      <div className="absolute inset-0 w-full h-full bg-slate-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Interactive Boxes Background */}
      <Boxes />
      
      {/* Content Wrapper */}
      <div className="relative z-30 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 backdrop-blur-md text-[10px] font-bold tracking-[0.3em] uppercase text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {strings.rto.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            {strings.rto.title}
          </h2>
          <div className="w-20 h-1.5 bg-blue-500/80 rounded-full mt-6" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          {strings.rto.examDetails.map((item) => (
            <div 
              key={item} 
              className="group relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl transition-all duration-500 hover:border-white/30 hover:-translate-y-1 hover:bg-white/10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/0 group-hover:bg-blue-500/60 transition-all duration-500" />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-blue-300 border border-white/10 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-200 font-medium">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function BelowFold({
  strings,
}: {
  strings: typeof TRANSLATIONS["en"];
}) {
  return (
    <div className="bg-[var(--bg)] text-[var(--text-primary)] relative z-20">
      <div className="relative -mt-32 w-full z-20">
        <BackgroundComponent variant="yellow" fitContent>
          <section id="about" className="pb-24 pt-40 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto z-20 relative fade-up">
            <div className="grid gap-16 lg:grid-cols-[1fr_1fr] items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-amber-50/50 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
                  {strings.about.eyebrow}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 mb-8">
                  {strings.about.title}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-8 max-w-lg">
                  {strings.about.description}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="#courses"
                    className="group relative inline-flex rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                  >
                    <span className="relative z-10 transition-colors group-hover:text-amber-900">
                      Explore Courses
                    </span>
                    <div className="absolute inset-0 z-0 scale-x-0 bg-[var(--accent)] transition-transform duration-500 origin-left group-hover:scale-x-100" />
                  </a>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {strings.about.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className="group relative rounded-[28px] border border-white/60 bg-white/40 backdrop-blur-md p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:bg-white/80 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-slate-900 shadow-sm border border-slate-100 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {idx + 1}
                      </div>
                      <h4 className="text-[14px] font-bold leading-snug text-slate-900">{feature}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </BackgroundComponent>
      </div>

      <QualitySection strings={strings} />
      <TrainingSystemSection strings={strings} />

      <section id="courses" className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto fade-up">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--accent)] block mb-4">
            {strings.courses.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
            {strings.courses.title}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {strings.courses.products.map((course) => (
            <div
              key={course.title}
              className="relative rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              {course.accent && (
                <span className="absolute top-5 right-5 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-900">
                  Popular
                </span>
              )}
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500 mb-3">{course.title}</p>
              <h3 className="text-3xl font-black text-slate-900 mb-6">{course.price}</h3>
              <ul className="space-y-3 mb-8 text-sm text-slate-600">
                {course.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 block h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:bg-[#ffda6e]">
                Book now
              </button>
            </div>
          ))}
        </div>
      </section>

      <GallerySection
        strings={strings}
      />

      <div className="relative w-full z-20">
        <BackgroundComponent variant="default">
          <section id="why" className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto fade-up relative z-20">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-amber-50/50 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
                  {strings.why.eyebrow}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
                  {strings.why.title}
                </h2>
                <div className="h-1.5 w-20 bg-[var(--accent)] rounded-full mt-8" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {strings.why.reasons.map((item, idx) => (
                  <div
                    key={item.title}
                    className="group relative rounded-[32px] border border-white/60 bg-white/50 backdrop-blur-md p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:bg-white overflow-hidden flex flex-col"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative z-10 flex-1">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100/50 text-[var(--accent)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                          {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                          {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                          {idx === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{item.title}</h3>
                      <p className="text-[15px] leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </BackgroundComponent>
      </div>

      <RTOInfoSection strings={strings} />

      <section id="contact" className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto fade-up">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div>
            <span className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--accent)] block mb-4">
              {strings.contact.eyebrow}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-6">
              {strings.contact.title}
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-600 mb-8">
              {strings.contact.description}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">{strings.contact.phone}</p>
                <a href={`tel:${strings.contact.phoneNumber}`} className="text-base text-[var(--accent)]">
                  {strings.contact.phoneNumber}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{strings.contact.email}</p>
                <a href={`mailto:${strings.contact.emailAddress}`} className="text-base text-[var(--accent)]">
                  {strings.contact.emailAddress}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{strings.contact.location}</p>
                <p className="text-base text-slate-600">{strings.contact.place}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{strings.contact.contactCardTitle}</p>
              <h3 className="text-2xl font-bold text-slate-900">{strings.contact.contactCardTitle}</h3>
              <p className="text-sm leading-7 text-slate-600">{strings.contact.contactCardDesc}</p>
            </div>
            <div className="mt-8 space-y-4">
              <input
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-700 outline-none"
                placeholder={strings.contact.namePlaceholder}
              />
              <input
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-700 outline-none"
                placeholder={strings.contact.emailPlaceholder}
              />
              <textarea
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-700 outline-none min-h-[140px]"
                placeholder={strings.contact.messagePlaceholder}
              />
              <button className="w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:bg-[#ffda6e]">
                {strings.contact.sendButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <LocationSection />
      </div>

      <footer className="py-12 px-6 md:px-12 lg:px-16 border-t border-slate-200 bg-[var(--bg)] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-900">{strings.footer.brand}</span>
          <span className="text-sm text-slate-500">{strings.footer.copyright}</span>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            {strings.footer.links.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "")}`} className="transition-colors duration-200 hover:text-slate-900">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const STORY_SECTIONS = [
  {
    id: "feature1",
    range: [0.25, 0.48],
    align: "left" as const,
    eyebrow: "",
    headline: "",
    body: "",
  },
  {
    id: "feature2",
    range: [0.55, 0.78],
    align: "right" as const,
    eyebrow: "",
    headline: "",
    body: "",
  },
  {
    id: "cta",
    range: [0.86, 1.0],
    align: "center" as const,
    eyebrow: "",
    headline: "",
    body: "",
    cta: true,
  },
];
