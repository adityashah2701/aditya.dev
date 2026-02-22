import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProjectList() {
  return (
    <section className="mb-12 md:mb-20">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-primary font-mono text-sm">01.</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
          SELECTED PROJECTS
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="group bg-background-dark border border-border-dark hover:border-primary rounded-none overflow-hidden transition-all duration-300 shadow-none py-0 gap-0">
          <CardContent className="p-8 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl">
                  neurology
                </span>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-slate-500 hover:text-white transition-colors cursor-pointer">
                  description
                </span>
                <Link
                  href="/projects/neural-synthesis"
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                </Link>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Neural Synthesis Engine
            </h3>
            <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
              A real-time audio reconstruction system utilizing deep learning to
              upscale low-fidelity streams with sub-20ms latency.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <Badge
                variant="outline"
                className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded-none"
              >
                Python
              </Badge>
              <Badge
                variant="outline"
                className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded-none"
              >
                TensorFlow
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="group bg-background-dark border border-border-dark hover:border-primary rounded-none overflow-hidden transition-all duration-300 shadow-none py-0 gap-0">
          <CardContent className="p-8 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl">
                  grid_view
                </span>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-slate-500 hover:text-white transition-colors cursor-pointer">
                  description
                </span>
                <Link
                  href="/projects/vector-grid"
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                </Link>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Vector Grid Dashboard
            </h3>
            <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
              High-performance analytics dashboard capable of rendering 100k+
              data points in the browser using WebGL instancing.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <Badge
                variant="outline"
                className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded-none"
              >
                React
              </Badge>
              <Badge
                variant="outline"
                className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded-none"
              >
                WebGL
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
