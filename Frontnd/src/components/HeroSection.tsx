import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import FloatingScene from './FloatingScene';

export default function HeroSection() {
    const [prompt, setPrompt] = useState('');

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        try {
            const res = await fetch('/api/template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            console.log('Template response:', data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <section
            id="hero"
            className="relative overflow-hidden"
            style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}
        >
            {/* Background effects */}
            <div className="absolute inset-0 animated-gradient-bg" />
            <div
                className="absolute rounded-full"
                style={{
                    top: '20%', left: '20%', width: 400, height: 400,
                    background: 'rgba(168,85,247,0.08)', filter: 'blur(120px)',
                }}
            />
            <div
                className="absolute rounded-full"
                style={{
                    bottom: '20%', right: '20%', width: 400, height: 400,
                    background: 'rgba(59,130,246,0.08)', filter: 'blur(120px)',
                }}
            />

            <div className="relative z-10 section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text + Prompt */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="glass-card inline-flex items-center gap-2 mb-8"
                            style={{ padding: '6px 16px', borderRadius: 999 }}
                        >
                            <Sparkles className="w-3.5 h-3.5" style={{ color: '#a855f7' }} />
                            <span className="text-xs font-medium text-gray-300">Powered by AI — Ship 10x Faster</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-extrabold leading-tight tracking-tight"
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: 24 }}
                        >
                            Build Full-Stack
                            <br />
                            Apps with{' '}
                            <span className="gradient-text">AI</span>
                            <br />
                            in Seconds
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-gray-400"
                            style={{ fontSize: '1.125rem', marginBottom: 40, maxWidth: 480, lineHeight: 1.7 }}
                        >
                            Describe your idea and watch AI generate your entire application.
                            Frontend, backend, database — all in one prompt.
                        </motion.p>

                        {/* Prompt Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                            className="glass-card-strong glow-purple"
                            style={{ padding: 8, maxWidth: 560, borderRadius: 20 }}
                        >
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                    placeholder="Build a SaaS dashboard with auth and Stripe"
                                    className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none"
                                    style={{ padding: '14px 20px' }}
                                />
                                <button
                                    onClick={handleGenerate}
                                    className="rounded-xl font-semibold text-sm text-white hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer"
                                    style={{
                                        padding: '14px 24px',
                                        background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                                    }}
                                >
                                    Generate App
                                </button>
                            </div>
                        </motion.div>

                        {/* Secondary CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center gap-6"
                            style={{ marginTop: 24 }}
                        >
                            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group cursor-pointer">
                                <div
                                    className="glass-card flex items-center justify-center group-hover:bg-white/10 transition-colors"
                                    style={{ width: 40, height: 40, borderRadius: 999 }}
                                >
                                    <Play className="w-4 h-4" style={{ color: '#06b6d4' }} />
                                </div>
                                Watch Demo
                            </button>
                            <span className="text-xs text-gray-600">No credit card required</span>
                        </motion.div>
                    </div>

                    {/* Right: 3D Scene */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:block"
                        style={{ height: 500 }}
                    >
                        <FloatingScene />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
