"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("TRANSMITTING...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("TRANSMISSION_SUCCESS");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus("TRANSMISSION_FAILED");
      }
    } catch {
      setStatus("TRANSMISSION_FAILED");
    }
  };

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
        <span className="hover:text-primary cursor-pointer transition-colors">
          user_profile
        </span>
        <span>/</span>
        <span className="text-primary font-bold bg-primary/10 px-1 rounded">
          contact
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-8 md:mb-12 border-b border-border-dark pb-6 md:pb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
            Initiate Connection
          </h1>
        </div>
      </div>

      <section className="mb-12 md:mb-20" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-background-dark border border-border-dark rounded-lg overflow-hidden shadow-2xl flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-2 bg-surface-dark border-b border-border-dark">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="size-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="size-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <span className="text-xs font-mono text-slate-500">
                contact_protocol.sh
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-6">
              <div className="font-mono text-sm text-slate-400 mb-2">
                <p className="mb-1">
                  <span className="text-green-500">user@sys:~$</span>{" "}
                  ./init_contact.sh
                </p>
                <p className="text-slate-500 italic">
                  # Please enter your transmission details below.
                </p>
                {status && (
                  <p className="text-primary font-bold mt-2">{status}</p>
                )}
              </div>
              <form
                className="flex flex-col gap-5 flex-1"
                onSubmit={handleSubmit}
              >
                <div className="group">
                  <label className="block text-xs font-mono text-primary mb-2 group-focus-within:text-white transition-colors">
                    &gt; INPUT_IDENTITY
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-background-dark border border-border-dark focus:border-primary text-slate-200 text-sm font-mono px-4 py-3 rounded-none outline-none transition-colors placeholder:text-slate-700"
                    placeholder="Enter your name or org..."
                    type="text"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-mono text-primary mb-2 group-focus-within:text-white transition-colors">
                    &gt; COMMS_FREQUENCY
                  </label>
                  <input
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-background-dark border border-border-dark focus:border-primary text-slate-200 text-sm font-mono px-4 py-3 rounded-none outline-none transition-colors placeholder:text-slate-700"
                    placeholder="email@address.protocol"
                    type="email"
                  />
                </div>
                <div className="group flex-1 flex flex-col">
                  <label className="block text-xs font-mono text-primary mb-2 group-focus-within:text-white transition-colors">
                    &gt; DATA_PACKET
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full flex-1 min-h-[120px] bg-background-dark border border-border-dark focus:border-primary text-slate-200 text-sm font-mono px-4 py-3 rounded-none outline-none transition-colors placeholder:text-slate-700 resize-none"
                    placeholder="Message content..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-mono text-sm font-bold py-3 px-6 transition-all border border-transparent hover:shadow-[0_0_15px_rgba(19,73,236,0.4)] flex items-center justify-center gap-2 group"
                >
                  <span>EXECUTE_TRANSMISSION</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    send
                  </span>
                </button>
              </form>
            </div>
          </div>
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
                  className="group flex items-center justify-between p-4 bg-background-dark border border-border-dark hover:border-primary/50 rounded transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-dark p-2 rounded border border-border-dark group-hover:border-primary/30 transition-colors text-slate-400 group-hover:text-primary">
                      <span className="material-symbols-outlined block">
                        mail
                      </span>
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
                  <span className="material-symbols-outlined text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </a>

                <a
                  href="https://github.com/adityashah2701"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 bg-background-dark border border-border-dark hover:border-primary/50 rounded transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-dark p-2 rounded border border-border-dark group-hover:border-primary/30 transition-colors text-slate-400 group-hover:text-primary">
                      <span className="material-symbols-outlined block">
                        code
                      </span>
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
                  <span className="material-symbols-outlined text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/aditya-shah-078b7a2a5"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 bg-background-dark border border-border-dark hover:border-primary/50 rounded transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-dark p-2 rounded border border-border-dark group-hover:border-primary/30 transition-colors text-slate-400 group-hover:text-primary">
                      <span className="material-symbols-outlined block">
                        hub
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">
                        LinkedIn Network
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-1">
                        linkedin.com/in/aditya-shah/
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
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
              <div className="bg-background-dark border border-border-dark rounded-lg p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      OPERATIONAL_STATE
                    </span>
                    <span className="flex items-center gap-2 text-xs font-mono text-green-500 border border-green-500/20 bg-green-500/10 px-2 py-1 rounded">
                      <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      OPTIMAL
                    </span>
                  </div>
                  <div className="h-px w-full bg-border-dark"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      RESPONSE_LATENCY
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      &lt; 24 HOURS
                    </span>
                  </div>
                  <div className="h-px w-full bg-border-dark"></div>
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
        </div>
      </section>
    </>
  );
}
