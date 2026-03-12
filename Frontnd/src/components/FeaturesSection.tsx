import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bug, Code2, LayoutTemplate, Mic, Rocket, Users2 } from 'lucide-react';
import { useRef } from 'react';

const features = [
    { icon: Code2, title: 'AI App Generation', description: 'Transform natural language prompts into production-ready full-stack applications with intelligent code synthesis.', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
    { icon: Rocket, title: 'Instant Deployment', description: 'One-click deployment to global edge networks. Your app goes live the moment it\'s ready for the world.', gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
    { icon: Bug, title: 'AI Debugging', description: 'Intelligent error detection that identifies, explains, and automatically fixes bugs in real-time as you build.', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
    { icon: Mic, title: 'Voice to Code', description: 'Speak your ideas naturally. Our AI converts conversations into structured, clean, production-ready code.', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' },
    { icon: Users2, title: 'Real-time Collaboration', description: 'Build together in real-time. Share workspaces, see live cursors, and co-edit AI prompts simultaneously.', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { icon: LayoutTemplate, title: 'Smart Templates', description: 'AI-curated starter templates that adapt to your tech stack and project requirements automatically.', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
];

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
            className="tilt-card"
        >
            {children}
        </motion.div>
    );
}

export default function FeaturesSection() {
    return (
        <section id="features" className="relative" style={{ padding: '120px 0' }}>
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                    style={{ marginBottom: 64 }}
                >
                    <h2 className="gradient-text-hero font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16 }}>
                        Powerful Features
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>
                        Everything you need to ship production-ready applications at superhuman speed.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
                    {features.map((feature, i) => (
                        <TiltCard key={feature.title} index={i}>
                            <div
                                className="glass glow-border h-full cursor-pointer group"
                                style={{ padding: 32, borderRadius: 20, transition: 'background 0.3s ease' }}
                            >
                                {/* Icon */}
                                <div
                                    className="flex items-center justify-center group-hover:scale-110 transition-transform duration-400"
                                    style={{ width: 48, height: 48, borderRadius: 14, background: feature.gradient, marginBottom: 24 }}
                                >
                                    <feature.icon className="w-5 h-5 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-white font-semibold" style={{ fontSize: '1.15rem', marginBottom: 12 }}>
                                    {feature.title}
                                </h3>

                                {/* Desc */}
                                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                    {feature.description}
                                </p>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
