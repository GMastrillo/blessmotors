"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { t } from "@/config/i18n";
import { BlessMark } from "@/components/ui/bless-brand";

export function Footer() {
  return (
    <footer
      id="location"
      className="relative w-full bg-neutral-100 dark:bg-[#050507] border-t border-neutral-200 dark:border-zinc-800 pt-20 pb-12 overflow-hidden text-neutral-600 dark:text-zinc-400 transition-colors"
    >
      {/* Top Bless Crimson & Gold Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-200 dark:border-zinc-800">
          {/* Brand & Concept */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-5 inline-flex items-center bg-[#0B0B0F] px-4 py-2.5 border border-[#D4AF37]/30">
                <img
                  src={siteConfig.brand.logoPath}
                  alt={siteConfig.brand.name}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-[11px] font-mono tracking-wider text-neutral-600 dark:text-zinc-400 leading-relaxed mb-6">
                {siteConfig.brand.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-zinc-500 uppercase">
              <BlessMark size="xs" />
              <span>{siteConfig.brand.cityState}</span>
            </div>
          </div>

          {/* Showroom Addresses */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-950 dark:text-white block mb-4">
              {t.footer.showroom}
            </span>
            <div className="text-xs font-mono space-y-2 text-neutral-800 dark:text-zinc-300">
              {siteConfig.contact.addresses.map((address) => (
                <p key={address}>{address}</p>
              ))}
              <p className="text-neutral-500 dark:text-zinc-400 pt-1">{siteConfig.contact.neighborhood}</p>
              <p className="text-neutral-500 dark:text-zinc-400">{siteConfig.contact.cityStateZip}</p>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-950 dark:text-white block mb-4">
              {t.footer.privateService}
            </span>
            <div className="text-xs font-mono space-y-2 text-neutral-800 dark:text-zinc-300">
              <p className="text-[#DC2626] dark:text-[#D4AF37] font-bold text-sm tracking-wider">
                {siteConfig.contact.displayPhone}
              </p>
              <p className="break-all">{siteConfig.contact.email}</p>
              <div className="pt-2 text-neutral-500 dark:text-zinc-400 space-y-1">
                <p>{siteConfig.contact.businessHours.weekdays}</p>
                <p>{siteConfig.contact.businessHours.saturdays}</p>
                <p>{siteConfig.contact.businessHours.sundays}</p>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="lg:col-span-2">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-950 dark:text-white block mb-4">
              {t.footer.officialChannels}
            </span>
            <div className="flex flex-col space-y-3 text-xs font-mono">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DC2626] dark:hover:text-[#D4AF37] transition-colors flex items-center justify-between group"
                >
                  <span>Instagram @bless.motors</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DC2626] dark:hover:text-[#D4AF37] transition-colors flex items-center justify-between group"
                >
                  <span>Facebook</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {siteConfig.social.linktree && (
                <a
                  href={siteConfig.social.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DC2626] dark:hover:text-[#D4AF37] transition-colors flex items-center justify-between group"
                >
                  <span>Link Oficial</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-500 dark:text-zinc-500">
          <span>© {new Date().getFullYear()} {siteConfig.brand.name}. {t.footer.rights}</span>
          <div className="flex items-center gap-2">
            <BlessMark size="xs" />
            <span className="tracking-widest uppercase">Bless Motors Multimarcas · Joinville - SC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
