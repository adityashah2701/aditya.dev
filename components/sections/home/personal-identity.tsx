import { Separator } from "@/components/ui/separator";

export default function PersonalIdentity() {
  return (
    <section className="mb-12 md:mb-20">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-primary font-mono text-sm">01.</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
          Personal_Identity_Node
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </div>
      <div className="bg-surface-dark border-l-2 border-primary/50 p-4 md:p-6 lg:p-8 rounded-none">
        <p className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg mb-4 md:mb-6">
          I am a forward-thinking technologist and system architect obsessed
          with reducing complexity and building things that matter. At my core,
          I am driven by a curiosity to dissect how robust, massive-scale
          systems operate under the hood, seamlessly merging the bridge between
          the backend infrastructure and cutting-edge interactive frontend
          experiences.
        </p>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
          Beyond the IDE, I thrive in environments that challenge the status quo
          and demand relentless optimization. Whether refining deployment
          constraints or spinning up complex neural network data pipelines, I
          bring a methodical, calculated engineering ethos to everything I
          touch.
        </p>
      </div>
    </section>
  );
}
