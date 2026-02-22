import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function Home() {
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
          home
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-12 md:mb-20 border-b border-border-dark pb-8 md:pb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
            ADITYA SHAH
          </h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 font-mono text-slate-400 mt-2">
            <span className="px-2 py-0.5 border border-primary/50 text-primary bg-primary/10 rounded text-[10px] md:text-xs">
              ROLE: FULL_STACK_ENGINEER
            </span>
            <span className="hidden sm:block h-4 w-px bg-border-dark"></span>
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
          <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold tracking-wide rounded transition-all shadow-[0_0_20px_rgba(19,73,236,0.3)] group">
            <span className="material-symbols-outlined text-base md:text-lg group-hover:animate-bounce">
              download
            </span>
            DOWNLOAD_CV
          </button>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-surface-dark border border-border-dark hover:border-slate-500 text-slate-300 text-xs md:text-sm font-bold tracking-wide rounded transition-all"
          >
            <span className="material-symbols-outlined text-base md:text-lg">
              mail
            </span>
            CONTACT_ME
          </Link>
        </div>
      </div>

      <section className="mb-12 md:mb-20">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="text-primary font-mono text-sm">01.</span>
          <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
            Personal_Identity_Node
          </h2>
          <div className="h-px bg-border-dark flex-1 ml-4"></div>
        </div>
        <div className="bg-surface-dark border-l-2 border-primary/50 p-4 md:p-6 lg:p-8 rounded-r-lg">
          <p className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg mb-4 md:mb-6">
            I am a forward-thinking technologist and system architect obsessed
            with reducing complexity and building things that matter. At my
            core, I am driven by a curiosity to dissect how robust,
            massive-scale systems operate under the hood, seamlessly merging the
            bridge between the backend infrastructure and cutting-edge
            interactive frontend experiences.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
            Beyond the IDE, I thrive in environments that challenge the status
            quo and demand relentless optimization. Whether refining deployment
            constraints or spinning up complex neural network data pipelines, I
            bring a methodical, calculated engineering ethos to everything I
            touch.
          </p>
        </div>
      </section>
    </>
  );
}
