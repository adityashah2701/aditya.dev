import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SkillCategoryList() {
  return (
    <section className="mb-12 md:mb-20">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-primary font-mono text-sm">01.</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
          Core Languages &amp; Frameworks
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-surface-dark border border-border-dark rounded-none relative overflow-hidden group hover:border-primary/50 transition-colors shadow-none py-0 gap-0">
          <CardContent className="p-6">
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
                <span className="h-1.5 w-1.5 bg-primary rounded-none"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>TypeScript</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-none"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>Tailwind CSS</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-none"></span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-surface-dark border border-border-dark rounded-none relative overflow-hidden group hover:border-primary/50 transition-colors shadow-none py-0 gap-0">
          <CardContent className="p-6">
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
                <span className="h-1.5 w-1.5 bg-primary rounded-none"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>Python / Django</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-none"></span>
              </li>
              <li className="flex items-center justify-between text-sm text-slate-300">
                <span>PostgreSQL</span>
                <span className="h-1.5 w-1.5 bg-primary rounded-none"></span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
