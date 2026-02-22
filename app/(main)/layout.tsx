import React from "react";
import MainClientLayout from "@/components/main-client-layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainClientLayout>{children}</MainClientLayout>;
}
