import { Separator } from "@/components/ui/separator";

export default function ProjectProblem() {
  return (
    <section className="mb-20 scroll-mt-24" id="problem">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-primary font-mono text-sm">01.</span>
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
          PROBLEM DEFINITION
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </div>
      <div className="bg-surface-dark border-l-2 border-primary/50 p-6 md:p-8 rounded-none">
        <p className="text-slate-300 leading-relaxed text-lg">
          Traditional synthesis engines suffer from significant latency when
          processing high-fidelity audio streams in real-time. The core
          challenge was to design a neural network architecture capable of
          regenerating lost packets.
        </p>
      </div>
    </section>
  );
}
