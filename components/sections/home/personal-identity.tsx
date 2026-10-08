import { Separator } from "@/components/ui/separator";

export default function PersonalIdentity() {
  return (
    <section className="mb-6 md:mb-10">
      <header className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-primary font-mono text-sm">01.</span>
        <h2 className="text-base md:text-xl font-bold text-white tracking-tight uppercase">
          Personal_Identity_Node
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </header>
      <article className="bg-surface-dark border-l-2 border-primary/50 p-4 md:p-6 lg:p-8 rounded-none">
        <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-3 md:mb-5">
          I build modern software across the whole stack, from interfaces that
          feel sharp and responsive to the backend systems, APIs and databases
          behind them. Most of my work is in React, Next.js and TypeScript, with
          Node.js, Python (FastAPI, Django, Flask) and Convex on the server, and
          PostgreSQL, MongoDB and Redis for data.
        </p>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          I&apos;m especially interested in AI integration and agentic AI
          products: tools that do real work for people. I also enjoy developer
          tooling, real-time collaboration and the infrastructure behind it,
          including Docker, Kubernetes, AWS and Vercel. I care about solving
          real problems with simple, scalable systems.
        </p>
      </article>
    </section>
  );
}
