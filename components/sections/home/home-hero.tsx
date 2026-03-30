import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Mail } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="flex flex-col gap-4 mb-6 md:mb-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
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
            LOC: <span className="text-slate-200">NAVI_MUMBAI, MH</span>
          </span>
        </div>
      </header>
      <div className="max-w-3xl mt-2 md:mt-4" data-nosnippet>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
          Designing scalable digital architecture. I specialize in building
          high-performance systems and intuitive interfaces. Currently
          engineering the future of web applications with a focus on
          optimization and user experience.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mt-4 md:mt-6">
        <Button className="flex items-center gap-2 h-auto px-4 md:px-6 py-2.5 md:py-3 bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold tracking-wide rounded-none transition-all shadow-[0_0_20px_rgba(19,73,236,0.3)] group">
          <Download className="w-4 h-4 md:w-[18px] md:h-[18px] group-hover:translate-y-[2px] transition-transform duration-200" />
          DOWNLOAD_CV
        </Button>
        <Link href="/contact" passHref>
          <Button
            variant="outline"
            className="flex items-center gap-2 h-auto px-4 md:px-6 py-2.5 md:py-3 bg-surface-dark border border-border-dark hover:border-slate-500 text-slate-300 text-xs md:text-sm font-bold tracking-wide rounded-none transition-all"
          >
            <Mail className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            CONTACT_ME
          </Button>
        </Link>
      </div>
      <Separator className="mt-4 md:mt-6 bg-border-dark" />
    </section>
  );
}
