import image_da4241a2f3e1dd03ad6cad70bfe24f03f4f55566 from 'figma:asset/da4241a2f3e1dd03ad6cad70bfe24f03f4f55566.png'
import image_884d0da43e1af3de06785479fa6a34e314b3fa97 from 'figma:asset/884d0da43e1af3de06785479fa6a34e314b3fa97.png'
import image_76858f61b844be55a1d5cf648c4658fba082b731 from 'figma:asset/76858f61b844be55a1d5cf648c4658fba082b731.png'
import image_f32c4282db4bfaa6d468e347d72b58e45ce0e5f3 from 'figma:asset/f32c4282db4bfaa6d468e347d72b58e45ce0e5f3.png'
import aiHead     from 'figma:asset/864d664a8fcb7235c7b1fc63fc4de5c9292f1deb.png';
import aiWave     from 'figma:asset/ecd7dd39bd2d0f0ec8c8d683850b8c170e18324b.png';
import aiTablet   from 'figma:asset/9cd38438fdc57b1afabb2e7fd386157be84b08da.png';
import aiSuitcase from 'figma:asset/fea78b3cce09a877eeb8e2067c538a4a047b102a.png';
import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'motion/react';
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

const rwData = [
  { t:'0',  fg:0.3, fb:0,   fp:0,   pv:0,    bc:0,    s:38, pd:40 },
  { t:'2',  fg:0.2, fb:0,   fp:0,   pv:0,    bc:0,    s:35, pd:36 },
  { t:'4',  fg:0.3, fb:0,   fp:0,   pv:0,    bc:-1.2, s:65, pd:67 },
  { t:'6',  fg:0.1, fb:0,   fp:0.4, pv:-0.4, bc:0,    s:70, pd:69 },
  { t:'8',  fg:0,   fb:0,   fp:1.8, pv:-2.8, bc:-1.0, s:74, pd:76 },
  { t:'10', fg:0,   fb:0,   fp:2.0, pv:-4.5, bc:-2.0, s:88, pd:87 },
  { t:'12', fg:0,   fb:0,   fp:2.2, pv:-5.5, bc:-2.2, s:90, pd:90 },
  { t:'14', fg:0,   fb:2.5, fp:2.0, pv:-4.2, bc:0,    s:82, pd:82 },
  { t:'16', fg:0,   fb:3.5, fp:2.0, pv:-2.0, bc:0,    s:66, pd:65 },
  { t:'18', fg:0,   fb:4.2, fp:0.4, pv:-0.2, bc:0,    s:40, pd:38 },
  { t:'20', fg:0.5, fb:2.5, fp:0.2, pv:0,    bc:0,    s:20, pd:20 },
  { t:'22', fg:1.0, fb:0,   fp:0,   pv:0,    bc:0,    s:16, pd:16 },
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
        <p key={i} style={{ color: d.color, fontSize: 10, margin: '2px 0' }}>{d.name}: <strong>{d.value}</strong></p>
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
          <div style={{
            height: 22, background: 'rgba(0,0,0,0.7)', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', padding: '0 12px',
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
          }}>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>9:41</span>
            <div style={{ width: 48, height: 10, borderRadius: 5, background: '#111', border: '1.5px solid rgba(255,255,255,0.2)', margin: '0 auto' }} />
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>●●●</span>
          </div>
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
    { c: C.amber,  l: '低谷补电', s: '03:20 — ¥5/kWh',  note: '自动从电网低价充电' },
    { c: C.violet, l: '光伏充储', s: '10:00 — PV 4.5kW', note: '盈余电量智能存储'   },
    { c: C.pink,   l: '高峰放电', s: '16:30 — ¥32/kWh',  note: '零取电网，自给自足' },
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
          position: 'absolute', inset: 0, opacity: 0.18,
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.12) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, marginLeft: -50 }}>
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
              { v: 200, s: '万+', l: '在网设备',     c: C.blue   },
              { v: 5,   s: '亿+', l: '历史学习数据', c: C.violet },
              { v: 365, s: '天',  l: '持续学习进化', c: C.cyan   },
            ].map(m => (
              <div key={m.l} style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 800, color: m.c, lineHeight: 1 }}>
                  <Cnt target={m.v} suf={m.s} />
                </p>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{m.l}</p>
              </div>
            ))}
          </motion.div>

          {/* AI scenario pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .58 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {steps.map((s, i) => (
              <motion.div key={s.l}
                animate={{ opacity: aiStep === i ? 1 : 0.35, scale: aiStep === i ? 1.04 : 1 }}
                transition={{ duration: .3 }}
                style={{
                  padding: '10px 16px', borderRadius: 13, textAlign: 'left',
                  marginLeft: 20,
                  background: aiStep === i ? `${s.c}18` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${aiStep === i ? s.c + '60' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: aiStep === i ? `0 0 20px ${s.c}22` : 'none',
                  transition: 'border-color .3s, background .3s, box-shadow .3s',
                }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: s.c, marginBottom: 2 }}>{s.l}</p>
                <p style={{ fontSize: 10, color: C.muted }}>{s.s}</p>
                <p style={{ fontSize: 10, color: '#fff', marginTop: 2 }}>{s.note}</p>
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
    { c: C.green,  time: '03:20', label: '🌙 低谷自动补充', desc: 'AI识别低谷（¥5/kWh），提前充电至最优容量' },
    { c: C.amber,  time: '10:00–13:10', label: '☀️ 光伏优先储能', desc: 'PV峰值 4.5kW，多余电量全数存入电池备用' },
    { c: C.pink,   time: '16:30–19:50', label: '⚡ 高峰零取电网', desc: '电价达¥32/kWh，100% 由电池供电完全避峰' },
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
// SECTION 4 — POWER CHART + REAL DATA
// ═══════════════════════════════════════════════════════════════════════════════
function PowerDataSection() {
  return (
    <section style={{ padding: '60px 24px', background: C.bg }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="POWER DATA" title="每一度电，精打细算"
          sub="AI 5曲线联合决策，24小时智能调度，最大化储能收益" />

        {/* Day chart */}
        <FadeIn>
          <div style={{
            background: C.card, border: `1px solid ${C.b1}`, borderRadius: 20,
            padding: '24px', backdropFilter: 'blur(14px)', marginBottom: 20,
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 16px', marginBottom: 16 }}>
              {[
                { c: C.amber,  fill: true,  l: 'PV 发电 (kW)' },
                { c: C.pink,   fill: true,  l: '电网补充 (kW)' },
                { c: C.cyan,   fill: true,  l: '电池充电 (kW)' },
                { c: '#22d3ee',fill: false, dash: true, l: '电价 (¢/kWh)' },
              ].map(g => (
                <div key={g.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 18, height: 2.5,
                    background: g.fill ? `${g.c}cc` : 'transparent',
                    borderTop: !g.fill ? `2px ${(g as any).dash ? 'dashed' : 'solid'} ${g.c}` : 'none',
                    borderRadius: 1,
                  }} />
                  <span style={{ fontSize: 11, color: C.muted }}>{g.l}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <ComposedChart data={powerDayData} margin={{ top: 4, right: 36, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="ep-gPV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.amber} stopOpacity={0.55} />
                    <stop offset="95%" stopColor={C.amber} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="ep-gGrid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.pink}  stopOpacity={0.5} />
                    <stop offset="95%" stopColor={C.pink}  stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="ep-gBat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.cyan}  stopOpacity={0.4} />
                    <stop offset="95%" stopColor={C.cyan}  stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
                <YAxis yAxisId="L" domain={[0,6]} tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="R" orientation="right" domain={[0,100]} tick={{ fill: C.muted, fontSize: 9 }}
                  axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} />
                <Tooltip content={<ChartTip />} />
                <ReferenceArea yAxisId="L" x1="02:00" x2="05:00" fill="rgba(16,185,129,0.07)"  stroke="rgba(16,185,129,0.25)"  strokeWidth={1} />
                <ReferenceArea yAxisId="L" x1="10:00" x2="14:00" fill="rgba(139,92,246,0.07)"  stroke="rgba(139,92,246,0.25)"  strokeWidth={1} />
                <ReferenceArea yAxisId="L" x1="16:30" x2="19:50" fill="rgba(244,114,182,0.07)" stroke="rgba(244,114,182,0.28)" strokeWidth={1} />
                <Area yAxisId="L" type="monotone" dataKey="pv"   name="PV发电"  stroke={C.amber} strokeWidth={2}   fill="url(#ep-gPV)"   dot={false} />
                <Area yAxisId="L" type="monotone" dataKey="grid" name="电网补充" stroke={C.pink}  strokeWidth={1.5} fill="url(#ep-gGrid)" dot={false} />
                <Area yAxisId="L" type="monotone" dataKey="bat"  name="电池充电" stroke={C.cyan}  strokeWidth={1.5} fill="url(#ep-gBat)"  dot={false} />
                <Line  yAxisId="R" type="monotone" dataKey="soc"   name="SoC%"  stroke="#f97316" strokeWidth={2}   dot={false} />
                <Line  yAxisId="R" type="monotone" dataKey="price" name="电价"   stroke="#22d3ee" strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14, flexWrap: 'wrap' }}>
              {[
                { l: '🌙 低谷补电',  sub: '03:20–05:00 · 电价低谷自动充电', c: '#10b981' },
                { l: '☀️ 光伏充储',  sub: '10:00–13:10 · PV高峰优先自充',  c: C.amber  },
                { l: '⚡ 高峰零取电', sub: '16:30–19:50 · 电池放电避高价',  c: C.pink   },
              ].map(a => (
                <div key={a.l} style={{
                  textAlign: 'center', padding: '8px 16px', borderRadius: 9,
                  background: `${a.c}0a`, border: `1px solid ${a.c}28`,
                }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: a.c }}>{a.l}</p>
                  <p style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Real World Results */}
        <FadeIn delay={0.1}>
          <div style={{
            background: C.card, border: `1px solid ${C.b1}`, borderRadius: 20,
            padding: '24px', backdropFilter: 'blur(14px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>真实设备数据 · 德国用户全天能源流向</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px',
                borderRadius: 7, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
                <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>LM008K · 4kWh · 2024-06-03</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={rwData} margin={{ top: 4, right: 44, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="ep-gRWPV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.06} />
                  </linearGradient>
                  <linearGradient id="ep-gRWBC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.blue} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={C.blue} stopOpacity={0.06} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="L" domain={[-6, 7]} tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => v === 0 ? '0' : `${Math.abs(v)}kW`} />
                <YAxis yAxisId="R" orientation="right" domain={[0, 100]} tick={{ fill: C.muted, fontSize: 9 }}
                  axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip content={<ChartTip />} />
                <Area yAxisId="L" type="monotone" dataKey="pv" name="PV发电" baseValue={0}
                  stroke="#10b981" strokeWidth={2} fill="url(#ep-gRWPV)" dot={false} />
                <Area yAxisId="L" type="monotone" dataKey="bc" name="电池充电" baseValue={0}
                  stroke={C.blue} strokeWidth={1.5} fill="url(#ep-gRWBC)" dot={false} />
                <Bar yAxisId="L" dataKey="fg" stackId="up" name="电网供电" fill={C.amber}  opacity={0.88} maxBarSize={14} />
                <Bar yAxisId="L" dataKey="fb" stackId="up" name="电池放电" fill={C.blue} opacity={0.88} maxBarSize={14} />
                <Bar yAxisId="L" dataKey="fp" stackId="up" name="PV供电"  fill={C.green} opacity={0.88} maxBarSize={14} />
                <Line yAxisId="R" type="monotone" dataKey="s"  name="实测SOC" stroke="rgba(226,232,240,0.9)" strokeWidth={2}
                  dot={{ r: 2, fill: '#e2e8f0', strokeWidth: 0 }} />
                <Line yAxisId="R" type="monotone" dataKey="pd" name="预测SOC" stroke={C.violet} strokeWidth={2} strokeDasharray="5 3" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
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
    <section style={{ padding: '60px 24px', background: `linear-gradient(180deg,${C.bg} 0%,#0d0730 50%,${C.bg} 100%)` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SecHead badge="MOBILE APP" title={<>随时随地，<span style={{ color: C.violet }}>掌控能源</span></>}
          sub="功能完整的 App，让复杂的能源管理一目了然"
          mascot={aiTablet} mascotSize={90} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28, justifyItems: 'center', marginBottom: 36 }}>
          <PhoneFrame src={appImg2} title="实时能量流向" index={0} glow={C.violet}
            desc="10秒刷新：PV发电、电池SOC、用电负载一览无余" />
          <PhoneFrame src={appImg1} title="AI 充放电策略" index={1} glow={C.cyan}
            desc="5种充放电模式一键切换，AI Smart模式全自动优化" />
          <PhoneFrame src={appImg3} title="发电量统计" index={2} glow={C.amber}
            desc="日/周/月/年多维分析，掌握每度电的去向与收益" />
        </div>

        <FadeIn delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 16, alignItems: 'center' }}>
            <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}
              style={{ borderRadius: 16, overflow: 'hidden', position: 'relative',
                boxShadow: `0 8px 36px rgba(139,92,246,0.25), 0 0 0 1px rgba(139,92,246,0.18)` }}>
              <img src={image_da4241a2f3e1dd03ad6cad70bfe24f03f4f55566} alt="用电情况" style={{ width: '100%', display: 'block', borderRadius: 16 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px',
                background: 'linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 100%)', borderRadius: '0 0 16px 16px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>🌙 夜间储能模式 · 电池65%</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}
              style={{ borderRadius: 16, overflow: 'hidden', position: 'relative',
                boxShadow: `0 8px 36px rgba(16,185,129,0.2), 0 0 0 1px rgba(16,185,129,0.18)` }}>
              <img src={image_76858f61b844be55a1d5cf648c4658fba082b731} alt="发电情况" style={{ width: '100%', display: 'block', borderRadius: 16 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px',
                background: 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 100%)', borderRadius: '0 0 16px 16px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>☀️ 实时发电 15 kW · 光伏峰值</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}
              style={{ width: 150, borderRadius: 22, overflow: 'hidden', flexShrink: 0,
                boxShadow: `0 8px 36px rgba(245,158,11,0.22), 0 0 0 1px rgba(245,158,11,0.18)` }}>
              <img src={image_884d0da43e1af3de06785479fa6a34e314b3fa97} alt="动态电价" style={{ width: '100%', display: 'block' }} />
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

// ═══════════════════════════════════════════════════════════════════════════════
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

        {/* Devices grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginBottom: 24 }}>
          {devices.map((d, i) => (
            <FadeIn key={d.l} delay={i * .07}>
              <DeviceCard {...d} />
            </FadeIn>
          ))}
        </div>

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
                  <defs>
                    <linearGradient id="ep-gSOC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.violet} stopOpacity={0.45} />
                      <stop offset="95%" stopColor={C.violet} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                  <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
                  <YAxis domain={[0,100]} tick={{ fill: C.muted, fontSize: 9 }} axisLine={false}
                    tickLine={false} tickFormatter={v=>`${v}%`} />
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="s" name="SOC"
                    stroke={C.violet} strokeWidth={2.5} fill="url(#ep-gSOC)" dot={false} />
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
              { v: 200, s: '万+', l: '全球在网设备', sub: '覆盖 40+ 国家',    c: C.blue   },
              { v: 5,   s: '亿+', l: '历史学习数据', sub: '每日持续增长',     c: C.violet },
              { v: 365, s: '天',  l: '持续自我学习', sub: 'AI 每天自动复盘',  c: C.cyan   },
              { v: 90,  s: '%',   l: '发电预测精度', sub: '行业领先水平',     c: C.green  },
            ].map(m => (
              <div key={m.l} style={{ padding: '20px 14px' }}>
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
                whileHover={{ scale: 1.03, boxShadow: `0 12px 40px ${C.violet}50` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 40px', borderRadius: 13, fontSize: 14, fontWeight: 700,
                  background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: '#fff', border: 'none',
                  cursor: 'pointer', boxShadow: `0 8px 32px ${C.violet}35`,
                }}>
                立即申请演示 →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 40px', borderRadius: 13, fontSize: 14, fontWeight: 600,
                  background: 'transparent', color: C.violet, cursor: 'pointer',
                  border: `1.5px solid ${C.violet}55`,
                }}>
                联系销售团队
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
