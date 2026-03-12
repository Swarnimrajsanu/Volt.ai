import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const [prompt, setPrompt] = useState('');
    const [focused, setFocused] = useState(false);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim() || loading) return;
        setLoading(true);

        try {
            const res = await fetch('/api/template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();

            // Navigate to builder with the prompt and template data
            navigate('/builder', {
                state: {
                    prompt,
                    prompts: data.prompts || [],
                },
            });
        } catch (err) {
            console.error('Error:', err);
            setLoading(false);
        }
    };

    return (
        <section id="hero" className="relative" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80 }}>
            <div className="relative z-10 section-container w-full">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex justify-center"
                    style={{ marginBottom: 36 }}
                >
                    <div
                        className="inline-flex items-center gap-2 animate-pulse-glow"
                        style={{
                            padding: '8px 20px',
                            borderRadius: 999,
                            background: 'rgba(139,92,246,0.08)',
                            border: '1px solid rgba(139,92,246,0.15)',
                            fontSize: '0.8rem',
                            color: '#c4b5fd',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                        }}
                    >
                        <Sparkles className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
                        NEXT-GENERATION AI DEVELOPMENT
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35 }}
                    className="text-center font-extrabold gradient-text-hero leading-[1.1] tracking-tight"
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', marginBottom: 24, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}
                >
                    Turn Ideas Into
                    <br />
                    Apps Instantly
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="text-center mx-auto"
                    style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}
                >
                    Describe your vision. Watch AI architect your entire
                    application — frontend, backend, database, and deployment
                    — in seconds.
                </motion.p>

                {/* Prompt Input */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.65 }}
                    className="mx-auto"
                    style={{ maxWidth: 640 }}
                >
                    <div
                        className={`prompt-input flex items-center ${focused ? 'glow-md' : ''}`}
                        style={{ borderRadius: 18, padding: '6px 6px 6px 24px' }}
                    >
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                            placeholder="Build a real-time collaborative dashboard with AI chat..."
                            className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none"
                            style={{ padding: '14px 0' }}
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="shrink-0 flex items-center gap-2 text-[13px] font-semibold text-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait disabled:hover:scale-100"
                            style={{
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                                borderRadius: 14,
                                border: 'none',
                            }}
                        >
                            {loading ? 'Starting...' : 'Generate'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Under prompt — trust + demo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="flex items-center justify-center flex-wrap"
                        style={{ marginTop: 20, gap: 24 }}
                    >
                        <div className="flex items-center gap-2 text-xs" style={{ color: '#64748b' }}>
                            <div className="flex -space-x-1.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="rounded-full"
                                        style={{
                                            width: 22, height: 22,
                                            border: '2px solid #020010',
                                            background: ['#8b5cf6', '#3b82f6', '#06b6d4', '#ec4899'][i],
                                        }}
                                    />
                                ))}
                            </div>
                            <Users className="w-3 h-3" />
                            19k+ developers building
                        </div>
                        <span style={{ color: '#334155' }}>•</span>
                        <button className="text-xs hover:text-gray-300 transition-colors cursor-pointer" style={{ color: '#64748b' }}>
                            Watch demo →
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
