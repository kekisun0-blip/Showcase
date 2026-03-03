import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { DefaultRightPanel } from "./components/DefaultRightPanel";
import { ProjectCard } from "./components/ProjectCard";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Cpu, Globe, GitMerge, Bot, Workflow, LayoutGrid, ChevronRight,
  Factory, Calendar, Package, Monitor, CircuitBoard, Sun, ClipboardList,
  TrendingUp, Layers, Search, ShieldCheck, Smartphone, Bell, Box, Gauge,
  Settings, Truck, Zap,
} from "lucide-react";
import imgIsland    from "figma:asset/c82015b88aae056813836c7320cb3ffbbc95f59c.png";
import imgCharacter from "figma:asset/145c786e2bcf2cb85c225b58b4e005b4d38df06c.png";
import imgSuperBOM  from "figma:asset/75c83d9d54f05ea397af7572cdf7d2f6086ad21a.png";
import imgProductLaunch from "figma:asset/f6775c1a73f62dd7c9d6f6b8733a7ac6bd24ca05.png";
import imgGovQuery      from "figma:asset/d852a5c580fcc4a481db8b7bdcbca40acbffae60.png";
import imgGovCrawler    from "figma:asset/87d32e5b4ea6229c72fdd99c8229a891b52ce6bd.png";
import imgAutoSchedule  from "figma:asset/359d0572d5a1c1ed2e29f99ff937d951e2d50251.png";
import imgEHS           from "figma:asset/b3476ea3574ea002cc6d4aafaee6ba43680c6291.png";
import imgPSCAssistant  from "figma:asset/85263ff0a09ffda766ecb5820da0a331c70a3833.png";
import imgMESMaterial   from "figma:asset/70275d705251c591db7bd82d0a90677d339667d0.png";
import imgStaffSchedule from "figma:asset/cb1d7800356e2eb141b73bfc498e54345c0b3823.png";
import imgWorkorderConfig from "figma:asset/9992fd72ccea755b662a8bf9db1c8862b0b45165.png";
import imgPCBAMonitor    from "figma:asset/8b1a139d55e99812b60425b60b33572c632aa0cc.png";
import imgPACKMonitor    from "figma:asset/846d5158c2621062bb5613ed21cb42aee9be9297.png";
import imgPSCMonitor     from "figma:asset/dbc6cbc5b244330c281346a385267ab36b64aef4.png";
import EMSFrame         from "../imports/Frame1912054662";
import { FloatingElement } from "./components/FloatingElement";
import { GlassBubbleButton } from "./components/GlassBubbleButton";
import { TiltContainer } from "./components/TiltContainer";
import WillAIGrid from "../imports/Group8777";

// ── Feature descriptions ──────────────────────────────────────────────────────
const buttonDescriptions: Record<string, string> = {
  "智慧生产": "通过AI多模态监系统实时采集工艺参数，构建数字孪生工厂，实现生产全流程可视化与智优化。AI预测排产系统融合订单、库存与设备数据，秒级生成最优排产方案，提升交付准时率至98%。",
  "智慧运维": "通过设备预测性保养模型，提前识别故障风险，制定精准维护计划，降低突发停机损失。远程诊断与干预系统实现故障快速修复，提升设备可用性与服务响应速度。",
  "智慧研发": "爱士维将AI技术深度融入研发全流程，构建「超级BOM」系统，实现物料清单的智能优化与动态管理，代码自动生成率超70%，研发周期缩短40%。",
  "智慧测试": "构建行业级智能失效分析闭环系统，实现测试数据自动收集、分析与反馈。测试覆盖率提升至95%，缺陷预测准确率达90%。",
  "智慧供应链": "爱士维构建供应商360度分析评级系统，从质量、交期、价格等多维度评估供应商表现，实现风险预警与智能调度。库存周转率提升 35%。",
  "智慧销售": "基于销售历史与市场动态数据，AI预测模型精准研判销售波动趋势，助力制定精准营销策略。系统支持动态定价与促销策略。",
  "智慧能源": "爱士��构建虚拟电厂（VPP）平台，整合分布式光伏、储能与可控负荷，现智能调度与电力市场交易。推动园区能源结构优化与碳减排。",
};

// ── Module sub-project types & data ──────────────────────────────────────────
type ModuleProject = {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  image: string;
  preview?: React.ReactNode;
  tag: string;
  tagColor: string;
};

const moduleProjects: Record<string, ModuleProject[]> = {
  "智慧生产": [
    {
      id: "auto-schedule",
      icon: Factory,
      title: "自动排产系统",
      desc: "AI基于「订单-资源-产能」全数据自动计算全局排产最优方案",
      image: imgAutoSchedule,
      tag: "AI调度",
      tagColor: "bg-violet-500/30 text-violet-200 border-violet-400/30",
    },
    {
      id: "staff-schedule",
      icon: Calendar,
      title: "工厂智能排班系统",
      desc: "通过输入工序需求、人员需求等信息，自动进行员工排班",
      image: imgStaffSchedule,
      tag: "智能排班",
      tagColor: "bg-blue-500/30 text-blue-200 border-blue-400/30",
    },
    {
      id: "mes-material",
      icon: Package,
      title: "MES物料管理小程序",
      desc: "通过微信小程序扫码和信息录入完成物料各个生命周期的维护",
      image: imgMESMaterial,
      tag: "微信小程序",
      tagColor: "bg-green-500/30 text-green-200 border-green-400/30",
    },
    {
      id: "pack-monitor",
      icon: Monitor,
      title: "PACK工厂监控系统",
      desc: "PACK组装实时监控与车间日累计数据统计，实现生产现场透明化与实时管控",
      image: imgPACKMonitor,
      tag: "实时监控",
      tagColor: "bg-orange-500/30 text-orange-200 border-orange-400/30",
    },
    {
      id: "pcba-monitor",
      icon: CircuitBoard,
      title: "PCBA工厂监控系统",
      desc: "PCBA SMT产线实时监控，实现SMT生产过程的透明化与实时管控",
      image: imgPCBAMonitor,
      tag: "SMT产线",
      tagColor: "bg-cyan-500/30 text-cyan-200 border-cyan-400/30",
    },
    {
      id: "psc-monitor",
      icon: Sun,
      title: "光储充工厂监控系统",
      desc: "PSC产线全流程监控系统，涵盖包装需求统计、ATE/AGE测试监控、组装实时监控等核心功能",
      image: imgPSCMonitor,
      tag: "光储充",
      tagColor: "bg-yellow-500/30 text-yellow-200 border-yellow-400/30",
    },
    {
      id: "workorder-config",
      icon: ClipboardList,
      title: "工单目标配置系统",
      desc: "工单目标配置管理系统，支持ATE目标配置、光储充组装目标配置、PACK组装目标配置等功能",
      image: imgWorkorderConfig,
      tag: "目标管理",
      tagColor: "bg-pink-500/30 text-pink-200 border-pink-400/30",
    },
  ],

  "智慧销售": [
    {
      id: "product-launch",
      icon: TrendingUp,
      title: "产品上市计划管理系统",
      desc: "各业务部门在全球化管理产品上市计划信息系统",
      image: imgProductLaunch,
      tag: "全球管理",
      tagColor: "bg-emerald-500/30 text-emerald-200 border-emerald-400/30",
    },
  ],

  "智慧研发": [
    {
      id: "super-bom",
      icon: Layers,
      title: "超级BOM",
      desc: "AI超级BOM分析与设计辅助系统，实现系统间的高效协同",
      image: imgSuperBOM,
      tag: "AI辅助",
      tagColor: "bg-blue-500/30 text-blue-200 border-blue-400/30",
    },
  ],

  "智慧运维": [
    {
      id: "gov-query",
      icon: Search,
      title: "政申通-综合信息查询",
      desc: "辅助人工填写申报信息，应对复杂表格和网站，可以快速高效的查询真实业务数据",
      image: imgGovQuery,
      tag: "政务查询",
      tagColor: "bg-indigo-500/30 text-indigo-200 border-indigo-400/30",
    },
    {
      id: "ehs-checker",
      icon: ShieldCheck,
      title: "EHS法律法规日期确认器",
      desc: "为了减少人工巡检EHS法规工作量，使用AI自动联网分析EHS更新情况",
      image: imgEHS,
      tag: "AI合规",
      tagColor: "bg-green-500/30 text-green-200 border-green-400/30",
    },
    {
      id: "psc-assistant",
      icon: Smartphone,
      title: "小程序-光储助手",
      desc: "解决最核心客诉问题，既满足客户满意度的同时减少了人力成本",
      image: imgPSCAssistant,
      tag: "微信小程序",
      tagColor: "bg-amber-500/30 text-amber-200 border-amber-400/30",
    },
    {
      id: "gov-crawler",
      icon: Globe,
      title: "政申通-政府项目爬虫",
      desc: "为了减少人工动搜索，通过产品自动爬取适合公司申报的政府项目，并通过AI给出申请分析报告",
      image: imgGovCrawler,
      tag: "AI爬虫",
      tagColor: "bg-cyan-500/30 text-cyan-200 border-cyan-400/30",
    },
  ],

  "智慧供应链": [
    {
      id: "shortage-analysis",
      icon: Bell,
      title: "缺料分析及通知",
      desc: "从工单缺料分析到交期反馈的全流程自动化管理，提升采购协同效率与物料交付可视化",
      image: "https://images.unsplash.com/photo-1640529494825-4add7eed660e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      tag: "全流程自动化",
      tagColor: "bg-red-500/30 text-red-200 border-red-400/30",
    },
    {
      id: "container-calc",
      icon: Box,
      title: "集装箱装载计算工具",
      desc: "智能装箱优化系统，支持多柜型、可视化装载与灵活分配",
      image: "https://images.unsplash.com/photo-1621862681400-a2a7321dc1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      tag: "装载优化",
      tagColor: "bg-teal-500/30 text-teal-200 border-teal-400/30",
    },
  ],

  "智慧能源": [
    {
      id: "ems-system",
      icon: Gauge,
      title: "EMS智慧能源管理",
      desc: "EMS系统以「AI预测算法+智能调度策略」为核心，覆盖能源数据管理、预测分析、智能调度及用户交互四大维",
      image: "",
      preview: <EMSFrame />,
      tag: "AI预测",
      tagColor: "bg-yellow-500/30 text-yellow-200 border-yellow-400/30",
    },
  ],

  "智慧测试": [],
};

// ── Module header config ─────────────────────────────────────────────��────────
const moduleConfig: Record<string, { icon: React.ElementType; accent: string; glow: string; iconBg: string }> = {
  "智慧生产":   { icon: Factory,     accent: "text-indigo-200",  glow: "rgba(99,102,241,0.4)",   iconBg: "bg-indigo-500/20 border-indigo-400/40" },
  "智慧销售":   { icon: TrendingUp,  accent: "text-emerald-200", glow: "rgba(52,211,153,0.35)",  iconBg: "bg-emerald-500/20 border-emerald-400/40" },
  "智慧研发":   { icon: Layers,      accent: "text-blue-200",    glow: "rgba(96,165,250,0.35)",  iconBg: "bg-blue-500/20 border-blue-400/40" },
  "智慧运维":   { icon: Settings,    accent: "text-orange-200",  glow: "rgba(251,146,60,0.35)",  iconBg: "bg-orange-500/20 border-orange-400/40" },
  "智慧供应链": { icon: Truck,       accent: "text-cyan-200",    glow: "rgba(34,211,238,0.35)",  iconBg: "bg-cyan-500/20 border-cyan-400/40" },
  "智慧能源":   { icon: Zap,         accent: "text-yellow-200",  glow: "rgba(250,204,21,0.35)",  iconBg: "bg-yellow-500/20 border-yellow-400/40" },
  "智慧测试":   { icon: ShieldCheck, accent: "text-green-200",   glow: "rgba(34,197,94,0.35)",   iconBg: "bg-green-500/20 border-green-400/40" },
};

// ── Will AI capabilities ��─────────────────────────────────────────────────────
const willAICapabilities = [
  {
    id: "ems",
    icon: LayoutGrid,
    title: "场景化应用 – EMS小组件",
    desc: "智能能源根据用户不同EMS场景提供AI功能，2026第三季度发布",
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    tag: "即将发布",
  },
  {
    id: "seven-scenes",
    icon: Bot,
    title: "爱小惟七大智慧场景",
    desc: "企业内部智能 AI 助理推动不同业务场景的AI需求及其自动化",
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    tag: "核心能力",
  },
  {
    id: "global",
    icon: Globe,
    title: "全球化爱小惟形象",
    desc: "全球化AI形象与app AI功能结合，展示全球化形象提高与用户的情感链接",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    tag: "品牌体验",
  },
  {
    id: "integration",
    icon: GitMerge,
    title: "灵活交互与集成",
    desc: "多种集成和交互模式，跨平台链接数据与体验，全��位解决业务痛点问题",
    color: "from-cyan-500/20 to-teal-500/10",
    iconColor: "text-cyan-400",
    tag: "开放集成",
  },
  {
    id: "llm",
    icon: Cpu,
    title: "本地部署AI大语言模型",
    desc: "本地部署AI大语言模型与爱小惟AI对话，应用于公司内部的入职引导、查阅AI项目进度等场景",
    color: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-400",
    tag: "私有部署",
  },
  {
    id: "agent",
    icon: Workflow,
    title: "爱小惟Agent工作流",
    desc: "本地部署AI Agent工作流，一键自定义流程，效率革命来袭！使用AI工作流助力工作",
    color: "from-orange-500/20 to-amber-500/10",
    iconColor: "text-orange-400",
    tag: "智能自动化",
  },
];

// ── Ambient particles ─────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, id) => ({
  id, w: 2 + ((id * 7) % 6), h: 2 + ((id * 5) % 6),
  left: `${(id * 17 + 3) % 100}%`, top: `${(id * 13 + 7) % 100}%`,
  yDist: 40 + ((id * 11) % 80), dur: 4 + ((id * 3) % 6), delay: (id * 0.7) % 5,
}));

function AmbientParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-white/20"
          style={{ width: p.w, height: p.h, left: p.left, top: p.top }}
          animate={{ y: [0, -p.yDist, 0], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

// ── Island ────────────────────────────────────────────────────────────────────
function AnimatedIsland() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div className="absolute w-[340px] h-[120px] rounded-[100%] bg-purple-400/20 blur-2xl"
        animate={{ scale: hovered ? [1, 1.15, 1] : [1, 1.05, 1], opacity: hovered ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <FloatingElement duration={6} yOffset={12} className="absolute inset-0 flex items-center justify-center">
        <motion.img src={imgIsland} alt="Island" className="w-full h-full object-contain"
          animate={{ rotateY: hovered ? [0, 3, -3, 0] : [0, 1.5, -1.5, 0], scale: hovered ? 1.03 : 1 }}
          transition={{ rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.4, ease: "easeOut" } }}
          style={{ filter: hovered ? "drop-shadow(0 40px 40px rgba(120,60,200,0.35))" : "drop-shadow(0 35px 35px rgba(0,0,0,0.25))" }} />
      </FloatingElement>
    </motion.div>
  );
}

// ── Generic Module Panel (Dark Glass, fixed height) ───────────────────────────
function ModulePanel({ module, onClose }: { module: string; onClose: () => void }) {
  const projects = moduleProjects[module] ?? [];
  const cfg = moduleConfig[module] ?? {
    icon: Factory,
    accent: "text-indigo-300",
    glow: "rgba(99,102,241,0.25)",
    iconBg: "bg-indigo-500/20 border-indigo-400/30",
  };
  const HeaderIcon = cfg.icon;

  return (
    <div
      className="relative overflow-hidden rounded-2xl text-white flex flex-col"
      style={{
        height: "calc(100vh - 60px)",
        minHeight: "560px",
        maxHeight: "920px",
        background: "rgba(8, 4, 22, 0.82)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.50)",
      }}
    >
      {/* Module accent glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 65%)` }} />

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full cursor-pointer z-20 transition-colors duration-150"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
        <X size={15} className="text-white/80" />
      </button>

      {/* Header – shrink-0 */}
      <div className="relative z-10 px-5 pt-5 pb-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${cfg.iconBg} ${cfg.accent} shrink-0`}>
            <HeaderIcon size={15} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-white tracking-tight">{module}</h2>
            <p className="text-white/40 text-[10px] mt-px">
              {projects.length > 0 ? `${projects.length} 个子系统 · 点击展开详情` : "敬请期待"}
            </p>
          </div>
        </div>
        <p className="text-white/60 text-[11px] mt-3 leading-relaxed line-clamp-2">
          {buttonDescriptions[module]}
        </p>
      </div>

      {/* Body – flex-1, scrollable when has projects, centered when empty */}
      <div
        className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 py-3"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.length > 0 ? (
          /* ── 项目卡片 2 列网格 ── */
          <div className="grid grid-cols-2 gap-3">
            {projects.map((proj, i) => (
              <ProjectCard key={proj.id} proj={proj} i={i} />
            ))}
          </div>
        ) : (
          /* ── 敬请期待占位符（居中，撑满剩余高度） ── */
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {/* 脉冲光环 + 图标 */}
            <div className="relative flex items-center justify-center">
              {/* 外层慢脉冲 */}
              <motion.div
                className="absolute w-36 h-36 rounded-full"
                style={{ background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)` }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.55, 0.08, 0.55] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* 中层旋转环 */}
              <motion.div
                className="absolute w-24 h-24 rounded-full"
                style={{ border: `1.5px solid ${cfg.glow}` }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              {/* 内层图标容器 */}
              <motion.div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${cfg.iconBg} ${cfg.accent}`}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <HeaderIcon size={28} />
              </motion.div>
            </div>

            {/* 文案 */}
            <div className="text-center space-y-2">
              <p className="text-white text-[18px] font-bold tracking-widest">敬请期待</p>
              <p className="text-white/40 text-[11px] leading-relaxed max-w-[220px]">
                {module}相关子系统正在紧张研发中<br />即将与您见面
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Will AI Panel ─────────────────────────────────────────────────────────────
function WillAIPanel({ onClose }: { onClose: () => void }) {
  const capabilities = [
    { icon: LayoutGrid, label: "场景化应用",   desc: "EMS智能小组件，Q3发布",    color: "rgba(139,92,246,1)",  bg: "rgba(139,92,246,0.12)" },
    { icon: Bot,        label: "七大智慧场景", desc: "全业务域AI助理全覆盖",      color: "rgba(192,132,252,1)", bg: "rgba(192,132,252,0.10)" },
    { icon: Globe,      label: "全球化形象",   desc: "多语言·多地区形象矩阵",    color: "rgba(96,165,250,1)",  bg: "rgba(96,165,250,0.10)" },
    { icon: GitMerge,   label: "灵活集成",     desc: "跨平台 API 无缝链接",      color: "rgba(34,211,238,1)",  bg: "rgba(34,211,238,0.10)" },
    { icon: Cpu,        label: "本地大模型",   desc: "内网 LLM，数据不出境",     color: "rgba(52,211,153,1)",  bg: "rgba(52,211,153,0.10)" },
    { icon: Workflow,   label: "Agent工作流",  desc: "一键自定义智能自动化流程",  color: "rgba(251,146,60,1)",  bg: "rgba(251,146,60,0.10)" },
  ];

  return (
    <div
      className="relative rounded-3xl text-white flex flex-col overflow-hidden"
      style={{
        width: "440px",
        maxHeight: "calc(100vh - 48px)",
        background: "linear-gradient(158deg, #130829 0%, #231050 42%, #3b1676 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute -top-28 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 62%)" }} />
      <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.16) 0%, transparent 62%)" }} />
      <div className="absolute top-1/3 right-0 w-48 h-48 rounded-full blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)" }} />

      {/* Close button */}
      <button onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full cursor-pointer z-30 transition-colors duration-150"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
        <X size={14} className="text-white/80" />
      </button>

      {/* Scrollable body */}
      <div className="relative z-10 overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>

        {/* Hero header */}
        <div className="px-6 pt-6 pb-5">
          {/* Identity row */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <motion.div
                className="w-[72px] h-[72px] rounded-2xl bg-white shadow-2xl p-1.5 flex items-center justify-center"
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={imgCharacter} alt="爱小惟" className="w-full h-full object-contain" />
              </motion.div>
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "0 0 0 3px rgba(168,85,247,0.45)" }}
                animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.12, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Online dot */}
              <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-full bg-emerald-400 border-[3px]"
                style={{ borderColor: "#130829", boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} />
            </div>

            {/* Text info */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h2 className="text-[22px] font-bold tracking-tight leading-none text-white">爱小惟</h2>
                <span className="text-white/35 text-[13px]">Will AI</span>
              </div>
              <p className="text-[11px] mt-1.5" style={{ color: "rgba(255,255,255,0.42)" }}>
                AI员工编号 #001 · 爱士维AI实验室出品
              </p>
              <div className="flex gap-1.5 mt-2.5 flex-wrap">
                <span className="px-2.5 py-[3px] rounded-full text-[10px] font-medium"
                  style={{ background: "rgba(168,85,247,0.22)", border: "1px solid rgba(168,85,247,0.32)", color: "#ddd6fe" }}>
                  七大智慧场景
                </span>
                <span className="px-2.5 py-[3px] rounded-full text-[10px] font-medium"
                  style={{ background: "rgba(52,211,153,0.18)", border: "1px solid rgba(52,211,153,0.28)", color: "#6ee7b7" }}>
                  ● 在线服务中
                </span>
              </div>
            </div>
          </div>

          {/* Gradient divider */}
          <div className="mt-5 h-px"
            style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.55), rgba(96,165,250,0.30), transparent)" }} />

          {/* Bio paragraphs */}
          <div className="mt-4 space-y-3">
            <p className="text-[12px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.82)" }}>
              你好！我是<span className="text-violet-300 font-semibold">爱小惟</span>，诞生于爱士惟AI实验室，是公司第一位AI员工。我的使命是成为每位员工的智能伙伴，帮助大家提升工作效率，探索AI技术的无限可能。让我们一起创造更智慧的未来！🌟
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { num: "7",   unit: "大场景", sub: "全业务域覆盖" },
              { num: "6+",  unit: "核心能力", sub: "持续迭代扩展" },
              { num: "24h", unit: "在线",   sub: "永不下班响应" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.3 }}
                className="rounded-xl py-3 px-2 text-center"
                style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-[19px] font-bold text-white leading-none">
                  {s.num}
                  <span className="text-[10px] ml-0.5 font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>{s.unit}</span>
                </div>
                <div className="text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.30)" }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Capabilities grid */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
              核心能力矩阵
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div key={cap.label}
                  initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.14 + i * 0.055, duration: 0.28 }}
                  className="rounded-xl p-2.5 flex flex-col gap-1.5 cursor-default"
                  style={{ background: cap.bg, border: `1px solid ${cap.color.replace(",1)", ",0.18)")}` }}>
                  <div className="w-[26px] h-[26px] rounded-lg flex items-center justify-center"
                    style={{ background: cap.color.replace(",1)", ",0.20)") }}>
                    <Icon size={12} style={{ color: cap.color }} />
                  </div>
                  <p className="text-white text-[11px] font-semibold leading-tight">{cap.label}</p>
                  <p className="text-[9px] leading-snug" style={{ color: "rgba(255,255,255,0.40)" }}>{cap.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* WillAI Figma grid */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
              智慧场景矩阵
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>
          {(() => {
            const ORIG_W = 1612;
            const ORIG_H = 716;
            const PANEL_W = 392;
            const scale = PANEL_W / ORIG_W;
            const scaledH = Math.round(ORIG_H * scale);
            return (
              <div className="relative overflow-hidden rounded-2xl"
                style={{ width: `${PANEL_W}px`, height: `${scaledH}px`, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width: `${ORIG_W}px`, height: `${ORIG_H}px`, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                  <WillAIGrid />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ── Orbital ring ─────────────────────────────────────────────────────────────
function OrbitalRing() {
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
      animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
      <div className="w-[520px] h-[200px] rounded-[100%] border border-white/10" />
    </motion.div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
type PanelType = "module" | "willai" | null;

// ── Sun orbs data for character animation ─────────────────────────────────────
const SUN_ORBS = [
  { id: 0, dx: -58, dy: -22, size: 18, delay: 0    },
  { id: 1, dx:  54, dy: -18, size: 16, delay: 0.18 },
  { id: 2, dx: -52, dy:  32, size: 14, delay: 0.36 },
  { id: 3, dx:  50, dy:  28, size: 16, delay: 0.12 },
  { id: 4, dx:   0, dy: -54, size: 13, delay: 0.25 },
];

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [panelType, setPanelType] = useState<PanelType>(null);
  const [charAbsorbing, setCharAbsorbing] = useState(false);

  const handleFeatureClick = (label: string) => {
    setSelectedFeature(label);
    setPanelType("module");
  };

  const handleCharacterClick = () => {
    // Trigger absorption animation
    if (!charAbsorbing) {
      setCharAbsorbing(true);
      setTimeout(() => setCharAbsorbing(false), 2100);
    }
    setSelectedFeature("Will AI");
    setPanelType("willai");
  };

  const handleClose = () => {
    setSelectedFeature(null);
    setPanelType(null);
  };

  const panelOpen = !!selectedFeature;

  const buttons = [
    { label: "智慧测试",   x: -370, y: -110, z: 10 },
    { label: "智慧研发",   x:  330, y: -110, z: 10 },
    { label: "智慧运维",   x:  360, y:   35, z: 10 },
    { label: "智慧供应链", x: -460, y:   35, z: 10 },
    { label: "智慧销售",   x:  195, y: -215, z:  5 },
    { label: "智慧能源",   x:   25, y: -290, z:  0 },
    { label: "智慧生产",   x: -175, y: -225, z:  5 },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#9966dc] via-[#e3a1c1] to-white">
      <AmbientParticles />
      <OrbitalRing />

      {/* 3D Scene */}
      <motion.div
        className="relative w-full max-w-[1440px] h-full max-h-[900px] flex items-center justify-center z-20"
        style={{ perspective: "2000px" }}
        animate={{ x: panelOpen ? "-22%" : "-20%" }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <TiltContainer className="relative w-[800px] h-[600px]" intensity={12}>
          {/* Island */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            <AnimatedIsland />
          </div>

          {/* Character */}
          <motion.div
            className="absolute top-[25%] left-[45%] w-[120px] h-[120px] z-20 cursor-pointer pointer-events-auto"
            onClick={handleCharacterClick}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* ── Sun Orbs floating around character ── */}
            {SUN_ORBS.map((orb) => (
              null
            ))}

            <FloatingElement duration={5} delay={1} yOffset={10}>
              <div className="relative">
                {/* Glow halo — golden when absorbing */}
                
                {/* Character image — Duolingo-style bounce on absorb */}
                <div style={{ transform: "translateY(65px)" }}>
                  <motion.video
                    src="https://raw.githubusercontent.com/kekisun0-blip/mp4/refs/heads/main/3%E6%9C%882%E6%97%A5.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="relative w-full h-full object-contain drop-shadow-xl"
                    style={{ width: '80%', height: '80%' }}
                    animate={
                      charAbsorbing
                        ? {
                            scale: [1, 0.88, 1.22, 0.95, 1.08, 1],
                            rotate: [0, -6, 5, -3, 2, 0],
                            y: [0, 4, -10, 2, -4, 0],
                          }
                        : { scale: 1, rotate: 0, y: 0 }
                    }
                    transition={
                      charAbsorbing
                        ? { duration: 0.95, ease: "easeOut" }
                        : { duration: 0.35 }
                    }
                  />
                </div>
              </div>
            </FloatingElement>
          </motion.div>

          {/* Floating Buttons */}
          {buttons.map((btn, index) => (
            <div key={btn.label} className="absolute left-1/2 top-1/2 flex items-center justify-center"
              style={{ transform: `translate3d(${btn.x}px, ${btn.y}px, ${btn.z}px)`, transformStyle: "preserve-3d" }}>
              <FloatingElement duration={4 + index * 0.5} delay={index * 0.2} yOffset={8}>
                <GlassBubbleButton label={btn.label} x={0} y={0} delay={index * 0.1}
                  className="pointer-events-auto" onClick={() => handleFeatureClick(btn.label)} />
              </FloatingElement>
            </div>
          ))}
        </TiltContainer>
      </motion.div>

      {/* Floor shadow */}
      <motion.div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[60px] bg-black/10 blur-3xl rounded-[100%] pointer-events-none z-10"
        animate={{ scale: panelOpen ? 0.8 : 1, opacity: panelOpen ? 0.6 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Right Detail Panel */}
      <AnimatePresence mode="wait">
        {!panelOpen && (
          <motion.div
            key="default-panel"
            initial={{ opacity: 0, x: 80, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute right-6 top-6 z-50 pointer-events-auto"
          >
            <DefaultRightPanel
              onWillAIClick={handleCharacterClick}
              onModuleClick={handleFeatureClick}
            />
          </motion.div>
        )}
        {panelOpen && (
          <motion.div key={selectedFeature}
            initial={{ opacity: 0, x: 120, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="absolute right-6 top-6 z-50 pointer-events-auto w-[440px]">
            {panelType === "willai"  && <WillAIPanel onClose={handleClose} />}
            {panelType === "module"  && <ModulePanel module={selectedFeature!} onClose={handleClose} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" }} />
    </div>
  );
}