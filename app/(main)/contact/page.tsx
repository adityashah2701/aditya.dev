import { Breadcrumb } from "@/components/sections/shared";
import {
  ContactHeader,
  ContactForm,
  ContactChannels,
} from "@/components/sections/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Initiate Contact",
  description:
    "Get in touch with Aditya Shah — open to freelance projects, full-time roles, collaborations, and interesting technical conversations.",
  path: "/contact",
  ogTitle: "Initiate Contact | aditya.dev",
  ogDescription:
    "Reach out to Aditya Shah for collaborations, job opportunities, or technical discussions.",
});

export default function Contact() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
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
