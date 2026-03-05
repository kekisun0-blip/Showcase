import image_da4241a2f3e1dd03ad6cad70bfe24f03f4f55566 from 'figma:asset/da4241a2f3e1dd03ad6cad70bfe24f03f4f55566.png'
import image_884d0da43e1af3de06785479fa6a34e314b3fa97 from 'figma:asset/884d0da43e1af3de06785479fa6a34e314b3fa97.png'
import image_76858f61b844be55a1d5cf648c4658fba082b731 from 'figma:asset/76858f61b844be55a1d5cf648c4658fba082b731.png'
import image_new_yongdian from 'figma:asset/7d6228b42a76502054c866b2713fb1fd334d9edc.png'
import image_new_fadian from 'figma:asset/c85507d4ef6be05215aaf742f5b9c9a9c2c6fb2c.png'
import image_f32c4282db4bfaa6d468e347d72b58e45ce0e5f3 from 'figma:asset/f32c4282db4bfaa6d468e347d72b58e45ce0e5f3.png'
import aiHead     from 'figma:asset/864d664a8fcb7235c7b1fc63fc4de5c9292f1deb.png';
import aiWave     from 'figma:asset/ecd7dd39bd2d0f0ec8c8d683850b8c170e18324b.png';
import aiTablet   from 'figma:asset/9cd38438fdc57b1afabb2e7fd386157be84b08da.png';
import aiSuitcase from 'figma:asset/fea78b3cce09a877eeb8e2067c538a4a047b102a.png';
import { EnergyFlowDiagram } from './EnergyFlowDiagram';
import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView, AnimatePresence } from 'motion/react';
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea, AreaChart, Bar,
} from 'recharts';
import {
  Zap, Brain, Battery, RefreshCw, TrendingUp, Eye,
  Globe, Cloud, Settings, Activity,
  Car, Thermometer, Flame, BarChart3, Bolt,
  CheckCircle, GitBranch, Cpu,
  Star, Smartphone,
} from 'lucide-react';

import appImg1    from 'figma:asset/7af0e207a697340907c7b44e0ce1c5b4c35c67d1.png';
import appImg2    from 'figma:asset/6edf0f6ec9a16e852b5db1ba981dde0b0ef353c7.png';
import appImg3    from 'figma:asset/4a806b50a4fd068e269addcd5e039f9cc81046fc.png';
import appNight   from 'figma:asset/919fb0a1883dc60b5e5b358f7c4ff21f7e99856d.png';
import appDay     from 'figma:asset/cf87f2414b6f8ce6ff8697107b6ee1c7d6e8d4f1.png';
import appPrice   from 'figma:asset/13e53426fbc67694286ffedab1e5d8e8934e4772.png';

// ─── Palette — Violet-Purple harmony matching main app ───────────────────────
const C = {
  bg:     '#08051c',
  card:   'rgba(14,8,38,0.92)',
  b1:     'rgba(139,92,246,0.20)',
  b2:     'rgba(139,92,246,0.60)',
  cyan:   '#00d4ff',
  blue:   '#3b82f6',
  violet: '#8b5cf6',
  purple: '#7c3aed',
  green:  '#10b981',
  amber:  '#f59e0b',
  pink:   '#f472b6',
  muted:  'rgba(255,255,255,0.50)',
  dim:    'rgba(255,255,255,0.18)',
};

// ─── Scene Chart Data (冬季 + 夏季，对标参考图 7 条数据系列) ──────────────────
// 每条数据: t=时刻, gen=实际发电kW, genP=预测发电kW, con=实际用电kW, conP=预测用电kW,
//           s=实际SOC%, pd=计划SOC%, price=电价€/kWh
const winterSceneData = (() => {
  // ❄️ 冬季：发电少、早晚用电高、双充电周期（夜间低谷+午间光伏）
  const gen   = [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1.5, 2.5, 3.0, 3.2, 2.8, 2.2, 1.5, 0.5, 0, 0, 0, 0, 0, 0, 0];
  const genP  = [0, 0, 0, 0, 0, 0, 0, 0.2, 1.0, 2.0, 3.0, 3.5, 3.8, 3.2, 2.5, 1.8, 0.8, 0, 0, 0, 0, 0, 0, 0];
  const con   = [2.5, 2.0, 1.8, 1.5, 1.5, 2.0, 3.5, 5.0, 5.5, 4.5, 3.5, 3.0, 3.5, 3.5, 3.0, 3.5, 4.5, 6.5, 8.0, 7.0, 5.5, 4.0, 3.0, 2.5];
  const conP  = [3.0, 2.5, 2.0, 1.8, 1.8, 2.5, 4.0, 5.5, 6.0, 5.0, 4.0, 3.5, 4.0, 4.0, 3.5, 4.0, 5.0, 7.0, 8.5, 7.5, 6.0, 4.5, 3.5, 3.0];
  const soc   = [40, 28, 15, 30, 65, 92, 98, 95, 85, 72, 62, 58, 62, 72, 88, 93, 85, 68, 48, 30, 18, 10, 5, 8];
  const socP  = [35, 25, 12, 20, 55, 90, 95, 92, 82, 68, 58, 55, 60, 70, 85, 90, 80, 65, 45, 28, 15, 8, 5, 8];
  const price = [0.06, 0.05, 0.04, 0.03, 0.03, 0.05, 0.15, 0.17, 0.16, 0.15, 0.14, 0.12, 0.10, 0.08, 0.10, 0.12, 0.15, 0.20, 0.22, 0.20, 0.15, 0.10, 0.08, 0.07];
  return Array.from({ length: 24 }, (_, i) => ({
    t: `${i.toString().padStart(2, '0')}:00`,
    gen: gen[i], genP: genP[i], con: con[i], conP: conP[i],
    s: soc[i], pd: socP[i], price: price[i],
  }));
})();

const summerSceneData = (() => {
  // ☀️ 夏季：发电强劲、SOC长时间100%平台、晚间急降
  const gen   = [0, 0, 0, 0, 0, 0.5, 2.0, 5.0, 8.5, 12.0, 15.0, 17.0, 17.5, 16.5, 15.0, 12.5, 9.0, 5.5, 2.5, 0.5, 0, 0, 0, 0];
  const genP  = [0, 0, 0, 0, 0.3, 1.0, 3.0, 6.0, 9.5, 13.0, 16.0, 18.0, 18.5, 17.5, 16.0, 13.5, 10.0, 6.5, 3.0, 1.0, 0, 0, 0, 0];
  const con   = [1.5, 1.2, 1.0, 0.8, 0.8, 1.0, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.0, 7.5, 7.0, 6.0, 5.0, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.5];
  const conP  = [2.0, 1.5, 1.2, 1.0, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 7.5, 8.0, 7.5, 6.5, 5.5, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.8];
  const soc   = [60, 52, 45, 38, 33, 36, 48, 65, 82, 95, 100, 100, 100, 100, 100, 100, 100, 100, 88, 58, 28, 12, 8, 10];
  const socP  = [58, 50, 42, 35, 32, 35, 45, 60, 78, 92, 100, 100, 100, 100, 100, 100, 100, 100, 85, 55, 25, 10, 8, 10];
  const price = [0.08, 0.07, 0.06, 0.05, 0.05, 0.06, 0.08, 0.10, 0.11, 0.12, 0.12, 0.12, 0.11, 0.10, 0.11, 0.13, 0.14, 0.15, 0.16, 0.14, 0.10, 0.08, 0.07, 0.07];
  return Array.from({ length: 24 }, (_, i) => ({
    t: `${i.toString().padStart(2, '0')}:00`,
    gen: gen[i], genP: genP[i], con: con[i], conP: conP[i],
    s: soc[i], pd: socP[i], price: price[i],
  }));
})();

// SOC data for BatterySection
const socData = [
  { t:'00', s:30 },{ t:'02', s:28 },{ t:'04', s:25 },{ t:'06', s:28 },
  { t:'08', s:40 },{ t:'10', s:57 },{ t:'12', s:72 },{ t:'14', s:83 },
  { t:'16', s:85 },{ t:'18', s:70 },{ t:'20', s:56 },{ t:'22', s:46 },
  { t:'24', s:40 },
];

// ─── Animated Counter ────────────────────────────────────────────────���────────
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
  }, [inV, target, suf]);
  return <span ref={r}>0{suf}</span>;
}

// ─── Chart Tooltip ────────────────────────────────────────────────────────────
const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(8,4,24,0.98)', border: `1px solid ${C.b1}`, borderRadius: 8, padding: '8px 12px' }}>
      <p style={{ color: C.violet, fontSize: 10, marginBottom: 4 }}>{label}</p>
      {payload.map((d: any, i: number) => (
        <p key={`${d.dataKey}-${i}`} style={{ color: d.color, fontSize: 10, margin: '2px 0' }}>{d.name}: <strong>{d.value}</strong></p>
      ))}
    </div>
  );
};

// ─── FadeIn wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 40, style }: {
  children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={style}>
      {children}
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SecHead({ badge, title, sub, center = true, accent = C.violet, mascot, mascotSize = 110 }: {
  badge: string; title: React.ReactNode; sub?: string; center?: boolean; accent?: string;
  mascot?: string; mascotSize?: number; mascotSide?: 'left' | 'right';
}) {
  const badgePill = (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14,
      padding: '5px 14px', borderRadius: 20,
      background: `${accent}14`, border: `1px solid ${accent}40`,
    }}>
      <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
      <span style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: '0.08em' }}>{badge}</span>
    </div>
  );

  return (
    <FadeIn style={{ marginBottom: 44 }}>
      {mascot ? (
        /* ── Mascot always on the LEFT of the title block ── */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.85 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ flexShrink: 0 }}
          >
            <motion.img
              src={mascot}
              alt="爱小惟"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: mascotSize, height: mascotSize, objectFit: 'contain',
                filter: 'drop-shadow(0 8px 24px rgba(139,92,246,0.35))',
              }}
            />
          </motion.div>
          <div style={{ textAlign: 'left' }}>
            {badgePill}
            <h2 style={{
              fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 800, lineHeight: 1.2,
              margin: '0 0 10px', color: '#fff',
            }}>{title}</h2>
            {sub && <p style={{ fontSize: 14, color: C.muted, maxWidth: 520, margin: '0', lineHeight: 1.7 }}>{sub}</p>}
          </div>
        </div>
      ) : (
        /* ── No mascot: original centered / left layout ── */
        <div style={{ textAlign: center ? 'center' : 'left' }}>
          {badgePill}
          <h2 style={{
            fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 800, lineHeight: 1.2,
            margin: '0 0 10px', color: '#fff',
          }}>{title}</h2>
          {sub && <p style={{ fontSize: 14, color: C.muted, maxWidth: 520, margin: center ? '0 auto' : '0', lineHeight: 1.7 }}>{sub}</p>}
        </div>
      )}
    </FadeIn>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────
function PhoneFrame({ src, title, desc, index, glow }: {
  src: string; title: string; desc: string; index: number; glow: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.12 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <motion.div animate={{ y: hov ? -8 : 0 }} transition={{ duration: .3 }}
        style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: -16, borderRadius: 56,
          background: `radial-gradient(ellipse,${glow}30 0%,transparent 70%)`, pointerEvents: 'none',
        }} />
        <div style={{
          width: 155, height: 330, borderRadius: 30, position: 'relative',
          background: '#050210', border: `2px solid ${hov ? glow : `${glow}50`}`,
          boxShadow: `0 20px 52px rgba(0,0,0,0.65), 0 0 ${hov ? 40 : 16}px ${glow}30`,
          overflow: 'hidden', transition: 'box-shadow .3s, border-color .3s',
        }}>
          
          <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </motion.div>
      <div style={{ textAlign: 'center', maxWidth: 175 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Advantage Card ───────────────────────────────────────────────────────────
function AdvCard({ icon: Icon, c, badge, title, sub, desc, points }: any) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: '24px', borderRadius: 18, height: '100%',
        background: h ? `${c}0e` : C.card,
        border: `1.5px solid ${h ? c + '60' : C.b1}`,
        backdropFilter: 'blur(16px)',
        boxShadow: h ? `0 16px 52px ${c}1a, 0 0 0 1px ${c}20` : 'none',
        transition: 'all .28s', cursor: 'default',
      }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <motion.div
          animate={{ rotate: h ? [0, -5, 5, 0] : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: 46, height: 46, borderRadius: 12, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: `${c}1a`, border: `1.5px solid ${c}45`,
          }}>
          <Icon size={20} style={{ color: c }} />
        </motion.div>
        <span style={{
          fontSize: 10, color: c, background: `${c}14`, border: `1px solid ${c}40`,
          borderRadius: 6, padding: '3px 8px', fontWeight: 700,
        }}>{badge}</span>
      </div>
      <h3 style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 11, color: c, marginBottom: 10, fontWeight: 600 }}>{sub}</p>
      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {points.map((pt: string) => (
          <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={11} style={{ color: c, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)' }}>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const [aiStep, setAiStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAiStep(s => (s + 1) % 3), 2400);
    return () => clearInterval(t);
  }, []);

  const orbs = [
    { x: '8%',  y: '12%', size: 380, c: 'rgba(124,58,237,0.42)'  },
    { x: '62%', y: '6%',  size: 440, c: 'rgba(139,92,246,0.22)'  },
    { x: '72%', y: '52%', size: 320, c: 'rgba(0,212,255,0.16)'   },
    { x: '18%', y: '62%', size: 260, c: 'rgba(37,99,235,0.22)'   },
  ];

  const steps = [
    { c: C.amber,  l: '低谷充电', note: 'AI识别低谷时段，自动充电至最优SOC' },
    { c: C.violet, l: '光伏储能', note: '光伏满发时余电全量充入电池' },
    { c: C.pink,   l: '晚峰套利', note: '高价时段电池100%供电，最大化收益' },
  ];

  return (
    <section style={{
      position: 'relative', minHeight: '86vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '72px 24px 56px',
    }}>
      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom,rgba(8,5,28,0.6) 0%,rgba(8,5,28,0.4) 40%,rgba(8,5,28,0.96) 82%,#08051c 100%)',
        }} />
                <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 40%, rgba(139,92,246,0.15) 0%, transparent 70%),
            linear-gradient(to right, rgba(139,92,246,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139,92,246,0.08) 1px, transparent 1px),
            linear-gradient(to right, rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139,92,246,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 80px 80px, 80px 80px, 20px 20px, 20px 20px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 85%)',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Ambient orbs */}
      {orbs.map((orb, i) => (
        <motion.div key={i}
          animate={{ x: [0, 18, -10, 5, 0], y: [0, -12, 18, -5, 0] }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: orb.x, top: orb.y, width: orb.size,
            height: orb.size, borderRadius: '50%', background: orb.c,
            filter: 'blur(90px)', pointerEvents: 'none',
          }}
        />
      ))}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 960, width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
      }}>
        {/* Text */}
        <div style={{ maxWidth: 560, textAlign: 'left' }}>
          {/* Badge */}
          

          {/* Headline row: mascot + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, marginLeft: 10 }}>
            <motion.img
              src={aiWave}
              alt="爱小惟"
              initial={{ opacity: 0, x: -20, scale: 0.88 }}
              animate={{ opacity: 1, x: 0, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                width: 99, height: 99, objectFit: 'contain', flexShrink: 0,
                filter: 'drop-shadow(0 12px 32px rgba(139,92,246,0.45))',
              }}
            />
            <motion.h1 className="text-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8, delay: .1 }}
              style={{
                fontSize: 'clamp(30px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.15,
                margin: 0, letterSpacing: '-0.025em', color: '#fff',
              }}>
              AI 智慧能源<br />
              让每一度电<br />
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #8b5cf6, #00d4ff, #8b5cf6)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>产生最大价值</span>
            </motion.h1>
          </div>

          {/* Sub */}
          <motion.p className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .28 }}
            style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', color: C.muted, maxWidth: 560, margin: '0 0 28px', lineHeight: 1.75 }}>
            深度学习驱动的 AI 储能管理 · 精准预测发电 · 用电 · 电价<br />自动规划最优充放电策略，全年持续降本
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .42, duration: .7 }}
            style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 36 }}>
            {[
              { v: 200, s: '万+', l: '在网设备',     c: C.blue, id: 'hero-dev' },
              { v: 5,   s: '亿+', l: '历史学习数据', c: C.violet, id: 'hero-data' },
              { v: 365, s: '天',  l: '持续学习进化', c: C.cyan, id: 'hero-evolve' },
            ].map(m => (
              <div key={m.id} style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 800, color: m.c, lineHeight: 1 }}>
                  <span style={{ display: 'inline-block', transform: 'translateX(100px)' }}><Cnt target={m.v} suf={m.s} /></span>
                </p>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 4, transform: 'translateX(100px)' }}>{m.l}</p>
              </div>
            ))}
          </motion.div>

          {/* AI scenario pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .58 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'nowrap' }}>
            {steps.map((s, i) => (
                            <motion.div key={s.l}
                animate={{ opacity: aiStep === i ? 1 : 0.35, scale: aiStep === i ? 1.04 : 1 }}
                transition={{ duration: .3 }}
                style={{
                  flex: '1 0 180px',
                  padding: '12px', borderRadius: 14, textAlign: 'left',
                  background: aiStep === i ? `${s.c}18` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${aiStep === i ? s.c + '60' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: aiStep === i ? `0 10px 30px -10px ${s.c}40` : 'none',
                  transition: 'border-color .3s, background .3s, box-shadow .3s',
                  transform: 'translateX(-180px)',
                }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: s.c, marginBottom: 2 }}>{s.l}</p>
                                <p style={{ fontSize: 10, color: '#fff', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — CORE ADVANTAGES
// ═══════════════════════════════════════════════════════════════════════════════
function AdvantagesSection() {
  const cards = [
    {
      icon: TrendingUp, c: C.blue, badge: '预测精度 ≈90%',
      title: '精准三维预测', sub: 'Triple Prediction AI',
      desc: '融合卫星气象、历史数据与实时电价，同步预测发电量、用电负载与动态电价，精度领先行业均值。',
      points: ['发电预测精度 ≈90%', '用电预测精度 ≈70%', '多源数据交叉验证', '电价曲线实时同步'],
    },
    {
      icon: Battery, c: C.violet, badge: '爱士惟专利',
      title: '「三个和尚」SOC 算法', sub: 'Patented SOC Planning',
      desc: '9种参数并行评估，综合发电预测、负载预测、动态电价与物理约束，动态规划最优充放电曲线。',
      points: ['9种方案并行优选', 'SOC 上下限精准保护', '充放电损耗最小化', '自适应退化补偿'],
    },
    {
      icon: RefreshCw, c: C.cyan, badge: '越用越准',
      title: 'AI 持续自我进化', sub: 'Self-Evolving Intelligence',
      desc: '每天自动复盘策略效果，结合200万+全球设备联学，持续修正预测模型，精度随时间持续提升。',
      points: ['每日策略自动复盘', '全球200万+设备联学', '云端+边缘双层优化', '个性化习惯学习'],
    },
  ];

  return (
    <section style={{ padding: '60px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="CORE ADVANTAGES"
          title={<>为什么选择 <span style={{ color: C.violet }}>AISWEI EMS</span></>}
          sub="三大核心技术优势，让储能系统发挥超出预期的价值" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
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

// ══════════════════════��════════════════════════════════════════════════════════
// SECTION 3 — AI WORKFLOW + CHART
// ═══════════════════════════════════════════════════════════════════════════════
function AIWorkflowSection() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 5), 1700);
    return () => clearInterval(t);
  }, []);

  const nodes = [
    { icon: Cloud,      l: '天气预报数据',    sub: '7天精细化预报', c: C.blue   },
    { icon: Activity,   l: '历史用电负载',    sub: '360天自学习',   c: C.purple },
    { icon: TrendingUp, l: '实时电价曲线',    sub: '24h动态电价',   c: C.amber  },
    { icon: Brain,      l: 'AI 云端决策引擎', sub: '深度强化学习',  c: C.violet },
    { icon: BarChart3,  l: '最优充放电计划',  sub: '9方案并行优选', c: C.cyan   },
  ];

  const scenarios = [
    { c: C.green,  time: '02:00–05:00', label: '🌙 低谷自动充电', desc: 'AI识别DK1夜间低谷电价（0.03 EUR/kWh），自动充电至最优SOC' },
    { c: C.amber,  time: '10:00–14:00', label: '☀️ 光伏高发储能', desc: '屋顶光伏满发，现货价降至0.005 EUR/kWh，余电全量充入电池' },
    { c: C.pink,   time: '17:00–20:00', label: '⚡ 晚峰放电套利', desc: '电价飙至0.15 EUR/kWh，电池100%供电，峰谷价差8.2×' },
  ];

  return (
    <section style={{ padding: '60px 24px', background: `linear-gradient(180deg,${C.bg} 0%,#0d0730 50%,${C.bg} 100%)` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="AI DECISION ENGINE" title="AI 如何帮你省钱？"
          sub="智能预测 + 电价感知 + 自动决策，24小时全自动调度" accent={C.cyan}
          mascot={aiHead} mascotSize={90} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}>
          {/* Daily 3 scenarios */}
          <FadeIn>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: C.violet }}>每日 AI 决策三幕</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {scenarios.map(s => (
                <div key={s.label} style={{
                  display: 'flex', gap: 14, padding: '15px 18px', borderRadius: 14,
                  background: `${s.c}0d`, border: `1.5px solid ${s.c}30`,
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: s.c }}>{s.label}</span>
                      <span style={{
                        fontSize: 10, color: C.muted, background: 'rgba(255,255,255,0.07)',
                        borderRadius: 5, padding: '1px 7px',
                      }}>{s.time}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Data flow */}
          <FadeIn delay={.15}>
            <div style={{
              background: C.card, border: `1px solid ${C.b1}`, borderRadius: 18,
              padding: '24px', backdropFilter: 'blur(14px)',
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.violet, marginBottom: 16, letterSpacing: '0.04em' }}>
                AI 决策数据流
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {nodes.map((node, idx) => (
                  <div key={node.l}>
                    <motion.div animate={{ opacity: step === idx ? 1 : 0.38, x: step === idx ? 5 : 0 }}
                      transition={{ duration: .25 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                        borderRadius: 9,
                        background: step === idx ? `${node.c}18` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${step === idx ? node.c + '55' : 'rgba(255,255,255,0.07)'}`,
                      }}>
                      <node.icon size={14} style={{ color: node.c, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 12, fontWeight: 600 }}>{node.l}</p>
                        <p style={{ fontSize: 10, color: C.muted }}>{node.sub}</p>
                      </div>
                      {step === idx && (
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: .85, repeat: Infinity }}
                          style={{ width: 7, height: 7, borderRadius: '50%', background: node.c, flexShrink: 0 }} />
                      )}
                    </motion.div>
                    {idx < 4 && (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.1, repeat: Infinity, delay: idx * .28 }}
                          style={{ width: 1, height: 10, background: C.b2 }} />
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
// SECTION 4 — POWER CHART + REAL DATA (冬季 + 夏季 双场景图)
// ═════════════���═════════════════════════════════════════════════════════════════

// 场景图专用 Tooltip
const SceneChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(8,5,28,0.97)', border: '1px solid rgba(139,92,246,0.25)',
      borderRadius: 12, padding: '12px 16px', minWidth: 180,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(139,92,246,0.08)',
      backdropFilter: 'blur(12px)',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700, marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 6 }}>{label}</p>
      {payload.map((d: any, i: number) => {
        const isPrice = d.dataKey === 'priceScaled';
        const val = isPrice ? (d.value / 400).toFixed(3) : d.value;
        const unit = isPrice ? ' €/kWh' : d.dataKey === 's' || d.dataKey === 'pd' ? '%' : ' kW';
        const name = isPrice ? '电价' : d.name;
        return (
          <div key={`${d.dataKey}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, margin: '4px 0' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, display: 'inline-block', boxShadow: `0 0 6px ${d.color}60` }} />
              {name}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, color: d.color }}>{val}{unit}</span>
          </div>
        );
      })}
    </div>
  );
};

// 7 系列图例数据（含 dataKey 映射）
const LEGEND_ITEMS = [
  { type: 'line' as const,      c: '#60a5fa', l: '计划SOC (%)',  dk: 'pd' },
  { type: 'dot-line' as const,  c: '#f87171', l: '实际SOC (%)',  dk: 's' },
  { type: 'dash' as const,      c: '#fbbf24', l: '电价 (€/kWh)', dk: 'priceScaled' },
  { type: 'bar' as const,       c: '#34d399', l: '预测发电',      dk: 'genP' },
  { type: 'bar-solid' as const, c: '#059669', l: '实际发电',      dk: 'gen' },
  { type: 'bar' as const,       c: '#94a3b8', l: '预测用电',      dk: 'conP' },
  { type: 'bar-solid' as const, c: '#818cf8', l: '实际用电',      dk: 'con' },
];

// 7 系列图例组件（点击切换图表中对应系列显隐）
function SceneChartLegend({ hiddenSeries, onToggle }: {
  hiddenSeries: Set<string>;
  onToggle: (dk: string) => void;
}) {
  const allHidden = hiddenSeries.size > 0;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginBottom: 16, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
      {LEGEND_ITEMS.map(it => {
        const isHidden = hiddenSeries.has(it.dk);
        return (
          <motion.div
            key={it.l}
            onClick={() => onToggle(it.dk)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer', padding: '3px 8px', borderRadius: 8,
              opacity: isHidden ? 0.3 : 1,
              transition: 'opacity 0.25s',
              userSelect: 'none' as const,
            }}
          >
            {it.type === 'line' ? (
              <div style={{ width: 16, height: 2, borderRadius: 1, background: it.c, boxShadow: `0 0 4px ${it.c}50` }} />
            ) : it.type === 'dot-line' ? (
              <div style={{ position: 'relative', width: 16, height: 10, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 16, height: 2, borderRadius: 1, background: it.c }} />
                <div style={{ position: 'absolute', left: 5, top: 2, width: 6, height: 6, borderRadius: '50%', background: it.c, border: '1.5px solid rgba(8,5,28,0.8)' }} />
              </div>
            ) : it.type === 'dash' ? (
              <div style={{ width: 16, height: 0, borderTop: `2px dashed ${it.c}` }} />
            ) : it.type === 'bar-solid' ? (
              <div style={{ width: 10, height: 10, borderRadius: 2, background: it.c }} />
            ) : (
              <div style={{ width: 10, height: 10, borderRadius: 2, background: `${it.c}30`, border: `1.5px solid ${it.c}60` }} />
            )}
            <span style={{
              fontSize: 10,
              color: isHidden ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.65)',
              textDecoration: isHidden ? 'line-through' : 'none',
              transition: 'color 0.2s',
            }}>{it.l}</span>
          </motion.div>
        );
      })}
      {/* 全部显示 */}
      {allHidden && (
        <motion.div
          initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => { const copy = new Set<string>(); LEGEND_ITEMS.forEach(it => { if (hiddenSeries.has(it.dk)) onToggle(it.dk); }); }}
          style={{ marginLeft: 6, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '3px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>全部显示</span>
        </motion.div>
      )}
    </div>
  );
}

// 单个场景图
function SceneChart({ data, prefix, hiddenSeries }: { data: any[]; prefix: string; hiddenSeries: Set<string> }) {
  const chartData = data.map(d => ({ ...d, priceScaled: d.price * 400 }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -4, bottom: 4 }}
        barGap={1} barCategoryGap="20%">
        <defs key="defs">
          <linearGradient id={`${prefix}-socFill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#60a5fa" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid key="grid" strokeDasharray="3 6" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis key="x-axis" dataKey="t" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          tickLine={false} interval={2} />

        {/* Left Y: SOC 0–100% */}
        <YAxis key="y-axis-l" yAxisId="L" domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
          tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false}
          tickFormatter={(v: number) => `${v}%`} />

        {/* Right Y: kW 0–20 */}
        <YAxis key="y-axis-r" yAxisId="R" orientation="right" domain={[0, 20]}
          ticks={[0, 5, 10, 15, 20]}
          tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false}
          tickFormatter={(v: number) => `${v}kW`} />

        <Tooltip key="tooltip" content={<SceneChartTip />} />

        {/* ── 柱状图：预测用电 ── */}
        <Bar key="conP" yAxisId="R" dataKey="conP" name="预测用电"
          fill="#94a3b8" fillOpacity={0.25} radius={[2, 2, 0, 0] as any}
          hide={hiddenSeries.has('conP')} />
        {/* ── 柱状图：实际用电 ── */}
        <Bar key="con" yAxisId="R" dataKey="con" name="实际用电"
          fill="#818cf8" fillOpacity={0.75} radius={[2, 2, 0, 0] as any}
          hide={hiddenSeries.has('con')} />
        {/* ── 柱状图：预测发电 ── */}
        <Bar key="genP" yAxisId="R" dataKey="genP" name="预测发电"
          fill="#34d399" fillOpacity={0.25} radius={[2, 2, 0, 0] as any}
          hide={hiddenSeries.has('genP')} />
        {/* ── 柱状图：实际发电 ── */}
        <Bar key="gen" yAxisId="R" dataKey="gen" name="实际发电"
          fill="#059669" fillOpacity={0.85} radius={[2, 2, 0, 0] as any}
          hide={hiddenSeries.has('gen')} />

        {/* ── 计划SOC ── */}
        <Area key="pd" yAxisId="L" type="monotone" dataKey="pd" name="计划SOC"
          stroke="#60a5fa" strokeWidth={2} fill={`url(#${prefix}-socFill)`}
          dot={false} hide={hiddenSeries.has('pd')} />
        {/* ── 实际SOC ── */}
        <Line key="soc" yAxisId="L" type="monotone" dataKey="s" name="实际SOC"
          stroke="#f87171" strokeWidth={2}
          dot={{ r: 2.5, fill: '#f87171', strokeWidth: 1.5, stroke: 'rgba(8,5,28,0.6)' }}
          hide={hiddenSeries.has('s')} />
        {/* ── 电价 ── */}
        <Line key="price" yAxisId="L" type="stepAfter" dataKey="priceScaled" name="电价"
          stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="6 4" dot={false}
          hide={hiddenSeries.has('priceScaled')} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

function PowerDataSection() {
  const [winterHidden, setWinterHidden] = useState<Set<string>>(new Set());
  const [summerHidden, setSummerHidden] = useState<Set<string>>(new Set());

  const toggleWinter = (dk: string) =>
    setWinterHidden(prev => { const s = new Set(prev); s.has(dk) ? s.delete(dk) : s.add(dk); return s; });
  const toggleSummer = (dk: string) =>
    setSummerHidden(prev => { const s = new Set(prev); s.has(dk) ? s.delete(dk) : s.add(dk); return s; });

  return (
    <section style={{ padding: '60px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="POWER DATA" title="每一度电，精打细算"
          sub="AI 7维数据联合决策，冬夏双场景对比，24小时智能调度" />

        {/* ── Chart 1: 冬季场景 ── */}
        <FadeIn>
          <div style={{
            background: 'rgba(12,8,32,0.88)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 20,
            padding: '28px 24px', backdropFilter: 'blur(16px)', marginBottom: 28,
            boxShadow: '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>❄️</span> 冬季场景
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 14px',
                borderRadius: 20, background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 8px #60a5fa60' }} />
                <span style={{ fontSize: 10, color: '#60a5fa', fontWeight: 600 }}>标准场景 · 冬季</span>
              </div>
            </div>
            <SceneChartLegend hiddenSeries={winterHidden} onToggle={toggleWinter} />
            <SceneChart data={winterSceneData} prefix="winter" hiddenSeries={winterHidden} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16, flexWrap: 'wrap' }}>
              {[
                { l: '🌙 夜间低谷充电',  sub: '02:00–05:00 · €0.03/kWh', c: '#60a5fa' },
                { l: '☀️ 午间光伏补充',  sub: '09:00–15:00 · 发电≤3.2kW', c: '#34d399' },
                { l: '⚡ 晚峰电池放电',  sub: '17:00–20:00 · €0.20–0.22',  c: '#f87171' },
              ].map(a => (
                <div key={a.l} style={{ textAlign: 'center', padding: '10px 18px', borderRadius: 12, background: `${a.c}08`, border: `1px solid ${a.c}20` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: a.c }}>{a.l}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Chart 2: 夏季场景 ── */}
        <FadeIn delay={0.15}>
          <div style={{
            background: 'rgba(12,8,32,0.88)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: 20,
            padding: '28px 24px', backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>☀️</span> 夏季场景
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 14px',
                borderRadius: 20, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d39960' }} />
                <span style={{ fontSize: 10, color: '#34d399', fontWeight: 600 }}>标准场景 · 夏季</span>
              </div>
            </div>
            <SceneChartLegend hiddenSeries={summerHidden} onToggle={toggleSummer} />
            <SceneChart data={summerSceneData} prefix="summer" hiddenSeries={summerHidden} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16, flexWrap: 'wrap' }}>
              {[
                { l: '☀️ 强劲光伏发电', sub: '06:00–19:00 · 峰值17.5kW', c: '#34d399' },
                { l: '🔋 SOC 100%平台', sub: '10:00–17:00 · 长时满充',   c: '#60a5fa' },
                { l: '⚡ 晚间急速放电', sub: '18:00–21:00 · €0.14–0.16', c: '#f87171' },
              ].map(a => (
                <div key={a.l} style={{ textAlign: 'center', padding: '10px 18px', borderRadius: 12, background: `${a.c}08`, border: `1px solid ${a.c}20` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: a.c }}>{a.l}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── App Phone Tabs (interactive left-right layout) ──────────────────────────
const phoneTabs = [
  { src: appImg2, glow: C.violet, label: '实时能量流向',
    tag: 'LIVE', desc: '10秒刷新：PV发电、电池SOC、用电负载一览无余',
    detail: ['光伏实时输出监控', '电池SOC精准显示', '用电负载即时追踪'] },
  { src: appImg1, glow: C.cyan,   label: 'AI 充放电策略',
    tag: 'AI', desc: '5种充放电模式一键切换，AI Smart模式全自动优化',
    detail: ['峰谷套利自动执行', '5种模式灵活切换', 'AI预测充放时机'] },
  { src: appImg3, glow: C.amber,  label: '发电量统计',
    tag: 'STATS', desc: '日/周/月/年多维分析，掌握每度电的去向与收益',
    detail: ['多时段对比分析', '收益可视化报表', '一键导出数据'] },
];

function AppPhoneTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tab = phoneTabs[active];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % phoneTabs.length);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', marginBottom: 36 }}>
      {/* ── Left: tab list ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {phoneTabs.map((t, i) => {
          const isActive = i === active;
          return (
            <motion.button key={t.label} onClick={() => { setActive(i); setPaused(true); }}
              whileHover={{ x: isActive ? 0 : 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 18px',
                borderRadius: 16, cursor: 'pointer', textAlign: 'left', border: 'none',
                background: isActive ? `${t.glow}14` : 'rgba(255,255,255,0.03)',
                outline: isActive ? `1.5px solid ${t.glow}55` : '1px solid rgba(255,255,255,0.06)',
                transition: 'background .25s, outline .25s' }}>
              <div style={{ width: 64, height: 32, borderRadius: 9, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isActive ? `${t.glow}28` : 'rgba(255,255,255,0.06)',
                border: `1px solid ${isActive ? t.glow + '60' : 'rgba(255,255,255,0.08)'}`,
                transition: 'background .25s, border .25s' }}>
                <span style={{ fontSize: 10, fontWeight: 800,
                  color: isActive ? t.glow : 'rgba(255,255,255,0.35)', letterSpacing: 0.5 }}>{t.tag}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)', marginBottom: 4, transition: 'color .25s' }}>{t.label}</p>
                <p style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.30)',
                  lineHeight: 1.55, transition: 'color .25s', margin: 0 }}>{t.desc}</p>
                {isActive && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {t.detail.map(d => (
                      <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.glow, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: t.glow, fontWeight: 600 }}>{d}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
              {isActive && (
                <div style={{ alignSelf: 'center', color: t.glow, fontSize: 14, opacity: 0.7 }}>›</div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Right: phone mockup ── */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: `radial-gradient(ellipse at 50% 60%, ${tab.glow}1a 0%, transparent 65%)`,
        borderRadius: 24, padding: '32px 0', minHeight: 400, position: 'relative', overflow: 'visible' }}>

        {/* Animated orbit rings */}
        {[0, 1, 2].map(i => (
          <motion.div key={`ring-${i}`}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 12 + i * 6, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', width: 220 + i * 80, height: 220 + i * 80,
              border: `1px solid ${tab.glow}${i === 0 ? '18' : '0c'}`,
              borderRadius: '50%', pointerEvents: 'none',
              top: '50%', left: '50%', marginTop: -(220 + i * 80) / 2, marginLeft: -(220 + i * 80) / 2 }}>
            <motion.div style={{ position: 'absolute', top: -3, left: '50%',
              width: 6, height: 6, borderRadius: '50%',
              background: tab.glow, opacity: 0.4 - i * 0.1,
              boxShadow: `0 0 8px ${tab.glow}60` }} />
          </motion.div>
        ))}

        {/* Main phone with 3D perspective */}
        <motion.div key={active}
          initial={{ opacity: 0, rotateY: -12, scale: 0.88 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 24 }}
          style={{ position: 'relative', zIndex: 2 }}>

          {/* Outer glow */}
          <div style={{ position: 'absolute', inset: -32, borderRadius: 60,
            background: `radial-gradient(ellipse, ${tab.glow}20 0%, transparent 70%)`,
            pointerEvents: 'none', filter: 'blur(8px)' }} />

          {/* Phone body with hover tilt */}
          <motion.div
            whileHover={{ rotateY: -6, rotateX: 4, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ width: 178, height: 360, borderRadius: 24, overflow: 'hidden',
              border: `2px solid ${tab.glow}55`,
              boxShadow: `0 28px 72px rgba(0,0,0,0.75), 0 0 56px ${tab.glow}25, inset 0 1px 0 rgba(255,255,255,0.08)`,
              background: '#000', position: 'relative' }}>

            {/* Status bar with Dynamic Island */}
            <div style={{ height: 28, background: 'rgba(0,0,0,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px',
              position: 'relative', zIndex: 3 }}>
              <span style={{ fontSize: 9, color: '#fff', fontWeight: 700, opacity: 0.9 }}>9:41</span>
              <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
                width: 52, height: 14, borderRadius: 10, background: '#000',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 12, height: 7, border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: 2, position: 'relative', display: 'flex', alignItems: 'center', padding: '0 1px' }}>
                  <motion.div animate={{ width: ['40%', '85%', '40%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ height: '70%', background: '#4ade80', borderRadius: 1 }} />
                </div>
              </div>
            </div>

            {/* Screen content */}
            <img src={tab.src} alt={tab.label}
              style={{ width: '100%', height: 'calc(100% - 28px)', objectFit: 'cover', display: 'block' }} />

            {/* Screen shine sweep */}
            <motion.div
              animate={{ x: [-200, 300], opacity: [0, 0.15, 0] }}
              transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, repeatDelay: 6 }}
              style={{ position: 'absolute', top: 0, left: 0, width: 60, height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                transform: 'skewX(-15deg)', pointerEvents: 'none', zIndex: 4 }} />

            {/* Home indicator */}
            <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
              width: 48, height: 4, borderRadius: 3, background: 'rgba(255,255,255,0.2)', zIndex: 5 }} />
          </motion.div>

          {/* Floating notification badge — right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [-10, -16, -10] }}
            transition={{ opacity: { delay: 0.4, duration: 0.3 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            style={{ position: 'absolute', top: 50, right: -60, zIndex: 5,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
              border: `1px solid ${tab.glow}40`, borderRadius: 12, padding: '6px 12px',
              display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: tab.glow,
              boxShadow: `0 0 6px ${tab.glow}` }} />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{tab.tag}</span>
          </motion.div>

          {/* Floating badge — left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [10, 4, 10] }}
            transition={{ opacity: { delay: 0.6, duration: 0.3 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
            style={{ position: 'absolute', bottom: 100, left: -56, zIndex: 5,
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '5px 10px' }}>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>⚡ 实时同步中</span>
          </motion.div>

          {/* Reflection below phone */}
          <div style={{ width: 178, height: 50, marginTop: 2, borderRadius: '0 0 36px 36px',
            overflow: 'hidden', opacity: 0.12, transform: 'scaleY(-1)', pointerEvents: 'none',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}>
            <img src={tab.src} alt="" style={{ width: '100%', height: 50, objectFit: 'cover', display: 'block',
              filter: 'blur(2px) brightness(0.6)' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — APP SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════
function AppShowcaseSection() {
  return (
    <section style={{ padding: '60px 24px', background: `linear-gradient(180deg,${C.bg} 0%,#0d0730 50%,${C.bg} 100%)` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="MOBILE APP" title={<>随时随地，<span style={{ color: C.violet }}>掌控能源</span></>}
          sub="功能完整的 App，让复杂的能源管理一目了然"
          mascot={aiTablet} mascotSize={90} />

        <AppPhoneTabs />

        <FadeIn delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 200px', gap: 22, alignItems: 'stretch' }}>
            {/* 用电情况 — 宽屏景观图 */}
            <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}
              style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', height: 156,
                boxShadow: `0 8px 36px rgba(139,92,246,0.28), 0 0 0 1px rgba(139,92,246,0.20)` }}>
              <img src={image_new_yongdian} alt="用电情况"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(139,92,246,0.10) 0%,transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 11px',
                background: 'linear-gradient(to top,rgba(10,5,30,0.82) 0%,transparent 100%)' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>🌙 夜间储能模式 · 电池65%</span>
              </div>
            </motion.div>
            {/* 发电情况 — 宽屏景观图 */}
            <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}
              style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', height: 156,
                boxShadow: `0 8px 36px rgba(16,185,129,0.22), 0 0 0 1px rgba(16,185,129,0.20)` }}>
              <img src={image_new_fadian} alt="发电情况"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(16,185,129,0.10) 0%,transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 11px',
                background: 'linear-gradient(to top,rgba(5,20,15,0.80) 0%,transparent 100%)' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>☀️ 实时发电 15 kW · 光伏峰值</span>
              </div>
            </motion.div>
            {/* 动态电价 — 竖屏截图，居中展示 */}
            <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}
              style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', height: 156,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)',
                boxShadow: `0 8px 36px rgba(245,158,11,0.18)` }}>
              <img src={image_884d0da43e1af3de06785479fa6a34e314b3fa97} alt="动态电价"
                style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 11px',
                background: 'linear-gradient(to top,rgba(20,12,5,0.80) 0%,transparent 100%)' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#f59e0b' }}>⚡ 动态电价</span>
              </div>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 12, marginTop: 20 }}>
            {[
              { icon: Smartphone, c: C.blue,   l: '跨平台支持', sub: 'iOS & Android 全平台' },
              { icon: Eye,        c: C.violet,  l: '实时监控',   sub: '10秒数据刷新率'       },
              { icon: Settings,   c: C.cyan,    l: '远程配置',   sub: '随时调整充放电策略'   },
              { icon: Activity,   c: C.green,   l: '历史分析',   sub: '完整数据报告导出'     },
            ].map(f => (
              <div key={f.l} style={{ display: 'flex', gap: 11, padding: '13px 15px', borderRadius: 13,
                background: C.card, border: `1px solid ${C.b1}`, backdropFilter: 'blur(8px)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: `${f.c}18`, border: `1px solid ${f.c}40`, flexShrink: 0 }}>
                  <f.icon size={16} style={{ color: f.c }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{f.l}</p>
                  <p style={{ fontSize: 11, color: C.muted }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ════════���══════════════════════════════════════════════════════════════════════
// SECTION 6 — DEVICE & SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════
function SystemSection() {
  const devices = [
    { icon: Bolt,        c: C.blue,   l: '光储逆变器', sub: 'T2/T3 三相混合 5–12kW',    tag: '核心'   },
    { icon: Battery,     c: C.violet, l: '储能电池',   sub: 'AI 智慧充放 (C08 Ai-mode)', tag: '已连接' },
    { icon: Car,         c: C.amber,  l: 'EV 充电桩',  sub: 'PV 盈余充电 (C04)',         tag: '即插即用'},
    { icon: Thermometer, c: C.pink,   l: '电热水器',   sub: 'PV 盈余加热 (C04)',         tag: '节能'   },
    { icon: Flame,       c: '#f97316', l: '热泵',      sub: 'PV 盈余供暖制冷 (C09)',     tag: '高效'   },
    { icon: GitBranch,   c: C.cyan,   l: '智能电网',   sub: '峰谷套利 · 双向并网',      tag: '优化'   },
  ];

  return (
    <section style={{ padding: '60px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="SYSTEM INTEGRATION"
          title={<>云边协同，<span style={{ color: C.violet }}>一平台连接整套生态</span></>}
          sub="从光伏逆变器到EV充电桩，AI云端规划 + 边缘毫秒执行，双层架构兼顾智能与可靠" />

        {/* Energy Flow Diagram */}
        <FadeIn>
          <EnergyFlowDiagram />
        </FadeIn>

        {/* Cloud ↔ Edge */}
        <FadeIn delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
            {/* Cloud */}
            <div style={{
              borderRadius: 16, padding: '22px 24px', backdropFilter: 'blur(14px)',
              background: 'rgba(37,99,235,0.08)', border: '1.5px solid rgba(59,130,246,0.35)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(59,130,246,0.15)',
                  border: '1.5px solid rgba(59,130,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cloud size={19} style={{ color: C.blue }} />
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800 }}>云端 AI</p>
                  <p style={{ fontSize: 10, color: '#60a5fa' }}>全局预测 · 策略生成</p>
                </div>
              </div>
              {[
                { t: '三维预测', d: '发电量 · 用电负载 · 电价曲线' },
                { t: '9方案并行', d: '输出当日最优充放电规划' },
              ].map(f => (
                <div key={f.t} style={{ padding: '10px 12px', borderRadius: 10, marginBottom: 8,
                  background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.18)' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{f.t}</p>
                  <p style={{ fontSize: 11, color: C.muted }}>{f.d}</p>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              
              <div style={{ padding: '6px 10px', borderRadius: 8, background: `${C.violet}14`,
                border: `1px solid ${C.b2}`, textAlign: 'center' }}>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  <RefreshCw size={14} style={{ color: C.violet }} />
                </motion.div>
                <p style={{ fontSize: 9, color: C.violet, marginTop: 4, fontWeight: 600 }}>同步</p>
              </div>
              
            </div>

            {/* Edge */}
            <div style={{
              borderRadius: 16, padding: '22px 24px', backdropFilter: 'blur(14px)',
              background: `rgba(139,92,246,0.06)`, border: `1.5px solid ${C.b1}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: `${C.violet}18`,
                  border: `1.5px solid ${C.violet}50`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={19} style={{ color: C.violet }} />
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800 }}>边缘端</p>
                  <p style={{ fontSize: 10, color: C.violet }}>本地执行 · 毫秒响应</p>
                </div>
              </div>
              {[
                { t: '实时感知', d: 'SOC · 温度 · 负载 · 电网状态' },
                { t: '本地微调', d: '物理约束下策略实时优化' },
                { t: '安全保障', d: '双层架构兼顾智能与可靠' },
              ].map(f => (
                <div key={f.t} style={{ padding: '9px 12px', borderRadius: 10, marginBottom: 7,
                  background: `${C.violet}09`, border: `1px solid ${C.b1}` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{f.t}</p>
                  <p style={{ fontSize: 11, color: C.muted }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Device Card ──────────────────────────────────────────────────────────────
function DeviceCard({ icon: Icon, c, l, sub, tag }: any) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: '17px 20px', borderRadius: 14,
        background: h ? `${c}0c` : C.card,
        border: `1.5px solid ${h ? c + '55' : C.b1}`,
        display: 'flex', gap: 12, alignItems: 'center',
        transition: 'all .22s', cursor: 'default', backdropFilter: 'blur(10px)',
        boxShadow: h ? `0 8px 28px ${c}18` : 'none',
      }}>
      <div style={{
        width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: `${c}18`, border: `1.5px solid ${c}40`, flexShrink: 0,
      }}>
        <Icon size={17} style={{ color: c }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{l}</p>
        <p style={{ fontSize: 11, color: C.muted }}>{sub}</p>
      </div>
      <span style={{
        fontSize: 10, color: c, background: `${c}18`, border: `1px solid ${c}40`,
        borderRadius: 5, padding: '2px 7px', fontWeight: 700, flexShrink: 0,
      }}>{tag}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — BATTERY STRATEGIES
// ═══════════════════════════════════════════════════════════════════════════════
function BatterySection() {
  const [sel, setSel] = useState(0);
  const modes = [
    { l: 'Ai Smart Charging', sub: '基于AI预测的全自动最优策略', c: C.violet, beta: true  },
    { l: 'Self-consumption',  sub: '光伏优先自用，剩余电量储能', c: C.blue,   beta: false },
    { l: 'Reserve Power',     sub: '保留指定备用电量应对断电',   c: '#8b5cf6', beta: false },
    { l: 'Custom Mode',       sub: '自定义充放时间和功率限制',   c: C.amber,   beta: false },
    { l: 'Off-grid Mode',     sub: '完全脱离电网独立运行',       c: C.green,   beta: false },
  ];

  return (
    <section style={{ padding: '60px 24px', background: `linear-gradient(180deg,${C.bg},#0d0730,${C.bg})` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="BATTERY STRATEGIES"
          title={<>灵活充放电策略，<span style={{ color: C.violet }}>随需而变</span></>}
          sub="5种预设策略 + 专利SOC算法，从全自动AI到完全自定义"
          mascot={aiSuitcase} mascotSize={90} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {modes.map((m, i) => (
                <button key={m.l} onClick={() => setSel(i)}
                  style={{
                    padding: '13px 17px', borderRadius: 13, cursor: 'pointer', textAlign: 'left',
                    background: sel === i ? `${m.c}16` : C.card,
                    border: `1.5px solid ${sel === i ? m.c + '65' : C.b1}`,
                    backdropFilter: 'blur(8px)', transition: 'all .22s',
                    boxShadow: sel === i ? `0 6px 24px ${m.c}1a` : 'none',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3 }}>
                    <motion.div
                      animate={{ scale: sel === i ? [1, 1.3, 1] : 1 }}
                      transition={{ duration: 1.5, repeat: sel === i ? Infinity : 0 }}
                      style={{ width: 9, height: 9, borderRadius: '50%', flexShrink: 0, background: sel === i ? m.c : C.dim }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 700, color: sel === i ? m.c : '#fff' }}>{m.l}</span>
                    {m.beta && (
                      <span style={{
                        fontSize: 9, color: C.violet, background: `${C.violet}14`,
                        border: `1px solid ${C.violet}40`, borderRadius: 4, padding: '1px 5px',
                      }}>BETA</span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: C.muted, marginLeft: 18 }}>{m.sub}</p>
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={.12}>
            <div style={{ background: C.card, border: `1px solid ${C.b1}`, borderRadius: 18, padding: '22px', backdropFilter: 'blur(14px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800 }}>SOC 规划曲线</p>
                  <p style={{ fontSize: 11, color: C.violet, marginTop: 2 }}>「三个和尚」专利算法</p>
                </div>
                <div style={{ padding: '4px 10px', borderRadius: 7, background: `${C.green}12`, border: `1px solid ${C.green}30` }}>
                  <p style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>省电率 +37%</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={175}>
                <AreaChart data={socData} margin={{ top: 4, right: 26, left: -22, bottom: 0 }}>
                  <defs key="defs">
                    <linearGradient id="bat-gSOC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.violet} stopOpacity={0.45} />
                      <stop offset="95%" stopColor={C.violet} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                  <XAxis key="x-axis" dataKey="t" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
                  <YAxis key="y-axis" domain={[0,100]} tick={{ fill: C.muted, fontSize: 9 }} axisLine={false}
                    tickLine={false} tickFormatter={(v: number) => `${v}%`} />
                  <Tooltip key="tooltip" content={<ChartTip />} />
                  <Area key="area" type="monotone" dataKey="s" name="SOC"
                    stroke={C.violet} strokeWidth={2.5} fill="url(#bat-gSOC)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 12 }}>
                {[
                  ['综合电价分析', C.amber], ['发电量预测', C.blue],
                  ['负载预测',    C.purple], ['物理约束保护', C.green],
                ].map(([l,c]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 9px',
                    borderRadius: 7, background: `${c}0c`, border: `1px solid ${c}22` }}>
                    <CheckCircle size={10} style={{ color: c as string, flexShrink: 0 }} />
                    <span style={{ fontSize: 11 }}>{l}</span>
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
// SECTION 8 — STATS + FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function StatsFooterSection() {
  return (
    <>
      <section style={{
        padding: '56px 24px',
        background: 'linear-gradient(135deg,rgba(124,58,237,0.18),rgba(139,92,246,0.10),rgba(0,212,255,0.08))',
        borderTop: `1px solid ${C.b1}`, borderBottom: `1px solid ${C.b1}`,
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <FadeIn style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
            gap: 16, textAlign: 'center',
          }}>
            {[
              { v: 200, s: '万+', l: '全球在网设备', sub: '覆盖 40+ 国家',    c: C.blue,   id: 'stats-dev' },
              { v: 5,   s: '亿+', l: '历史学习数据', sub: '每日持续增长',     c: C.violet, id: 'stats-data' },
              { v: 365, s: '天',  l: '持续自我学习', sub: 'AI 每天自动复盘',  c: C.cyan,   id: 'stats-evolve' },
              { v: 90,  s: '%',   l: '发电预测精度', sub: '行业领先水平',     c: C.green,  id: 'stats-acc' },
            ].map(m => (
              <div key={m.id} style={{ padding: '20px 14px' }}>
                <p style={{ fontSize: 'clamp(30px,4vw,50px)', fontWeight: 900, color: m.c, lineHeight: 1, marginBottom: 6 }}>
                  <Cnt target={m.v} suf={m.s} />
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{m.l}</p>
                <p style={{ fontSize: 11, color: C.muted }}>{m.sub}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* CTA footer */}
      <section style={{ padding: '72px 24px', background: C.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
            width: 700, height: 420, borderRadius: '50%',
            background: 'radial-gradient(ellipse,rgba(139,92,246,0.18) 0%,transparent 70%)',
            filter: 'blur(50px)',
          }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 660, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px',
              borderRadius: 20, marginBottom: 18, background: `${C.green}10`, border: `1px solid ${C.green}30` }}>
              <Star size={11} style={{ color: C.green }} />
              <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>2026Q3全球发布</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 14px', color: '#fff' }}>AI智慧能源<br /><span style={{
                backgroundImage: `linear-gradient(90deg, ${C.violet}, ${C.cyan})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>让储能更智能</span></h2>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 40px', borderRadius: 13, fontSize: 14, fontWeight: 600,
                  background: 'transparent', color: C.violet, cursor: 'pointer',
                  border: `1.5px solid ${C.violet}55`,
                }}>
                联系展会工作人员抢先体验
              </motion.button>
            </div>
          </FadeIn>

          <FadeIn delay={.22}>
            <div style={{
              marginTop: 60, paddingTop: 26, borderTop: `1px solid ${C.b1}`,
              display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                
                <div>
                  <p className="text-left" style={{ fontSize: 13, fontWeight: 700 }}>爱士惟 AISWEI</p>
                  <p style={{ fontSize: 10, color: C.muted }}>Intelligent Energy Management System</p>
                </div>
              </div>
              <p style={{ fontSize: 11, color: C.dim }}>© 2026 AISWEI Technology Co., Ltd.</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function EnergyPromoPage() {
  return (
    <div style={{
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      background: C.bg, color: '#fff', minWidth: 0,
    }}>
      <HeroSection />
      <AdvantagesSection />
      <AIWorkflowSection />
      <PowerDataSection />
      <AppShowcaseSection />
      <SystemSection />
      <BatterySection />
      <StatsFooterSection />
    </div>
  );
}
