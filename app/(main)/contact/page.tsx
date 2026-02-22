import { Breadcrumb } from "@/components/sections/shared";
import {
  ContactHeader,
  ContactForm,
  ContactChannels,
} from "@/components/sections/contact";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Initiate Contact",
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
