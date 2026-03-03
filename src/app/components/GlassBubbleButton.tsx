import { motion } from "motion/react";

interface GlassBubbleButtonProps {
  label: string;
  x: string | number;
  y: string | number;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export function GlassBubbleButton({
  label,
  x,
  y,
  delay = 0,
  className = "",
  onClick,
}: GlassBubbleButtonProps) {
  const isEnergyModule = label === "智慧能源";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      style={{ left: x, top: y, overflow: "visible" }}
      className={`absolute cursor-pointer select-none group ${className}`}
    >
      {/* 智慧能源专属：脉冲边框 — 始终可见，不受 button overflow 裁剪 */}
      {isEnergyModule && (
        null
      )}

      <motion.button
        whileHover={{ scale: 1.1, rotate: [-1, 1, -1], transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
        style={{ overflow: "visible" }}
        className="relative block"
        onClick={onClick}
      >
        <div className="relative" style={{ overflow: "visible" }}>
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className={`relative px-6 py-3 rounded-full backdrop-blur-md border shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                        flex items-center justify-center min-w-[120px] transition-all duration-300 ${
                          isEnergyModule
                            ? "bg-gradient-to-br from-yellow-400/30 via-white/15 to-yellow-500/20 border-yellow-300/50 group-hover:border-yellow-200/70 group-hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
                            : "bg-white/10 border-white/30 group-hover:bg-white/20 group-hover:border-white/50"
                        }`}>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full opacity-50" />

            {/* 智慧能源专属：闪烁扫光 */}
            {isEnergyModule && (
              <motion.div
                className="absolute top-1 left-4 right-4 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
                }}
                animate={{ x: [-100, 200], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
              />
            )}

            <span className={`font-semibold text-[15px] font-['PingFang_SC','sans-serif'] tracking-wide z-10 drop-shadow-md uppercase whitespace-nowrap ${
              isEnergyModule ? "text-yellow-50" : "text-white"
            }`}>
              {label}
            </span>
          </div>

          <motion.div
            className="absolute inset-[-4px] rounded-full border border-white/20 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </motion.button>
    </motion.div>
  );
}