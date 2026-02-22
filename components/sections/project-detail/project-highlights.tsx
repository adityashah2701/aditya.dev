import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProjectHighlights() {
  return (
    <section className="mb-12 scroll-mt-24" id="implementation">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-primary font-mono text-sm">04.</span>
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
          IMPLEMENTATION HIGHLIGHTS
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
      </div>
      <Card className="bg-background-dark border border-border-dark rounded-none overflow-hidden font-mono text-sm shadow-2xl py-0 gap-0">
        <CardHeader className="flex flex-row items-center px-4 py-2 bg-surface-dark border-b border-border-dark space-y-0">
          <span className="text-xs text-slate-500">core_processor.py</span>
        </CardHeader>
        <CardContent className="p-6 overflow-x-auto text-slate-300">
          <pre>
            <code>{`class NeuralSynthesizer:
    def __init__(self, model_path, quantization='int8'):
        self.engine = tf.lite.Interpreter(model_path=model_path)
        self.engine.allocate_tensors()
        self.quantization = quantization
        print(f"Engine initialized. Mode: {self.quantization}")`}</code>
          </pre>
        </CardContent>
      </Card>
    </section>
  );
}
