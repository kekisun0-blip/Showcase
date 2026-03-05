import React from "react";
import { motion } from "motion/react";
import { Bot, Cpu, Globe, GitMerge, Workflow, LayoutGrid, ArrowRight, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgCharacter  from "figma:asset/145c786e2bcf2cb85c225b58b4e005b4d38df06c.png";
import imgBuilding   from "figma:asset/95e2ed1da8f8de1ccb3dbdeb24b41e65d109f310.png";
import imgHandshake  from "figma:asset/41f5ded8093b2d7a652dd3d92c232097c8613030.png";
import imgPanel      from "figma:asset/ecde0170c87da4864e9f5ce00521b2dcddb71d38.png";
import imgTech       from "figma:asset/69ce36e9592679935f50266725dba25bfee647af.png";
import imgEnergyApp  from "figma:asset/79d56327708d4e6d10e03edba5f55fa987bacfdf.png";
import imgWarehouse  from "figma:asset/6f3e930441b54e23c53e758a77a28c8b0ea11741.png";
import imgRndPanel   from "figma:asset/c9faab36d56f13e9ecb10a6e7746c2a0e6074227.png";

// ── 七大智慧模块配置 ─────────────────────────────────────────────────────────
const MODULE_CARDS = [
  {
    label: "智慧研发",
    desc: "超级BOM系统，研发周期缩短40%",
    image: imgRndPanel,
    accent: "from-pink-600/70",
  },
  {
    label: "智慧测试",
    desc: "构建行业级智能失效分析闭环系统",
    image: imgPanel,
    accent: "from-blue-600/70",
  },
  {
    label: "智慧生产",
    desc: "AI多模态监控，构建数字孪生工厂",
    image: imgBuilding,
    accent: "from-violet-600/70",
  },
  {
    label: "智慧供应链",
    desc: "爱士维构建供应商360度分析评级",
    image: imgHandshake,
    accent: "from-cyan-600/70",
  },
  {
    label: "智慧销售",
    desc: "AI预测模型精准研判销售波动趋势",
    image: imgWarehouse,
    accent: "from-emerald-600/70",
  },
  {
    label: "智慧能源",
    desc: "虚拟电厂平台，智能调度电力市场",
    image: imgEnergyApp,
    accent: "from-yellow-600/70",
  },
  {
    label: "智慧运维",
    desc: "设备预测性保养，降低突发停机损失",
    image: imgTech,
    accent: "from-orange-600/70",
  },
];

// ── 爱小惟能力条目 ────────────────────────────────────────────────────────────
const WILL_AI_FEATURES = [
  { icon: LayoutGrid, label: "场景化应用", sub: "EMS小组件",  color: "text-violet-300" },
  { icon: Bot,        label: "七大智慧场景", sub: "AI业务助手", color: "text-purple-300" },
  { icon: Globe,      label: "全球化形象",  sub: "品牌体验",   color: "text-blue-300"   },
  { icon: GitMerge,   label: "灵活集成",    sub: "跨平台链接", color: "text-cyan-300"   },
  { icon: Cpu,        label: "本地大模型",  sub: "私有部署",   color: "text-emerald-300"},
  { icon: Workflow,   label: "Agent工作流", sub: "智能自动化", color: "text-orange-300" },
];

const glassStyle: React.CSSProperties = {
  background: "rgba(12, 6, 30, 0.78)",
  backdropFilter: "blur(36px)",
  WebkitBackdropFilter: "blur(36px)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
};

interface DefaultRightPanelProps {
  onWillAIClick: () => void;
  onModuleClick: (label: string) => void;
}

export function DefaultRightPanel({ onWillAIClick, onModuleClick }: DefaultRightPanelProps) {
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setIsAtEnd(atEnd);
  }, []);

  return (
    /* ── 固定 70vh 高度容器，两卡垂直填满 ────────────────────────────── */
    <div
      className="flex flex-col gap-3 w-[440px]"
      style={{ height: "calc(100vh - 60px)", minHeight: "560px", maxHeight: "920px" }}
    >
      {/* ── Card 1: 爱小惟 AI（固定高度，shrink-0） ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden text-white shrink-0"
        style={glassStyle}
      >
        {/* 顶部光晕 */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 p-4">
          {/* Header row */}
          <div className="flex items-start gap-3">
            <motion.div
              className="w-14 h-14 rounded-xl bg-white shrink-0 flex items-center justify-center shadow-lg p-1"
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={imgCharacter} alt="爱小惟" className="w-full h-full object-contain" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[15px] font-bold tracking-tight text-white">爱小惟 Will AI</h2>
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-medium whitespace-nowrap"
                  style={{ background: "rgba(139,92,246,0.30)", border: "1px solid rgba(167,139,250,0.30)", color: "#c4b5fd" }}
                >
                  第001号AI员工
                </span>
              </div>
              <p className="text-[10px] mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                诞生于爱士维AI实验室，融合多模态感知与场景化智能，驱动七大业务智慧升级。
              </p>
            </div>
          </div>

          {/* 六宫格能力 */}
          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {WILL_AI_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                  className="relative rounded-xl px-2 py-2 flex flex-col gap-0.5 cursor-default"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Icon size={13} className={f.color} />
                  <span className="text-[11px] font-semibold text-white/90 leading-tight">{f.label}</span>
                  <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.40)" }}>{f.sub}</span>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onWillAIClick}
            className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-xl py-2 cursor-pointer transition-colors duration-150 text-[11px] font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.40), rgba(168,85,247,0.25))",
              border: "1px solid rgba(167,139,250,0.30)",
              color: "#ddd6fe",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(139,92,246,0.55), rgba(168,85,247,0.38))"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(139,92,246,0.40), rgba(168,85,247,0.25))"; }}
          >
            了解更多
            <ArrowRight size={11} />
          </motion.button>
        </div>
      </motion.div>

      {/* ── Card 2: 七大智慧模块（flex-1，撑满剩余高度） ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden text-white flex-1 min-h-0 flex flex-col"
        style={glassStyle}
      >
        {/* 底部光晕 */}
        <div
          className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.22) 0%, transparent 65%)" }}
        />

        {/* 内容：flex-col 撑满卡片高度 */}
        <div className="relative z-10 px-4 pt-4 pb-3 flex flex-col h-full min-h-0">
          {/* Header - shrink-0 */}
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h2 className="text-[14px] font-bold text-white tracking-tight">智慧模块</h2>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                七大 AI 智慧场景 · 点击进入
              </p>
            </div>
            <motion.div
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={(e) => {
                const scrollContainer = e.currentTarget.parentElement?.nextElementSibling;
                if (scrollContainer) {
                  if (isAtEnd) {
                    scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
                  } else {
                    scrollContainer.scrollTo({ left: scrollContainer.scrollWidth, behavior: "smooth" });
                  }
                }
              }}
            >
              {isAtEnd && <ArrowLeft size={10} className="text-white/50" />}
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                {isAtEnd ? "向右滑动" : "向左滑动"}
              </span>
              {!isAtEnd && <ArrowRight size={10} className="text-white/50" />}
            </motion.div>
          </div>

          {/* 横向滚动区 - flex-1 撑满剩余高度 */}
          <div
            className="flex gap-2 overflow-x-auto flex-1 min-h-0"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.currentTarget.scrollLeft += e.deltaY;
                e.preventDefault();
              }
            }}
            onScroll={handleScroll}
          >
            {MODULE_CARDS.map((mod, i) => (
              <motion.button
                key={mod.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.055, duration: 0.32, ease: "easeOut" }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onModuleClick(mod.label)}
                className="relative shrink-0 rounded-xl overflow-hidden cursor-pointer group h-full"
                style={{ width: "112px" }}
              >
                {/* 背景图 */}
                <ImageWithFallback
                  src={mod.image}
                  alt={mod.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* 渐变遮罩 */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.75) 100%)" }}
                />

                {/* 悬浮彩色覆盖 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${mod.accent} to-transparent opacity-0 group-hover:opacity-55 transition-opacity duration-300`}
                />

                {/* 文字 */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-white text-[11px] font-bold leading-tight">{mod.label}</p>
                  <p className="text-white/60 text-[9px] mt-0.5 leading-tight line-clamp-2">{mod.desc}</p>
                </div>

                {/* 点击箭头 */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight size={9} className="text-white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}