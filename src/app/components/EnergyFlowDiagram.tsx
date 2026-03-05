import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Battery, Home, Zap, Globe, ArrowRight, ShieldCheck, Activity, Layers, Cpu } from 'lucide-react';
import aiMascot from 'figma:asset/ef15cb998ac14ceb75c23231e9e91a16512ce2ca.png';

const C = {
  bg: '#08051c',
  cyan: '#00d4ff',
  blue: '#3b82f6',
  violet: '#8b5cf6',
  green: '#10b981',
  amber: '#f59e0b',
  pink: '#f472b6',
  muted: 'rgba(255,255,255,0.45)',
  b1: 'rgba(139,92,246,0.20)',
  white: 'rgba(255,255,255,0.95)',
};

/* ── Refined Flow Path with Comet Effect ───────────────────────────────────── */
function FlowPath({
  path, color, active = true, reverse = false, id, speed = 4,
}: {
  path: string; color: string; active?: boolean; reverse?: boolean; id: string; speed?: number;
}) {
  const gId = `grad-${id}`;
  return (
    <g>
      <defs>
        <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="50%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      
      <path d={path} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.1} />
      <path d={path} fill="none" stroke={`url(#${gId})`} strokeWidth={2.5} strokeLinecap="round" strokeOpacity={active ? 0.5 : 0.05} />
      
      {active && [0, 1, 2].map(i => (
        <motion.circle key={i} r={2} fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
          <animateMotion
            dur={`${speed}s`}
            repeatCount="indefinite"
            begin={`${i * (speed / 3)}s`}
            keyPoints={reverse ? "1;0" : "0;1"}
            keyTimes="0;1"
            path={path}
          />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={`${speed}s`} repeatCount="indefinite" begin={`${i * (speed / 3)}s`} />
        </motion.circle>
      ))}
    </g>
  );
}

/* ── Minimal Floating Label ─────────────────────────────────────────────────── */
function PathLabel({ x, y, label, color, active }: { x: number; y: number; label: string; color: string; active?: boolean }) {
  return (
    <foreignObject x={x - 40} y={y - 12} width={80} height={24} style={{ pointerEvents: 'none' }}>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 20, background: 'rgba(8,5,28,0.6)', border: `1px solid ${color}40`, backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: 0.5 }}>{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </foreignObject>
  );
}

/* ── Modern Minimal Node ───────────────────────────────────────────────────── */
function FlowNode({
  x, y, w = 120, h = 120, icon: Icon, label, value, unit, color, isCenter = false, active = true
}: {
  x: number; y: number; w?: number; h?: number;
  icon: any; label: string; value: string; unit: string;
  color: string; isCenter?: boolean; active?: boolean;
}) {
  return (
    <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h} style={{ overflow: 'visible' }}>
      <div 
        style={{
          width: '100%', height: '100%', borderRadius: isCenter ? '32px' : '24px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: `1px solid ${active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'}`,
          backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.4s ease',
          boxShadow: active ? `0 8px 32px rgba(0,0,0,0.4), inset 0 0 20px ${color}05` : 'none',
        }}
      >
        {/* Subtle accent line on top */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '30%', height: 2, background: active ? color : 'rgba(255,255,255,0.1)', borderRadius: '0 0 2px 2px', opacity: 0.8 }} />

        {/* Icon Container - Clean & Airy */}
                <div style={{
          width: isCenter ? 64 : 40, height: isCenter ? 64 : 40,
          borderRadius: '50%', background: isCenter ? 'transparent' : `${color}10`,
          border: isCenter ? 'none' : `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 10,
          position: 'relative',
          boxShadow: (active && !isCenter) ? `0 0 15px ${color}15` : 'none',
        }}>
          {isCenter ? (
                        <motion.img 
              src={aiMascot} 
              alt="爱小惟"
              animate={{ y: [5, 1, 5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ 
                width: '140%', height: '140%', 
                objectFit: 'contain',
                filter: `drop-shadow(0 0 12px ${color}40)` 
              }} 
            />
          ) : (
            <Icon size={20} style={{ color: active ? color : 'rgba(255,255,255,0.3)' }} />
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', margin: 0, letterSpacing: 0.8, textTransform: 'uppercase'
          }}>{label}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginTop: 2 }}>
            <span style={{ fontSize: isCenter ? 22 : 18, fontWeight: 800, color: active ? '#fff' : 'rgba(255,255,255,0.4)', letterSpacing: -0.5 }}>{value}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginLeft: 2 }}>{unit}</span>
          </div>
        </div>
      </div>
    </foreignObject>
  );
}

/* ── Main Component ─────────────────────────────────────────────────────────── */
export function EnergyFlowDiagram() {
  const [tick, setTick] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const iv = setInterval(() => setTick(t => (t + 1) % 3), 7000);
    return () => clearInterval(iv);
  }, [isAuto]);

  const scenes = [
    {
      key: 'noon', label: '午间光伏', sub: '12:00',
      pv: '5.8', bat: '82', batFlow: '+3.2', load: '2.1', grid: '0.5',
      gridDir: 'export' as const, batStatus: '快速充电', gridStatus: '余电上网',
      desc: '光伏产量高峰，系统优先满足负载并为电池大功率充电。'
    },
    {
      key: 'peak', label: '晚峰放电', sub: '19:30',
      pv: '0.2', bat: '65', batFlow: '-4.8', load: '5.0', grid: '0.0',
      gridDir: 'idle' as const, batStatus: '高效放电', gridStatus: '零购电',
      desc: '用电高峰期，AI 决策由储能系统全额供电，规避高价电费。'
    },
    {
      key: 'valley', label: '低谷充电', sub: '02:00',
      pv: '0.0', bat: '28', batFlow: '+2.5', load: '0.6', grid: '3.1',
      gridDir: 'import' as const, batStatus: '谷价充电', gridStatus: '谷价购电',
      desc: '电价低谷期，系统自动从电网吸纳廉价电力，储备后续使用。'
    },
  ];
  
  const s = useMemo(() => scenes[tick], [tick]);

  const pvActive = parseFloat(s.pv) > 0;
  const gridActive = parseFloat(s.grid) > 0 || s.gridDir === 'export';
  const batCharging = s.batFlow.startsWith('+');

  const cx = 400, cy = 185;
  const pvPos  = { x: 100,  y: 70 };
  const batPos = { x: 100,  y: 300 };
  const loadPos = { x: 700, y: 70 };
  const gridPos = { x: 700, y: 300 };

  const pathPvToEms = `M ${pvPos.x + 60} ${pvPos.y} C ${cx - 80} ${pvPos.y}, ${cx - 80} ${cy}, ${cx - 60} ${cy}`;
  const pathEmsToBat = `M ${cx - 60} ${cy} C ${cx - 80} ${cy}, ${cx - 80} ${batPos.y}, ${batPos.x + 60} ${batPos.y}`;
  const pathEmsToLoad = `M ${cx + 60} ${cy} C ${cx + 80} ${cy}, ${cx + 80} ${loadPos.y}, ${loadPos.x - 60} ${loadPos.y}`;
  const pathEmsToGrid = `M ${cx + 60} ${cy} C ${cx + 80} ${cy}, ${cx + 80} ${gridPos.y}, ${gridPos.x - 60} ${gridPos.y}`;

  return (
    <div style={{
      borderRadius: 24, padding: '24px 28px',
      background: 'rgba(14,8,38,0.5)',
      border: `1px solid rgba(139,92,246,0.15)`,
      backdropFilter: 'blur(30px)',
      marginBottom: 32,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Dynamic Background Grid & Texture */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(circle at 2px 2px, ${C.violet}55 1.2px, transparent 0) 0 0 / 24px 24px,
            linear-gradient(to right, ${C.violet}22 1px, transparent 1px) 0 0 / 96px 96px,
            linear-gradient(to bottom, ${C.violet}22 1px, transparent 1px) 0 0 / 96px 96px
          `,
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
        }}
      >
        <motion.div 
          animate={{ y: ['-100%', '250%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            height: '40%', width: '100%',
            background: `linear-gradient(to bottom, transparent, ${C.violet}08, transparent)`,
            borderBottom: `1px solid ${C.violet}22`,
          }}
        />
      </motion.div>

      {/* Decorative Glow Orbs */}
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 300, height: 300,
        background: `radial-gradient(circle, ${C.violet}15 0%, transparent 70%)`,
        filter: 'blur(60px)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: -150, left: -100, width: 400, height: 400,
        background: `radial-gradient(circle, ${C.blue}10 0%, transparent 70%)`,
        filter: 'blur(80px)', pointerEvents: 'none'
      }} />

      {/* Header Area */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20, position: 'relative', zIndex: 10
      }}>
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: -0.2 }}>
            实时能量流调控
          </h4>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: 1 }}>Real-time Energy Management</p>
        </div>

        {/* Repositioned & Redesigned Scene Control */}
        <div style={{
          display: 'flex', gap: 4, padding: 3, borderRadius: 12,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {scenes.map((sc, i) => (
            <button 
              key={sc.key} 
              onClick={() => { setTick(i); setIsAuto(false); }}
              style={{
                padding: '6px 14px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontSize: 10, fontWeight: 700, transition: 'all 0.3s ease',
                background: tick === i ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: tick === i ? '#fff' : 'rgba(255,255,255,0.4)',
                boxShadow: tick === i ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagram View */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '800 / 360' }}>
        <svg viewBox="0 0 800 360" width="100%" height="100%" style={{ overflow: 'visible' }}>
          {/* Subtle Ambient Rings */}
          <circle cx={cx} cy={cy} r={80} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
          <circle cx={cx} cy={cy} r={110} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth={1} strokeDasharray="4 8" />

          {/* Flow Paths */}
          <FlowPath id="pv-ems" path={pathPvToEms} color={C.green} active={pvActive} />
          <FlowPath id="ems-bat" path={pathEmsToBat} color={C.violet} active reverse={!batCharging} />
          <FlowPath id="ems-load" path={pathEmsToLoad} color={C.amber} active />
          <FlowPath id="ems-grid" path={pathEmsToGrid} color={C.blue} active={gridActive} reverse={s.gridDir === 'import'} />

          {/* Path Labels */}
          <PathLabel x={220} y={100} label={`${s.pv} kW`} color={C.green} active={pvActive} />
          <PathLabel x={220} y={270} label={`${s.batFlow} kW`} color={C.violet} active />
          <PathLabel x={580} y={100} label={`${s.load} kW`} color={C.amber} active />
          <PathLabel x={580} y={270} label={`${s.grid} kW`} color={C.blue} active={gridActive} />

          {/* Nodes */}
          <FlowNode x={pvPos.x} y={pvPos.y} icon={Sun} label="光伏阵列" value={s.pv} unit="kW" color={C.green} active={pvActive} />
          <FlowNode x={batPos.x} y={batPos.y} icon={Battery} label="储能电池" value={s.bat} unit="%" color={C.violet} />
          <FlowNode x={loadPos.x} y={loadPos.y} icon={Home} label="家庭负载" value={s.load} unit="kW" color={C.amber} />
          <FlowNode x={gridPos.x} y={gridPos.y} icon={Globe} label="公共电网" value={s.grid} unit="kW" color={C.blue} active={gridActive} />
          <FlowNode x={cx} y={cy} w={130} h={130} icon={Cpu} label="EMS 调度中心" value="AI" unit="智能" color={C.cyan} isCenter />
        </svg>

        {/* Dynamic Scenario Description - Floating bottom left */}
        <AnimatePresence mode="wait">
                    <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              position: 'absolute', top: '78%', left: 'calc(50% - 166px)', transform: 'translateX(-50%)', 
              width: '100%', maxWidth: 340,
              padding: '12px 20px', borderRadius: 16,
              background: 'rgba(139,92,246,0.04)', 
              border: '1px solid rgba(139,92,246,0.1)',
              backdropFilter: 'blur(12px)',
              textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              zIndex: 20
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, justifyContent: 'center' }}>
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }} 
              />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>{s.label} · {s.sub}</span>
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0, maxWidth: 280 }}>
              {s.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Metrics */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 48,
        marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        {[
          { label: '自给自足率', val: tick === 0 ? '98%' : tick === 1 ? '100%' : '15%', icon: ShieldCheck, c: C.green },
          { label: '实时电价', val: tick === 2 ? '€0.05' : '€0.24', icon: Zap, c: C.amber },
          { label: '累计收益', val: '+€12.4', icon: Layers, c: C.cyan },
        ].map(m => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <m.icon size={14} style={{ color: m.c, opacity: 0.8 }} />
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase' }}>{m.label}</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: 0 }}>{m.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
