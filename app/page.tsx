"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { useMetaTracking } from "./hooks/useMetaTracking";

// Genera un ID de tracking de 6 caracteres (letras mayúscula/minúscula + números)
function generateTrackingId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Custom WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Home() {
  const { trackLead } = useMetaTracking();
  const [mounted, setMounted] = useState(false);

  // Generar trackingId único para esta sesión (se mantiene igual mientras no recargue)
  const trackingId = useMemo(() => generateTrackingId(), []);

  // URL de WhatsApp con el tracking ID (doble salto de línea antes del REF)
  const baseMessage = "Hola Daniela, Quiero usuario en Oro Puro y el extra de bienvenida!";
  const messageWithRef = `${baseMessage}\n\n[REF:${trackingId}]`;
  const whatsappUrl = `https://wa.me/+5491128754308?text=${encodeURIComponent(messageWithRef)}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppClick = (source: 'main_button' | 'secondary_button') => {
    trackLead(source, trackingId);
  };

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-black text-white overflow-x-hidden h-auto">
      {/* Zeus GPT Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/zeus-gpt2.webp"
          alt="Zeus Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none" style={{zIndex: 1}}></div>

      {/* Animated red gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-red-700/20 rounded-full blur-[120px] animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-red-500/10 rounded-full blur-[100px] animate-float-slow"></div>

        {/* Lightning flash effect - Realistic storm lightning in random positions */}

        {/* Lightning 1 - Center-left */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(ellipse 800px 1200px at 30% 0%, rgba(255,255,255,0.9) 0%, rgba(100,200,255,0.5) 25%, transparent 60%)'
          }}
          animate={{
            opacity: [
              0, 0, 0, 0, 0,
              0, 0.95, 0,
              0.7, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            times: [0, 0.1, 0.2, 0.25, 0.28, 0.29, 0.295, 0.3, 0.31, 0.32, 0.35, 0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
            ease: "linear"
          }}
        />

        {/* Lightning 2 - Right side */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(ellipse 700px 1100px at 75% 0%, rgba(255,255,255,0.85) 0%, rgba(150,220,255,0.4) 30%, transparent 65%)'
          }}
          animate={{
            opacity: [
              0, 0, 0, 0, 0, 0, 0,
              0, 0.9, 0,
              0, 0, 0,
              0.75, 0, 0.5, 0,
              0, 0, 0, 0, 0, 0, 0
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 3.2,
            times: [0, 0.15, 0.25, 0.35, 0.4, 0.45, 0.48, 0.49, 0.495, 0.5, 0.52, 0.55, 0.56, 0.565, 0.57, 0.575, 0.58, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1],
            ease: "linear"
          }}
        />

        {/* Lightning 3 - Center */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(ellipse 900px 1300px at 50% 0%, rgba(255,255,255,0.95) 0%, rgba(120,210,255,0.6) 20%, transparent 55%)'
          }}
          animate={{
            opacity: [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 1, 0,
              0.8, 0,
              0, 0, 0, 0, 0
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 6.5,
            times: [0, 0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.65, 0.68, 0.69, 0.7, 0.705, 0.71, 0.72, 0.725, 0.75, 0.8, 0.85, 0.9, 1],
            ease: "linear"
          }}
        />

        {/* Lightning 4 - Far left */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(ellipse 600px 1000px at 10% 0%, rgba(255,255,255,0.8) 0%, rgba(140,215,255,0.45) 35%, transparent 70%)'
          }}
          animate={{
            opacity: [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0.85, 0,
              0, 0, 0, 0
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 8,
            times: [0, 0.3, 0.4, 0.5, 0.6, 0.65, 0.7, 0.75, 0.78, 0.8, 0.82, 0.84, 0.85, 0.86, 0.865, 0.87, 0.88, 0.9, 0.95, 1],
            ease: "linear"
          }}
        />
      </div>

      {/* Main Container - MOBILE FIRST: Single Column */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:min-h-screen h-auto">

        {/* MOBILE: Logo top, cards, space for Zeus background, buttons bottom */}
        <div className="flex flex-col items-center justify-start pt-6 pb-0 px-4 lg:hidden relative">

          {/* Logo CASINO ZEUS */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center relative w-full px-4"
            style={{overflow: 'visible', lineHeight: 0, marginTop: '-80px', marginBottom: '-100px'}}
          >
            <img
              src="/logo-oropuro.png"
              alt="Casino Zeus"
              className="w-full h-auto max-w-md mx-auto"
              style={{
                maxHeight: '300px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.9)) drop-shadow(-4px 0 15px rgba(255, 165, 0, 0.8)) drop-shadow(-8px 0 25px rgba(255, 185, 0, 0.6)) drop-shadow(4px 0 15px rgba(218, 165, 32, 0.5)) drop-shadow(0 0 35px rgba(255, 140, 0, 0.4))',
                display: 'block',
                verticalAlign: 'top'
              }}
            />
          </motion.div>

          {/* Spacer for Zeus background image visibility */}
          <div className="w-full" style={{height: '280px'}}></div>

          {/* 4 Feature Boxes - 1 on top, 3 on bottom - Just above buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col gap-2 mb-6 items-center"
          >
            {/* Top Row: Retiros card centered - same width as 3 cards below */}
            <motion.div
              className="relative"
              animate={{
                filter: [
                  'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                  'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                  'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                ],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{width: 'calc(120px * 3 + 0.5rem * 2)', maxHeight: '70px'}}
            >
              <img src="/retiros-blueglow.png" alt="Retiros 24hs" style={{width: '100%', height: 'auto', maxHeight: '70px'}} className="object-contain" />
            </motion.div>

            {/* Bottom Row: 3 cards */}
            <div className="flex flex-row gap-2 justify-center">
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                    'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                    'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                  ],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <img src="/pagos-blueglow.png" alt="Pagos Instantáneos" style={{width: '120px', height: 'auto'}} className="object-contain" />
              </motion.div>
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                    'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                    'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                  ],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <img src="/juegos-blueglow.png" alt="+5000 Juegos" style={{width: '120px', height: 'auto'}} className="object-contain" />
              </motion.div>
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                    'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                    'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                  ],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <img src="/soporte-blueglow.png" alt="Soporte 24/7" style={{width: '120px', height: 'auto'}} className="object-contain" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Section: Buttons */}
          <div className="w-full max-w-sm px-4">
            <div className="flex flex-col gap-3 mb-2">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('main_button')}
                className="relative overflow-visible text-white font-black text-base px-6 py-2 flex items-center justify-center gap-2"
                style={{
                  clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(239, 68, 68, 0.8), 0 0 50px rgba(251, 191, 36, 0.6), 0 0 2px 1px rgba(251, 191, 36, 0.8), inset 0 2px 10px rgba(255, 255, 255, 0.3), inset 0 -2px 10px rgba(0, 0, 0, 0.5)",
                    "0 0 50px rgba(239, 68, 68, 1), 0 0 70px rgba(251, 191, 36, 0.8), 0 0 2px 2px rgba(251, 191, 36, 1), inset 0 2px 10px rgba(255, 255, 255, 0.4), inset 0 -2px 10px rgba(0, 0, 0, 0.6)",
                    "0 0 30px rgba(239, 68, 68, 0.8), 0 0 50px rgba(251, 191, 36, 0.6), 0 0 2px 1px rgba(251, 191, 36, 0.8), inset 0 2px 10px rgba(255, 255, 255, 0.3), inset 0 -2px 10px rgba(0, 0, 0, 0.5)"
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {/* Left Lightning Bolt with Variable Thunder Effect - INSIDE */}
                <motion.svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{
                    opacity: [0.6, 1, 0.6, 1, 0.5, 0.8, 1, 0.6],
                    scale: [1, 1.2, 1, 1.3, 0.95, 1.1, 1.25, 1],
                    filter: [
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 6px rgba(255,215,0,0.9))',
                      'drop-shadow(0 0 8px rgba(255,215,0,1))',
                      'drop-shadow(0 0 15px rgba(255,255,0,1)) drop-shadow(0 0 25px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 1],
                  }}
                >
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    fill="#FFD700"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                </motion.svg>

                {/* Right Lightning Bolt with Variable Thunder Effect - INSIDE */}
                <motion.svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{
                    opacity: [0.6, 1, 0.6, 1, 0.5, 0.8, 1, 0.6],
                    scale: [1, 1.2, 1, 1.3, 0.95, 1.1, 1.25, 1],
                    filter: [
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 6px rgba(255,215,0,0.9))',
                      'drop-shadow(0 0 8px rgba(255,215,0,1))',
                      'drop-shadow(0 0 15px rgba(255,255,0,1)) drop-shadow(0 0 25px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 1],
                    delay: 2,
                  }}
                >
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    fill="#FFD700"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                </motion.svg>

                <span className="uppercase tracking-wider drop-shadow-lg z-10 relative">¡Empezá ahora!</span>

                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.a>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('secondary_button')}
                className="bg-green-600 active:bg-green-700 border-2 border-green-500 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto"
                style={{width: '75%'}}
                whileTap={{ scale: 0.95 }}
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span className="uppercase">Escribinos al WhatsApp</span>
              </motion.a>
            </div>

            {/* Social Proof Badges - Mobile */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="w-full max-w-sm px-4 mt-2"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
                <div className="flex flex-col gap-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'}}>
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    <span style={{textShadow: '0 0 8px rgba(255, 215, 0, 0.8), 0 0 12px rgba(255, 215, 0, 0.5)'}}>+8.500 usuarios activos</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>+18 Juego Responsable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* DESKTOP: Layout con separación clara */}
        <div className="hidden lg:flex flex-1 flex-col relative">

          {/* Logo CASINO ZEUS - Arriba separado */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center pt-8 pb-12"
          >
            <img
              src="/logo-oropuro.png"
              alt="Casino Zeus"
              className="h-auto mx-auto"
              style={{
                maxHeight: '360px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 15px rgba(0, 0, 0, 0.8)) drop-shadow(-6px 0 25px rgba(255, 165, 0, 0.9)) drop-shadow(-10px 0 40px rgba(255, 185, 0, 0.7)) drop-shadow(6px 0 25px rgba(218, 165, 32, 0.5)) drop-shadow(10px 0 40px rgba(255, 140, 0, 0.3)) drop-shadow(0 0 55px rgba(255, 120, 0, 0.4))'
              }}
            />
          </motion.div>

          {/* Grid: 2 columnas - Cards izquierda, Botones derecha - Con margen arriba */}
          <div className="flex-1 grid grid-cols-2 gap-20 items-center px-20 py-8">

            {/* Columna izquierda: 4 Feature Cards en COLUMNA VERTICAL */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideFromLeft}
              className="flex items-center justify-start"
            >
              <div className="flex flex-col gap-6">
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                      'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                      'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                    ],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src="/retiros-blueglow.png" alt="Retiros 24hs" style={{width: '220px', height: 'auto'}} className="object-contain" />
                </motion.div>
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                      'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                      'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                    ],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <img src="/pagos-blueglow.png" alt="Pagos Instantáneos" style={{width: '220px', height: 'auto'}} className="object-contain" />
                </motion.div>
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                      'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                      'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                    ],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <img src="/juegos-blueglow.png" alt="+5000 Juegos" style={{width: '220px', height: 'auto'}} className="object-contain" />
                </motion.div>
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                      'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
                      'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.3))',
                    ],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <img src="/soporte-blueglow.png" alt="Soporte 24/7" style={{width: '220px', height: 'auto'}} className="object-contain" />
                </motion.div>
              </div>
            </motion.div>

            {/* Columna derecha: CTA Buttons + Social Proof */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideFromRight}
              className="flex flex-col items-start justify-center gap-40"
            >
              {/* CTA Buttons */}
              <div className="flex flex-col gap-5 w-full">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('main_button')}
                className="relative overflow-visible text-white font-black text-xl px-10 py-5 flex items-center justify-center gap-3 transition-all duration-300"
                style={{
                  clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(239, 68, 68, 0.8), 0 0 60px rgba(251, 191, 36, 0.6), 0 0 2px 1px rgba(251, 191, 36, 0.8), inset 0 3px 15px rgba(255, 255, 255, 0.3), inset 0 -3px 15px rgba(0, 0, 0, 0.5)",
                    "0 0 60px rgba(239, 68, 68, 1), 0 0 80px rgba(251, 191, 36, 0.8), 0 0 2px 2px rgba(251, 191, 36, 1), inset 0 3px 15px rgba(255, 255, 255, 0.4), inset 0 -3px 15px rgba(0, 0, 0, 0.6)",
                    "0 0 40px rgba(239, 68, 68, 0.8), 0 0 60px rgba(251, 191, 36, 0.6), 0 0 2px 1px rgba(251, 191, 36, 0.8), inset 0 3px 15px rgba(255, 255, 255, 0.3), inset 0 -3px 15px rgba(0, 0, 0, 0.5)"
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {/* Left Lightning Bolt */}
                <motion.svg
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{
                    opacity: [0.6, 1, 0.6, 1, 0.5, 0.8, 1, 0.6],
                    scale: [1, 1.2, 1, 1.3, 0.95, 1.1, 1.25, 1],
                    filter: [
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 6px rgba(255,215,0,0.9))',
                      'drop-shadow(0 0 8px rgba(255,215,0,1))',
                      'drop-shadow(0 0 15px rgba(255,255,0,1)) drop-shadow(0 0 25px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 1],
                  }}
                >
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                </motion.svg>

                <span className="uppercase tracking-wider drop-shadow-lg z-10 relative">¡Empezá ahora!</span>

                {/* Right Lightning Bolt */}
                <motion.svg
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-10"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{
                    opacity: [0.6, 1, 0.6, 1, 0.5, 0.8, 1, 0.6],
                    scale: [1, 1.2, 1, 1.3, 0.95, 1.1, 1.25, 1],
                    filter: [
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                      'drop-shadow(0 0 12px rgba(255,255,0,1)) drop-shadow(0 0 20px rgba(255,215,0,1))',
                      'drop-shadow(0 0 6px rgba(255,215,0,0.9))',
                      'drop-shadow(0 0 8px rgba(255,215,0,1))',
                      'drop-shadow(0 0 15px rgba(255,255,0,1)) drop-shadow(0 0 25px rgba(255,215,0,1))',
                      'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 1],
                    delay: 2,
                  }}
                >
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                </motion.svg>

                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.a>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('secondary_button')}
                className="bg-green-600 hover:bg-green-700 border-2 border-green-500 text-white font-semibold text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-3"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon className="w-6 h-6 text-white" />
                <span className="uppercase">Escribinos al WhatsApp</span>
              </motion.a>
            </div>

              {/* Social Proof Badges - Desktop */}
              <motion.div
                variants={fadeIn}
                className="bg-white/5 border border-white/10 rounded-lg px-8 py-5 backdrop-blur-sm w-full"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-3 text-yellow-400 font-bold text-base">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style={{filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'}}>
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    <span style={{textShadow: '0 0 8px rgba(255, 215, 0, 0.8), 0 0 12px rgba(255, 215, 0, 0.5)'}}>+8.500 usuarios activos</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white font-bold text-base">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>+18 Juego Responsable</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900/50 lg:border-red-900/70 py-4 lg:py-6 mt-6 mb-0">
        <div className="flex flex-col items-center gap-3">
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400 lg:text-gray-200 lg:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-400 lg:bg-red-500 rounded-full animate-pulse"></div>
              <span className="lg:font-semibold">Seguro y Confiable</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 lg:text-gray-300 text-sm lg:text-base">
            © 2025 Oro Puro - 24hs - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
