import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initiate Contact",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
