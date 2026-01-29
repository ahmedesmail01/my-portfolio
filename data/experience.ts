export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  stack: string[];
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Roma MPH",
    role: "Frontend Developer (Next.js / React)",
    period: "Feb 2025 — Present",
    location: "Remote",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "Next-Intl",
      "Tailwind",
    ],
    highlights: [
      "Built scalable UI modules using Next.js App Router and modern patterns.",
      "Worked on performance, SEO, and production-ready UI systems.",
      "Localization-ready UI and clean component architecture.",
    ],
  },
  {
    company: "Manage The Now LLC",
    role: "Frontend Developer",
    period: "Jul 2024 — Feb 2025",
    location: "Remote",
    stack: [
      "Next.js",
      "TypeScript",
      "React Hook Form",
      "Zod",
      "Ant Design",
      "Shadcn",
      "Stripe",
    ],
    highlights: [
      "Shipped UI flows with validated forms and clean DX.",
      "Improved performance and UX across multiple user journeys.",
      "Worked with integrations (payments, auth, maps) and production constraints.",
    ],
  },
  {
    company: "ServiceNow Internship / Projects",
    role: "ServiceNow Developer",
    period: "2025",
    location: "Hybrid",
    stack: [
      "ServiceNow",
      "ITSM",
      "Service Catalog",
      "RBAC",
      "Approvals",
      "Notifications",
    ],
    highlights: [
      "Built workflows, approvals, notifications, and role-based access.",
      "Delivered service catalog experiences and automation logic.",
      "Focused on structured implementation and maintainability.",
    ],
  },
];

/**
 * Quick editable counters (feel free to adjust)
 * - These are placeholders so you can control what you claim publicly.
 */
export const portfolioCounters = [
  { label: "Years Experience", value: 2 },
  { label: "Products / Systems", value: 6 },
  { label: "Workflows Automated", value: 12 },
  { label: "UI Modules Shipped", value: 40 },
];
