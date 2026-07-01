"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AddInvoiceIcon,
  AiCloudIcon,
  ApiIcon,
  BarCode01Icon,
  Building02Icon,
  DatabaseIcon,
  DashboardSquare01Icon,
  SmartPhone01Icon,
  ShieldKeyIcon,
  ChartLineData01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

const FEATURES = [
  {
    id: "facturacion",
    label: "Facturación DIAN",
    icon: AddInvoiceIcon,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200",
    description: "Facturación electrónica certificada y 100% compatible con la DIAN.",
  },
  {
    id: "pos",
    label: "POS para negocios",
    icon: BarCode01Icon,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
    description: "Punto de venta intuitivo para tiendas, restaurantes y comercios.",
  },
  {
    id: "erp",
    label: "ERP Ksmart360",
    icon: DashboardSquare01Icon,
    image: "/screenshots/pos-ventas.webp",
    description: "Gestiona toda tu operación desde un solo sistema integrado.",
  },
  {
    id: "cloud",
    label: "Oracle Cloud OCI",
    icon: AiCloudIcon,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    description: "Infraestructura enterprise con 99.9% de uptime garantizado.",
  },
  {
    id: "mobile",
    label: "App móvil",
    icon: SmartPhone01Icon,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    description: "Accede a tu negocio desde cualquier dispositivo, en cualquier lugar.",
  },
  {
    id: "analytics",
    label: "Reportes en tiempo real",
    icon: ChartLineData01Icon,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200",
    description: "Toma decisiones con datos actualizados al instante.",
  },
  {
    id: "api",
    label: "APIs e integraciones",
    icon: ApiIcon,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200",
    description: "Conecta Ksmart360 con tus herramientas favoritas sin fricciones.",
  },
  {
    id: "seguridad",
    label: "Seguridad enterprise",
    icon: ShieldKeyIcon,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    description: "Protección bancaria para los datos de tu empresa.",
  },
  {
    id: "multisede",
    label: "Multi-sucursal",
    icon: Building02Icon,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    description: "Administra todas tus sedes desde un único panel centralizado.",
  },
  {
    id: "database",
    label: "Base de datos robusta",
    icon: DatabaseIcon,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200",
    description: "PostgreSQL enterprise-grade, backups automáticos diarios.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-white/10">

        {/* Left panel — feature list */}
        <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-azul">
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-azul via-azul/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-azul via-azul/80 to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-(FEATURES.length / 2), FEATURES.length / 2, distance);
              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-white text-azul border-white z-10"
                        : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                    )}
                  >
                    <div className={cn("flex items-center justify-center transition-colors duration-500", isActive ? "text-azul" : "text-white/40")}>
                      <HugeiconsIcon icon={feature.icon} size={18} strokeWidth={2} />
                    </div>
                    <span className="font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase font-sora">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right panel — image cards */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-grafito flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-grafito bg-grafito origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                    )}
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-grafito text-white px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-white/20 font-mono">
                          {index + 1} · {feature.label}
                        </div>
                        <p className="text-white font-light text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight font-sora">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className={cn("absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300", isActive ? "opacity-100" : "opacity-0")}>
                    <div className="w-2 h-2 rounded-full bg-azul shadow-[0_0_10px_#2E68E6]" />
                    <span className="text-white/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                      Ksmart360
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
