import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CTASection() {
    return (
        <section style={{ padding: '80px 0' }}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="cta-card text-center"
                    style={{ padding: '80px 32px' }}
                >
                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="gradient-text-hero font-bold"
                            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16 }}
                        >
                            Ready to Build the Future?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="mx-auto"
                            style={{ color: '#64748b', maxWidth: 500, fontSize: '1.05rem', marginBottom: 40 }}
                        >
                            Join thousands of developers building the next generation of
                            AI-powered applications with Volt.ai.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center justify-center flex-wrap"
                            style={{ gap: 14 }}
                        >
                            <a
                                href="#hero"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
                            >
                                Start Building
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                <MessageSquare className="w-4 h-4" />
                                Talk to Team
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
