import { Breadcrumb } from "@/components/sections/shared";
import {
  ContactHeader,
  ContactForm,
  ContactChannels,
} from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Initiate Contact",
  description:
    "Contact Aditya Shah, Full Stack Developer in Navi Mumbai, India, about freelance projects, full-time roles or collaborations on web and AI products.",
  path: "/contact",
  ogDescription:
    "Get in touch with Aditya Shah about freelance work, full-time roles or collaborations on web apps and AI products.",
});

export default function Contact() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "contact", isLast: true },
  ];

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Contact", path: "/contact" },
        ])}
      />
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
