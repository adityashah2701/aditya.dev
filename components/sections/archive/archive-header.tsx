import { Separator } from "@/components/ui/separator";

export function ArchiveHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-12">
      <div className="flex items-center gap-3">
        <h1 className="mb-6 text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
          Archive
        </h1>
      </div>
      <Separator className="bg-border-dark" />
    </div>
  );
}
