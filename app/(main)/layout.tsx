import React from "react";
import MainClientLayout from "@/components/MainClientLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainClientLayout>{children}</MainClientLayout>;
}
