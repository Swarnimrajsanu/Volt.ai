import { motion } from 'framer-motion';
import { Code2, Cpu, Eye, Layers, MessageSquare, Terminal } from 'lucide-react';

const codeLines = [
    { text: 'import { OpenAI } from "openai";', color: '#c084fc' },
    { text: 'import { createServer } from "express";', color: '#38bdf8' },
    { text: '', color: '' },
    { text: 'const app = createServer();', color: '#f9fafb' },
    { text: 'const ai = new OpenAI({ apiKey });', color: '#f9fafb' },
    { text: '', color: '' },
    { text: 'app.post("/generate", async (req, res) => {', color: '#22d3ee' },
    { text: '  const { prompt } = req.body;', color: '#94a3b8' },
    { text: '  const result = await ai.chat({', color: '#94a3b8' },
    { text: '    model: "gpt-4-turbo",', color: '#fbbf24' },
    { text: '    messages: [{ role: "user", content: prompt }]', color: '#fbbf24' },
    { text: '  });', color: '#94a3b8' },
    { text: '  res.json({ code: result });', color: '#34d399' },
    { text: '});', color: '#22d3ee' },
];

const chatMessages = [
    { role: 'user', text: 'Create a dashboard with user auth and analytics' },
    { role: 'ai', text: 'I\'ll set up a Next.js app with NextAuth, Prisma ORM, and Chart.js for analytics. Here\'s the architecture...' },
    { role: 'user', text: 'Add Stripe billing integration' },
    { role: 'ai', text: 'Adding Stripe checkout, customer portal, and webhook handlers. Generating billing components...' },
];

export default function DemoSection() {
    return (
        <section id="demo" className="relative" style={{ padding: '120px 0' }}>
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                    style={{ marginBottom: 56 }}
                >
                    <h2 className="gradient-text-hero font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16 }}>
                        AI Workspace
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>
                        Your complete AI-powered development environment.
                    </p>
                </motion.div>

                {/* Demo Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-strong glow-md"
                    style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between" style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div style={{ width: 10, height: 10, borderRadius: 999, background: '#ef4444' }} />
                                <div style={{ width: 10, height: 10, borderRadius: 999, background: '#f59e0b' }} />
                                <div style={{ width: 10, height: 10, borderRadius: 999, background: '#22c55e' }} />
                            </div>
                            <span className="text-xs text-gray-600 ml-3">volt-workspace</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                <Cpu className="w-3 h-3" />
                                <span>GPT-4 Turbo</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#22c55e' }}>
                                <div style={{ width: 6, height: 6, borderRadius: 999, background: '#22c55e' }} />
                                Connected
                            </div>
                        </div>
                    </div>

                    {/* Panels */}
                    <div className="grid lg:grid-cols-3" style={{ minHeight: 380 }}>
                        {/* AI Chat Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}
                        >
                            <div className="flex items-center gap-2" style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <MessageSquare className="w-3.5 h-3.5" style={{ color: '#8b5cf6' }} />
                                <span className="text-xs font-medium text-gray-400">AI Chat</span>
                            </div>
                            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {chatMessages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: 12,
                                            fontSize: '0.78rem',
                                            lineHeight: 1.6,
                                            ...(msg.role === 'user'
                                                ? { background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)', color: '#c4b5fd', marginLeft: 20 }
                                                : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#94a3b8', marginRight: 20 }),
                                        }}
                                    >
                                        {msg.text}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Generated Code Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}
                        >
                            <div className="flex items-center gap-2" style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <Code2 className="w-3.5 h-3.5" style={{ color: '#38bdf8' }} />
                                <span className="text-xs font-medium text-gray-400">Generated Code</span>
                                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: 'rgba(34,211,238,0.08)', color: '#22d3ee', marginLeft: 'auto' }}>server.ts</span>
                            </div>
                            <div style={{ padding: '12px 16px', fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}>
                                {codeLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                                        className="flex"
                                        style={{ fontSize: '0.72rem', lineHeight: 1.8 }}
                                    >
                                        <span className="select-none" style={{ width: 28, textAlign: 'right', color: '#334155', marginRight: 16 }}>{i + 1}</span>
                                        <span style={{ color: line.color || '#64748b' }}>{line.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Live Preview Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="flex items-center gap-2" style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <Eye className="w-3.5 h-3.5" style={{ color: '#22c55e' }} />
                                <span className="text-xs font-medium text-gray-400">Live Preview</span>
                                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e', marginLeft: 'auto' }}>
                                    <Layers className="w-2.5 h-2.5 inline mr-1" />
                                    localhost:3000
                                </span>
                            </div>
                            <div style={{ padding: 20 }}>
                                {/* Mock preview content */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    {/* Nav mock */}
                                    <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                                        <div style={{ width: 60, height: 6, borderRadius: 3, background: 'rgba(139,92,246,0.3)' }} />
                                        <div className="flex gap-2">
                                            <div style={{ width: 36, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }} />
                                            <div style={{ width: 36, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }} />
                                            <div style={{ width: 36, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }} />
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3" style={{ gap: 8, marginBottom: 16 }}>
                                        {['#8b5cf6', '#3b82f6', '#06b6d4'].map((c, i) => (
                                            <div key={i} style={{ padding: 10, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                                <div style={{ width: 20, height: 4, borderRadius: 2, background: c, marginBottom: 8, opacity: 0.6 }} />
                                                <div style={{ width: '100%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.04)', marginBottom: 4 }} />
                                                <div style={{ width: '60%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.03)' }} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart mock */}
                                    <div style={{ padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                        <div style={{ width: 50, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', marginBottom: 12 }} />
                                        <div className="flex items-end" style={{ gap: 4, height: 60 }}>
                                            {[30, 50, 35, 70, 45, 85, 55, 90, 65, 75, 80, 95].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: 0.7 + i * 0.04 }}
                                                    style={{
                                                        flex: 1,
                                                        borderRadius: 2,
                                                        background: `linear-gradient(180deg, ${i > 8 ? '#8b5cf6' : '#3b82f6'}40, ${i > 8 ? '#8b5cf6' : '#3b82f6'}15)`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Table mock */}
                                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className="flex gap-3" style={{ padding: '6px 0' }}>
                                                <div style={{ width: 8, height: 8, borderRadius: 4, background: ['#8b5cf6', '#3b82f6', '#22c55e'][i], marginTop: 1, opacity: 0.5 }} />
                                                <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.04)' }} />
                                                <div style={{ width: 30, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }} />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Terminal mock */}
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '8px 16px' }}>
                                <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
                                    <Terminal className="w-3 h-3" style={{ color: '#22c55e' }} />
                                    <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#22c55e' }}>$ </span>
                                    <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#64748b' }}>Server running on port 3000 ✓</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
