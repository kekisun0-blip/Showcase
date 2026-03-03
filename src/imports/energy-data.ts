import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'motion/react';
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea, ReferenceLine, AreaChart, Bar,
} from 'recharts';
import {
  Zap, Brain, Battery, RefreshCw, TrendingUp, Eye,
  Globe, Database, Cloud, Settings, Activity,
  Car, Thermometer, Flame, BarChart3, Bolt,
  ChevronDown, CheckCircle, GitBranch, Cpu,
  Star, Shield, Smartphone,
} from 'lucide-react';

import appImg1 from 'figma:asset/7af0e207a697340907c7b44e0ce1c5b4c35c67d1.png';
import appImg2 from 'figma:asset/6edf0f6ec9a16e852b5db1ba981dde0b0ef353c7.png';
import appImg3 from 'figma:asset/4a806b50a4fd068e269addcd5e039f9cc81046fc.png';
import appNight from 'figma:asset/919fb0a1883dc60b5e5b358f7c4ff21f7e99856d.png';
import appDay   from 'figma:asset/cf87f2414b6f8ce6ff8697107b6ee1c7d6e8d4f1.png';
import appPrice from 'figma:asset/13e53426fbc67694286ffedab1e5d8e8934e4772.png';
import mascotWave   from 'figma:asset/bde032220e4e9e30660f0d483e1278640f68dee9.png';
import mascotHead   from 'figma:asset/32475fa6a62f40a696c742eda8677e076355fa06.png';
import mascotTravel from 'figma:asset/65f25311d1154557245b9db410136a8dd451755e.png';
import mascotTablet from 'figma:asset/f125c14ea436074b04f5188cc3db4e0fccb4e2bc.png';

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  bg:    '#060d1a',
  card:  'rgba(8,20,50,0.85)',
  b1:    'rgba(0,212,255,0.14)',
  b2:    'rgba(0,212,255,0.5)',
  cyan:  '#00d4ff',
  blue:  '#2563eb',
  violet:'#7c3aed',
  green: '#10b981',
  amber: '#f59e0b',
  pink:  '#f472b6',
  muted: 'rgba(255,255,255,0.5)',
  dim:   'rgba(255,255,255,0.16)',
};

// ─── Chart Data ───────────────────────────────────────────────────────────────
const powerDayData = [
  { t:'00:00', pv:0,   grid:0.3, bat:0,   soc:32, price:8  },
  { t:'01:00', pv:0,   grid:0.1, bat:0,   soc:30, price:7  },
  { t:'02:00', pv:0,   grid:0.1, bat:0,   soc:28, price:6  },
  { t:'03:20', pv:0,   grid:0.6, bat:1.2, soc:55, price:5  },
  { t:'04:00', pv:0,   grid:0.8, bat:1.5, soc:68, price:5  },
  { t:'05:00', pv:0,   grid:0.3, bat:0,   soc:72, price:7  },
  { t:'06:40', pv:0.5, grid:0,   bat:0.2, soc:74, price:9  },
  { t:'08:00', pv:1.8, grid:0,   bat:0.8, soc:65, price:11 },
  { t:'10:00', pv:3.2, grid:0,   bat:2.1, soc:45, price:13 },
  { t:'11:00', pv:4.0, grid:0,   bat:2.8, soc:62, price:14 },
  { t:'12:00', pv:4.5, grid:0,   bat:3.0, soc:78, price:15 },
  { t:'13:10', pv:4.2, grid:0,   bat:2.5, soc:86, price:16 },
  { t:'14:00', pv:3.5, grid:0,   bat:1.2, soc:90, price:18 },
  { t:'15:00', pv:2.8, grid:0,   bat:0,   soc:90, price:22 },
  { t:'16:30', pv:1.5, grid:0,   bat:0,   soc:88, price:30 },
  { t:'17:30', pv:1.0, grid:0,   bat:0,   soc:82, price:32 },
  { t:'18:30', pv:0.3, grid:0,   bat:0.5, soc:75, price:28 },
  { t:'19:50', pv:0,   grid:0.2, bat:0,   soc:68, price:25 },
  { t:'21:00', pv:0,   grid:0.4, bat:0,   soc:62, price:14 },
  { t:'23:10', pv:0,   grid:0.5, bat:0,   soc:55, price:10 },
];

const socData = [
  { t:'00', s:30 },{ t:'02', s:28 },{ t:'04', s:25 },{ t:'06', s:28 },
  { t:'08', s:40 },{ t:'10', s:57 },{ t:'12', s:72 },{ t:'14', s:83 },
  { t:'16', s:85 },{ t:'18', s:70 },{ t:'20', s:56 },{ t:'22', s:46 },
  { t:'24', s:40 },
];

// ─── Real-World 24h Energy Data (Germany, 2024-06-03) ─────────────────────────
// fg=from-grid, fb=from-battery, fp=from-PV (stacked bars = total load)
// pv=PV-gen (negative area), bc=battery-charge (negative area), s=actual SOC%, pd=predicted SOC%
const rwData = [
  { t:'0',  fg:0.3, fb:0,   fp:0,   pv:0,    bc:0,    s:38, pd:40 },
  { t:'1',  fg:0.2, fb:0,   fp:0,   pv:0,    bc:0,    s:36, pd:37 },
  { t:'2',  fg:0.2, fb:0,   fp:0,   pv:0,    bc:0,    s:35, pd:36 },
  { t:'3',  fg:0.3, fb:0,   fp:0,   pv:0,    bc:-1.0, s:52, pd:54 },
  { t:'4',  fg:0.3, fb:0,   fp:0,   pv:0,    bc:-1.2, s:65, pd:67 },
  { t:'5',  fg:0.3, fb:0,   fp:0,   pv:0,    bc:0,    s:68, pd:68 },
  { t:'6',  fg:0.1, fb:0,   fp:0.4, pv:-0.4, bc:0,    s:70, pd:69 },
  { t:'7',  fg:0,   fb:0.5, fp:0.5, pv:-1.5, bc:0,    s:68, pd:66 },
  { t:'8',  fg:0,   fb:0,   fp:1.8, pv:-2.8, bc:-1.0, s:74, pd:76 },
  { t:'9',  fg:0,   fb:0,   fp:2.2, pv:-3.8, bc:-1.5, s:82, pd:84 },
  { t:'10', fg:0,   fb:0,   fp:2.0, pv:-4.5, bc:-2.0, s:88, pd:87 },
  { t:'11', fg:0,   fb:0,   fp:2.5, pv:-5.2, bc:-2.5, s:90, pd:90 },
  { t:'12', fg:0,   fb:0,   fp:2.2, pv:-5.5, bc:-2.2, s:90, pd:90 },
  { t:'13', fg:0,   fb:1.5, fp:2.0, pv:-5.0, bc:0,    s:88, pd:87 },
  { t:'14', fg:0,   fb:2.5, fp:2.0, pv:-4.2, bc:0,    s:82, pd:82 },
  { t:'15', fg:0,   fb:2.8, fp:2.2, pv:-3.2, bc:0,    s:76, pd:75 },
  { t:'16', fg:0,   fb:3.5, fp:2.0, pv:-2.0, bc:0,    s:66, pd:65 },
  { t:'17', fg:0,   fb:3.8, fp:1.4, pv:-1.0, bc:0,    s:54, pd:54 },
  { t:'18', fg:0,   fb:4.2, fp:0.4, pv:-0.2, bc:0,    s:40, pd:38 },
  { t:'19', fg:0,   fb:3.5, fp:0.5, pv:0,    bc:0,    s:28, pd:27 },
  { t:'20', fg:0.5, fb:2.5, fp:0.2, pv:0,    bc:0,    s:20, pd:20 },
  { t:'21', fg:0.8, fb:0,   fp:0,   pv:0,    bc:0,    s:18, pd:18 },
  { t:'22', fg:1.0, fb:0,   fp:0,   pv:0,    bc:0,    s:16, pd:16 },
  { t:'23', fg:0.5, fb:0,   fp:0,   pv:0,    bc:0,    s:15, pd:15 },
];

// ─── Animated Counter (view-triggered) ───────────────────────────────────────
function Cnt({ target, suf = '' }: { target: number; suf?: string }) {
  const r = useRef<HTMLSpanElement>(null);
  const inV = useInView(r, { once: true });
  useEffect(() => {
    if (!inV) return;
    const ctrl = animate(0, target, {
      duration: 2.2, ease: 'easeOut',
      onUpdate(v) { if (r.current) r.current.textContent = Math.floor(v).toLocaleString() + suf; }
    });
    return ctrl.stop;
  }, [inV]);
  return <span ref={r}>0{suf}</span>;
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────
const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(4,10,30,0.98)', border: `1px solid ${C.b1}`, borderRadius: 8, padding: '8px 12px' }}>
      <p style={{ color: C.cyan, fontSize: 10, marginBottom: 4 }}>{label}</p>
      {payload.map((d: any, i: number) => (
        <p key={i} style={{ color: d.color, fontSize: 10, margin: '2px 0' }}>{d.name}: <strong>{d.value}</strong></p>
      ))}
    </div>
  );
};

// ─── Section wrapper for scroll-triggered fade-in ─────────────────────────────
function FadeIn({ children, delay = 0, y = 50, style }: {
  children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={style}>
      {children}
    </motion.div>
  );
}

// ─── Section header ─────────────────��─────────────────────────────────────────
function SecHead({ badge, title, sub, center = true, mascot }: {
  badge: string; title: React.ReactNode; sub?: string; center?: boolean; mascot?: string;
}) {
  return (
    <FadeIn style={{ textAlign: center ? 'center' : 'left', marginBottom: 60 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18,
        padding: '5px 14px', borderRadius: 20, background: 'rgba(0,212,255,0.08)',
        border: `1px solid rgba(0,212,255,0.28)` }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.cyan }} />
        <span style={{ fontSize: 12, color: C.cyan, fontWeight: 600, letterSpacing: '0.07em' }}>{badge}</span>
      </div>
      {mascot ? (
        <div style={{ display: 'flex', alignItems: 'center',
          justifyContent: center ? 'center' : 'flex-start', gap: 18, marginBottom: 14 }}>
          <motion.img
            src={mascot} alt="AI mascot"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: 'clamp(36px, 3.9vw, 52px)', width: 'auto', flexShrink: 0,
              filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
          />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.2,
            margin: 0, color: '#fff', textAlign: 'left' }}>{title}</h2>
        </div>
      ) : (
        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.2,
          margin: '0 0 14px', color: '#fff' }}>{title}</h2>
      )}
      {sub && <p style={{ fontSize: 16, color: C.muted, maxWidth: 560, margin: center ? '0 auto' : '0' }}>{sub}</p>}
    </FadeIn>
  );
}

// ─── Phone Frame ─────────────────────────────────────────────────────────────
function PhoneFrame({ src, title, desc, index, glow }: {
  src: string; title: string; desc: string; index: number; glow: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.15 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <motion.div animate={{ y: hov ? -8 : 0 }} transition={{ duration: .3 }}
        style={{ position: 'relative' }}>
        {/* Glow */}
        <div style={{ position: 'absolute', inset: -20, borderRadius: 56,
          background: `radial-gradient(ellipse,${glow}30 0%,transparent 70%)`,
          pointerEvents: 'none' }} />
        {/* Frame */}
        <div style={{ width: 188, height: 400, borderRadius: 36, position: 'relative',
          background: '#030815', border: `2px solid ${hov ? glow : `${glow}55`}`,
          boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 ${hov ? 40 : 20}px ${glow}30`,
          overflow: 'hidden', transition: 'box-shadow .3s, border-color .3s' }}>
          {/* Status bar */}
          <div style={{ height: 28, background: 'rgba(0,0,0,0.6)', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', padding: '0 14px',
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>9:41</span>
            <div style={{ width: 60, height: 14, borderRadius: 7,
              background: '#111', border: '1.5px solid rgba(255,255,255,0.2)', margin: '0 auto' }} />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>●●●</span>
          </div>
          <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </motion.div>
      <div style={{ textAlign: 'center', maxWidth: 200 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{title}</p>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Flow dot animation ───────────────────────────────────────────────────────
function FlowDot({ x1, y1, x2, y2, color, delay = 0 }: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay?: number;
}) {
  return (
    <motion.circle r={3.5} fill={color}
      animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [1, 0.2] }}
      transition={{ duration: 1.4, repeat: Infinity, delay, ease: 'linear' }} />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const [aiStep, setAiStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAiStep(s => (s + 1) % 3), 2200);
    return () => clearInterval(t);
  }, []);

  const orbs = [
    { x: '10%', y: '20%', size: 400, c: 'rgba(37,99,235,0.35)' },
    { x: '60%', y: '10%', size: 500, c: 'rgba(0,212,255,0.2)' },
    { x: '75%', y: '55%', size: 350, c: 'rgba(124,58,237,0.25)' },
    { x: '20%', y: '65%', size: 300, c: 'rgba(16,185,129,0.15)' },
  ];

  const steps = [
    { c: C.amber,  l: '低谷补电', s: '03:20 — 电价仅 ¥5', note: '自动从电网低价充电' },
    { c: C.cyan,   l: '光伏充电', s: '10:00 — PV 4.5kW',  note: '盈余电量优先存储' },
    { c: C.pink,   l: '高峰避峰', s: '16:30 — 电价 ¥32',  note: '放电自用，零取电网' },
  ];

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '120px 24px 80px' }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1720610784599-18c02b1cc9ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwcm9vZnRvcCUyMGhvbWUlMjBlbmVyZ3klMjBtb2Rlcm58ZW58MXx8fHwxNzcyNDM1OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom,rgba(6,13,26,0.7) 0%,rgba(6,13,26,0.5) 40%,rgba(6,13,26,0.95) 85%,#060d1a 100%)' }} />
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3,
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.08) 1px,transparent 1px)',
          backgroundSize: '70px 70px' }} />
      </div>
      {/* Orbs */}
      {orbs.map((orb, i) => (
        <motion.div key={i} animate={{ x: [0, 25, -15, 8, 0], y: [0, -18, 25, -8, 0] }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: orb.x, top: orb.y, width: orb.size,
            height: orb.size, borderRadius: '50%', background: orb.c,
            filter: 'blur(90px)', pointerEvents: 'none' }} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900 }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 24, marginBottom: 28,
            background: 'rgba(0,212,255,0.08)', border: `1px solid rgba(0,212,255,0.35)` }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: C.cyan }} />
          <span style={{ fontSize: 13, color: C.cyan, fontWeight: 600, letterSpacing: '0.06em' }}>
            AISWEI 爱士惟 · INTELLIGENT EMS
          </span>
        </motion.div>

        {/* Main headline with mascot to the left */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, delay: .15 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(12px, 2vw, 28px)', margin: '0 0 16px' }}>
          <motion.img
            src={mascotWave} alt="AI mascot"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: 'clamp(80px, 10vw, 130px)', width: 'auto', flexShrink: 0,
              filter: 'drop-shadow(0 0 28px rgba(0,212,255,0.5)) drop-shadow(0 6px 18px rgba(0,0,0,0.5))' }}
          />
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 900, lineHeight: 1.2,
            margin: 0, letterSpacing: '-0.02em', textAlign: 'left' }}>
            AI 智慧能源<br />
            让每一度电<br />
            <span style={{ backgroundImage: 'linear-gradient(90deg, #00d4ff, #7c3aed, #00d4ff)',
              backgroundSize: '200% auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0% center',
              backgroundAttachment: 'scroll', backgroundOrigin: 'padding-box', backgroundColor: 'transparent',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text' }}>产生最大价值</span>
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .3 }}
          style={{ fontSize: 'clamp(15px, 2vw, 20px)', color: C.muted, maxWidth: 640,
            margin: '0 auto 40px', lineHeight: 1.7 }}>
          基于深度学习的 AI 智慧储能管理，精准预测发电 · 用电 · 电价，<br />
          自动规划最优充放电策略，全年省电不止于此。
        </motion.p>

        {/* CTA buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: .45 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button style={{ padding: '14px 36px', borderRadius: 12, fontSize: 15, fontWeight: 700,
            background: 'linear-gradient(135deg, #2563eb, #00d4ff)', color: '#fff',
            border: 'none', cursor: 'pointer', letterSpacing: '0.03em',
            boxShadow: '0 8px 32px rgba(0,212,255,0.3)' }}>
            申请演示体验 →
          </button>
          <button style={{ padding: '14px 36px', borderRadius: 12, fontSize: 15, fontWeight: 600,
            background: 'transparent', color: C.cyan, cursor: 'pointer',
            border: `1.5px solid rgba(0,212,255,0.45)` }}>
            了解更多
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6, duration: .7 }}
          style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          {[
            { v: 200, s: '万+', l: '在网设备', c: '#3b82f6' },
            { v: 5,   s: '亿+', l: '历史学习数据', c: C.cyan  },
            { v: 365, s: '天',  l: '持续学习进化', c: '#8b5cf6'},
          ].map(m => (
            <div key={m.l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: m.c, lineHeight: 1 }}>
                <Cnt target={m.v} suf={m.s} />
              </p>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{m.l}</p>
            </div>
          ))}
        </motion.div>

        {/* AI step scenarios */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <motion.div key={s.l} animate={{ opacity: aiStep === i ? 1 : 0.38, scale: aiStep === i ? 1.03 : 1 }}
              transition={{ duration: .3 }}
              style={{ padding: '10px 16px', borderRadius: 12, textAlign: 'left',
                background: aiStep === i ? `${s.c}16` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${aiStep === i ? s.c + '55' : 'rgba(255,255,255,0.1)'}` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: s.c, marginBottom: 2 }}>{s.l}</p>
              <p style={{ fontSize: 11, color: C.muted }}>{s.s}</p>
              <p style={{ fontSize: 11, color: '#fff', marginTop: 2 }}>{s.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          color: C.dim, cursor: 'pointer' }}>
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — CORE ADVANTAGES
// ═══════════════════════════════════════════════════════════════════════════════
function AdvantagesSection() {
  const cards = [
    {
      icon: TrendingUp, c: '#3b82f6', badge: '预测精度 ≈90%',
      title: '精准三维预测', sub: 'Triple Prediction AI',
      desc: '融合卫星气象、附近电站拟合、360天历史数据，同时预测发电、用电与动态电价，精度远超行业平均水平。',
      points: ['发电预测精度 ≈90%', '用电预测精度 ≈70%', '电价曲线实时同步', '多源数据交叉验证'],
    },
    {
      icon: Battery, c: C.cyan, badge: '爱士惟专利',
      title: '「三个和尚」SOC 算法', sub: 'Patented SOC Planning',
      desc: '专利「三个和尚」策略，综合考量发电预测、负载预测、动态电价与物理约束，动态规划最优充放电曲线。',
      points: ['9种参数组合并行评估', 'SOC 上下限精准保护', '充放电损耗最小化', '自适应退化补偿'],
    },
    {
      icon: RefreshCw, c: '#8b5cf6', badge: '越用越准',
      title: 'AI 持续自我进化', sub: 'Self-Evolving Intelligence',
      desc: '每天 AI 自动回顾策略执行效果，结合 200万+ 全球设备数据，持续修正预测模型，精度随时间不断提升。',
      points: ['每日自动策略复盘', '全球200万+设备联学', '云端+边缘双层优化', '个性化用电习惯学习'],
    },
  ];

  return (
    <section id="advantages" style={{ padding: '100px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="CORE ADVANTAGES"
          title={<>为什么选择 <span style={{ color: C.cyan }}>AISWEI EMS</span></>}
          sub="三大核心技术优势，让储能系统发挥超出预期的价值" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * .1}>
              <AdvCard {...c} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvCard({ icon: Icon, c, badge, title, sub, desc, points }: any) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: '32px', borderRadius: 20, height: '100%',
        background: h ? `${c}0d` : C.card,
        border: `1.5px solid ${h ? c + '55' : C.b1}`,
        backdropFilter: 'blur(12px)',
        boxShadow: h ? `0 20px 60px ${c}20` : 'none',
        transition: 'all .25s', cursor: 'default' }}>
      {/* Icon + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: `${c}18`, border: `1.5px solid ${c}40`,
          boxShadow: `0 0 20px ${c}20` }}>
          <Icon size={22} style={{ color: c }} />
        </div>
        <span style={{ fontSize: 11, color: c, background: `${c}14`, border: `1px solid ${c}40`,
          borderRadius: 6, padding: '3px 9px', fontWeight: 700 }}>{badge}</span>
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 12, color: c, marginBottom: 14, fontWeight: 600 }}>{sub}</p>
      <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {points.map((pt: string) => (
          <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={13} style={{ color: c, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — AI WORKFLOW
// ═══════════════════════════════════════════════════════════════════════════════
function AIWorkflowSection() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 5), 1600);
    return () => clearInterval(t);
  }, []);

  const scenarios = [
    { c: C.green, time: '03:20', label: '低谷自动补充',
      desc: 'AI 识别电价低谷（¥5/kWh），提前从电网充电至最优容量', icon: '🌙' },
    { c: C.amber, time: '10:00–13:10', label: '光伏优先储能',
      desc: 'PV 发电高峰期（4.5kW），多余电量全部存入电池备用', icon: '☀️' },
    { c: C.pink,  time: '16:30–19:50', label: '高峰零取电网',
      desc: '用电高峰电价达 ¥32/kWh，100% 由电池供电，完全避开高价', icon: '⚡' },
  ];

  return (
    <section id="ai-mode" style={{ padding: '100px 24px',
      background: 'linear-gradient(180deg,#060d1a 0%,#08122e 50%,#060d1a 100%)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="AI MODE" title="AI 如何帮你省电？"
          sub="智能预测 + 电价感知 + 自动决策，24小时全自动运行" mascot={mascotHead} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: scenarios */}
          <FadeIn>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28, color: C.cyan }}>每日 AI 决策三幕剧</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {scenarios.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', gap: 16, padding: '18px 20px', borderRadius: 16,
                  background: `${s.c}0c`, border: `1.5px solid ${s.c}30`,
                  boxShadow: `inset 0 1px 0 ${s.c}20` }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.c }}>{s.label}</span>
                      <span style={{ fontSize: 11, color: C.muted, background: 'rgba(255,255,255,0.07)',
                        borderRadius: 5, padding: '1px 7px' }}>{s.time}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right: animated flow */}
          <FadeIn delay={.2}>
            <div style={{ background: C.card, border: `1px solid ${C.b1}`, borderRadius: 20,
              padding: '32px', backdropFilter: 'blur(12px)' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.cyan, marginBottom: 20,
                letterSpacing: '0.04em' }}>AI 决策数据流</p>

              {/* Animated flow nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: Cloud,      l: '天气预报数据',     sub: '7天精细化预报', c: '#3b82f6', i: 0 },
                  { icon: Activity,   l: '历史用电负载',     sub: '360天自学习',   c: '#8b5cf6', i: 1 },
                  { icon: TrendingUp, l: '实时电价曲线',     sub: '24h动态电价',   c: C.amber,   i: 2 },
                  { icon: Brain,      l: 'AI 云端决策引擎', sub: '深度强化学习',   c: C.cyan,    i: 3 },
                  { icon: BarChart3,  l: '最优充放电计划',   sub: '9方案并行优选', c: C.green,   i: 4 },
                ].map((node, idx) => (
                  <div key={node.l}>
                    <motion.div animate={{ opacity: step === idx ? 1 : 0.4, x: step === idx ? 4 : 0 }}
                      transition={{ duration: .25 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                        borderRadius: 10, background: step === idx ? `${node.c}14` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${step === idx ? node.c + '50' : 'rgba(255,255,255,0.08)'}` }}>
                      <node.icon size={15} style={{ color: node.c, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600 }}>{node.l}</p>
                        <p style={{ fontSize: 11, color: C.muted }}>{node.sub}</p>
                      </div>
                      {step === idx && (
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: .8, repeat: Infinity }}
                          style={{ width: 8, height: 8, borderRadius: '50%', background: node.c, flexShrink: 0 }} />
                      )}
                    </motion.div>
                    {idx < 4 && (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: idx * .3 }}
                          style={{ width: 1, height: 12, background: C.b2 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — POWER CHART
// ═══════════════════════════════════════════════════════════════════════════════
function PowerChartSection() {
  return (
    <section id="chart" style={{ padding: '100px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="POWER BY DAY"
          title="每天每一度电，都精打细算"
          sub="AI 根据5条数据曲线联合决策，全天24小时智能调度，最大化储能收益" />

        <FadeIn>
          <div style={{ background: C.card, border: `1px solid ${C.b1}`, borderRadius: 24,
            padding: '32px', backdropFilter: 'blur(12px)' }}>

            {/* Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginBottom: 20 }}>
              {[
                { c: C.amber,   fill: true,  l: 'PV 发电量 (kW)' },
                { c: C.pink,    fill: true,  l: '电网补充 (kW)' },
                { c: C.cyan,    fill: true,  l: '电池充电 (kW)' },
                { c: '#f97316', fill: false, l: 'SoC 电量 (%)' },
                { c: '#22d3ee', fill: false, l: '电价 (¢/kWh)', dash: true },
              ].map(g => (
                <div key={g.l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 20, height: 2.5,
                    background: g.fill ? `${g.c}cc` : 'transparent',
                    borderTop: !g.fill ? `2px ${(g as any).dash ? 'dashed' : 'solid'} ${g.c}` : 'none',
                    borderRadius: 1 }} />
                  <span style={{ fontSize: 12, color: C.muted }}>{g.l}</span>
                </div>
              ))}
            </div>

            {/* Chart */}
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={powerDayData} margin={{ top: 4, right: 40, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gPV"   x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.amber} stopOpacity={0.55} />
                      <stop offset="95%" stopColor={C.amber} stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gGrid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.pink} stopOpacity={0.5} />
                      <stop offset="95%" stopColor={C.pink} stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gBat"  x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.cyan} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={C.cyan} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                  <YAxis yAxisId="L" domain={[0,6]} tick={{ fill: C.muted, fontSize: 10 }} axisLine={false}
                    tickLine={false} label={{ value:'kW', angle:-90, position:'insideLeft', fill:C.muted, fontSize:10, dy:14 }} />
                  <YAxis yAxisId="R" orientation="right" domain={[0,100]} tick={{ fill: C.muted, fontSize: 10 }}
                    axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} />
                  <Tooltip content={<ChartTip />} />
                  <ReferenceArea yAxisId="L" x1="02:00" x2="05:00" fill="rgba(16,185,129,0.07)"  stroke="rgba(16,185,129,0.25)" strokeWidth={1} />
                  <ReferenceArea yAxisId="L" x1="10:00" x2="14:00" fill="rgba(245,158,11,0.08)"  stroke="rgba(245,158,11,0.25)"  strokeWidth={1} />
                  <ReferenceArea yAxisId="L" x1="16:30" x2="19:50" fill="rgba(244,114,182,0.08)" stroke="rgba(244,114,182,0.3)"  strokeWidth={1} />
                  <Area yAxisId="L" type="monotone" dataKey="pv"   name="PV发电"  stroke={C.amber} strokeWidth={2}   fill="url(#gPV)"   dot={false} />
                  <Area yAxisId="L" type="monotone" dataKey="grid" name="电网补充" stroke={C.pink}  strokeWidth={1.5} fill="url(#gGrid)" dot={false} />
                  <Area yAxisId="L" type="monotone" dataKey="bat"  name="电池充电" stroke={C.cyan}  strokeWidth={1.5} fill="url(#gBat)"  dot={false} />
                  <Line  yAxisId="R" type="monotone" dataKey="soc"   name="SoC%"  stroke="#f97316" strokeWidth={2}   dot={false} />
                  <Line  yAxisId="R" type="monotone" dataKey="price" name="电价"   stroke="#22d3ee" strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>

            {/* Annotations */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 20, flexWrap: 'wrap' }}>
              {[
                { l: '🌙 低谷补电', sub: '03:20 ~ 05:00 · 电价低谷自动充电', c: '#10b981' },
                { l: '☀️ 光伏充储', sub: '10:00 ~ 13:10 · PV高峰优先自充', c: C.amber  },
                { l: '⚡ 高峰零取电', sub: '16:30 ~ 19:50 · 电池放电避开高价', c: C.pink   },
              ].map(a => (
                <div key={a.l} style={{ textAlign: 'center', padding: '10px 20px', borderRadius: 10,
                  background: `${a.c}0a`, border: `1px solid ${a.c}25` }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: a.c }}>{a.l}</p>
                  <p style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4B — REAL-WORLD RESULTS
// ═══════════════════════════════════════════════════════════════════════════════
function RealWorldResultsSection() {
  const comparisons = [
    { pct: 100, label: '无光伏',            color: C.amber,   desc: '纯电网供电',   save: null },
    { pct: 70,  label: '光伏',              color: '#3b82f6', desc: 'PV 自发自用',  save: 30   },
    { pct: 66,  label: '光伏/储能\n传统BMS', color: C.green,   desc: '基础能源管理', save: 4    },
    { pct: 50,  label: '光伏/储能\nAI预测', color: '#059669', desc: '智慧AI管理',   save: 25   },
  ];
  return (
    <section id="results" style={{ padding: '100px 24px',
      background: 'linear-gradient(180deg,#060d1a 0%,#07102a 50%,#060d1a 100%)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="REAL-WORLD RESULTS"
          title={<>智慧能源管理的<span style={{ color: C.cyan }}>真实效果</span></>}
          sub="以下数据来自部署在德国的真实用户设备，完整记录24小时能源流动与AI决策轨迹" />

        <FadeIn>
          <div style={{ background: C.card, border: `1px solid ${C.b1}`, borderRadius: 24,
            padding: '28px 28px 20px', backdropFilter: 'blur(12px)' }}>

            {/* Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', marginBottom: 16 }}>
              {[
                { c: C.amber,   bar: true,  l: '电网供电 (kW)' },
                { c: '#3b82f6', bar: true,  l: '电池放电 (kW)' },
                { c: C.green,   bar: true,  l: 'PV供电 (kW)'   },
                { c: '#10b981', area: true, l: 'PV总发电量'     },
                { c: '#3b82f6', area: true, l: '电池充电量'     },
                { c: '#e2e8f0', dot: true,  l: '实测SOC (%)'   },
                { c: C.cyan,    dash: true, l: '预测SOC (%)'   },
              ].map(g => (
                <div key={g.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {g.bar  && <div style={{ width: 14, height: 10, borderRadius: 2, background: g.c, opacity: 0.85 }} />}
                  {g.area && <div style={{ width: 18, height: 8, borderRadius: 2, background: `${g.c}40`, border: `1.5px solid ${g.c}` }} />}
                  {g.dot  && <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: g.c }} />)}
                  </div>}
                  {g.dash && <div style={{ width: 20, height: 0, borderTop: `2px dashed ${g.c}` }} />}
                  <span style={{ fontSize: 11, color: C.muted }}>{g.l}</span>
                </div>
              ))}
            </div>

            {/* Bidirectional chart */}
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={rwData} margin={{ top: 8, right: 52, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRWPV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="gRWBC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false}
                  label={{ value:'时间 (h)', position:'insideBottomRight', fill:C.muted, fontSize:9, dy:6 }} />
                <YAxis yAxisId="L" domain={[-6, 7]}
                  tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => v === 0 ? '0' : `${Math.abs(v)}kW`} />
                <YAxis yAxisId="R" orientation="right" domain={[0, 100]}
                  tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${v}%`} />
                <Tooltip content={<ChartTip />} />
                <ReferenceLine yAxisId="L" y={0} stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
                {/* Lower negative areas: PV generation & battery charging */}
                <Area yAxisId="L" type="monotone" dataKey="pv" name="PV发电" baseValue={0}
                  stroke="#10b981" strokeWidth={2} fill="url(#gRWPV)" dot={false} />
                <Area yAxisId="L" type="monotone" dataKey="bc" name="电池充电" baseValue={0}
                  stroke="#3b82f6" strokeWidth={1.5} fill="url(#gRWBC)" dot={false} />
                {/* Upper stacked bars: load breakdown by source */}
                <Bar yAxisId="L" dataKey="fg" stackId="up" name="电网供电" fill={C.amber}  opacity={0.88} maxBarSize={16} />
                <Bar yAxisId="L" dataKey="fb" stackId="up" name="电池放电" fill="#3b82f6" opacity={0.88} maxBarSize={16} />
                <Bar yAxisId="L" dataKey="fp" stackId="up" name="PV供电"  fill={C.green}  opacity={0.88} maxBarSize={16} />
                {/* SOC lines on right axis */}
                <Line yAxisId="R" type="monotone" dataKey="s"  name="实测SOC"
                  stroke="rgba(226,232,240,0.9)" strokeWidth={2}
                  dot={{ r: 2.5, fill: '#e2e8f0', strokeWidth: 0 }} />
                <Line yAxisId="R" type="monotone" dataKey="pd" name="预测SOC"
                  stroke={C.cyan} strokeWidth={2} strokeDasharray="5 3" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>

            {/* Device metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.b1}`, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[
                  { l: '逆变器',     v: 'LM008K0952280461'   },
                  { l: '负载电表',   v: 'MEGAREVOB3240D2401D6' },
                  { l: '储能电池容量', v: '4 kWh'              },
                  { l: '动态电价日期', v: '2024年6月3日'        },
                  { l: '位置',       v: '德国'                 },
                ].map(m => (
                  <div key={m.l}>
                    <p style={{ fontSize: 10, color: C.muted }}>{m.l}</p>
                    <p style={{ fontSize: 12, fontWeight: 600 }}>{m.v}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px',
                borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
                <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>真实设备数据</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Cost comparison */}
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 52 }}>
            <p style={{ textAlign: 'center', fontSize: 14, color: C.muted, marginBottom: 36 }}>
              同等硬件下，不同能源管理方案年度电费对比（以100%为基准）
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexWrap: 'wrap', gap: 0 }}>
              {comparisons.map((item, i) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Box */}
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 100, height: 100, borderRadius: 20,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        background: `linear-gradient(135deg,${item.color}28,${item.color}12)`,
                        border: `2px solid ${item.color}66`,
                        boxShadow: `0 4px 24px ${item.color}1a` }}>
                        <span style={{ fontSize: 30, fontWeight: 900, color: item.color, lineHeight: 1 }}>
                          {item.pct}%
                        </span>
                      </div>
                      <div style={{ textAlign: 'center', maxWidth: 100 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#fff',
                          whiteSpace: 'pre-line', lineHeight: 1.35 }}>{item.label}</p>
                        <p style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                  {/* Arrow + reduction badge */}
                  {item.save !== null && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
                      margin: '0 14px', marginBottom: 28, gap: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.green,
                        background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: 5, padding: '2px 7px' }}>−{item.save}%</span>
                      <span style={{ color: C.dim, fontSize: 18 }}>→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — APP SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════
function AppShowcaseSection() {
  return (
    <section id="app" style={{ padding: '100px 24px',
      background: 'linear-gradient(180deg,#060d1a 0%,#071020 50%,#060d1a 100%)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="MOBILE APP" title={<>随时随地，<span style={{ color: C.cyan }}>掌控能源</span></>}
          sub="功能完整的 App，让复杂的能源管理变得一目了然" mascot={mascotTravel} />

        {/* Row 1: 3 phone frames + dynamic price portrait */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40,
          justifyItems: 'center', alignItems: 'start' }}>
          <PhoneFrame src={appImg2} title="实时能量流向" index={0} glow={C.cyan}
            desc="10秒刷新的实时监控：PV发电、电池SOC、用电负载、并网功率一览无余" />
          <PhoneFrame src={appImg1} title="Ai 充放电策略" index={1} glow="#8b5cf6"
            desc="5种充放电模式一键切换，AI Smart模式全自动优化，BETA功能率先体验" />
          <PhoneFrame src={appImg3} title="发电量统计图表" index={2} glow={C.amber}
            desc="日/周/月/年多维数据分析，直观掌握每一度电的去向和收益" />
        </div>

        {/* Row 2: Live screenshot strip — 用电情况 | 发电情况 | 动态电价 */}
        <FadeIn delay={0.15}>
          <p style={{ textAlign: 'center', fontSize: 13, color: C.muted,
            margin: '52px 0 24px', letterSpacing: '0.05em' }}>
            ── App 真实界面预览 ──
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 20, alignItems: 'center' }}>

            {/* 用电情况 — wide landscape */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 280 }}
              style={{ borderRadius: 20, overflow: 'hidden', position: 'relative',
                boxShadow: '0 8px 40px rgba(99,102,241,0.25), 0 0 0 1px rgba(99,102,241,0.18)' }}>
              <img src={appNight} alt="用电情况" style={{ width: '100%', display: 'block', borderRadius: 20 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px',
                background: 'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 100%)',
                borderRadius: '0 0 20px 20px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                  用电情况 · 夜间储能模式
                </span>
              </div>
            </motion.div>

            {/* 发电情况 — wide landscape */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 280 }}
              style={{ borderRadius: 20, overflow: 'hidden', position: 'relative',
                boxShadow: '0 8px 40px rgba(16,185,129,0.22), 0 0 0 1px rgba(16,185,129,0.2)' }}>
              <img src={appDay} alt="发电情况" style={{ width: '100%', display: 'block', borderRadius: 20 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px',
                background: 'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 100%)',
                borderRadius: '0 0 20px 20px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                  发电情况 · 实时功率 15 kW
                </span>
              </div>
            </motion.div>

            {/* 动态电价 — portrait card */}
            <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 280 }}
              style={{ width: 180, borderRadius: 28, overflow: 'hidden', flexShrink: 0,
                boxShadow: `0 8px 40px rgba(245,158,11,0.22), 0 0 0 1px rgba(245,158,11,0.2)` }}>
              <img src={appPrice} alt="动态电价" style={{ width: '100%', display: 'block' }} />
            </motion.div>
          </div>

          {/* Caption labels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 20, marginTop: 10 }}>
            {[
              { label: '🌙 用电情况', sub: '年度用电 48,480 kW · 电池 65%' },
              { label: '☀️ 发电情况', sub: '年度发电 122,323 kW · 实时 15 kW' },
              { label: '📊 动态电价', sub: '当前 0.48 kr/kWh', w: 180 },
            ].map(c => (
              <div key={c.label} style={{ textAlign: 'center', width: c.w ?? '100%' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{c.label}</p>
                <p style={{ fontSize: 11, color: C.muted }}>{c.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* App features */}
        <FadeIn delay={.3}>
          <div style={{ marginTop: 52, display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {[
              { icon: Smartphone, c: '#3b82f6', l: '跨平台支持', sub: 'iOS & Android 全平台' },
              { icon: Eye,        c: C.cyan,   l: '实时监控',   sub: '10秒数据刷新率' },
              { icon: Settings,   c: '#8b5cf6', l: '远程配置',   sub: '随时调整充放电策略' },
              { icon: Activity,   c: C.green,  l: '历史分析',   sub: '完整数据报告导出' },
            ].map(f => (
              <div key={f.l} style={{ display: 'flex', gap: 14, padding: '16px 18px', borderRadius: 14,
                background: C.card, border: `1px solid ${C.b1}`, backdropFilter: 'blur(8px)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: `${f.c}18`, border: `1px solid ${f.c}40`, flexShrink: 0 }}>
                  <f.icon size={18} style={{ color: f.c }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{f.l}</p>
                  <p style={{ fontSize: 12, color: C.muted }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — DEVICE INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════════
function DeviceSection() {
  const devices = [
    { icon: Bolt,        c: '#3b82f6', l: '光储逆变器',  sub: 'T2/T3 三相混合 5–12kW',     tag: '核心' },
    { icon: Battery,     c: C.cyan,   l: '储能电池',    sub: 'AI 智慧充放 (C08 Ai-mode)',  tag: '已连接' },
    { icon: Car,         c: C.amber,  l: 'EV 充电桩',   sub: 'PV 盈余充电 (C04)',          tag: '即插即用' },
    { icon: Thermometer, c: C.pink,   l: '电热水器',    sub: 'PV 盈余加热 (C04)',          tag: '节能' },
    { icon: Flame,       c: '#f97316', l: '热泵',       sub: 'PV 盈余供暖制冷 (C09)',      tag: '高效' },
    { icon: GitBranch,   c: '#8b5cf6', l: '智能电网',   sub: '峰谷套利 · 双向并网',       tag: '优化' },
  ];

  return (
    <section id="devices" style={{ padding: '100px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="DEVICE INTEGRATION"
          title={<>一个平台，<span style={{ color: C.cyan }}>连接整套能源生态</span></>}
          sub="从光伏逆变器到EV充电桩，所有设备统一调度，协同实现最大节能效益" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {devices.map((d, i) => (
            <FadeIn key={d.l} delay={i * .07}>
              <DeviceCard {...d} />
            </FadeIn>
          ))}
        </div>

        {/* Architecture note */}
        <FadeIn delay={.3}>
          <div style={{ marginTop: 40, padding: '24px 32px', borderRadius: 20,
            background: 'linear-gradient(135deg,rgba(37,99,235,0.1),rgba(0,212,255,0.05))',
            border: `1px solid rgba(0,212,255,0.2)`, display: 'flex', gap: 32,
            flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: Cloud,    c: '#3b82f6', l: '云端 AI', sub: '全局策略优化' },
              { icon: Cpu,      c: C.cyan,   l: '边缘设备', sub: '本地毫秒响应' },
              { icon: Shield,   c: '#8b5cf6', l: '双层架构', sub: '安全可靠保障' },
            ].map(n => (
              <div key={n.l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: `${n.c}16`, border: `1px solid ${n.c}40` }}>
                  <n.icon size={18} style={{ color: n.c }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{n.l}</p>
                  <p style={{ fontSize: 12, color: C.muted }}>{n.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function DeviceCard({ icon: Icon, c, l, sub, tag }: any) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: '22px 24px', borderRadius: 16,
        background: h ? `${c}0c` : C.card, border: `1.5px solid ${h ? c + '55' : C.b1}`,
        display: 'flex', gap: 14, alignItems: 'center',
        transition: 'all .2s', cursor: 'default',
        backdropFilter: 'blur(10px)' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: `${c}18`, border: `1.5px solid ${c}40`, flexShrink: 0 }}>
        <Icon size={20} style={{ color: c }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{l}</p>
        <p style={{ fontSize: 12, color: C.muted }}>{sub}</p>
      </div>
      <span style={{ fontSize: 10, color: c, background: `${c}18`, border: `1px solid ${c}40`,
        borderRadius: 5, padding: '2px 7px', fontWeight: 700, flexShrink: 0 }}>{tag}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6B — CLOUD-EDGE COLLABORATION
// ═══════════════════════════════════════════════════════════════════════════════
function CloudEdgeSection() {
  const cloudFeats = [
    { icon: TrendingUp, title: '预测与评估', desc: '基于大数据进行发电量、用电负载、动态电价多维预测' },
    { icon: BarChart3,  title: '生成基准曲线', desc: '综合9种方案并行评估，输出当日最优充放电规划策略' },
  ];
  const edgeFeats = [
    { icon: Activity, title: '接收规划',    desc: '智能控制器实时接收云端下发的基准充放电曲线' },
    { icon: Eye,      title: '感知实时状态', desc: '毫秒级监测 SOC / 温度 / 负载功率 / 电网状态' },
    { icon: Cpu,      title: '本地二次微调', desc: '在本地物理约束下进行策略实时优化，保障安全' },
  ];

  const cardBase: React.CSSProperties = {
    borderRadius: 20, padding: '32px', backdropFilter: 'blur(12px)',
    height: '100%', position: 'relative', overflow: 'hidden',
  };

  return (
    <section id="cloud-edge" style={{ padding: '100px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="CLOUD-EDGE COLLABORATION"
          title={<>云边协同，<span style={{ color: C.cyan }}>让策略真正落地</span></>}
          sub="AI在云端计算最优决策，边缘设备本地毫秒执行，双层架构兼顾智能与可靠" mascot={mascotTablet} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Cloud card */}
          <FadeIn>
            <div style={{ ...cardBase, background: 'rgba(37,99,235,0.08)',
              border: '1.5px solid rgba(59,130,246,0.35)' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240,
                borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(37,99,235,0.25) 0%,transparent 70%)',
                pointerEvents: 'none' }} />
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ width: 54, height: 54, borderRadius: 14,
                  background: 'rgba(59,130,246,0.15)', border: '1.5px solid rgba(59,130,246,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(59,130,246,0.2)' }}>
                  <Cloud size={26} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <p style={{ fontSize: 22, fontWeight: 800 }}>云端 (Cloud)</p>
                  <p style={{ fontSize: 12, color: '#60a5fa' }}>Cloud Intelligence</p>
                </div>
              </div>
              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 1 }}>
                {cloudFeats.map(f => (
                  <div key={f.title} style={{ display: 'flex', gap: 14, padding: '16px 18px', borderRadius: 14,
                    background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                      background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <f.icon size={16} style={{ color: '#60a5fa' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{f.title}</p>
                      <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Edge card */}
          <FadeIn delay={0.1}>
            <div style={{ ...cardBase, background: 'rgba(0,212,255,0.05)',
              border: '1.5px solid rgba(0,212,255,0.3)' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: -60, left: -60, width: 240, height: 240,
                borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(0,212,255,0.18) 0%,transparent 70%)',
                pointerEvents: 'none' }} />
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ width: 54, height: 54, borderRadius: 14,
                  background: 'rgba(0,212,255,0.12)', border: '1.5px solid rgba(0,212,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(0,212,255,0.15)' }}>
                  <Cpu size={26} style={{ color: C.cyan }} />
                </div>
                <div>
                  <p style={{ fontSize: 22, fontWeight: 800 }}>边缘端 (Edge)</p>
                  <p style={{ fontSize: 12, color: C.cyan }}>Edge Controller</p>
                </div>
              </div>
              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}>
                {edgeFeats.map(f => (
                  <div key={f.title} style={{ display: 'flex', gap: 14, padding: '14px 18px', borderRadius: 14,
                    background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.18)' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                      background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.28)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <f.icon size={16} style={{ color: C.cyan }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{f.title}</p>
                      <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Live status badge */}
              <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 8,
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
                <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>本地运行中</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Connector arrow */}
        <FadeIn delay={0.15}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16,
            margin: '-8px 0 8px', position: 'relative', zIndex: 1 }}>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to right,transparent,${C.b2})` }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px',
              borderRadius: 10, background: 'rgba(0,212,255,0.06)', border: `1px solid ${C.b2}` }}>
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
                style={{ color: C.cyan, fontSize: 14 }}>→</motion.div>
              <span style={{ fontSize: 12, color: C.cyan, fontWeight: 600 }}>策略下发 · 实时同步</span>
              <motion.div animate={{ x: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
                style={{ color: C.cyan, fontSize: 14 }}>←</motion.div>
            </div>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to left,transparent,${C.b2})` }} />
          </div>
        </FadeIn>

        {/* Energy Replay banner */}
        <FadeIn delay={0.2}>
          <div style={{ padding: '24px 36px', borderRadius: 18,
            background: 'linear-gradient(135deg,rgba(37,99,235,0.12),rgba(0,212,255,0.06))',
            border: `1px solid rgba(0,212,255,0.22)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
              <RefreshCw size={28} style={{ color: C.cyan }} />
            </motion.div>
            <div>
              <p style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
                能源重放 <span style={{ fontSize: 14, color: C.muted, fontWeight: 400 }}>Energy Replay</span>
              </p>
              <p style={{ fontSize: 13, color: C.muted }}>
                不是简单执行指令，而是云边协同的<span style={{ color: C.cyan, fontWeight: 600 }}>智慧落地</span>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — BATTERY STRATEGIES + SOC
// ═══════════════════════════════════════════════════════════════════════════════
function BatterySection() {
  const [sel, setSel] = useState(0);
  const modes = [
    { l: 'Ai Smart Charging', sub: '基于AI预测的全自动最优策略', c: C.cyan,   beta: true  },
    { l: 'Self-consumption',  sub: '光伏优先自用，剩余电量储能', c: '#3b82f6', beta: false },
    { l: 'Reserve Power',     sub: '保留指定备用电量应对断电',   c: '#8b5cf6', beta: false },
    { l: 'Custom Mode',       sub: '自定义充放时间和功率限制',   c: C.amber,  beta: false },
    { l: 'Off-grid Mode',     sub: '完全脱离电网独立运行',       c: C.green,  beta: false },
  ];

  return (
    <section id="battery" style={{ padding: '100px 24px',
      background: 'linear-gradient(180deg,#060d1a,#080f20,#060d1a)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SecHead badge="BATTERY STRATEGIES"
          title={<>灵活的充放电策略，<span style={{ color: C.cyan }}>随需而变</span></>}
          sub="5种预设策略 + 专利SOC算法，从全自动AI到完全自定义，满足所有使用场景" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {/* Left: mode selector */}
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {modes.map((m, i) => (
                <button key={m.l} onClick={() => setSel(i)}
                  style={{ padding: '16px 20px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                    background: sel === i ? `${m.c}14` : C.card,
                    border: `1.5px solid ${sel === i ? m.c + '65' : C.b1}`,
                    backdropFilter: 'blur(8px)', transition: 'all .2s',
                    boxShadow: sel === i ? `0 8px 24px ${m.c}18` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                      background: sel === i ? m.c : C.dim }} />
                    <span style={{ fontSize: 15, fontWeight: 700, color: sel === i ? m.c : '#fff' }}>{m.l}</span>
                    {m.beta && (
                      <span style={{ fontSize: 10, color: C.cyan, background: 'rgba(0,212,255,0.12)',
                        border: '1px solid rgba(0,212,255,0.35)', borderRadius: 4, padding: '1px 6px' }}>BETA</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: C.muted, marginLeft: 20 }}>{m.sub}</p>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Right: SOC chart + info */}
          <FadeIn delay={.15}>
            <div style={{ background: C.card, border: `1px solid ${C.b1}`, borderRadius: 20,
              padding: '28px', backdropFilter: 'blur(12px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800 }}>SOC 规划曲线</p>
                  <p style={{ fontSize: 12, color: C.cyan, marginTop: 3 }}>「三个和尚」专利算法</p>
                </div>
                <div style={{ padding: '5px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)' }}>
                  <p style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>省电率 +37%</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={socData} margin={{ top: 4, right: 30, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gSOC2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.cyan} stopOpacity={0.45} />
                        <stop offset="95%" stopColor={C.cyan} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                    <YAxis domain={[0,100]} tick={{ fill: C.muted, fontSize: 10 }} axisLine={false}
                      tickLine={false} tickFormatter={v=>`${v}%`} />
                    <Tooltip content={<ChartTip />} />
                    <ReferenceLine y={90} stroke={C.cyan}  strokeDasharray="5 3" strokeOpacity={0.7}
                      label={{ value:'90%上限', position:'right', fill:C.cyan,   fontSize:9 }} />
                    <ReferenceLine y={20} stroke="#60a5fa" strokeDasharray="5 3" strokeOpacity={0.7}
                      label={{ value:'20%下限', position:'right', fill:'#60a5fa', fontSize:9 }} />
                    <Area type="monotone" dataKey="s" name="SOC"
                      stroke={C.cyan} strokeWidth={2.5} fill="url(#gSOC2)" dot={false} />
                  </AreaChart>
              </ResponsiveContainer>

              {/* Algo points */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                {[
                  ['综合电价分析', C.amber], ['发电量预测', '#3b82f6'],
                  ['负载预测',     '#8b5cf6'],['物理约束保护', C.green],
                ].map(([l,c]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                    borderRadius: 7, background: `${c}0c`, border: `1px solid ${c}22` }}>
                    <CheckCircle size={11} style={{ color: c as string, flexShrink: 0 }} />
                    <span style={{ fontSize: 12 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — STATS BAR
// ═════════════════════════════════════════════════════════════════════════���═════
function StatsSection() {
  return (
    <section style={{ padding: '80px 24px',
      background: 'linear-gradient(135deg,rgba(37,99,235,0.15),rgba(0,212,255,0.08),rgba(124,58,237,0.12))',
      borderTop: `1px solid ${C.b1}`, borderBottom: `1px solid ${C.b1}` }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <FadeIn style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 24, textAlign: 'center' }}>
          {[
            { v: 200, s: '万+', l: '全球在网设备', sub: '覆盖 40+ 国家',      c: '#3b82f6' },
            { v: 5,   s: '亿+', l: '历史学习数据', sub: '每日持续增长',         c: C.cyan   },
            { v: 365, s: '天',  l: '持续自我学习', sub: 'AI 每天自动复盘',      c: '#8b5cf6' },
            { v: 90,  s: '%',   l: '发电预测精度', sub: '行业领先水平',         c: C.green  },
          ].map(m => (
            <div key={m.l} style={{ padding: '28px 20px' }}>
              <p style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: m.c, lineHeight: 1, marginBottom: 8 }}>
                <Cnt target={m.v} suf={m.s} />
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{m.l}</p>
              <p style={{ fontSize: 13, color: C.muted }}>{m.sub}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — CTA FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section style={{ padding: '120px 24px', background: C.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          width: 800, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse,rgba(37,99,235,0.18) 0%,transparent 70%)',
          filter: 'blur(40px)' }} />
      </div>
      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 20,
            marginBottom: 24, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <Star size={12} style={{ color: C.green }} />
            <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>准备好升级您的储能系统了吗？</span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 900, lineHeight: 1.15,
            margin: '0 0 18px', color: '#fff' }}>
            让 AI 替您<br />
            <span style={{ backgroundImage: 'linear-gradient(90deg,#00d4ff,#7c3aed)',
              backgroundRepeat: 'no-repeat', backgroundPosition: '0% center',
              backgroundAttachment: 'scroll', backgroundOrigin: 'padding-box', backgroundColor: 'transparent',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              做出最明智的决策
            </span>
          </h2>
          <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, marginBottom: 44, maxWidth: 520, margin: '0 auto 44px' }}>
            爱士惟 Intelligent EMS 已为全球 200 万+ 用户节省了大量电费，现在轮到您了。
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '16px 44px', borderRadius: 14, fontSize: 16, fontWeight: 700,
              background: 'linear-gradient(135deg,#1d4ed8,#00d4ff)', color: '#fff', border: 'none',
              cursor: 'pointer', boxShadow: '0 8px 36px rgba(0,212,255,0.35)' }}>
              立即申请演示 →
            </button>
            <button style={{ padding: '16px 44px', borderRadius: 14, fontSize: 16, fontWeight: 600,
              background: 'transparent', color: C.cyan, cursor: 'pointer',
              border: `1.5px solid rgba(0,212,255,0.4)` }}>
              联系销售团队
            </button>
          </div>
        </FadeIn>

        {/* Footer bar */}
        <FadeIn delay={.3}>
          <div style={{ marginTop: 80, paddingTop: 32, borderTop: `1px solid ${C.b1}`,
            display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg,#1d4ed8,#06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700 }}>爱士惟 AISWEI</p>
                <p style={{ fontSize: 11, color: C.muted }}>Intelligent Energy Management System</p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: C.dim }}>© 2024 AISWEI Technology Co., Ltd. · 即将上线</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FIXED HEADER
// ═══════════════════════════════════════════════════════════════════════════════
function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 60, display: 'flex', alignItems: 'center', padding: '0 32px',
      background: solid ? 'rgba(6,13,26,0.96)' : 'transparent',
      borderBottom: solid ? `1px solid ${C.b1}` : 'none',
      backdropFilter: solid ? 'blur(16px)' : 'none',
      transition: 'background .3s, border-color .3s, backdrop-filter .3s' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 40 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: 'linear-gradient(135deg,#1d4ed8,#06b6d4)' }}>
          <Zap size={15} color="#fff" />
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.1 }}>AISWEI</p>
          <p style={{ fontSize: 9, color: C.muted, letterSpacing: '0.06em', lineHeight: 1 }}>INTELLIGENT EMS</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', gap: 28, flex: 1 }}>
        {[['#advantages','核心优势'],['#ai-mode','AI模式'],['#chart','功率曲线'],
          ['#results','真实效果'],['#cloud-edge','云边协同'],['#battery','电池策略']].map(([href,label])=>(
          <a key={label} href={href} style={{ fontSize: 13, color: C.muted, cursor: 'pointer',
            textDecoration: 'none', transition: 'color .15s' }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = C.muted}>{label}</a>
        ))}
      </nav>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <motion.div animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.8, repeat: Infinity }}
          style={{ width: 7, height: 7, borderRadius: '50%', background: C.cyan }} />
        <span style={{ fontSize: 12, color: C.cyan, fontWeight: 600, marginRight: 12 }}>即将上线</span>
        <button style={{ padding: '8px 22px', borderRadius: 8, fontSize: 13, fontWeight: 700,
          background: 'linear-gradient(135deg,#1d4ed8,#06b6d4)', color: '#fff', border: 'none', cursor: 'pointer' }}>
          申请演示
        </button>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function EnergyLanding() {
  return (
    <div style={{ background: C.bg, color: '#fff', overflowX: 'hidden',
      fontFamily: "'PingFang SC','SF Pro Text','Helvetica Neue',sans-serif" }}>
      <Header />
      <HeroSection />
      <AdvantagesSection />
      <AIWorkflowSection />
      <PowerChartSection />
      <RealWorldResultsSection />
      <AppShowcaseSection />
      <DeviceSection />
      <CloudEdgeSection />
      <BatterySection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
