import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/institutional-page";
import { institutionalPages } from "@/data/institutional-pages";

const page = institutionalPages.shipping;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.href,
  },
};

export default function ShippingPage() {
  return <InstitutionalPage page={page} />;
}
