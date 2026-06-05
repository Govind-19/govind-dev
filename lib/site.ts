/**
 * One spot to change the domain and identity.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (or .env) when the custom domain changes.
 */
// When the custom domain is live, change DEFAULT_URL to https://govind.dev
const DEFAULT_URL = "https://govind-dev-eta.vercel.app";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_URL,
  name: "govind.dev",
  title: "Govind — Building in public",
  description:
    "Software engineer at Maahita Technologies, shipping a real school ERP product end-to-end. An engineering journal: what I get wrong, and what shipping teaches me.",
  author: "Govind",
  email: "bammidigovindarao3825@gmail.com",
  linkedin: "https://www.linkedin.com/in/bammidi-govinda-rao-b8286a229/",
  github: "https://github.com/Govind-19",
  fine: "Govind — building the Maahita school ERP, one shipped lesson at a time.",
} as const;
