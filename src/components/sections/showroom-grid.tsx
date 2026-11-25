"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight, BadgePercent } from "lucide-react";
import { Vehicle } from "@/data/inventory";
import { buildVehicleWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { t } from "@/config/i18n";
import { BlessMark } from "@/components/ui/bless-brand";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface ShowroomGridProps {
  vehicles: Vehicle[];
  totalAvailable?: number;
  onOpenVehicleDetail: (vehicle: Vehicle) => void;
}

export function ShowroomGrid({ vehicles, totalAvailable, onOpenVehicleDetail }: ShowroomGridProps) {
  const pathname = usePathname();

  if (vehicles.length === 0) {
    return (
      <section id="estoque" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center relative">
        <div id="showroom" className="absolute -top-24 left-0 pointer-events-none" />
        <div className="py-16 px-6 border border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-[#111115] max-w-xl mx-auto">
          <p className="text-sm font-mono tracking-[0.25em] uppercase text-neutral-600 dark:text-zinc-400 mb-4">
            {t.grid.empty}
          </p>
          <Link
            href="/#sourcing"
            className="inline-block px-6 py-3 bg-[#DC2626] text-white text-xs font-mono tracking-[0.2em] uppercase"
          >
            {t.nav.sourcing}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="estoque" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 transition-colors relative">
      <div id="showroom" className="absolute -top-24 left-0 pointer-events-none" />
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-black/10 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BlessMark size="xs" />
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#DC2626] dark:text-[#D4AF37]">
              {t.grid.sectionLabel}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white uppercase tracking-tight">
            {pathname === "/estoque" ? t.grid.sectionHeading : `${t.nav.inventory} ${siteConfig.brand.shortName}`}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="max-w-md text-xs sm:text-sm font-mono tracking-wider text-neutral-600 dark:text-zinc-400">
            {t.grid.sectionSub}
          </p>
          {pathname !== "/estoque" && (
            <Link
              href="/estoque"
              className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-zinc-700 hover:border-[#DC2626] hover:text-[#DC2626] dark:hover:border-[#D4AF37] dark:hover:text-[#D4AF37] text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-900 dark:text-white transition-colors whitespace-nowrap"
            >
              <span>{t.grid.viewAll}</span>
              <ArrowUpRight size={13} />
            </Link>
          )}
        </div>
      </div>

      {/* Grid of Vehicles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle, index) => {
          const isBelowFipe = Boolean(vehicle.belowFipe);

          return (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="h-full"
            >
              <SpotlightCard
                glowColor={isBelowFipe ? "gold" : "red"}
                className="group relative flex flex-col h-full bg-white dark:bg-[#0B0B0F] border border-neutral-200 dark:border-zinc-800 hover:border-[#D4AF37]/60 dark:hover:border-[#D4AF37]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden"
              >
                {/* Top Crimson-Gold Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626] opacity-75 group-hover:opacity-100 group-hover:h-[3px] transition-all duration-300 z-20" />

                {/* Card Image Container */}
                <div
                  onClick={() => onOpenVehicleDetail(vehicle)}
                  className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden cursor-pointer"
                >
                  {isBelowFipe && (
                    <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#0B0B0F]/90 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                      <BadgePercent size={12} strokeWidth={1.75} />
                      <span>{vehicle.tag || "ABAIXO DA FIPE"}</span>
                    </div>
                  )}

                  {vehicle.tag && !isBelowFipe && (
                    <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#DC2626]/95 border border-red-400/50 text-white text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                      <BlessMark size="xs" />
                      <span>{vehicle.tag}</span>
                    </div>
                  )}

                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="relative flex items-center gap-2 px-5 py-2.5 bg-[#0B0B0F] text-white text-xs font-mono tracking-widest uppercase shadow-xl border border-[#D4AF37]/60">
                      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />
                      <span>{t.grid.viewDetails}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white dark:bg-[#0B0B0F] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BlessMark size="xs" />
                      <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 dark:text-zinc-400 block">
                        {vehicle.brand}
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenVehicleDetail(vehicle)}
                      className="font-display text-xl font-bold text-neutral-950 dark:text-white uppercase tracking-tight group-hover:text-[#DC2626] dark:group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {vehicle.model}
                    </h3>

                    <p className="text-[11px] font-mono tracking-wider text-neutral-500 dark:text-zinc-400 uppercase truncate mt-0.5 mb-5">
                      {vehicle.version}
                    </p>

                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-neutral-200 dark:border-zinc-800 mb-5">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                          {t.grid.yearModel}
                        </span>
                        <span className="text-xs font-semibold text-neutral-900 dark:text-zinc-200 tracking-wider tabular-nums">
                          {vehicle.year}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500 block">
                          {t.grid.mileage}
                        </span>
                        <span className="text-xs font-semibold text-neutral-900 dark:text-zinc-200 tracking-wider tabular-nums">
                          {vehicle.km}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500">
                        {t.grid.price}
                      </span>
                      {vehicle.originalPrice && (
                        <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 line-through tabular-nums">
                          {vehicle.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-black text-[#DC2626] dark:text-[#D4AF37] tracking-wider tabular-nums">
                        {vehicle.price}
                      </span>
                    </div>

                    <a
                      href={buildVehicleWhatsAppLink(vehicle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-4 py-2 border border-neutral-300 dark:border-zinc-700 hover:border-[#DC2626] hover:bg-[#DC2626] hover:text-white dark:hover:bg-[#DC2626] dark:hover:border-[#DC2626] dark:hover:text-white text-neutral-900 dark:text-white text-[10px] font-mono tracking-widest uppercase transition-all duration-300"
                    >
                      {t.grid.proposal}
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA to view full inventory when on home page */}
      {pathname !== "/estoque" && (
        <div className="mt-14 pt-8 border-t border-black/10 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BlessMark size="xs" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-600 dark:text-zinc-400">
              Exibindo {vehicles.length} de {totalAvailable ?? vehicles.length} veículos selecionados no pátio
            </span>
          </div>

          <Link
            href="/estoque"
            className="relative px-8 py-4 bg-neutral-950 text-white dark:bg-[#111115] hover:bg-[#DC2626] dark:hover:bg-[#DC2626] font-semibold text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-3 shadow-md border border-zinc-700 hover:border-[#D4AF37] group"
          >
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626]" />
            <BlessMark size="xs" />
            <span>{t.grid.viewAll}</span>
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      )}
    </section>
  );
}
