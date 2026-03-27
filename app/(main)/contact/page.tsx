import { Breadcrumb } from "@/components/sections/shared";
import {
  ContactHeader,
  ContactForm,
  ContactChannels,
} from "@/components/sections/contact";
import { Metadata } from "next";
import { SITE_URL, OG_IMAGE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Initiate Contact",
  description:
    "Get in touch with Aditya Shah — open to freelance projects, full-time roles, collaborations, and interesting technical conversations.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Initiate Contact | aditya.dev",
    description:
      "Reach out to Aditya Shah for collaborations, job opportunities, or technical discussions.",
    url: `${SITE_URL}/contact`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Initiate Contact | aditya.dev",
    description:
      "Reach out to Aditya Shah for collaborations, job opportunities, or technical discussions.",
    images: [OG_IMAGE_URL],
  },
};

export default function Contact() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "user_profile" },
    { label: "contact", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ContactHeader />
      <section className="mb-12 md:mb-20" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ContactForm />
          <ContactChannels />
        </div>
      </section>
    </>
  );
}
