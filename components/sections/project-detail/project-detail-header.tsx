import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProjectDetailHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
            NEURAL SYNTHESIS ENGINE
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm md:text-base font-mono text-slate-400">
          <span>ID: NSE-2024-X</span>
          <Separator orientation="vertical" className="h-4 bg-border-dark" />
          <span className="flex items-center gap-2">
            STATUS: <span className="text-primary font-bold">DEPLOYED</span>
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button className="flex items-center gap-2 h-auto px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold tracking-wide rounded-none transition-all shadow-[0_0_15px_rgba(19,73,236,0.3)]">
          <span className="material-symbols-outlined text-lg">terminal</span>
          VIEW REPOSITORY
        </Button>
      </div>
      <Separator className="absolute bottom-0 left-0 bg-border-dark" />
    </div>
  );
}
