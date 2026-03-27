import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, ArrowRight, Code, Network } from "lucide-react";

export default function ContactChannels() {
  return (
    <div className="flex flex-col gap-8 py-2">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary font-mono text-sm">##</span>
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            Direct Channels
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="mailto:adityashah2701.work@gmail.com"
            className="group flex items-center justify-between p-4 bg-background-dark border border-border-dark hover:border-primary/50 rounded-none transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-surface-dark p-2 rounded-none border border-border-dark group-hover:border-primary/30 transition-colors text-slate-400 group-hover:text-primary flex items-center justify-center">
                <Mail className="w-5 h-5 block" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">
                  Secure Email
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  adityashah2701.work@gmail.com
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href="https://github.com/adityashah2701"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between p-4 bg-background-dark border border-border-dark hover:border-primary/50 rounded-none transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-surface-dark p-2 rounded-none border border-border-dark group-hover:border-primary/30 transition-colors text-slate-400 group-hover:text-primary flex items-center justify-center">
                <Code className="w-5 h-5 block" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">
                  GitHub Registry
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  github.com/adityashah2701
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href="https://linkedin.com/in/adityashah2701"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between p-4 bg-background-dark border border-border-dark hover:border-primary/50 rounded-none transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-surface-dark p-2 rounded-none border border-border-dark group-hover:border-primary/30 transition-colors text-slate-400 group-hover:text-primary flex items-center justify-center">
                <Network className="w-5 h-5 block " />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">
                  LinkedIn Network
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  linkedin.com/in/adityashah2701
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary font-mono text-sm">##</span>
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            Network Status
          </h2>
        </div>
        <div className="bg-background-dark border border-border-dark rounded-none p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                OPERATIONAL_STATE
              </span>
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-[10px] font-mono text-green-500 border-green-500/20 bg-green-500/10 px-2 py-0.5 rounded-none uppercase font-bold"
              >
                <span className="size-1.5 rounded-none bg-green-500 animate-pulse"></span>
                OPTIMAL
              </Badge>
            </div>
            <Separator className="bg-border-dark" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                RESPONSE_LATENCY
              </span>
              <span className="text-xs font-mono text-slate-300">
                &lt; 24 HOURS
              </span>
            </div>
            <Separator className="bg-border-dark" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                PREFERRED_COMMS
              </span>
              <span className="text-xs font-mono text-slate-300">
                ASYNCHRONOUS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
