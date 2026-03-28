"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export default function ContactForm() {
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
    <section className="bg-background-dark border border-border-dark overflow-hidden shadow-2xl flex flex-col h-full">
      <header className="flex items-center justify-between px-4 py-2 bg-surface-dark border-b border-border-dark">
        <div className="flex gap-2">
          <div className="size-3 bg-red-500/20 border border-red-500/50"></div>
          <div className="size-3 bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="size-3 bg-green-500/20 border border-green-500/50"></div>
        </div>
        <span className="text-xs font-mono text-slate-500">
          contact_protocol.sh
        </span>
      </header>
      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="font-mono text-sm text-slate-400 mb-2">
          <p className="mb-1">
            <span className="text-green-500">user@sys:~$</span>{" "}
            ./init_contact.sh
          </p>
          <p className="text-slate-500 italic">
            # Please enter your transmission details below.
          </p>
          {status && <p className="text-primary font-bold mt-2">{status}</p>}
        </div>
        <form className="flex flex-col gap-5 flex-1" onSubmit={handleSubmit}>
          <div className="grid gap-2 group">
            <Label
              className="block text-xs font-mono text-primary group-focus-within:text-white transition-colors uppercase"
              htmlFor="name"
            >
              &gt; INPUT_IDENTITY
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-background-dark border border-border-dark focus-visible:border-primary text-slate-200 text-sm font-mono px-4 py-3 outline-none transition-colors placeholder:text-slate-500 h-auto"
              placeholder="Enter your name or org..."
              type="text"
            />
          </div>
          <div className="grid gap-2 group">
            <Label
              className="block text-xs font-mono text-primary group-focus-within:text-white transition-colors uppercase"
              htmlFor="email"
            >
              &gt; COMMS_FREQUENCY
            </Label>
            <Input
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-background-dark border border-border-dark focus-visible:border-primary text-slate-200 text-sm font-mono px-4 py-3 outline-none transition-colors placeholder:text-slate-500 h-auto"
              placeholder="email@address.protocol"
              type="email"
            />
          </div>
          <div className="grid gap-2 group flex-1">
            <Label
              className="block text-xs font-mono text-primary group-focus-within:text-white transition-colors uppercase"
              htmlFor="message"
            >
              &gt; DATA_PACKET
            </Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full flex-1 min-h-[120px] bg-background-dark border border-border-dark focus-visible:border-primary text-slate-200 text-sm font-mono px-4 py-3 outline-none transition-colors placeholder:text-slate-500 resize-none"
              placeholder="Message content..."
            />
          </div>
          <Button
            type="submit"
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-mono text-sm font-bold py-6 px-6 transition-all border border-transparent hover:shadow-[0_0_15px_rgba(19,73,236,0.4)] flex items-center justify-center gap-2 group rounded-none"
          >
            <span>EXECUTE_TRANSMISSION</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
    </section>
  );
}
