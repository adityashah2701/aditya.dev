"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useMemo } from "react";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SkillSection } from "@/constants/skills";
import {
  Code2,
  Database,
  HardDrive,
  Network,
  Server,
  Terminal,
  Palette,
  Layers,
  Languages,
  Settings,
  Cpu,
  Monitor,
  LayoutGrid,
  Globe,
  Webhook,
  Brackets,
  Blocks,
  Cloud,
  Atom,
  Hammer,
  HardHat,
  Gamepad,
  Smartphone,
  Shield,
  Zap,
  Bug,
  Braces,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  javascript: Braces,
  database: Database,
  storage: HardDrive,
  dns: Network,
  server: Server,
  terminal: Terminal,
  palette: Palette,
  layers: Layers,
  language: Languages,
  settings: Settings,
  memory: Cpu,
  desktop_windows: Monitor,
  view_quilt: LayoutGrid,
  code: Code2,
  web: Globe,
  api: Webhook,
  data_object: Brackets,
  widgets: Blocks,
  cloud: Cloud,
  science: Atom,
  build: Hammer,
  bug_report: Bug,
  construction: HardHat,
  sports_esports: Gamepad,
  smartphone: Smartphone,
  security: Shield,
  bolt: Zap,
  // Fallbacks mapping
};

const getIcon = (iconName: string) => {
  const Icon = ICON_MAP[iconName?.toLowerCase()] || Code2;
  return <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />;
};

interface SkillCategoryListProps {
  preloadedTechStack: Preloaded<typeof api.techstack.getTechStack>;
}

export default function SkillCategoryList({
  preloadedTechStack,
}: SkillCategoryListProps) {
  const techStackData = usePreloadedQuery(preloadedTechStack);

  const sections = useMemo(() => {
    const grouped = techStackData.reduce<Record<string, SkillSection>>(
      (acc, item) => {
        if (!acc[item.sectionTitle]) {
          acc[item.sectionTitle] = {
            title: item.sectionTitle,
            categories: [],
          };
        }
        acc[item.sectionTitle].categories.push({
          id: item.categoryId,
          title: item.categoryTitle,
          icon: item.icon,
          skills: item.skills,
        });
        return acc;
      },
      {},
    );

    return Object.values(grouped);
  }, [techStackData]);

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      {sections.map((section, index) => (
        <section key={index}>
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="text-primary font-mono text-sm">
              0{index + 1}.
            </span>
            <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
              {section.title}
            </h2>
            <Separator className="flex-1 ml-4 bg-border-dark" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {section.categories.map((category) => (
              <Card
                key={category.id}
                className="h-fit bg-surface-dark border border-border-dark rounded-none relative overflow-hidden group hover:border-primary/50 transition-colors shadow-none py-0 gap-0"
              >
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                    {getIcon(category.icon)}
                  </div>
                  <h3 className="text-xs font-bold text-slate-500 tracking-widest mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="flex items-center justify-between text-sm text-slate-300"
                      >
                        <span>{skill.name}</span>
                        <span className="h-1.5 w-1.5 bg-primary rounded-none"></span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
