import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack",
};

export default function Skills() {
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
          skills
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-8 md:mb-12 border-b border-border-dark pb-6 md:pb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
            Tech Stack Manifest
          </h1>
        </div>
      </div>

      <section className="mb-12 md:mb-20">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="text-primary font-mono text-sm">01.</span>
          <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
            Core Languages &amp; Frameworks
          </h2>
          <div className="h-px bg-border-dark flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-surface-dark border border-border-dark p-6 rounded relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary text-4xl">
                html
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-500 tracking-widest mb-4">
              FRONTEND_SYS
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>React / Next.js</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>TypeScript</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>Tailwind CSS</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
              </li>
            </ul>
          </div>
          <div className="bg-surface-dark border border-border-dark p-6 rounded relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary text-4xl">
                dns
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-500 tracking-widest mb-4">
              BACKEND_INFRA
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>Node.js / Express</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>Python / Django</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>PostgreSQL</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
