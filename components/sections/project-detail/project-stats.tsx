import { Card, CardContent } from "@/components/ui/card";

export default function ProjectStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {[
        { label: "Latency", value: "12ms" },
        { label: "Throughput", value: "10k", unit: "ops/s" },
        { label: "Accuracy", value: "99.8%" },
      ].map((stat, i) => (
        <Card
          key={i}
          className="bg-surface-dark border border-border-dark rounded-none hover:border-primary/50 transition-colors shadow-none py-0 gap-0"
        >
          <CardContent className="p-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-white transition-colors group-hover:text-primary">
              {stat.value}
              {stat.unit && (
                <span className="text-sm text-slate-500 font-normal ml-1">
                  {stat.unit}
                </span>
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
