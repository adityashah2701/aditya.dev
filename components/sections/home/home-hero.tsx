import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HomeHero() {
  return (
    <div className="flex flex-col gap-4 mb-12 md:mb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
          ADITYA SHAH
        </h1>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 font-mono text-slate-400 mt-2">
          <Badge
            variant="outline"
            className="px-2 py-0.5 border border-primary/50 text-primary bg-primary/10 rounded-none text-[10px] md:text-xs font-bold uppercase"
          >
            ROLE: FULL_STACK_ENGINEER
          </Badge>
          <Separator
            orientation="vertical"
            className="hidden sm:block h-4 bg-border-dark"
          />
          <span className="flex items-center gap-2 text-xs md:text-sm">
            LOC: <span className="text-slate-200">MUMBAI, MH</span>
          </span>
        </div>
      </div>
      <div className="max-w-3xl mt-2 md:mt-4">
        <p className="text-slate-300 leading-relaxed text-base md:text-lg lg:text-xl font-light">
          Designing scalable digital architecture. I specialize in building
          high-performance systems and intuitive interfaces. Currently
          engineering the future of web applications with a focus on
          optimization and user experience.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mt-4 md:mt-6">
        <Button className="flex items-center gap-2 h-auto px-4 md:px-6 py-2.5 md:py-3 bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold tracking-wide rounded-none transition-all shadow-[0_0_20px_rgba(19,73,236,0.3)] group">
          <span className="material-symbols-outlined text-base md:text-lg group-hover:animate-bounce">
            download
          </span>
          DOWNLOAD_CV
        </Button>
        <Link href="/contact" passHref>
          <Button
            variant="outline"
            className="flex items-center gap-2 h-auto px-4 md:px-6 py-2.5 md:py-3 bg-surface-dark border border-border-dark hover:border-slate-500 text-slate-300 text-xs md:text-sm font-bold tracking-wide rounded-none transition-all"
          >
            <span className="material-symbols-outlined text-base md:text-lg">
              mail
            </span>
            CONTACT_ME
          </Button>
        </Link>
      </div>
      <Separator className="mt-8 md:mt-12 bg-border-dark" />
    </div>
  );
}
