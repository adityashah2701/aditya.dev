import Link from "next/link";

export default function ProjectDetail() {
  const terminalLogs = [
    "> init_sequence_start",
    "> loading_assets... OK",
    "> connecting_to_db... OK",
    <span key="wait" className="text-slate-400">
      &gt; waiting_for_input_
    </span>,
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-sm text-slate-500">
        <Link
          href="/"
          className="hover:text-primary cursor-pointer transition-colors"
        >
          root
        </Link>
        <span>/</span>
        <span className="hover:text-primary cursor-pointer transition-colors">
          sys
        </span>
        <span>/</span>
        <Link
          href="/#projects"
          className="hover:text-primary cursor-pointer transition-colors"
        >
          projects
        </Link>
        <span>/</span>
        <span className="text-primary font-bold bg-primary/10 px-1 rounded">
          neural_synthesis
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-border-dark pb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
              NEURAL SYNTHESIS ENGINE
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm md:text-base font-mono text-slate-400">
            <span>ID: NSE-2024-X</span>
            <span className="h-4 w-px bg-border-dark"></span>
            <span className="flex items-center gap-2">
              STATUS: <span className="text-primary font-bold">DEPLOYED</span>
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold tracking-wide rounded transition-all shadow-[0_0_15px_rgba(19,73,236,0.3)]">
            <span className="material-symbols-outlined text-lg">terminal</span>
            VIEW REPOSITORY
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="group relative p-5 bg-surface-dark border border-border-dark rounded hover:border-primary/50 transition-colors">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Latency
          </p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-white group-hover:text-primary transition-colors">
            12ms
          </p>
        </div>
        <div className="group relative p-5 bg-surface-dark border border-border-dark rounded hover:border-primary/50 transition-colors">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Throughput
          </p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-white group-hover:text-primary transition-colors">
            10k{" "}
            <span className="text-sm text-slate-500 font-normal">ops/s</span>
          </p>
        </div>
        <div className="group relative p-5 bg-surface-dark border border-border-dark rounded hover:border-primary/50 transition-colors">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Accuracy
          </p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-white group-hover:text-primary transition-colors">
            99.8%
          </p>
        </div>
      </div>

      <section className="mb-20 scroll-mt-24" id="problem">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary font-mono text-sm">01.</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            PROBLEM DEFINITION
          </h2>
          <div className="h-px bg-border-dark flex-1 ml-4"></div>
        </div>
        <div className="bg-surface-dark border-l-2 border-primary/50 p-6 md:p-8 rounded-r-lg">
          <p className="text-slate-300 leading-relaxed text-lg mb-4">
            Traditional synthesis engines suffer from significant latency when
            processing high-fidelity audio streams in real-time. The core
            challenge was to design a neural network architecture capable of
            regenerating lost packets.
          </p>
        </div>
      </section>

      <section className="mb-20 scroll-mt-24" id="architecture">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary font-mono text-sm">02.</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            ARCHITECTURE DESIGN
          </h2>
          <div className="h-px bg-border-dark flex-1 ml-4"></div>
        </div>

        <div className="relative bg-surface-dark border border-border-dark rounded-lg p-8 overflow-hidden group">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center gap-8 min-h-[300px]">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full justify-center">
              <div className="flex flex-col items-center gap-2 w-48">
                <div className="w-full p-4 bg-background-dark border border-slate-600 rounded text-center">
                  <p className="text-sm font-bold text-white">Audio Stream</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-600">
                arrow_forward
              </span>
              <div className="flex flex-col items-center gap-2 w-56">
                <div className="w-full p-6 bg-background-dark border border-primary rounded text-center">
                  <p className="text-base font-bold text-white">
                    Neural Synthesis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 scroll-mt-24" id="stack">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary font-mono text-sm">03.</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            TECH STACK
          </h2>
          <div className="h-px bg-border-dark flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-dark p-4 rounded border border-border-dark">
            <h3 className="text-white font-bold mb-1">Python 3.9+</h3>
            <p className="text-xs text-slate-400">
              Core logic & PyTorch integration
            </p>
          </div>
          <div className="bg-surface-dark p-4 rounded border border-border-dark">
            <h3 className="text-white font-bold mb-1">TensorFlow Lite</h3>
            <p className="text-xs text-slate-400">
              Edge inference optimization
            </p>
          </div>
          <div className="bg-surface-dark p-4 rounded border border-border-dark">
            <h3 className="text-white font-bold mb-1">Redis</h3>
            <p className="text-xs text-slate-400">Low-latency caching layer</p>
          </div>
        </div>
      </section>

      <section className="mb-12 scroll-mt-24" id="implementation">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary font-mono text-sm">04.</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            IMPLEMENTATION HIGHLIGHTS
          </h2>
          <div className="h-px bg-border-dark flex-1 ml-4"></div>
        </div>
        <div className="bg-background-dark border border-border-dark rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
          <div className="flex items-center px-4 py-2 bg-surface-dark border-b border-border-dark">
            <span className="text-xs text-slate-500">core_processor.py</span>
          </div>
          <div className="p-6 overflow-x-auto text-slate-300">
            <pre>
              <code>{`class NeuralSynthesizer:
    def __init__(self, model_path, quantization='int8'):
        self.engine = tf.lite.Interpreter(model_path=model_path)
        self.engine.allocate_tensors()
        self.quantization = quantization
        print(f"Engine initialized. Mode: {self.quantization}")`}</code>
            </pre>
          </div>
        </div>
      </section>
    </>
  );
}
