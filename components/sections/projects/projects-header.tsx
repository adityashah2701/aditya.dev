import { Separator } from "@/components/ui/separator";

export default function ProjectsHeader() {
  return (
    <div className="flex flex-col gap-4 mb-8 md:mb-12">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-6 md:mb-8">
          Projects & Experience
        </h1>
      </div>
      <Separator className="bg-border-dark" />
    </div>
  );
}
