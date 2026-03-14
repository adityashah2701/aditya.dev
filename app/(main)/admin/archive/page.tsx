"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Plus, Loader2, CheckCircle2, Award } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/sections/shared";

export default function AdminArchivePage() {
  const router = useRouter();
  const generateUploadUrl = useMutation(api.certificates.generateUploadUrl);
  const createCertificate = useMutation(api.certificates.createCertificate);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    issuedDate: "",
    description: "",
    verificationUrl: "",
    tags: [] as string[],
  });
  
  const [currentTag, setCurrentTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsPdf(file.type === "application/pdf");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (raw: string = currentTag) => {
    // Split on commas, trim each, filter duplicates and empty strings
    const newTags = raw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && !formData.tags.includes(t));

    if (newTags.length > 0) {
      setFormData({ ...formData, tags: [...formData.tags, ...newTags] });
    }
    setCurrentTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Get upload URL
      const postUrl = await generateUploadUrl();

      // 2. Upload file
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      const { storageId } = await result.json();

      // 3. Create record
      await createCertificate({
        ...formData,
        fileId: storageId,
        fileType: selectedFile.type,
      });

      toast.success("Certificate uploaded successfully!");
      router.push("/archive");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "admin" },
    { label: "archive", isLast: true },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white">
          Manage Archive
        </h1>
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
          Upload new certificates and achievements to your gallery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden border border-border-dark bg-surface-dark group">
            <CardContent className="p-0">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-4/3 flex flex-col items-center justify-center cursor-pointer hover:bg-background-dark/50 transition-colors"
              >
                {previewUrl ? (
                  isPdf ? (
                    <div className="flex flex-col items-center gap-4 p-6 text-center">
                      <div className="p-6 rounded-2xl bg-background-dark border border-primary/20 shadow-xl">
                        <Award className="w-10 h-10 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-primary">PDF SELECTED</span>
                        <span className="text-[8px] text-slate-500 font-mono block truncate max-w-[150px]">{selectedFile?.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 text-[8px] uppercase font-mono hover:text-primary" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setPreviewUrl(null); }}>Change File</Button>
                    </div>
                  ) : (
                    <Image src={previewUrl} alt="Preview" width={400} height={300} className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-4 p-6 text-center">
                    <div className="p-4 rounded-full bg-background-dark border border-border-dark group-hover:border-primary/40 group-hover:scale-110 transition-all">
                      <Upload className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase block">Click to upload file</span>
                      <span className="text-[10px] text-slate-500 font-mono">PNG, JPG, WebP or PDF</span>
                    </div>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,application/pdf"
              />
            </CardContent>
          </Card>

          <Card className="bg-surface-dark border-border-dark">
            <CardHeader className="p-4 pb-2 border-b border-border-dark/60">
              <CardTitle className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Metadata Info</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
               <div className="bg-background-dark border border-border-dark rounded-lg p-3 text-[10px] font-mono text-slate-500 leading-relaxed uppercase tracking-wider">
                  <p>Images are stored in Convex Storage and optimized for proof-of-work display.</p>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="bg-surface-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white uppercase tracking-tight">Certificate Details</CardTitle>
              <CardDescription className="text-slate-500 font-mono text-xs uppercase">Enter the information exactly as it appears on the credential.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Credential Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Meta Front-End Developer" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-background-dark border-border-dark focus-visible:ring-primary/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org" className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Issuing Organization</Label>
                  <Input 
                    id="org" 
                    placeholder="e.g. Coursera / Meta" 
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="bg-background-dark border-border-dark focus-visible:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Issued Date</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={formData.issuedDate}
                    onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                    className="bg-background-dark border-border-dark focus-visible:ring-primary/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verify" className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Verification URL (Optional)</Label>
                  <Input 
                    id="verify" 
                    placeholder="https://..." 
                    value={formData.verificationUrl}
                    onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                    className="bg-background-dark border-border-dark focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc" className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Quick Description (Optional)</Label>
                <Textarea 
                  id="desc" 
                  placeholder="Summarize the core impact or skills validated..." 
                  className="min-h-[100px] bg-background-dark border-border-dark focus-visible:ring-primary/20"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Tags / Skills</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="React, AWS, Security..." 
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); addTag(); }
                      // Comma also adds the tag
                      if (e.key === ",") {
                        e.preventDefault();
                        addTag(currentTag);
                      }
                    }}
                    className="bg-background-dark border-border-dark focus-visible:ring-primary/20"
                  />
                  <Button type="button" variant="outline" onClick={() => addTag()} className="border-border-dark hover:border-primary/40">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} className="px-2 py-0.5 bg-background-dark border border-border-dark rounded text-[10px] font-mono text-slate-400 gap-1 pl-2 pr-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full py-7 text-xs font-mono font-bold tracking-widest uppercase bg-primary text-black hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Upload to Archive
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
