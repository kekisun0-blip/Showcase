import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

// ── Business centers ──────────────────────────────────────────────────────────
export const CENTERS = {
  finance:    { label: "财务中心",     color: "#C084FC", light: "rgba(192,132,252,0.22)", glow: "rgba(192,132,252,0.50)" },
  mobile:     { label: "移动开发",     color: "#22D3EE", light: "rgba(34,211,238,0.22)",  glow: "rgba(34,211,238,0.50)"  },
  hr:         { label: "人力资源中心", color: "#34D399", light: "rgba(52,211,153,0.22)",  glow: "rgba(52,211,153,0.50)"  },
  support:    { label: "业务支持中心", color: "#60A5FA", light: "rgba(96,165,250,0.22)",  glow: "rgba(96,165,250,0.50)"  },
  research:   { label: "产品研发",     color: "#FBBF24", light: "rgba(251,191,36,0.22)",  glow: "rgba(251,191,36,0.50)"  },
  hardware:   { label: "硬件部",       color: "#FB923C", light: "rgba(251,146,60,0.22)",  glow: "rgba(251,146,60,0.50)"  },
  odm:        { label: "ODM结构部",    color: "#F43F5E", light: "rgba(244,63,94,0.22)",   glow: "rgba(244,63,94,0.50)"   },
  quality:    { label: "质量中心",     color: "#A3E635", light: "rgba(163,230,53,0.22)",  glow: "rgba(163,230,53,0.50)"  },
  productEng: { label: "产品工程",     color: "#F472B6", light: "rgba(244,114,182,0.22)", glow: "rgba(244,114,182,0.50)" },
  supply:     { label: "供应链中心",   color: "#94A3B8", light: "rgba(148,163,184,0.22)", glow: "rgba(148,163,184,0.50)" },
  domestic:   { label: "国内服务",     color: "#2DD4BF", light: "rgba(45,212,191,0.22)",  glow: "rgba(45,212,191,0.50)"  },
  production: { label: "生产运营中心", color: "#818CF8", light: "rgba(129,140,248,0.22)", glow: "rgba(129,140,248,0.50)" },
  marketing:  { label: "营销中心",     color: "#E879F9", light: "rgba(232,121,249,0.22)", glow: "rgba(232,121,249,0.50)" },
} as const;

type CenterKey = keyof typeof CENTERS;

interface BlueprintItem {
  id: string;
  name: string;
  center: CenterKey;
  x: number;   // -1 (Complex) → +1 (Easy)
  y: number;   // -1 (Normal)  → +1 (Efficiency)
  developed: boolean;
}

// ── Blueprint data ────────────────────────────────────────────────────────────
const ITEMS: BlueprintItem[] = [

  // ══ 已上线 (16 项) ════════════════════════════════════════════════════════

  // ── 生产运营中心 · 已开发 (7) ─────────────────────────────────────────
  { id: "dev01", name: "自动排产系统",   center: "production", x: -0.22, y:  0.28, developed: true },
  { id: "dev02", name: "工厂智能排班",   center: "production", x:  0.00, y:  0.22, developed: true },
  { id: "dev03", name: "MES物料管理",    center: "production", x:  0.18, y:  0.30, developed: true },
  { id: "dev04", name: "PACK工厂监控",   center: "production", x:  0.36, y:  0.34, developed: true },
  { id: "dev05", name: "PCBA工厂监控",   center: "production", x:  0.46, y:  0.20, developed: true },
  { id: "dev06", name: "光储充监控",     center: "production", x:  0.26, y:  0.08, developed: true },
  { id: "dev07", name: "工单目标配置",   center: "production", x:  0.10, y: -0.08, developed: true },

  // ── 产品研发 · 已开发 (2) ─────────────────────────────────────────────
  { id: "dev08", name: "超级BOM",        center: "research",   x: -0.22, y:  0.56, developed: true },
  { id: "dev09", name: "EMS能源管理",    center: "research",   x:  0.16, y:  0.46, developed: true },

  // ── 营销中心 · 已开发 (1) ─────────────────────────────────────────────
  { id: "dev10", name: "产品上市计划",   center: "marketing",  x:  0.34, y:  0.64, developed: true },

  // ── 业务支持中心 · 已开发 (3) ────────────────────────────────────────
  { id: "dev11", name: "政申通-查询",    center: "support",    x: -0.50, y:  0.42, developed: true },
  { id: "dev12", name: "EHS合规系统",    center: "support",    x: -0.62, y:  0.32, developed: true },
  { id: "dev13", name: "政府项目爬虫",   center: "support",    x: -0.42, y:  0.12, developed: true },

  // ── 供应链中心 · 已开发 (2) ──────────────────────────────────────────
  { id: "dev14", name: "缺料分析通知",   center: "supply",     x:  0.62, y:  0.32, developed: true },
  { id: "dev15", name: "集装箱装载",     center: "supply",     x:  0.76, y:  0.28, developed: true },

  // ── 国内服务 · 已开发 (1) ────────────────────────────────────────────
  { id: "dev16", name: "光储助手小程序", center: "domestic",   x:  0.52, y: -0.06, developed: true },

  // ══ 规划中 ════════════════════════════════════════════════════════════════

  // ── 财务中心 (13) ─────────────────────────────────────────────────────
  { id: "fi01", name: "智能催收策略引擎",     center: "finance",    x: -0.72, y:  0.65, developed: false },
  { id: "fi02", name: "智能报销审核机器人",   center: "finance",    x: -0.55, y:  0.72, developed: false },
  { id: "fi03", name: "销售提成测算模型",     center: "finance",    x: -0.38, y:  0.58, developed: false },
  { id: "fi04", name: "应收逾期预警系统",     center: "finance",    x: -0.62, y:  0.45, developed: false },
  { id: "fi05", name: "政府报表自动填充",     center: "finance",    x: -0.82, y:  0.35, developed: false },
  { id: "fi06", name: "跨境付款风控模型",     center: "finance",    x: -0.70, y: -0.18, developed: false },
  { id: "fi07", name: "多国账务协同平台",     center: "finance",    x: -0.85, y: -0.35, developed: false },
  { id: "fi08", name: "智能开票机器人",       center: "finance",    x: -0.30, y: -0.25, developed: false },
  { id: "fi09", name: "银行流水智能核销",     center: "finance",    x: -0.45, y: -0.40, developed: false },
  { id: "fi10", name: "应收账龄自动校准",     center: "finance",    x: -0.60, y: -0.52, developed: false },
  { id: "fi11", name: "现金流压力测试",       center: "finance",    x: -0.78, y: -0.65, developed: false },
  { id: "fi12", name: "自动账务处理",         center: "finance",    x: -0.22, y: -0.48, developed: false },
  { id: "fi13", name: "发票录入与校验",       center: "finance",    x: -0.12, y: -0.32, developed: false },

  // ── 移动开发 (3) ──────────────────────────────────────────────────────
  { id: "mo01", name: "APP语言翻译",          center: "mobile",     x:  0.50, y:  0.72, developed: false },
  { id: "mo02", name: "APP ODM版本修改",      center: "mobile",     x:  0.62, y:  0.62, developed: false },
  { id: "mo03", name: "APP后端改动同步校验",  center: "mobile",     x:  0.40, y:  0.60, developed: false },

  // ── 人力资源中心 (6) ──────────────────────────────────────────────────
  { id: "hr01", name: "人力招聘助手",         center: "hr",         x: -0.35, y: -0.72, developed: false },
  { id: "hr02", name: "人力培训助手",         center: "hr",         x: -0.52, y: -0.68, developed: false },
  { id: "hr03", name: "绩效管理助手",         center: "hr",         x: -0.42, y: -0.55, developed: false },
  { id: "hr04", name: "员工关系管理助手",     center: "hr",         x: -0.65, y: -0.78, developed: false },
  { id: "hr05", name: "合规管理助手",         center: "hr",         x: -0.78, y: -0.60, developed: false },
  { id: "hr06", name: "考勤助手",             center: "hr",         x: -0.58, y: -0.88, developed: false },

  // ── 业务支持中心 (6) ──────────────────────────────────────────────────
  { id: "su01", name: "申报材料生成",         center: "support",    x: -0.78, y:  0.55, developed: false },
  { id: "su02", name: "办公用品管理",         center: "support",    x: -0.65, y:  0.22, developed: false },
  { id: "su03", name: "采购方案生成",         center: "support",    x: -0.52, y:  0.18, developed: false },
  { id: "su04", name: "行政人工客服",         center: "support",    x: -0.38, y:  0.30, developed: false },
  { id: "su05", name: "MRO采购",              center: "support",    x: -0.28, y:  0.15, developed: false },
  { id: "su06", name: "合同流程助手",         center: "support",    x: -0.22, y:  0.45, developed: false },

  // ── 产品研发 (4) ──────────────────────────────────────────────────────
  { id: "re01", name: "安规条款智能解读",     center: "research",   x: -0.10, y:  0.70, developed: false },
  { id: "re02", name: "专利检索与侵权预警",   center: "research",   x:  0.10, y:  0.58, developed: false },
  { id: "re03", name: "样机全生命周期追踪",   center: "research",   x:  0.05, y:  0.85, developed: false },
  { id: "re04", name: "竞品智能分析系统",     center: "research",   x:  0.22, y:  0.75, developed: false },

  // ── 硬件部 (4) ────────────────────────────────────────────────────────
  { id: "hw01", name: "物料信息生成",         center: "hardware",   x:  0.40, y: -0.42, developed: false },
  { id: "hw02", name: "RUN机监控可视化",      center: "hardware",   x:  0.52, y: -0.55, developed: false },
  { id: "hw03", name: "交付手册生成",         center: "hardware",   x:  0.62, y: -0.38, developed: false },
  { id: "hw04", name: "功率件损耗计算",       center: "hardware",   x:  0.32, y: -0.60, developed: false },

  // ── ODM结构部 (3) ─────────────────────────────────────────────────────
  { id: "od01", name: "自动申请料号",         center: "odm",        x:  0.82, y:  0.88, developed: false },
  { id: "od02", name: "自动完成投料变更单",   center: "odm",        x:  0.70, y:  0.82, developed: false },
  { id: "od03", name: "自动提交BOM",          center: "odm",        x:  0.92, y:  0.75, developed: false },

  // ── 质量中心 (1) ──────────────────────────────────────────────────────
  { id: "qu01", name: "CQE",                  center: "quality",    x:  0.08, y:  0.38, developed: false },

  // ── 产品工程 (1) ──────────────────────────────────────────────────────
  { id: "pe01", name: "SOP视频培训",          center: "productEng", x: -0.05, y:  0.52, developed: false },

  // ── 供应链中心 (3) ────────────────────────────────────────────────────
  { id: "sp01", name: "定时任务机器人",       center: "supply",     x:  0.60, y:  0.45, developed: false },
  { id: "sp02", name: "供应链数据监控",       center: "supply",     x:  0.75, y:  0.55, developed: false },
  { id: "sp03", name: "出货订单预测",         center: "supply",     x:  0.85, y:  0.45, developed: false },

  // ── 国内服务 (7) ──────────────────────────────────────────────────────
  { id: "ds01", name: "AI客服机器人",         center: "domestic",   x:  0.72, y: -0.18, developed: false },
  { id: "ds02", name: "AI客服辅助助手",       center: "domestic",   x:  0.82, y: -0.32, developed: false },
  { id: "ds03", name: "AI辅助记录员",         center: "domestic",   x:  0.58, y: -0.22, developed: false },
  { id: "ds04", name: "AI辅助合同评审",       center: "domestic",   x:  0.45, y: -0.18, developed: false },
  { id: "ds05", name: "维修报价",             center: "domestic",   x:  0.68, y: -0.68, developed: false },
  { id: "ds06", name: "服务工单数据分析",     center: "domestic",   x:  0.80, y: -0.55, developed: false },
  { id: "ds07", name: "WEB2.0系统智能运维",   center: "domestic",   x:  0.92, y: -0.42, developed: false },
];

// ── Component ─────────────────────────────────────────────────────────────────
interface Props { onClose: () => void; }

export function BlueprintModal({ onClose }: Props) {
  const [hoveredId, setHoveredId]       = useState<string | null>(null);
  const [activeCenter, setActiveCenter] = useState<CenterKey | null>(null);

  const totalDev   = ITEMS.filter(i => i.developed).length;
  const totalPlan  = ITEMS.filter(i => !i.developed).length;

  /* Map normalised -1..1 to percentage 6%..94% */
  const toLeft = (x: number) => `${((x + 1) / 2) * 88 + 6}%`;
  const toTop  = (y: number) => `${((-y + 1) / 2) * 88 + 6}%`;   // y inverted

  const centerKeys = Object.keys(CENTERS) as CenterKey[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(12px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit   ={{ scale: 0.96, opacity: 0, y: 12 }}
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
        {/* ── Ambient blobs ────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
          <div className="absolute -bottom-20 right-1/4 w-[380px] h-[380px] rounded-full blur-[100px] opacity-14"
            style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)" }} />
          <div className="absolute top-1/2 -left-16 w-[280px] h-[280px] rounded-full blur-[80px] opacity-10"
            style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />
        </div>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div
          className="relative z-10 px-7 py-4 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-7 rounded-full shrink-0"
                style={{ background: "linear-gradient(180deg, #a78bfa 0%, #60a5fa 100%)", boxShadow: "0 0 8px rgba(167,139,250,0.6)" }} />
              <h1 className="text-white text-[20px] font-bold tracking-tight">AI 未来开发蓝图</h1>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
                style={{ background: "rgba(167,139,250,0.14)", border: "1px solid rgba(167,139,250,0.28)", color: "#c4b5fd", letterSpacing: "0.06em" }}>
                TBD
              </span>
            </div>
            <p className="text-white/35 text-[10px] mt-0.5 ml-4">Aiswei AI Future Development Blueprint</p>
          </div>

          {/* Stats + close */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-[22px] font-bold text-emerald-300 leading-none">{totalDev}</p>
                <p className="text-[8px] text-white/40 mt-0.5">已开发</p>
              </div>
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="text-center">
                <p className="text-[22px] font-bold text-violet-300 leading-none">{totalPlan}</p>
                <p className="text-[8px] text-white/40 mt-0.5">规划中</p>
              </div>
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="text-center">
                <p className="text-[22px] font-bold text-white leading-none">{ITEMS.length}</p>
                <p className="text-[8px] text-white/40 mt-0.5">总计</p>
              </div>
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
        </div>

        {/* ── Center filter pills ───────────────────────────────────────── */}
        <div
          className="relative z-10 px-7 py-2.5 flex items-center gap-2 shrink-0 overflow-x-auto"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", scrollbarWidth: "none" }}
        >
          <button
            onClick={() => setActiveCenter(null)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium cursor-pointer transition-all duration-150 whitespace-nowrap shrink-0"
            style={{
              background: activeCenter === null ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: activeCenter === null ? "#fff" : "rgba(255,255,255,0.45)",
            }}
          >
            全部
          </button>
          {centerKeys.map(key => {
            const c = CENTERS[key];
            const count = ITEMS.filter(i => i.center === key).length;
            const active = activeCenter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCenter(active ? null : key)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium cursor-pointer transition-all duration-150 whitespace-nowrap shrink-0"
                style={{
                  background: active ? c.light : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? c.color + "60" : "rgba(255,255,255,0.08)"}`,
                  color: active ? c.color : "rgba(255,255,255,0.40)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: c.color, boxShadow: active ? `0 0 5px ${c.color}` : "none" }} />
                {c.label}
                <span className="opacity-60">({count})</span>
              </button>
            );
          })}

          {/* Status legend inline */}
          <div className="ml-auto flex items-center gap-3 shrink-0 pl-2" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full shrink-0"
                style={{ background: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.55)" }} />
              <span className="text-[9px] text-white/45">已开发</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full shrink-0"
                style={{ background: "rgba(255,255,255,0.04)", border: "1.5px dashed rgba(255,255,255,0.30)" }} />
              <span className="text-[9px] text-white/45">规划中</span>
            </div>
          </div>
        </div>

        {/* ── Scatter chart ─────────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 min-h-0 p-5">
          <div className="relative w-full h-full">

            {/* Quadrant bg tints */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-0 w-1/2 h-1/2 rounded-tl-xl"
                style={{ background: "rgba(167,139,250,0.025)" }} />
              <div className="absolute right-0 top-0 w-1/2 h-1/2 rounded-tr-xl"
                style={{ background: "rgba(251,146,60,0.025)" }} />
              <div className="absolute left-0 bottom-0 w-1/2 h-1/2 rounded-bl-xl"
                style={{ background: "rgba(52,211,153,0.025)" }} />
              <div className="absolute right-0 bottom-0 w-1/2 h-1/2 rounded-br-xl"
                style={{ background: "rgba(244,114,182,0.025)" }} />
            </div>

            {/* Axis lines */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent 2%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.12) 80%, transparent 98%)" }} />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent 2%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.12) 80%, transparent 98%)" }} />

            {/* Axis labels */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">Efficiency</span>
            </div>
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">Normal</span>
            </div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">Complex</span>
            </div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">Easy</span>
            </div>

            {/* Quadrant corner labels */}
            <div className="absolute top-7 left-8 pointer-events-none">
              <span className="text-[9px] text-white/12 tracking-widest uppercase">复杂 · 高效</span>
            </div>
            <div className="absolute top-7 right-8 pointer-events-none">
              <span className="text-[9px] text-white/12 tracking-widest uppercase">简单 · 高效</span>
            </div>
            <div className="absolute bottom-6 left-8 pointer-events-none">
              <span className="text-[9px] text-white/12 tracking-widest uppercase">复杂 · 普通</span>
            </div>
            <div className="absolute bottom-6 right-8 pointer-events-none">
              <span className="text-[9px] text-white/12 tracking-widest uppercase">简单 · 普通</span>
            </div>

            {/* Center watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[72px] font-black tracking-[0.35em] text-white/[0.03]">FUTURE</span>
            </div>

            {/* ── Bubbles ──────────────────────────────────────────────── */}
            {ITEMS.map((item, i) => {
              const cx      = CENTERS[item.center];
              const isHover = hoveredId === item.id;
              const faded   = activeCenter !== null && activeCenter !== item.center;
              const SIZE    = item.developed ? 54 : 48;

              return (
                <motion.div
                  key={item.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: toLeft(item.x),
                    top:  toTop(item.y),
                    transform: "translate(-50%, -50%)",
                    zIndex: isHover ? 50 : item.developed ? 10 : 5,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: faded ? 0.12 : 1 }}
                  transition={{ delay: i * 0.008, duration: 0.35, ease: "backOut" }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Glow pulse for developed items */}
                  {item.developed && (
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.45, 0, 0.45] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                      style={{
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${cx.color}60, transparent 70%)`,
                        width: SIZE + 24,
                        height: SIZE + 24,
                        top: -12,
                        left: -12,
                      }}
                    />
                  )}

                  {/* Bubble body */}
                  <motion.div
                    animate={{ scale: isHover ? 1.22 : 1 }}
                    transition={{ duration: 0.18 }}
                    className="relative flex items-center justify-center"
                    style={{
                      width: SIZE,
                      height: SIZE,
                      borderRadius: "50%",
                      background: item.developed
                        ? `radial-gradient(circle at 35% 30%, ${cx.color}ee 0%, ${cx.color}99 60%, ${cx.color}66 100%)`
                        : "rgba(10,4,24,0.75)",
                      border: item.developed
                        ? `2px solid ${cx.color}`
                        : `1.5px dashed ${cx.color}88`,
                      boxShadow: isHover
                        ? `0 0 0 3px ${cx.color}40, 0 0 24px ${cx.color}60`
                        : item.developed
                        ? `0 0 14px ${cx.color}55, inset 0 1px 0 rgba(255,255,255,0.30)`
                        : "none",
                    }}
                  >
                    <span
                      className="text-center leading-[1.15] px-1 select-none"
                      style={{
                        fontSize: "7.5px",
                        color: item.developed ? "rgba(255,255,255,0.95)" : cx.color,
                        fontWeight: item.developed ? 700 : 500,
                        maxWidth: SIZE - 8,
                        wordBreak: "break-all",
                        display: "block",
                      }}
                    >
                      {item.name}
                    </span>
                  </motion.div>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {isHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1   }}
                        exit   ={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-2 rounded-xl whitespace-nowrap pointer-events-none"
                        style={{
                          background: "rgba(8,4,22,0.96)",
                          border: `1px solid ${cx.color}55`,
                          boxShadow: `0 8px 28px rgba(0,0,0,0.7), 0 0 0 1px ${cx.color}22`,
                          zIndex: 100,
                        }}
                      >
                        <p className="text-white text-[12px] font-semibold leading-tight">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cx.color }} />
                          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>{cx.label}</span>
                          <span
                            className="text-[9px] font-medium ml-0.5"
                            style={{ color: item.developed ? "#34d399" : "rgba(255,255,255,0.30)" }}
                          >
                            {item.developed ? "● 已开发" : "○ 规划中"}
                          </span>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2"
                          style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${cx.color}55` }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
