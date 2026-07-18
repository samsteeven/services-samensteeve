"use client";

import { User, Mail, Phone, Search, Building, Briefcase } from "lucide-react";
import type { StepProps } from "./types";

export function StepContact({ form, t }: StepProps) {
  const { fields } = t.contact;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
            {fields.nameLabel}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
              <User className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={form.data.name}
              onChange={(e) => form.updateField("name", e.target.value)}
              placeholder={fields.namePlaceholder}
              className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
            {fields.emailLabel}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              value={form.data.email}
              onChange={(e) => form.updateField("email", e.target.value)}
              placeholder={fields.emailPlaceholder}
              className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
            {fields.companyLabel}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
              <Building className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={form.data.company}
              onChange={(e) => form.updateField("company", e.target.value)}
              placeholder={fields.companyPlaceholder}
              className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
            {fields.roleLabel}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
              <Briefcase className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={form.data.role}
              onChange={(e) => form.updateField("role", e.target.value)}
              placeholder={fields.rolePlaceholder}
              className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
            {fields.whatsappLabel}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
              <Phone className="h-4 w-4" />
            </div>
            <input
              type="tel"
              value={form.data.whatsapp}
              onChange={(e) => form.updateField("whatsapp", e.target.value)}
              placeholder={fields.whatsappPlaceholder}
              className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
            {fields.sourceLabel}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={form.data.source}
              onChange={(e) => form.updateField("source", e.target.value)}
              placeholder={fields.sourcePlaceholder}
              className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
