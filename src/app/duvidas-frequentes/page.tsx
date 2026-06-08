import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/institutional-page";
import { institutionalPages } from "@/data/institutional-pages";

const page = institutionalPages.faq;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.href,
  },
};

export default function FaqPage() {
  return <InstitutionalPage page={page} />;
}
