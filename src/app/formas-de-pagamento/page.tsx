import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/institutional-page";
import { institutionalPages } from "@/data/institutional-pages";

const page = institutionalPages.payments;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.href,
  },
};

export default function PaymentsPage() {
  return <InstitutionalPage page={page} />;
}
