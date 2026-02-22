import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repositories",
};

export default function Projects() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-sm text-slate-500">
        <Link
          href="/"
          className="hover:text-primary cursor-pointer transition-colors"
        >
          root
        </Link>
        <span>/</span>
        <span className="hover:text-primary cursor-pointer transition-colors">
          sys
        </span>
        <span>/</span>
        <span className="text-primary font-bold bg-primary/10 px-1 rounded">
          projects
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-8 md:mb-12 border-b border-border-dark pb-6 md:pb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
            Active Repositories
          </h1>
        </div>
      </div>

      <section className="mb-12 md:mb-20">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="text-primary font-mono text-sm">01.</span>
          <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight">
            SELECTED PROJECTS
          </h2>
          <div className="h-px bg-border-dark flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="group bg-background-dark border border-border-dark hover:border-primary rounded-lg overflow-hidden transition-all duration-300">
            <div className="p-8 flex flex-col h-full">
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
                    <span className="material-symbols-outlined">
                      open_in_new
                    </span>
                  </Link>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                Neural Synthesis Engine
              </h3>
              <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                A real-time audio reconstruction system utilizing deep learning
                to upscale low-fidelity streams with sub-20ms latency.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded">
                  Python
                </span>
                <span className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded">
                  TensorFlow
                </span>
              </div>
            </div>
          </div>
          <div className="group bg-background-dark border border-border-dark hover:border-primary rounded-lg overflow-hidden transition-all duration-300">
            <div className="p-8 flex flex-col h-full">
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
                    <span className="material-symbols-outlined">
                      open_in_new
                    </span>
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
                <span className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded">
                  React
                </span>
                <span className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-surface-dark border border-border-dark rounded">
                  WebGL
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
