"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Vehicle } from "@/data/inventory";
import { buildVehicleWhatsAppLink } from "@/lib/whatsapp";
import { t } from "@/config/i18n";
import { BlessMark } from "@/components/ui/bless-brand";

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export function VehicleDetailModal({ vehicle, onClose }: VehicleDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (vehicle) {
      setSelectedImage(vehicle.image);
    }
  }, [vehicle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!vehicle) return null;

  const whatsappUrl = buildVehicleWhatsAppLink(vehicle);
  const images = vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];
  const activeImage = selectedImage || vehicle.image;
  const activeIndex = images.indexOf(activeImage) !== -1 ? images.indexOf(activeImage) : 0;

  const handlePrevImage = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailScrollRef.current) {
      thumbnailScrollRef.current.scrollBy({
        left: direction === "left" ? -140 : 140,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl bg-white dark:bg-[#0B0B0F] border border-neutral-300 dark:border-zinc-800 overflow-hidden z-10 my-auto shadow-[0_25px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-colors"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626] z-30" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2.5 bg-white/90 dark:bg-zinc-900/90 border border-neutral-300 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 hover:text-[#DC2626] dark:hover:text-[#D4AF37] hover:border-[#DC2626] transition-colors"
            aria-label={t.modal.closeAria}
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left: Vehicle Image Showcase */}
            <div className="lg:col-span-6 bg-neutral-100 dark:bg-[#070709] p-6 sm:p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-zinc-800 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <BlessMark size="xs" />
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-600 dark:text-zinc-400">
                    {vehicle.brand}
                  </span>
                  {vehicle.belowFipe && (
                    <span className="px-2.5 py-0.5 border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[9px] font-mono tracking-widest text-[#A16207] dark:text-[#D4AF37] uppercase">
                      {t.modal.armoredBadge}
                    </span>
                  )}
                </div>

                {images.length > 1 && (
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-zinc-400">
                    {activeIndex + 1} / {images.length}
                  </span>
                )}
              </div>

              <div className="relative w-full aspect-[4/3] my-4 overflow-hidden border border-neutral-200 dark:border-zinc-800 bg-zinc-950">
                <Image
                  key={activeImage}
                  src={activeImage}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-all duration-300"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/85 text-white border border-white/10"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft size={18} strokeWidth={2} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/85 text-white border border-white/10"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight size={18} strokeWidth={2} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 ? (
                <div className="relative pt-2 border-t border-neutral-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 dark:text-zinc-400">
                      Galeria de Fotos ({images.length})
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => scrollThumbnails("left")}
                        className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white"
                        aria-label="Rolar para esquerda"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() => scrollThumbnails("right")}
                        className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white"
                        aria-label="Rolar para direita"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={thumbnailScrollRef}
                    className="flex items-center gap-2 overflow-x-auto pb-1"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {images.map((img, idx) => {
                      const isCurrent = img === activeImage;
                      return (
                        <button
                          key={img + idx}
                          onClick={() => setSelectedImage(img)}
                          className={`relative flex-shrink-0 w-16 h-12 border transition-all overflow-hidden ${
                            isCurrent
                              ? "border-[#D4AF37] ring-1 ring-[#D4AF37] opacity-100 scale-105"
                              : "border-neutral-300 dark:border-zinc-800 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${vehicle.model} foto ${idx + 1}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-zinc-500 uppercase tracking-widest pt-2 border-t border-neutral-200 dark:border-zinc-800">
                  <span>{t.modal.officialPhoto}</span>
                  <span>{t.modal.inspected}</span>
                </div>
              )}
            </div>

            {/* Right: Technical Dossier */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between bg-white dark:bg-[#0B0B0F] transition-colors">
              <div>
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#DC2626] dark:text-[#D4AF37] block mb-1">
                  {t.modal.tag}
                </span>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white uppercase tracking-tight mb-2">
                  {vehicle.model}
                </h2>

                <p className="text-xs font-mono tracking-wider text-neutral-500 dark:text-zinc-400 uppercase mb-6">
                  {vehicle.version}
                </p>

                <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-50 dark:bg-[#111115] border border-neutral-200 dark:border-zinc-800 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                      {t.modal.year}
                    </span>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white tracking-wider tabular-nums">
                      {vehicle.year}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                      <span className="text-[9px] font-mono uppercase text-neutral-400">Bless Motors</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                      {t.modal.mileage}
                    </span>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white tracking-wider tabular-nums">
                      {vehicle.km}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                        Pronta Entrega
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                      {t.modal.power}
                    </span>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white tracking-wider tabular-nums">
                      {vehicle.power}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[9px] font-mono uppercase text-[#A16207] dark:text-[#D4AF37] font-semibold">
                        Configuração
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                      {t.modal.acceleration}
                    </span>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white tracking-wider tabular-nums">
                      {vehicle.acceleration}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                      <span className="text-[9px] font-mono uppercase text-neutral-400">Joinville - SC</span>
                    </div>
                  </div>
                </div>

                {vehicle.highlightSpecs && vehicle.highlightSpecs.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-zinc-400 block mb-2">
                      {t.modal.highlights}
                    </span>
                    <div className="space-y-1.5">
                      {vehicle.highlightSpecs.map((spec, i) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between gap-4 text-xs py-2 px-3 bg-neutral-50 dark:bg-[#111115] border border-neutral-200 dark:border-zinc-800 font-mono"
                        >
                          <span className="text-neutral-500 dark:text-zinc-400 flex items-center gap-2 shrink-0">
                            <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? "bg-[#D4AF37]" : "bg-[#DC2626]"}`} />
                            {spec.label}
                          </span>
                          <span className="text-neutral-950 dark:text-white font-semibold text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-zinc-800 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-zinc-400">
                    {t.hero.price}
                  </span>
                  <div className="text-right">
                    {vehicle.originalPrice && (
                      <span className="text-xs font-mono text-neutral-400 dark:text-zinc-500 line-through block tabular-nums">
                        {vehicle.originalPrice}
                      </span>
                    )}
                    <span className="font-display text-2xl font-black text-[#DC2626] dark:text-[#D4AF37] tracking-wider tabular-nums">
                      {vehicle.price}
                    </span>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full py-4 bg-neutral-950 text-white dark:bg-[#111115] hover:bg-[#DC2626] dark:hover:bg-[#DC2626] font-semibold text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-md border border-zinc-700 hover:border-[#D4AF37] overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />
                  <BlessMark size="xs" />
                  <span>{t.modal.btnWa}</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
