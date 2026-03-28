import { Separator } from "@/components/ui/separator";

export default function SkillsHeader() {
  return (
    <header className="flex flex-col gap-6 mb-8 md:mb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
          Tech Stack
        </h1>
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-400">
          The languages, frameworks, infrastructure, and tooling I use to design,
          build, ship, and scale modern software systems.
        </p>
      </div>
      <Separator className="bg-border-dark" />
    </header>
  );
}
