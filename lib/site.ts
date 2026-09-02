/**
 * One spot to change the domain and identity.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (or .env) when the custom domain changes.
 */
// When the custom domain is live, change DEFAULT_URL to https://govind.dev
const DEFAULT_URL = "https://govind-dev-eta.vercel.app";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_URL,
  name: "govind.dev",
  title: "Govind",
  /** the one-line role, used wherever the name needs a job title next to it */
  role: "Full-stack developer",
  description:
    "Govind — full-stack developer shipping a school ERP SaaS end to end at Maahita Technologies, plus client and product work. Engineering journal included.",
  author: "Govind",
  email: "bammidigovindarao3825@gmail.com",
  linkedin: "https://www.linkedin.com/in/bammidi-govinda-rao-b8286a229/",
  github: "https://github.com/Govind-19",
  githubWork: "https://github.com/govindaraob-maahita",
  fine: "Govind — building the Maahita school ERP, and writing down what it teaches me.",
} as const;
