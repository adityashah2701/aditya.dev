import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProjectStack() {
  return (
    <section className="mb-20 scroll-mt-24" id="stack">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-primary font-mono text-sm">03.</span>
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
          TECH STACK
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Python 3.9+", desc: "Core logic & PyTorch integration" },
          { title: "TensorFlow Lite", desc: "Edge inference optimization" },
          { title: "Redis", desc: "Low-latency caching layer" },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-surface-dark border border-border-dark rounded-none shadow-none py-0 gap-0"
          >
            <CardContent className="p-4">
              <h3 className="text-white font-bold mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
