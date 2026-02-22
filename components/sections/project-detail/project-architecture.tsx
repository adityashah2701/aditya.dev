import { Separator } from "@/components/ui/separator";

export default function ProjectArchitecture() {
  return (
    <section className="mb-20 scroll-mt-24" id="architecture">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-primary font-mono text-sm">02.</span>
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
          ARCHITECTURE DESIGN
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </div>

      <div className="relative bg-surface-dark border border-border-dark rounded-none p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 min-h-[300px]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full justify-center">
            <div className="flex flex-col items-center gap-2 w-48">
              <div className="w-full p-4 bg-background-dark border border-slate-600 rounded-none text-center">
                <p className="text-sm font-bold text-white">Audio Stream</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-600">
              arrow_forward
            </span>
            <div className="flex flex-col items-center gap-2 w-56">
              <div className="w-full p-6 bg-background-dark border border-primary rounded-none text-center">
                <p className="text-base font-bold text-white">
                  Neural Synthesis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
