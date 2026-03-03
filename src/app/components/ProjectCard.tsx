import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { createPortal } from "react-dom";
import EnergyPromoPage from "./EnergyPromoPage";

interface ProjectCardProps {
  proj: {
    id: string;
    icon: React.ElementType;
    title: string;
    desc: string;
    image: string;
    preview?: React.ReactNode;
    tag: string;
    tagColor: string;
    link?: string;
  };
  i: number;
}

// ─── Modal for EMS (inline React content) ────────────────────────────────────
function EMSModal({ title, onClose }: { title: string; onClose: () => void }) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(14px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col overflow-hidden rounded-3xl"
        style={{
          width: "min(96vw, 1280px)",
          height: "min(92vh, 820px)",
          background: "#060d1a",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 48px 130px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Header */}
        <div
          className="relative z-10 px-7 py-4 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.14)", background: "rgba(6,13,26,0.95)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-[3px] h-7 rounded-full shrink-0"
              style={{
                background: "linear-gradient(180deg, #00d4ff 0%, #7c3aed 100%)",
                boxShadow: "0 0 8px rgba(0,212,255,0.6)",
              }}
            />
            <h1 className="text-white text-[18px] font-bold tracking-tight">EMS智慧能源管理</h1>
            <span style={{
              fontSize: 11, color: "#00d4ff",
              background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.28)",
              borderRadius: 6, padding: "2px 9px", fontWeight: 600, letterSpacing: "0.05em"
            }}>
              AISWEI · INTELLIGENT EMS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full cursor-pointer transition-colors duration-150"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
          >
            <X size={15} className="text-white/80" />
          </button>
        </div>

        {/* Scrollable promo content */}
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,212,255,0.3) transparent" }}>
          <EnergyPromoPage />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// ─── Modal for other project links (iframe fallback) ─────────────────────────
function LinkModal({ title, link, onClose }: { title: string; link: string; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(14px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col overflow-hidden rounded-3xl"
        style={{
          width: "min(96vw, 1280px)",
          height: "min(92vh, 820px)",
          background: "linear-gradient(148deg, #060214 0%, #0f0626 45%, #071024 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 48px 130px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
          <div className="absolute -bottom-20 right-1/4 w-[380px] h-[380px] rounded-full blur-[100px] opacity-14"
            style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)" }} />
        </div>

        {/* Header */}
        <div
          className="relative z-10 px-7 py-4 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-[3px] h-7 rounded-full shrink-0"
              style={{
                background: "linear-gradient(180deg, #a78bfa 0%, #60a5fa 100%)",
                boxShadow: "0 0 8px rgba(167,139,250,0.6)",
              }}
            />
            <h1 className="text-white text-[18px] font-bold tracking-tight">{title}</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full cursor-pointer transition-colors duration-150"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
          >
            <X size={15} className="text-white/80" />
          </button>
        </div>

        {/* iframe body */}
        <div className="relative z-10 flex-1 min-h-0">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-violet-400/30 border-t-violet-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-white/40 text-[12px]">加载中...</p>
            </div>
          )}
          <iframe
            src={link}
            title={title}
            className="w-full h-full"
            style={{ border: "none", opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
            onLoad={() => setLoaded(true)}
            allow="fullscreen"
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
export function ProjectCard({ proj, i }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  const isEMS    = proj.id === "ems-system";
  const hasModal = isEMS || !!proj.link;

  return (
    <>
      <motion.div
        key={proj.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.055, duration: 0.3, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden bg-white cursor-pointer group"
        style={{ boxShadow: "0px 6px 12px 0px rgba(154,174,255,0.41)" }}
        onClick={() => hasModal && setOpen(true)}
        whileHover={hasModal ? { y: -2, boxShadow: "0px 12px 24px 0px rgba(154,174,255,0.55)" } : {}}
      >
        {/* Category badge */}
        <div className="absolute top-0 left-0 z-10 bg-[#fff5fa] px-3 py-1 rounded-br-2xl rounded-tl-2xl">
          <span className="text-[#a68094] text-[10px] font-semibold whitespace-nowrap leading-tight">
            {proj.tag}
          </span>
        </div>

        {/* Click hint */}
        {hasModal && (
          <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-violet-500/90 px-2 py-1 rounded-bl-xl rounded-tr-2xl flex items-center gap-1">
              <ExternalLink size={9} className="text-white" />
              <span className="text-white text-[9px] font-medium">查看详情</span>
            </div>
          </div>
        )}

        {/* Title + description */}
        <div className="px-3 pt-9 pb-2">
          <h3 className="text-[#9285d7] text-[13px] font-semibold leading-snug">
            {proj.title}
          </h3>
          <p className="text-[rgba(0,0,0,0.52)] text-[10px] mt-1 leading-relaxed line-clamp-3">
            {proj.desc}
          </p>
        </div>

        {/* Screenshot preview */}
        <div className="mx-3 mb-3 rounded-xl overflow-hidden border-2 border-[#e4e6ef] transition-shadow duration-200 group-hover:shadow-md">
          {proj.preview ? (
            <div className="w-full relative" style={{ height: "110px" }}>
              {proj.preview}
            </div>
          ) : (
            <ImageWithFallback
              src={proj.image}
              alt={proj.title}
              className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              style={{ height: "110px" }}
            />
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {open && isEMS && (
          <EMSModal title={proj.title} onClose={() => setOpen(false)} />
        )}
        {open && !isEMS && proj.link && (
          <LinkModal title={proj.title} link={proj.link} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}