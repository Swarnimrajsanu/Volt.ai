import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const templates = [
    { title: 'SaaS Dashboard', description: 'Auth, analytics, billing, team management', image: '/images/template-saas.png', tag: 'Popular' },
    { title: 'AI Chatbot', description: 'LLM integration, memory, streaming responses', image: '/images/template-chatbot.png', tag: 'New' },
    { title: 'Startup Landing', description: 'Hero, features, pricing, waitlist signup', image: '/images/template-saas.png', tag: '' },
    { title: 'E-commerce Store', description: 'Stripe, products, cart, inventory management', image: '/images/template-ecommerce.png', tag: '' },
    { title: 'Portfolio', description: 'Projects, blog, contact form, dark mode', image: '/images/template-chatbot.png', tag: '' },
];

function TiltTemplateCard({ template, index }: { template: typeof templates[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
            className="tilt-card"
        >
            <div className="glass glow-border overflow-hidden cursor-pointer group h-full" style={{ borderRadius: 20 }}>
                {/* Image */}
                <div className="overflow-hidden relative" style={{ height: 180 }}>
                    <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(2,0,16,0.9))' }} />
                    {template.tag && (
                        <div
                            className="absolute text-[10px] font-semibold px-2.5 py-1 rounded-full"
                            style={{
                                top: 12, right: 12,
                                background: template.tag === 'New' ? 'rgba(6,182,212,0.15)' : 'rgba(139,92,246,0.15)',
                                color: template.tag === 'New' ? '#22d3ee' : '#c4b5fd',
                                border: `1px solid ${template.tag === 'New' ? 'rgba(6,182,212,0.2)' : 'rgba(139,92,246,0.2)'}`,
                            }}
                        >
                            {template.tag}
                        </div>
                    )}
                </div>
                {/* Text */}
                <div style={{ padding: '18px 22px 22px' }}>
                    <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors" style={{ fontSize: '1.05rem', marginBottom: 6 }}>
                        {template.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>{template.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function TemplatesSection() {
    return (
        <section id="templates" className="relative" style={{ padding: '120px 0' }}>
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex items-end justify-between flex-wrap"
                    style={{ marginBottom: 48, gap: 16 }}
                >
                    <div>
                        <h2 className="gradient-text-hero font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 12 }}>
                            Smart Templates
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 400 }}>
                            AI-optimized starter projects that adapt to your vision.
                        </p>
                    </div>
                    <a href="#" className="flex items-center gap-2 text-sm font-medium transition-all hover:gap-3" style={{ color: '#a78bfa' }}>
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" style={{ gap: 18 }}>
                    {templates.map((template, i) => (
                        <TiltTemplateCard key={template.title} template={template} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
