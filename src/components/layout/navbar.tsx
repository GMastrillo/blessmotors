"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { buildConciergeGeneralWhatsAppLink } from "@/lib/whatsapp";
import { t } from "@/config/i18n";
import { BlessMark } from "@/components/ui/bless-brand";

interface NavbarProps {
  visible?: boolean;
}

export function Navbar({ visible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-[#070709]/92 backdrop-blur-xl border-b border-black/10 dark:border-zinc-800/80 py-3 sm:py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
          : "bg-gradient-to-b from-white/95 via-white/60 to-transparent dark:from-[#070709]/92 dark:via-[#070709]/50 dark:to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Official Bless Motors Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="bg-[#0B0B0F] px-3 py-1.5 border border-[#D4AF37]/30 group-hover:border-[#DC2626]/70 transition-colors shadow-sm">
            <img
              src={siteConfig.brand.logoPath}
              alt={siteConfig.brand.name}
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="hidden sm:flex flex-col select-none">
            <span className="text-[9px] font-mono tracking-[0.28em] text-[#D4AF37] uppercase font-semibold">
              {siteConfig.brand.cityState}
            </span>
            <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 dark:text-zinc-400 uppercase mt-0.5">
              {siteConfig.contact.displayPhone}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/estoque"
            className={`text-xs uppercase tracking-[0.25em] transition-all font-medium py-1 relative ${
              pathname === "/estoque"
                ? "text-black dark:text-white font-bold"
                : "text-neutral-600 hover:text-[#DC2626] dark:text-zinc-400 dark:hover:text-[#D4AF37]"
            }`}
          >
            <span>{t.nav.inventory}</span>
            {pathname === "/estoque" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />
            )}
          </Link>
          <Link
            href="/#experience"
            className="text-xs uppercase tracking-[0.25em] text-neutral-600 hover:text-[#DC2626] dark:text-zinc-400 dark:hover:text-[#D4AF37] transition-colors font-medium py-1"
          >
            {t.nav.experience}
          </Link>
          <Link
            href="/#sourcing"
            className="text-xs uppercase tracking-[0.25em] text-neutral-600 hover:text-[#DC2626] dark:text-zinc-400 dark:hover:text-[#D4AF37] transition-colors font-medium py-1"
          >
            {t.nav.sourcing}
          </Link>
          <Link
            href="/#location"
            className="text-xs uppercase tracking-[0.25em] text-neutral-600 hover:text-[#DC2626] dark:text-zinc-400 dark:hover:text-[#D4AF37] transition-colors font-medium py-1"
          >
            {t.nav.showroom}
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 hover:text-[#DC2626] dark:text-zinc-400 dark:hover:text-[#D4AF37] hover:bg-neutral-100 dark:hover:bg-zinc-900 rounded-full transition-colors border border-black/10 dark:border-zinc-800"
            title={theme === "light" ? t.nav.toggleThemeLight : t.nav.toggleThemeDark}
            aria-label="Alternar Tema"
          >
            {theme === "light" ? (
              <Moon size={16} strokeWidth={1.5} />
            ) : (
              <Sun size={16} strokeWidth={1.5} />
            )}
          </button>

          <a
            href={buildConciergeGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 bg-neutral-950 text-white hover:bg-[#DC2626] dark:bg-[#111115] dark:text-white dark:hover:bg-[#DC2626] transition-all duration-300 text-[11px] font-semibold tracking-[0.2em] uppercase border border-neutral-800 dark:border-[#D4AF37]/35 shadow-sm overflow-hidden"
          >
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />
            <BlessMark size="xs" />
            <span>{t.nav.concierge}</span>
            <ArrowUpRight size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-800 dark:text-zinc-200 border border-black/10 dark:border-white/10"
            aria-label="Alternar Tema"
          >
            {theme === "light" ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 dark:text-zinc-200 border border-black/10 dark:border-white/10"
            aria-label={t.nav.menuOpen}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 dark:bg-[#070709]/95 backdrop-blur-2xl border-b border-black/10 dark:border-zinc-800 px-6 py-8 flex flex-col gap-6"
        >
          <Link
            href="/estoque"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm uppercase tracking-[0.25em] ${
              pathname === "/estoque"
                ? "text-black dark:text-white font-bold"
                : "text-neutral-800 dark:text-zinc-300 hover:text-[#DC2626] dark:hover:text-[#D4AF37]"
            }`}
          >
            {t.nav.inventory}
          </Link>
          <Link
            href="/#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.25em] text-neutral-800 dark:text-zinc-300 hover:text-[#DC2626] dark:hover:text-[#D4AF37]"
          >
            {t.nav.experience}
          </Link>
          <Link
            href="/#sourcing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.25em] text-neutral-800 dark:text-zinc-300 hover:text-[#DC2626] dark:hover:text-[#D4AF37]"
          >
            {t.nav.sourcing}
          </Link>
          <Link
            href="/#location"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.25em] text-neutral-800 dark:text-zinc-300 hover:text-[#DC2626] dark:hover:text-[#D4AF37]"
          >
            {t.nav.showroom}
          </Link>
          <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <a
              href={buildConciergeGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] text-white text-xs font-semibold tracking-widest uppercase"
            >
              <span>{t.nav.concierge}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
