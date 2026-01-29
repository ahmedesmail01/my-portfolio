export type Project = {
  title: string;
  stack: string[];
  summary: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Fittra Training — LMS",
    stack: [
      "Next.js",
      "Shadcn",
      "Zustand",
      "Stripe",
      "Tabby",
      "Tamara",
      "Zoom SDK",
    ],
    summary:
      "Learning platform with modern UI, payment integrations, and scalable frontend architecture.",
    tags: ["LMS", "Payments", "Performance"],
  },
  {
    title: "Fittra Stream — Streaming Platform",
    stack: ["Next.js", "Shadcn", "SEO"],
    summary:
      "SEO-optimized streaming experience with fast navigation and clean UI patterns.",
    tags: ["SEO", "App Router"],
  },
  {
    title: "MTN Institute — LMS",
    stack: ["Next.js", "Ant Design", "Redux Toolkit"],
    summary:
      "Enterprise LMS frontend with state management, modular pages, and maintainable UI.",
    tags: ["Enterprise", "State"],
  },
  {
    title: "Shipping Request & Tracking (ServiceNow)",
    stack: ["ServiceNow", "ITSM", "RBAC", "Workflows"],
    summary:
      "Enterprise ITSM-based shipping lifecycle: approvals, pricing, logistics scheduling, tracking.",
    tags: ["ServiceNow", "Automation"],
  },
];
