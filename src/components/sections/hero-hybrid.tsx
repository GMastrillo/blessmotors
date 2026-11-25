"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { SHOWCASE_VEHICLES, Vehicle } from "@/data/inventory";
import { siteConfig } from "@/config/site";
import { buildVehicleWhatsAppLink } from "@/lib/whatsapp";
import { t } from "@/config/i18n";
import { BlessMark, BlessGradientLine } from "@/components/ui/bless-brand";

interface HeroHybridProps {
  onOpenVehicleDetail: (vehicle: Vehicle) => void;
  onVehicleChange?: (vehicle: Vehicle) => void;
}

export function HeroHybrid({ onOpenVehicleDetail, onVehicleChange }: HeroHybridProps) {
  const [introStage, setIntroStage] = useState<"brand_reveal" | "done">("brand_reveal");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showcaseVehicles = SHOWCASE_VEHICLES.slice(0, 3);
  const currentVehicle = showcaseVehicles[currentIndex] || showcaseVehicles[0];

  useEffect(() => {
    if (onVehicleChange) {
      onVehicleChange(currentVehicle);
    }
  }, [currentIndex, currentVehicle, onVehicleChange]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem("bless_intro_shown");
      if (alreadyShown === "true") {
        setIntroStage("done");
        document.documentElement.classList.remove("intro-pending");
        document.documentElement.classList.add("intro-done");
      } else {
        document.documentElement.classList.add("intro-pending");
        document.documentElement.classList.remove("intro-done");
      }
    }
  }, []);

  const finishIntro = () => {
    setIntroStage("done");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bless_intro_shown", "true");
      document.documentElement.classList.remove("intro-pending");
      document.documentElement.classList.add("intro-done");
    }
  };

  useEffect(() => {
    if (introStage === "brand_reveal") {
      const timer = setTimeout(() => {
        finishIntro();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [introStage]);

  useEffect(() => {
    if (introStage !== "done" || isPaused) return;

    const interval = 60;
    const duration = 6000;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % showcaseVehicles.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [introStage, isPaused, currentIndex, showcaseVehicles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? showcaseVehicles.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseVehicles.length);
    setProgress(0);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#fafafa] dark:bg-[#070709] transition-colors duration-500 overflow-hidden flex flex-col justify-between pt-24 pb-12">
      {/* Subtle Architectural Backdrop (No neon orbs) */}
      <div className="absolute inset-0 pointer-events-none z-0 intro-hide transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f6f6f7] to-neutral-100 dark:from-[#0C0C10] dark:via-[#070709] dark:to-[#050507]" />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fafafa] dark:from-[#070709] to-transparent" />
      </div>

      {/* INTRO EDITORIAL BLESS MOTORS */}
      <AnimatePresence>
        {introStage !== "done" && (
          <motion.div
            id="intro-overlay-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#070709] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 p-4 border border-[#D4AF37]/30 bg-[#0B0B0F]"
              >
                <img
                  src={siteConfig.brand.logoPath}
                  alt={siteConfig.brand.name}
                  className="h-20 sm:h-24 w-auto object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-3"
              >
                <BlessMark size="xs" />
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#D4AF37]">
                  {siteConfig.brand.cityState}
                </span>
                <BlessMark size="xs" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.16em] uppercase mb-4"
              >
                {siteConfig.brand.shortName}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="w-40 mb-5"
              >
                <BlessGradientLine />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xs sm:text-sm font-mono tracking-[0.28em] uppercase text-zinc-400 max-w-lg"
              >
                {siteConfig.brand.tagline}
              </motion.p>
            </motion.div>

            <button
              onClick={finishIntro}
              className="absolute bottom-8 right-8 z-20 px-3.5 py-1.5 border border-zinc-700 bg-[#111115]/90 backdrop-blur-md text-zinc-300 hover:text-[#D4AF37] text-[10px] font-mono tracking-[0.3em] uppercase transition-all hover:border-[#D4AF37]"
            >
              [ PULAR ]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOWCASE INTERATIVO */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-between my-auto intro-hide transition-opacity duration-700"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-6 sm:py-10">
          {/* Left Column: Brand, Title, Slogan & Specs */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVehicle.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  <BlessMark size="xs" />
                  <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#DC2626] dark:text-[#D4AF37] font-semibold">
                    {currentVehicle.brand}
                  </span>
                  <div className="h-[1px] w-8 bg-neutral-300 dark:bg-zinc-700" />
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-none mb-3">
                  {currentVehicle.model}
                </h2>

                <p className="text-xs sm:text-sm font-mono tracking-[0.18em] text-neutral-600 dark:text-zinc-400 uppercase mb-6">
                  {currentVehicle.slogan}
                </p>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-4 p-5 bg-white/95 dark:bg-[#111115]/95 border border-neutral-200 dark:border-zinc-800 backdrop-blur-md mb-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />

                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.year}
                      </span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                      <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-500 dark:text-zinc-400 truncate">
                        {currentVehicle.tag || "Bless Motors"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.mileage}
                      </span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.km}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                        Pronta Entrega
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.power}
                      </span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.power}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-neutral-200 dark:bg-zinc-800 rounded-full mt-2.5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#DC2626] to-[#D4AF37] rounded-full" style={{ width: "86%" }} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 dark:text-zinc-400 uppercase">
                        {t.hero.price}
                      </span>
                      {currentVehicle.originalPrice && (
                        <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 line-through block leading-none mt-0.5 tabular-nums">
                          {currentVehicle.originalPrice}
                        </span>
                      )}
                      <span className="text-base font-black text-[#DC2626] dark:text-[#D4AF37] tracking-wider block mt-0.5 tabular-nums">
                        {currentVehicle.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-600 dark:text-[#D4AF37] font-semibold">
                        Joinville - SC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenVehicleDetail(currentVehicle)}
                    className="relative px-7 py-4 bg-neutral-950 text-white dark:bg-[#111115] dark:text-white font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#DC2626] dark:hover:bg-[#DC2626] transition-all duration-300 flex items-center gap-2.5 group shadow-md border border-neutral-800 dark:border-[#D4AF37]/40 overflow-hidden"
                  >
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />
                    <BlessMark size="xs" />
                    <span>{t.hero.discover}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <a
                    href={buildVehicleWhatsAppLink(currentVehicle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 border border-neutral-300 dark:border-zinc-700 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-neutral-950 dark:hover:border-[#D4AF37] dark:hover:text-[#D4AF37] text-neutral-900 dark:text-white font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    {t.hero.negotiate}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Real Showroom Photo */}
          <div className="lg:col-span-7 relative flex items-center justify-center order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVehicle.id}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => onOpenVehicleDetail(currentVehicle)}
                className="relative w-full aspect-[4/3] max-h-[470px] border border-neutral-200 dark:border-zinc-800 overflow-hidden shadow-[0_25px_55px_rgba(0,0,0,0.16)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-pointer group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626] z-20" />
                <Image
                  src={currentVehicle.image}
                  alt={`${currentVehicle.brand} ${currentVehicle.model}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 680px"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 z-10 pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] block">
                      {currentVehicle.brand} · {currentVehicle.year}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      {currentVehicle.model}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-[#DC2626] text-white text-[10px] font-mono tracking-widest uppercase">
                    {currentVehicle.tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation: Linear Progress Bars & Arrows */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-black/10 dark:border-zinc-800">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {showcaseVehicles.map((vehicle, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => goToSlide(idx)}
                  className={`group flex flex-col gap-1.5 flex-1 sm:w-48 text-left py-2 px-3 transition-all duration-300 ${
                    isActive
                      ? "bg-neutral-100 dark:bg-[#111115] border border-neutral-300 dark:border-[#D4AF37]/40"
                      : "hover:bg-neutral-100/60 dark:hover:bg-zinc-900/40 border border-transparent"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between text-[10px] font-mono tracking-widest transition-colors ${
                      isActive
                        ? "text-[#DC2626] dark:text-[#D4AF37] font-bold"
                        : "text-neutral-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />}
                      <span>0{idx + 1}</span>
                    </span>
                    <span className="uppercase truncate max-w-[110px]">{vehicle.brand}</span>
                  </div>

                  <div className="w-full h-[3px] bg-neutral-200 dark:bg-zinc-800 overflow-hidden relative rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626] transition-all duration-75"
                      style={{
                        width: isActive ? `${progress}%` : idx < currentIndex ? "100%" : "0%",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 border border-black/15 dark:border-zinc-800 text-neutral-600 dark:text-zinc-400 hover:text-[#DC2626] dark:hover:text-[#D4AF37] hover:border-[#DC2626] dark:hover:border-[#D4AF37] transition-all active:scale-95"
              aria-label="Veículo Anterior"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-black/15 dark:border-zinc-800 text-neutral-600 dark:text-zinc-400 hover:text-[#DC2626] dark:hover:text-[#D4AF37] hover:border-[#DC2626] dark:hover:border-[#D4AF37] transition-all active:scale-95"
              aria-label="Próximo Veículo"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
