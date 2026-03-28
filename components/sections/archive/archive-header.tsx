import { Separator } from "@/components/ui/separator";

export function ArchiveHeader() {
  return (
    <header className="mb-8 flex flex-col gap-6 md:mb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Archive
        </h1>
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-400">
          A curated record of certificates, proof of work, achievements, and
          supporting documents connected to my learning and professional work.
        </p>
      </div>
      <Separator className="bg-border-dark" />
    </header>
  );
}
