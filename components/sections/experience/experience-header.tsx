import { Separator } from "@/components/ui/separator";

export default function ExperienceHeader() {
  return (
    <div className="mb-8 md:mb-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-6 md:mb-8">
        Deployment History
      </h1>
      <Separator className="bg-border-dark" />
    </div>
  );
}
