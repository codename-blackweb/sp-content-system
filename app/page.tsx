"use client";

import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  Eye,
  FileText,
  Filter,
  Gauge,
  HeartHandshake,
  LayoutGrid,
  LineChart,
  List,
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  UsersRound
} from "lucide-react";
import { useMemo, useState } from "react";
import addictionStigma from "../assets/addiction-stigma.png";
import actionIcons from "../assets/image-action-icons.png";
import caregiverSupport from "../assets/caregiver-support.jpg";
import communityConnection from "../assets/community-connection.jpg";
import dryJanuaryQuiz from "../assets/dry-january-quiz.png";
import recoveryForest from "../assets/recovery-forest.png";
import strongerTogether from "../assets/stronger-together.png";
import treatmentImpact from "../assets/treatment-atlas-impact.png";
import unshame from "../assets/unshame.png";

type Metric = {
  label: string;
  value: string;
  note: string;
  icon: React.ElementType;
};

type PlatformStrategy = {
  platform: string;
  focus: string;
  contentTypes: string;
  cadence: string;
  windows: string;
  notes: string;
  cta: string;
  tone: string;
  useCase: string;
};

type Week = {
  id: number;
  week: string;
  dates: string;
  theme: string;
  postTheme: string;
  purpose: string;
  cta: string;
  audience: string;
  intensity: string;
  visualTone: string;
  objective: string;
  primaryFocus: string;
  doing: string;
  asset: StaticImageData;
};

type Post = {
  id: string;
  weekId: number;
  day: number;
  dayLabel: string;
  platform: string;
  time: string;
  type: string;
  genre: string;
  theme: string;
  status: string;
  hook: string;
  visual: string;
  caption: string;
  cta: string;
  owner: string;
  reviewer: string;
  comments: number;
  approval: string;
};

type Signal = {
  date: string;
  label: string;
  type: "Holiday" | "Observance" | "Opportunity" | "Risk";
  note: string;
};

type Asset = {
  title: string;
  type: string;
  platforms: string;
  status: string;
  updated: string;
  image: StaticImageData;
};

const metrics: Metric[] = [
  { label: "Scheduled Content", value: "112", note: "Cross-channel posts mapped across the month", icon: CalendarDays },
  { label: "Campaign Themes", value: "4", note: "Stigma, treatment, recovery, and action", icon: Target },
  { label: "Approval Status", value: "Ready", note: "Governance checkpoints built into the flow", icon: ClipboardCheck },
  { label: "Engagement Signals", value: "Live", note: "Saves, shares, replies, and link behavior", icon: Gauge },
  { label: "Conversion CTAs", value: "5", note: "Resources, walks, volunteering, giving, advocacy", icon: MousePointerClick }
];

const platformStrategies: PlatformStrategy[] = [
  {
    platform: "Facebook",
    focus: "Community-scale awareness, practical resources, recap posts, and engagement prompts.",
    contentTypes: "Static cards, short explainers, community questions, event recaps, resource spotlights.",
    cadence: "Daily, with lighter weekend pacing.",
    windows: "Mid-morning to early afternoon; Sunday early afternoon.",
    notes: "Best for reach across caregivers, families, local communities, and supporters who need clear next steps.",
    cta: "Share, comment, click to resources, RSVP, donate, or send to someone who needs a practical tool.",
    tone: "Warm, plainspoken, credible, and community-oriented.",
    useCase: "Move broad audiences from awareness into shared understanding and resource use."
  },
  {
    platform: "Instagram",
    focus: "Visually led education, story-driven advocacy, and save-worthy content.",
    contentTypes: "Carousels, reels, story polls, quote graphics, recap reels, short guides.",
    cadence: "Daily, with stronger emphasis on reels and carousels around theme launches.",
    windows: "Early afternoon, with Wednesday evening and weekend exceptions.",
    notes: "Best for visual repetition, content people can save, and emotionally credible storytelling.",
    cta: "Save, share to story, send to a friend, tap through, follow the next weekly theme.",
    tone: "Hopeful, direct, visually confident, and stigma-safe.",
    useCase: "Package complex ideas into human, clear, high-retention content."
  },
  {
    platform: "LinkedIn",
    focus: "Systems insight, nonprofit leadership, workplace culture, and mission-led strategic framing.",
    contentTypes: "Insight posts, executive summaries, barrier maps, operational reflections, performance learnings.",
    cadence: "Wednesdays and Fridays.",
    windows: "Wednesday 4:00 PM and Friday 3:00 PM ET.",
    notes: "Best for authority, policy-adjacent context, and operational framing without losing human language.",
    cta: "Share with leaders, comment with a barrier, discuss policy or workplace action.",
    tone: "Strong, evidence-driven, measured, and action-oriented.",
    useCase: "Build credibility with partners, employers, funders, and mission-aligned professionals."
  },
  {
    platform: "Bluesky",
    focus: "Concise, repostable takes, real-time prompts, and conversation-driving text posts.",
    contentTypes: "Text posts, short threads, question prompts, repostable message anchors.",
    cadence: "Monday through Friday.",
    windows: "9:00-11:00 AM weekday windows.",
    notes: "Best for rapid clarity, language correction, and lightweight participation around key themes.",
    cta: "Repost, reply, name a barrier, share one concrete action.",
    tone: "Plain, exact, responsive, and human.",
    useCase: "Keep the public conversation accurate, current, and easy to join."
  },
  {
    platform: "TikTok",
    focus: "Fast education, narrative clips, FAQ-style videos, and emotionally resonant short-form storytelling.",
    contentTypes: "Talking-head explainers, tutorials, response videos, event POVs, story-led clips.",
    cadence: "Monday, Saturday, and Sunday, with selective weekday response content.",
    windows: "Monday 1:00 PM, Saturday 5:00 PM, Sunday 9:00 AM ET.",
    notes: "Best when a single idea can be explained clearly in under a minute with captions and a human voice.",
    cta: "Share, comment with a question, send to someone who needs the explanation.",
    tone: "Conversational, respectful, clear, and never sensational.",
    useCase: "Turn complex or misunderstood topics into accessible, stigma-safe education."
  }
];

const weeks: Week[] = [
  {
    id: 1,
    week: "Week 1",
    dates: "Jan 1-7",
    theme: "Break the Stigma",
    postTheme: "Addiction as a health issue",
    purpose: "Challenge misconceptions and create emotionally resonant, stigma-safe awareness content.",
    cta: "Shares, saves, comments, conversation",
    audience: "Early awareness",
    intensity: "Low friction",
    visualTone: "Bold, editorial, human, and credible.",
    objective: "Replace judgment with understanding and establish a compassionate baseline for the month.",
    primaryFocus: "Awareness and reach",
    doing: "This week lowers emotional resistance and gives audiences language they can repeat safely.",
    asset: communityConnection
  },
  {
    id: 2,
    week: "Week 2",
    dates: "Jan 8-14",
    theme: "Understanding Treatment",
    postTheme: "Care navigation and evidence-based support",
    purpose: "Make treatment information practical, understandable, and less intimidating.",
    cta: "Resource clicks, saves, confidence-based engagement",
    audience: "Active education",
    intensity: "Medium friction",
    visualTone: "Clear, reassuring, structured, and accessible.",
    objective: "Turn treatment from an abstract idea into a clearer path people can approach.",
    primaryFocus: "Education and resource use",
    doing: "This week removes ambiguity around care options, barriers, and navigation tools.",
    asset: treatmentImpact
  },
  {
    id: 3,
    week: "Week 3",
    dates: "Jan 15-21",
    theme: "Path to Recovery",
    postTheme: "Hope, support systems, and non-linear progress",
    purpose: "Center recovery as real, deeply human, and supported by community.",
    cta: "Story sharing, supportive comments, saves",
    audience: "Trust and hope",
    intensity: "Emotional engagement",
    visualTone: "Warm, intimate, dignified, and hopeful.",
    objective: "Show that progress does not need to be perfect to be meaningful.",
    primaryFocus: "Recovery storytelling",
    doing: "This week gives audiences honest recovery narratives without turning struggle into spectacle.",
    asset: recoveryForest
  },
  {
    id: 4,
    week: "Week 4",
    dates: "Jan 22-30",
    theme: "Taking Action",
    postTheme: "Tools, giving, volunteering, walks, and advocacy",
    purpose: "Convert attention into practical next steps across tools, events, giving, and advocacy.",
    cta: "Clicks, sign-ups, link taps, volunteer interest",
    audience: "Ready to act",
    intensity: "Higher intent",
    visualTone: "Motivating, confident, clear, and brand-forward.",
    objective: "Move support from abstract agreement into measurable participation.",
    primaryFocus: "Action and conversion",
    doing: "This week gives people concrete ways to participate without making support feel all-or-nothing.",
    asset: actionIcons
  }
];

const posts: Post[] = [
  {
    id: "jan-01-fb",
    weekId: 1,
    day: 1,
    dayLabel: "Thu Jan 1",
    platform: "Facebook",
    time: "10:30 AM",
    type: "Static myth-vs-fact card",
    genre: "Awareness",
    theme: "Awareness",
    status: "Approved",
    hook: "Addiction is not a moral failure. It is a medical condition.",
    visual: "High-contrast split-panel artwork using teal emphasis and documentary restraint.",
    caption: "A concise myth-busting post that reframes addiction as a health issue and gives followers a safer way to talk about it.",
    cta: "Share this to help replace blame with facts.",
    owner: "Ezra",
    reviewer: "MarComm",
    comments: 3,
    approval: "Brand-safe"
  },
  {
    id: "jan-01-ig",
    weekId: 1,
    day: 1,
    dayLabel: "Thu Jan 1",
    platform: "Instagram",
    time: "1:00 PM",
    type: "Carousel",
    genre: "Education",
    theme: "Awareness",
    status: "Scheduled",
    hook: "5 myths about addiction that need to end today.",
    visual: "Five distinct slide treatments with bold uppercase headlines and teal highlight blocks.",
    caption: "Each slide replaces one common misconception with a clear, evidence-aware correction.",
    cta: "Save this carousel and send it to someone who still sees addiction through judgment.",
    owner: "Content",
    reviewer: "Comms",
    comments: 5,
    approval: "Scheduled"
  },
  {
    id: "jan-02-li",
    weekId: 1,
    day: 2,
    dayLabel: "Fri Jan 2",
    platform: "LinkedIn",
    time: "3:00 PM",
    type: "Insight post",
    genre: "Reach",
    theme: "Reach",
    status: "Published",
    hook: "Stigma is reinforced by systems, policies, and language choices organizations leave unchallenged.",
    visual: "Minimal editorial layout with one restrained vertical bar chart.",
    caption: "A leadership-facing post about how organizations can remove stigma from culture and communications.",
    cta: "Add your perspective on how organizations can actively remove stigma.",
    owner: "Strategy",
    reviewer: "VP MarComm",
    comments: 7,
    approval: "Published"
  },
  {
    id: "jan-05-bs",
    weekId: 1,
    day: 5,
    dayLabel: "Mon Jan 5",
    platform: "Bluesky",
    time: "10:00 AM",
    type: "Text prompt",
    genre: "Engagement",
    theme: "Engagement",
    status: "In Review",
    hook: "What does stigma look like in your community, school, workplace, or family?",
    visual: "Text-first post optimized for quick comprehension and repostability.",
    caption: "A simple question designed to make stigma visible and specific.",
    cta: "Reply with one example so the pattern becomes harder to dismiss.",
    owner: "Social",
    reviewer: "Language Review",
    comments: 2,
    approval: "Needs language check"
  },
  {
    id: "jan-08-fb",
    weekId: 2,
    day: 8,
    dayLabel: "Thu Jan 8",
    platform: "Facebook",
    time: "10:30 AM",
    type: "Carousel explainer",
    genre: "Education",
    theme: "Education",
    status: "Approved",
    hook: "What does evidence-based treatment actually mean in practice?",
    visual: "Five-panel educational graphic using calm blue-green structure and clear care scenes.",
    caption: "A practical breakdown of treatment components, levels of care, and support options.",
    cta: "Share this with someone who wants treatment information without jargon.",
    owner: "Education",
    reviewer: "Clinical Advisor",
    comments: 4,
    approval: "Approved"
  },
  {
    id: "jan-09-ig",
    weekId: 2,
    day: 9,
    dayLabel: "Fri Jan 9",
    platform: "Instagram",
    time: "1:00 PM",
    type: "Reel",
    genre: "Education",
    theme: "Education",
    status: "Draft",
    hook: "These signs are easy to dismiss until they start shaping daily life.",
    visual: "Short vertical sequence with captions, quiet routine details, and no crisis imagery.",
    caption: "A careful, non-alarmist reel about recognizing when support may be needed.",
    cta: "Share this with someone who may need language for what they are feeling.",
    owner: "Video",
    reviewer: "Comms",
    comments: 1,
    approval: "Draft"
  },
  {
    id: "jan-11-tt",
    weekId: 2,
    day: 11,
    dayLabel: "Sun Jan 11",
    platform: "TikTok",
    time: "9:00 AM",
    type: "Tutorial video",
    genre: "Action",
    theme: "Education",
    status: "Scheduled",
    hook: "A fast walkthrough of how to start using Treatment Atlas today.",
    visual: "Screen recording with voiceover and grounded home-office cutaways.",
    caption: "A simple walkthrough for people who do not know where to begin.",
    cta: "Send it to the person who keeps saying they do not know where to start.",
    owner: "Digital",
    reviewer: "Product",
    comments: 6,
    approval: "Scheduled"
  },
  {
    id: "jan-14-li",
    weekId: 2,
    day: 14,
    dayLabel: "Wed Jan 14",
    platform: "LinkedIn",
    time: "4:00 PM",
    type: "Weekly summary",
    genre: "Education",
    theme: "Education",
    status: "Needs Revision",
    hook: "Treatment access is a design, operations, and equity issue.",
    visual: "Four-barrier matrix with action levers and restrained typography.",
    caption: "A professional summary that connects access barriers to organizational responsibility.",
    cta: "Share this with someone who can remove friction from care access.",
    owner: "Strategy",
    reviewer: "Equity Review",
    comments: 8,
    approval: "Revise claim support"
  },
  {
    id: "jan-15-fb",
    weekId: 3,
    day: 15,
    dayLabel: "Thu Jan 15",
    platform: "Facebook",
    time: "10:30 AM",
    type: "Story highlight",
    genre: "Recovery",
    theme: "Recovery",
    status: "Approved",
    hook: "Recovery is possible, but it rarely looks cinematic. It looks human.",
    visual: "Soft winter daylight, ordinary routine, and dignified human detail.",
    caption: "A grounded recovery story focused on consistency, support, and small milestones.",
    cta: "Share this to remind someone that progress can begin quietly.",
    owner: "Story",
    reviewer: "Lived Experience",
    comments: 5,
    approval: "Approved"
  },
  {
    id: "jan-18-tt",
    weekId: 3,
    day: 18,
    dayLabel: "Sun Jan 18",
    platform: "TikTok",
    time: "9:00 AM",
    type: "Story-led video",
    genre: "Recovery",
    theme: "Recovery",
    status: "In Review",
    hook: "A real story about relapse, return, and rebuilding.",
    visual: "Direct-to-camera storytelling with captioned key points and no exploitative detail.",
    caption: "A human recovery narrative that avoids perfection language and centers support.",
    cta: "Comment with encouragement for anyone trying again.",
    owner: "Video",
    reviewer: "Language Review",
    comments: 9,
    approval: "Reviewing"
  },
  {
    id: "jan-21-li",
    weekId: 3,
    day: 21,
    dayLabel: "Wed Jan 21",
    platform: "LinkedIn",
    time: "4:00 PM",
    type: "Weekly summary",
    genre: "Recovery",
    theme: "Recovery",
    status: "Scheduled",
    hook: "Recovery is an ecosystem that either supports people or abandons them.",
    visual: "Layered-block summary card with one expert quote and policy-facing language.",
    caption: "A systems view of long-term recovery support beyond crisis response.",
    cta: "Share this with someone shaping programming or workplace culture.",
    owner: "Strategy",
    reviewer: "VP MarComm",
    comments: 4,
    approval: "Scheduled"
  },
  {
    id: "jan-22-ig",
    weekId: 4,
    day: 22,
    dayLabel: "Thu Jan 22",
    platform: "Instagram",
    time: "1:00 PM",
    type: "Carousel",
    genre: "Action",
    theme: "Action",
    status: "Approved",
    hook: "5 ways to support Shatterproof that actually move the mission forward.",
    visual: "Event registration, volunteer portrait, resource tool, donor wall, and walk route sign.",
    caption: "A practical guide that helps supporters choose one realistic next step.",
    cta: "Save this carousel and pick one action you can take this week.",
    owner: "Content",
    reviewer: "Fundraising",
    comments: 3,
    approval: "Approved"
  },
  {
    id: "jan-23-li",
    weekId: 4,
    day: 23,
    dayLabel: "Fri Jan 23",
    platform: "LinkedIn",
    time: "3:00 PM",
    type: "Insight post",
    genre: "Action",
    theme: "Action",
    status: "Scheduled",
    hook: "When people cannot find the right care, that is a service design problem.",
    visual: "Simplified journey map from search to care access with clear drop-off points.",
    caption: "A professional framing of Treatment Atlas as a response to navigation friction.",
    cta: "Comment with one care-system friction point to remove first.",
    owner: "Strategy",
    reviewer: "Product",
    comments: 6,
    approval: "Scheduled"
  },
  {
    id: "jan-26-fb",
    weekId: 4,
    day: 26,
    dayLabel: "Mon Jan 26",
    platform: "Facebook",
    time: "10:30 AM",
    type: "Donation appeal",
    genre: "Action",
    theme: "Action",
    status: "Draft",
    hook: "Your gift funds work that helps people find care, fight stigma, and build stronger systems.",
    visual: "Impact graphic with contribution examples over a community training room.",
    caption: "A clear appeal that names where support goes without pressure or shame.",
    cta: "Donate if you can, or share so the right person sees the impact.",
    owner: "Development",
    reviewer: "Fundraising",
    comments: 2,
    approval: "Draft"
  },
  {
    id: "jan-30-bs",
    weekId: 4,
    day: 30,
    dayLabel: "Fri Jan 30",
    platform: "Bluesky",
    time: "11:00 AM",
    type: "Monthly reflection",
    genre: "Engagement",
    theme: "Engagement",
    status: "Approved",
    hook: "Useful, compassionate content can move people when it is specific and repeated with purpose.",
    visual: "Text-first wrap-up optimized for repostability.",
    caption: "A concise close to the month that reinforces sustained, mission-led content.",
    cta: "Repost if you want content that treats people like adults and still speaks with care.",
    owner: "Social",
    reviewer: "Comms",
    comments: 1,
    approval: "Approved"
  }
];

const monthlySignals: Signal[] = [
  { date: "Jan 1", label: "New Year's Day", type: "Holiday", note: "Federal holiday. Lower operational response expected; schedule lighter awareness content." },
  { date: "Jan 5-9", label: "Reset window", type: "Opportunity", note: "Good time for grounded optimism and practical planning. Avoid generic wellness reset language." },
  { date: "Jan 12-16", label: "Mid-month drop-off", type: "Risk", note: "Expect lower motivation and stronger need for clear, supportive treatment-navigation content." },
  { date: "Jan 19", label: "Martin Luther King Jr. Day", type: "Holiday", note: "Long-weekend slowdown likely. Use care with mission alignment and avoid opportunistic posting." },
  { date: "Jan 22-30", label: "Purpose + impact window", type: "Opportunity", note: "Higher readiness for action-focused CTAs after context has been built." },
  { date: "Month-long", label: "National Mentoring Month", type: "Observance", note: "Useful for support-system storytelling, volunteer framing, and sustained recovery context." }
];

const awarenessDays = [
  ["National Mentoring Month", "Month-long", "Recovery / Action", "Use to discuss support systems and volunteer pathways without implying recovery is solved by one relationship."],
  ["Dry January", "Month-long", "Awareness / Reflection", "Handle carefully. Keep the frame educational and avoid treating substance use as a challenge trend."],
  ["National Blood Donor Month", "Month-long", "Action", "Useful as a parallel for community care and tangible participation when connected responsibly."],
  ["MLK Day", "Jan 19", "Reflection", "Use only if connected to equity, systems, access, and service with substance and restraint."],
  ["Data Privacy Day", "Jan 28", "Education", "Relevant for trust, treatment navigation, and what people need to know before using digital tools."]
];

const opportunities = [
  ["Reset Window", "Lead with grounded optimism, practical tools, and specific first steps. Avoid generic new-year transformation language."],
  ["Mid-Month Drop-Off", "Offer reassurance, care navigation, and low-friction support when motivation may be fading."],
  ["Purpose + Impact", "Shift toward volunteering, giving, Treatment Atlas, walk participation, and advocacy after trust is established."],
  ["Long-Term Sustainability", "Normalize repeated, useful action over dramatic one-time support."],
  ["Common Misfires", "Avoid shame, stereotypes, vague inspiration, and content that treats addiction as a seasonal self-improvement topic."]
];

const assets: Asset[] = [
  { title: "Addiction Is a Medical Condition", type: "PNG", platforms: "Facebook, Instagram", status: "Approved", updated: "Dec 28", image: addictionStigma },
  { title: "Unshame Campaign Graphic", type: "PNG", platforms: "Instagram, LinkedIn", status: "Ready", updated: "Dec 29", image: unshame },
  { title: "Dry January Quiz", type: "PNG", platforms: "Instagram Stories", status: "In Review", updated: "Jan 2", image: dryJanuaryQuiz },
  { title: "Caregiver Support", type: "JPG", platforms: "Facebook, Email", status: "Approved", updated: "Jan 6", image: caregiverSupport },
  { title: "Stronger Together", type: "PNG", platforms: "All social", status: "Scheduled", updated: "Jan 12", image: strongerTogether }
];

const statuses = ["Draft", "In Review", "Approved", "Scheduled", "Published", "Needs Revision"];
const contentThemes = ["Awareness", "Education", "Recovery", "Action", "Reach", "Engagement"];
const filterPlatforms = ["All Platforms", "Facebook", "Instagram", "LinkedIn", "Bluesky", "TikTok"];
const platformNav = ["Dashboard", "Calendar", "Workflow", "Assets"];
const januaryDays = Array.from({ length: 31 }, (_, index) => index + 1);

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: "easeOut" as const }
};

function SectionIntro({
  eyebrow,
  title,
  children,
  inverse = false
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <motion.div {...fadeIn} className="mx-auto max-w-4xl text-center">
      <p className={`caption ${inverse ? "text-[#80E6DC]" : "text-[#4F2D7F]"}`}>{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-normal md:text-6xl">{title}</h2>
      <p className={`mt-6 text-lg leading-8 ${inverse ? "text-white/78" : "text-[#041E42]/72"}`}>{children}</p>
    </motion.div>
  );
}

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Draft: "bg-[#CDD2D9] text-[#041E42]",
    "In Review": "bg-[#DCD5E8] text-[#041E42]",
    Approved: "bg-[#80E6DC] text-[#041E42]",
    Scheduled: "bg-[#E6FAF8] text-[#041E42]",
    Published: "bg-[#041E42] text-white",
    "Needs Revision": "bg-[#4F2D7F] text-white"
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.1em] ${styles[status] ?? styles.Draft}`}>{status}</span>;
}

function PlatformChip({ platform }: { platform: string }) {
  return <span className="rounded-full border border-[#041E42]/15 bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#041E42]">{platform}</span>;
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.45]);

  return (
    <section className="motion-field relative min-h-[92vh] overflow-hidden px-5 py-6 text-white md:px-8">
      <motion.div aria-hidden="true" style={{ y, opacity }} className="absolute inset-0">
        <motion.div animate={{ x: [0, 26, -14, 0], y: [0, -20, 16, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[8%] top-[16%] h-64 w-64 rounded-full bg-[#80E6DC]/30 blur-3xl" />
        <motion.div animate={{ x: [0, -18, 20, 0], y: [0, 22, -10, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[6%] top-[8%] h-72 w-72 rounded-full bg-[#4F2D7F]/55 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#041E42] to-transparent" />
      </motion.div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-white/18 pb-5">
        <div>
          <p className="caption text-[#80E6DC]">Shatterproof</p>
          <p className="mt-1 text-sm font-bold text-white/78">Stronger than addiction</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {platformNav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full border border-white/18 px-3 py-1 text-xs font-bold text-white/74 transition hover:border-[#80E6DC] hover:text-[#80E6DC]">
              {item}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-12 pb-16 pt-24 md:grid-cols-[1.1fr_0.9fr] md:pt-32">
        <motion.div initial="initial" animate="animate" variants={{ initial: {}, animate: { transition: { staggerChildren: 0.09 } } }}>
          <motion.p variants={{ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } }} className="caption text-[#80E6DC]">January 2026 Content System</motion.p>
          <motion.h1 variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.75, ease: "easeOut" }} className="mt-5 max-w-5xl text-5xl font-black leading-[0.88] tracking-normal md:text-8xl">
            Mission-aligned content operations, built to move people toward action.
          </motion.h1>
          <motion.p variants={{ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } }} className="mt-7 max-w-2xl text-xl leading-8 text-white/80">
            A premium campaign command center for planning, reviewing, approving, exporting, and learning across every Shatterproof content channel.
          </motion.p>
          <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#calendar" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#80E6DC] px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-[#041E42] transition hover:bg-white">
              View Content System <ArrowRight size={18} />
            </a>
            <a href="#workflow" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:border-[#80E6DC] hover:text-[#80E6DC]">
              Explore Workflow <ChevronRight size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }} className="glass-panel brand-shadow rounded-[8px] p-5">
          <div className="grid grid-cols-2 gap-3">
            {metrics.slice(0, 4).map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="rounded-[8px] bg-white p-4 text-[#041E42]">
                  <Icon className="text-[#4F2D7F]" size={22} />
                  <p className="mt-6 text-3xl font-black">{metric.value}</p>
                  <p className="caption mt-2 text-[#041E42]/60">{metric.label}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-3 rounded-[8px] bg-[#80E6DC] p-5 text-[#041E42]">
            <p className="caption">Workspace Mode</p>
            <p className="mt-3 text-2xl font-black leading-tight">Searchable calendar, review queue, asset library, and weekly briefs in one operational surface.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All Platforms");
  const [themeFilter, setThemeFilter] = useState("All Themes");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortMode, setSortMode] = useState("Week");
  const [viewMode, setViewMode] = useState<"Calendar" | "Board" | "List">("Calendar");
  const [selectedWeek, setSelectedWeek] = useState(1);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts
      .filter((post) => platformFilter === "All Platforms" || post.platform === platformFilter)
      .filter((post) => themeFilter === "All Themes" || post.theme === themeFilter)
      .filter((post) => statusFilter === "All Statuses" || post.status === statusFilter)
      .filter((post) => {
        if (!normalized) return true;
        return [post.platform, post.type, post.hook, post.caption, post.owner, post.reviewer, post.status, post.theme].join(" ").toLowerCase().includes(normalized);
      })
      .sort((a, b) => (sortMode === "Week" ? a.weekId - b.weekId || a.day - b.day : a.day - b.day));
  }, [platformFilter, query, sortMode, statusFilter, themeFilter]);

  const selectedWeekData = weeks.find((week) => week.id === selectedWeek) ?? weeks[0];
  const selectedWeekPosts = posts.filter((post) => post.weekId === selectedWeek);

  return (
    <main>
      <Hero />

      <section id="dashboard" className="px-5 py-24 md:px-8">
        <SectionIntro eyebrow="Executive Overview" title="A command center for real content operations.">
          The system supports weekly planning, publishing, approval workflows, cross-channel coordination, asset reuse, and performance visibility without losing the human Shatterproof voice.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["How to use this planner", "Start with weekly themes, confirm platform cadence, then move posts through draft, review, approval, scheduling, and reflection."],
            ["Planner logic", "The month moves from awareness into treatment clarity, then recovery storytelling, then concrete action."],
            ["Content principles", "Clear over clever, human over institutional, evidence-driven over vague, stigma-safe over sensational."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-[8px] border border-[#041E42]/12 bg-white p-7 brand-shadow">
              <p className="caption text-[#4F2D7F]">{title}</p>
              <p className="mt-5 text-lg leading-8 text-[#041E42]/72">{body}</p>
            </article>
          ))}
        </motion.div>
        <motion.div {...fadeIn} className="mx-auto mt-5 grid max-w-7xl gap-5 md:grid-cols-4">
          {[
            ["Execution notes", "Timing windows guide publishing, but live performance and campaign context should lead final decisions."],
            ["Approval workflow", "Drafts move through language review, brand review, clinical or equity review when needed, then scheduling."],
            ["Collaboration notes", "Each content card carries owner, reviewer, comment count, and approval state for handoff clarity."],
            ["Brand safety reminders", "Avoid shame, stereotypes, generic wellness language, unsupported claims, and dark exploitative visuals."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-[8px] bg-[#E6FAF8] p-6 text-[#041E42]">
              <p className="caption text-[#041E42]/60">{title}</p>
              <p className="mt-4 text-sm leading-6">{body}</p>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="navy-band px-5 py-24 md:px-8">
        <SectionIntro inverse eyebrow="Platform-Specific Primary Focus" title="Channel strategy is built into the workspace.">
          Each platform has a distinct job, cadence, tone, and CTA pattern so the calendar feels operational rather than decorative.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-5">
          {platformStrategies.map((item) => (
            <article key={item.platform} className="rounded-[8px] bg-white p-5 text-[#041E42]">
              <p className="caption text-[#4F2D7F]">{item.platform}</p>
              <h3 className="mt-5 text-2xl font-black leading-tight">{item.focus}</h3>
              <dl className="mt-6 space-y-4 text-sm leading-6">
                {[
                  ["Best content", item.contentTypes],
                  ["Cadence", item.cadence],
                  ["Windows", item.windows],
                  ["CTA guidance", item.cta],
                  ["Tone", item.tone],
                  ["Use case", item.useCase]
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="caption text-[#041E42]/50">{label}</dt>
                    <dd className="mt-1 text-[#041E42]/72">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <SectionIntro eyebrow="Platform Posting Cadence" title="A premium cadence dashboard for publishing decisions.">
          Recommended days, format choices, engagement expectations, and rationale are visible before teams commit production time.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-5">
          {platformStrategies.map((item) => (
            <article key={item.platform} className="rounded-[8px] border border-[#041E42]/12 bg-white p-6 brand-shadow">
              <div className="flex items-center justify-between gap-3">
                <PlatformChip platform={item.platform} />
                <CalendarDays size={22} className="text-[#4F2D7F]" />
              </div>
              <p className="mt-6 text-3xl font-black leading-none">{item.cadence}</p>
              <p className="mt-4 text-sm font-bold text-[#041E42]/72">{item.windows}</p>
              <p className="mt-5 text-sm leading-6 text-[#041E42]/68">{item.notes}</p>
              <div className="mt-5 rounded-[8px] bg-[#E6FAF8] p-4">
                <p className="caption text-[#041E42]/55">Formats</p>
                <p className="mt-2 text-sm leading-6">{item.contentTypes}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </section>

      <section id="calendar" className="metric-grid-line px-5 py-24 md:px-8">
        <SectionIntro eyebrow="Collaborative Calendar" title="Search, filter, review, approve, and export from one planning surface.">
          This workspace restores the planner controls and makes the content cards actionable: status, owners, reviewers, comments, platform tags, and approval states.
        </SectionIntro>

        <motion.div {...fadeIn} className="mx-auto mt-12 max-w-7xl rounded-[8px] bg-[#041E42] p-5 text-white brand-shadow">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#041E42]/55" size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search planner, owner, hook, reviewer..." className="h-12 w-full rounded-full border-0 bg-white pl-11 pr-4 text-sm font-bold text-[#041E42] outline-none ring-2 ring-transparent transition focus:ring-[#80E6DC]" />
            </label>
            <select value={platformFilter} onChange={(event) => setPlatformFilter(event.target.value)} className="h-12 rounded-full border border-white/20 bg-white px-4 text-sm font-black text-[#041E42]">
              {filterPlatforms.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={themeFilter} onChange={(event) => setThemeFilter(event.target.value)} className="h-12 rounded-full border border-white/20 bg-white px-4 text-sm font-black text-[#041E42]">
              <option>All Themes</option>
              {contentThemes.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-12 rounded-full border border-white/20 bg-white px-4 text-sm font-black text-[#041E42]">
              <option>All Statuses</option>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)} className="h-12 rounded-full border border-white/20 bg-white px-4 text-sm font-black text-[#041E42]">
              <option>Week</option>
              <option>Date</option>
            </select>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white/70"><Filter size={16} /> {filteredPosts.length} content cards visible</div>
            <div className="flex rounded-full border border-white/20 p-1">
              {(["Calendar", "Board", "List"] as const).map((mode) => (
                <button key={mode} onClick={() => setViewMode(mode)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.1em] transition ${viewMode === mode ? "bg-[#80E6DC] text-[#041E42]" : "text-white/72 hover:text-white"}`}>
                  {mode === "Calendar" ? <CalendarDays size={15} /> : mode === "Board" ? <LayoutGrid size={15} /> : <List size={15} />}
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {viewMode === "Calendar" && (
          <motion.div {...fadeIn} className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-[8px] bg-white brand-shadow">
            <div className="grid grid-cols-7 bg-[#041E42] text-center text-xs font-black uppercase tracking-[0.12em] text-white">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day} className="p-3">{day}</div>)}
            </div>
            <div className="grid grid-cols-7">
              <div className="min-h-32 border border-[#041E42]/10 bg-[#CDD2D9]/25" />
              <div className="min-h-32 border border-[#041E42]/10 bg-[#CDD2D9]/25" />
              <div className="min-h-32 border border-[#041E42]/10 bg-[#CDD2D9]/25" />
              <div className="min-h-32 border border-[#041E42]/10 bg-[#CDD2D9]/25" />
              {januaryDays.map((day) => {
                const dayPosts = filteredPosts.filter((post) => post.day === day);
                const daySignals = monthlySignals.filter((signal) => signal.date.includes(`Jan ${day}`));
                return (
                  <div key={day} className="min-h-32 border border-[#041E42]/10 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black">{day}</span>
                      {daySignals.length > 0 && <span className="rounded-full bg-[#4F2D7F] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-white">Signal</span>}
                    </div>
                    <div className="mt-2 space-y-1">
                      {daySignals.map((signal) => (
                        <div key={signal.label} className="rounded-[6px] bg-[#E6FAF8] px-2 py-1 text-[11px] font-bold leading-4 text-[#041E42]">{signal.label}</div>
                      ))}
                      {dayPosts.slice(0, 3).map((post) => (
                        <button key={post.id} onClick={() => setSelectedWeek(post.weekId)} className="block w-full rounded-[6px] bg-[#041E42] px-2 py-1 text-left text-[11px] font-bold leading-4 text-white transition hover:bg-[#4F2D7F]">
                          {post.platform}: {post.type}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {viewMode === "Board" && (
          <motion.div {...fadeIn} className="mx-auto mt-8 grid max-w-7xl gap-4 lg:grid-cols-4">
            {weeks.map((week) => (
              <div key={week.id} className="rounded-[8px] bg-white p-4 brand-shadow">
                <p className="caption text-[#4F2D7F]">{week.week}</p>
                <h3 className="mt-2 text-2xl font-black">{week.theme}</h3>
                <div className="mt-5 space-y-3">
                  {filteredPosts.filter((post) => post.weekId === week.id).map((post) => (
                    <ContentCard key={post.id} post={post} onOpen={() => setSelectedWeek(post.weekId)} compact />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {viewMode === "List" && (
          <motion.div {...fadeIn} className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-[8px] bg-white brand-shadow">
            {filteredPosts.map((post) => (
              <div key={post.id} className="grid gap-4 border-b border-[#041E42]/10 p-5 lg:grid-cols-[120px_1fr_150px_160px]">
                <div>
                  <p className="caption text-[#4F2D7F]">{post.dayLabel}</p>
                  <p className="mt-2 text-sm font-black">{post.time}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2"><PlatformChip platform={post.platform} /><StatusChip status={post.status} /></div>
                  <h3 className="mt-3 text-xl font-black">{post.hook}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#041E42]/68">{post.caption}</p>
                </div>
                <div className="text-sm leading-6"><strong>Owner:</strong> {post.owner}<br /><strong>Reviewer:</strong> {post.reviewer}</div>
                <button onClick={() => setSelectedWeek(post.weekId)} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#80E6DC] px-4 text-xs font-black uppercase tracking-[0.1em] text-[#041E42]"><Eye size={16} /> Open</button>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      <section className="navy-band px-5 py-24 md:px-8">
        <SectionIntro inverse eyebrow="Weekly Overviews" title="Campaign briefs with action buttons and review context.">
          Each weekly card includes strategy, CTA intensity, audience state, visual direction, and direct Open, Review, and Export actions.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {weeks.map((week) => (
            <article key={week.theme} className="overflow-hidden rounded-[8px] bg-white text-[#041E42]">
              <div className="relative h-44"><Image src={week.asset} alt="" fill className="object-cover" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" /></div>
              <div className="p-6">
                <p className="caption text-[#4F2D7F]">{week.week} / {week.dates}</p>
                <h3 className="mt-4 text-3xl font-black leading-none">{week.theme}</h3>
                <p className="mt-4 text-sm leading-6 text-[#041E42]/72">{week.purpose}</p>
                <div className="mt-5 grid gap-2 text-xs font-bold uppercase tracking-[0.08em]">
                  <span>Audience: {week.audience}</span>
                  <span>CTA: {week.intensity}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button onClick={() => setSelectedWeek(week.id)} className="rounded-full bg-[#80E6DC] px-4 py-2 text-xs font-black uppercase tracking-[0.1em]">Open</button>
                  <button onClick={() => setSelectedWeek(week.id)} className="rounded-full border border-[#041E42]/20 px-4 py-2 text-xs font-black uppercase tracking-[0.1em]">Review</button>
                  <button className="inline-flex items-center gap-2 rounded-full bg-[#041E42] px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-white"><Download size={14} /> Export</button>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <motion.div {...fadeIn} className="mx-auto max-w-7xl rounded-[8px] border border-[#041E42]/12 bg-white p-6 brand-shadow md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="caption text-[#4F2D7F]">Deep Weekly Content Brief</p>
              <h2 className="mt-4 text-4xl font-black leading-none md:text-6xl">{selectedWeekData.theme}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#041E42]/72">{selectedWeekData.objective}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {weeks.map((week) => (
                <button key={week.id} onClick={() => setSelectedWeek(week.id)} className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.1em] ${selectedWeek === week.id ? "bg-[#80E6DC] text-[#041E42]" : "bg-[#E6FAF8] text-[#041E42]"}`}>{week.week}</button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["Primary focus", selectedWeekData.primaryFocus],
              ["Audience state", selectedWeekData.audience],
              ["CTA intensity", selectedWeekData.intensity],
              ["Visual tone", selectedWeekData.visualTone]
            ].map(([label, value]) => (
              <div key={label} className="rounded-[8px] bg-[#E6FAF8] p-5">
                <p className="caption text-[#041E42]/55">{label}</p>
                <p className="mt-3 text-sm font-bold leading-6">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[8px] bg-[#041E42] p-5 text-white">
            <p className="caption text-[#80E6DC]">What this week is doing</p>
            <p className="mt-3 text-lg leading-8 text-white/82">{selectedWeekData.doing}</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {selectedWeekPosts.map((post) => <ContentCard key={post.id} post={post} />)}
          </div>
          <div className="mt-8 rounded-[8px] border border-[#041E42]/12 p-5">
            <p className="caption text-[#4F2D7F]">Weekly Reflection</p>
            <div className="mt-5 grid gap-4 md:grid-cols-5">
              {[
                ["What worked", "Clear myth correction and practical resource framing drove saves and shares."],
                ["Needs adjustment", "Posts with broad claims need stronger source context before approval."],
                ["Audience signals", "Questions and saves indicate people want language they can reuse."],
                ["Platform notes", "Instagram and Facebook carry emotional clarity; LinkedIn carries systems authority."],
                ["Next-week recommendations", "Move from awareness into treatment clarity with low-friction resource CTAs."]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[8px] bg-[#E6FAF8] p-4">
                  <p className="caption text-[#041E42]/55">{label}</p>
                  <p className="mt-2 text-sm leading-6">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="purple-band px-5 py-24 md:px-8">
        <SectionIntro inverse eyebrow="Monthly Signals" title="Timing intelligence for January publishing.">
          Holidays, observances, operational slowdowns, and higher-engagement windows are visible so the team can schedule with care.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {monthlySignals.map((signal) => (
            <article key={`${signal.date}-${signal.label}`} className="rounded-[8px] bg-white p-6 text-[#041E42]">
              <div className="flex items-center justify-between gap-3">
                <p className="caption text-[#4F2D7F]">{signal.date}</p>
                <span className="rounded-full bg-[#E6FAF8] px-3 py-1 text-xs font-black uppercase tracking-[0.1em]">{signal.type}</span>
              </div>
              <h3 className="mt-5 text-2xl font-black">{signal.label}</h3>
              <p className="mt-3 text-sm leading-6 text-[#041E42]/72">{signal.note}</p>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <SectionIntro eyebrow="Awareness Days + Engagement Moments" title="Use cultural timing without diluting the mission.">
          Awareness days can increase relevance when handled with care. Lighter engagement moments can support visibility, but they are not where authority should be built.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[8px] bg-white p-6 brand-shadow">
            <p className="caption text-[#4F2D7F]">High-Value Awareness Days</p>
            <div className="mt-5 space-y-4">
              {awarenessDays.map(([name, date, fit, note]) => (
                <div key={name} className="grid gap-3 border-t border-[#041E42]/10 pt-4 md:grid-cols-[190px_120px_160px_1fr]">
                  <p className="font-black">{name}</p>
                  <p className="text-sm font-bold text-[#041E42]/60">{date}</p>
                  <p className="text-sm font-black text-[#4F2D7F]">{fit}</p>
                  <p className="text-sm leading-6 text-[#041E42]/72">{note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] bg-[#041E42] p-6 text-white">
            <p className="caption text-[#80E6DC]">High-Engagement Days</p>
            <h3 className="mt-5 text-3xl font-black leading-none">Useful for visibility, not authority.</h3>
            <p className="mt-5 text-sm leading-7 text-white/78">
              Lighter, shareable moments can drive reach and interaction when they support a clear mission point. They should never replace evidence-based education, and they should not turn addiction, treatment, or recovery into trend content.
            </p>
          </div>
        </motion.div>
      </section>

      <section id="workflow" className="navy-band px-5 py-24 md:px-8">
        <SectionIntro inverse eyebrow="Monthly Strategic Notes" title="What to lead with, what to avoid, and when to pivot.">
          For January, lead with grounded optimism rather than generic reset language. Seasonal context should support clarity, not shallow reinvention.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-5">
          {opportunities.map(([title, body]) => (
            <article key={title} className="rounded-[8px] bg-white p-6 text-[#041E42]">
              <p className="caption text-[#4F2D7F]">{title}</p>
              <p className="mt-5 text-sm leading-6 text-[#041E42]/72">{body}</p>
            </article>
          ))}
        </motion.div>
      </section>

      <section id="assets" className="px-5 py-24 md:px-8">
        <SectionIntro eyebrow="Asset Library" title="A shared team hub for approved content materials.">
          Existing assets are searchable by title, platform, and status, with preview thumbnails and operational metadata for reuse.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <label className="relative block min-w-[280px] flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#041E42]/55" size={18} />
            <input placeholder="Search asset library..." className="h-12 w-full rounded-full border border-[#041E42]/12 bg-white pl-11 pr-4 text-sm font-bold text-[#041E42] outline-none ring-2 ring-transparent transition focus:ring-[#80E6DC]" />
          </label>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#80E6DC] px-5 text-xs font-black uppercase tracking-[0.1em] text-[#041E42]"><Upload size={16} /> Upload New</button>
        </motion.div>
        <motion.div {...fadeIn} className="mx-auto mt-6 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-5">
          {assets.map((asset) => (
            <article key={asset.title} className="overflow-hidden rounded-[8px] bg-white brand-shadow">
              <div className="relative h-40 bg-[#E6FAF8]"><Image src={asset.image} alt="" fill className="object-cover" sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw" /></div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2"><span className="caption text-[#4F2D7F]">{asset.type}</span><StatusChip status={asset.status === "Ready" ? "Approved" : asset.status} /></div>
                <h3 className="mt-4 text-xl font-black leading-tight">{asset.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#041E42]/70">{asset.platforms}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.1em] text-[#041E42]/50">Last updated {asset.updated}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="purple-band px-5 py-24 md:px-8">
        <SectionIntro inverse eyebrow="Performance Intelligence" title="Evidence-driven learning without losing the mission.">
          The system visualizes impressions, engagement, CTR, conversions, and learnings so content decisions improve from week to week.
        </SectionIntro>
        <motion.div {...fadeIn} className="mx-auto mt-14 max-w-6xl rounded-[8px] bg-white p-6 text-[#041E42] md:p-8">
          <div className="grid gap-4 md:grid-cols-5">
            {[
              ["Impressions", "1.8M", "Reach quality tracked by theme"],
              ["Engagement", "6.4%", "Saves and shares weighted above vanity response"],
              ["CTR", "3.1%", "Resource clicks by intent level"],
              ["Conversions", "1,240", "Tool starts, sign-ups, and volunteer interest"],
              ["Learnings", "18", "Reusable insights for the next planning cycle"]
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-[8px] bg-[#E6FAF8] p-5">
                <p className="caption text-[#041E42]/60">{label}</p>
                <p className="mt-5 text-4xl font-black">{value}</p>
                <p className="mt-3 text-sm leading-6 text-[#041E42]/68">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid items-end gap-3 md:grid-cols-12">
            {[42, 64, 58, 76, 68, 88, 72, 91, 84, 96, 78, 86].map((height, index) => (
              <motion.div key={`${height}-${index}`} initial={{ height: 12 }} whileInView={{ height }} viewport={{ once: true }} transition={{ delay: index * 0.035, duration: 0.55 }} className="rounded-t-[8px] bg-[#041E42]" />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <motion.div {...fadeIn} className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="caption text-[#4F2D7F]">Final Impact</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] md:text-7xl">A scalable framework for stronger content execution.</h2>
            <p className="mt-7 text-xl leading-9 text-[#041E42]/72">
              The rebuilt SP Content System now behaves like a premium internal content calendar: teams can plan, search, filter, review, approve, export, manage assets, understand timing, and reflect on performance while staying aligned to Shatterproof's mission.
            </p>
          </div>
          <div className="rounded-[8px] bg-[#041E42] p-6 text-white brand-shadow">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [UsersRound, "Audience readiness"],
                [Megaphone, "Cross-channel clarity"],
                [BarChart3, "Performance learning"],
                [LineChart, "Sustained optimization"]
              ].map(([Icon, label]) => {
                const TypedIcon = Icon as React.ElementType;
                return (
                  <div key={label as string} className="rounded-[8px] border border-white/16 p-5">
                    <TypedIcon className="text-[#80E6DC]" size={28} />
                    <p className="mt-8 text-2xl font-black">{label as string}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-[8px] bg-[#80E6DC] p-5 text-[#041E42]">
              <p className="caption">Brand Anchor</p>
              <p className="mt-3 text-3xl font-black">Stronger than addiction</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function ContentCard({ post, onOpen, compact = false }: { post: Post; onOpen?: () => void; compact?: boolean }) {
  return (
    <article className={`rounded-[8px] border border-[#041E42]/12 bg-white ${compact ? "p-4" : "p-5"} text-[#041E42]`}>
      <div className="flex flex-wrap items-center gap-2">
        <PlatformChip platform={post.platform} />
        <StatusChip status={post.status} />
        <span className="rounded-full bg-[#E6FAF8] px-3 py-1 text-xs font-black uppercase tracking-[0.1em]">{post.genre}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="caption text-[#4F2D7F]">{post.dayLabel} / {post.time}</p>
          <h3 className={`${compact ? "mt-2 text-lg" : "mt-3 text-2xl"} font-black leading-tight`}>{post.hook}</h3>
        </div>
        {onOpen && <button onClick={onOpen} className="rounded-full bg-[#80E6DC] p-2 text-[#041E42]" aria-label="Open weekly brief"><Eye size={16} /></button>}
      </div>
      {!compact && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <p className="caption text-[#041E42]/50">Visual Description</p>
            <p className="mt-2 text-sm leading-6 text-[#041E42]/72">{post.visual}</p>
          </div>
          <div>
            <p className="caption text-[#041E42]/50">Caption</p>
            <p className="mt-2 text-sm leading-6 text-[#041E42]/72">{post.caption}</p>
          </div>
          <div>
            <p className="caption text-[#041E42]/50">CTA</p>
            <p className="mt-2 text-sm leading-6 text-[#041E42]/72">{post.cta}</p>
          </div>
          <div className="rounded-[8px] bg-[#E6FAF8] p-4">
            <p className="caption text-[#041E42]/55">Review Area</p>
            <p className="mt-2 text-sm font-bold leading-6">Owner: {post.owner}</p>
            <p className="text-sm font-bold leading-6">Reviewer: {post.reviewer}</p>
            <p className="text-sm font-bold leading-6">Comments: {post.comments}</p>
            <p className="text-sm font-bold leading-6">Approval: {post.approval}</p>
          </div>
        </div>
      )}
      {compact && (
        <div className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#041E42]/55">
          {post.owner} to {post.reviewer} / {post.comments} comments
        </div>
      )}
    </article>
  );
}
