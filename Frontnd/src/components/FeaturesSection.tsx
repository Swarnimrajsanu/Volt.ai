import { motion } from 'framer-motion';
import {
    Bug,
    Code2,
    LayoutGrid,
    Mic,
    Rocket,
    Users,
} from 'lucide-react';

const features = [
    {
        icon: Code2,
        title: 'AI Code Generation',
        description: 'Generate production-ready code from natural language. Full-stack apps in seconds.',
        gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    },
    {
        icon: Rocket,
        title: 'Instant Deployment',
        description: 'One-click deploy to production. Your app goes live the moment it\'s built.',
        gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    },
    {
        icon: Bug,
        title: 'Smart Debugging',
        description: 'AI identifies and fixes bugs automatically. Ship with confidence every time.',
        gradient: 'linear-gradient(135deg, #06b6d4, #14b8a6)',
    },
    {
        icon: Mic,
        title: 'Voice to Code',
        description: 'Speak your ideas and watch them transform into working applications.',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    },
    {
        icon: Users,
        title: 'Real-time Collaboration',
        description: 'Build together with your team. Live cursors, shared editing, instant sync.',
        gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
    },
    {
        icon: LayoutGrid,
        title: 'Template Marketplace',
        description: 'Start from beautiful templates. Customize everything to match your vision.',
        gradient: 'linear-gradient(135deg, #10b981, #22c55e)',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function FeaturesSection() {
    return (
        <section id="features" className="relative" style={{ padding: '120px 0' }}>
            {/* Background glow */}
            <div
                className="absolute rounded-full"
                style={{
                    top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 800, height: 400,
                    background: 'rgba(168,85,247,0.04)', filter: 'blur(150px)',
                }}
            />

            <div className="relative z-10 section-container">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                    style={{ marginBottom: 80 }}
                >
                    <span className="text-sm font-medium tracking-wider uppercase" style={{ color: '#a855f7' }}>
                        Features
                    </span>
                    <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 16, marginBottom: 20 }}>
                        Everything you need to{' '}
                        <span className="gradient-text">build faster</span>
                    </h2>
                    <p className="text-gray-400 mx-auto" style={{ maxWidth: 600, fontSize: '1.1rem' }}>
                        Powerful AI tools that transform how you build software. From idea to deployment in minutes.
                    </p>
                </motion.div>

                {/* Feature grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3"
                    style={{ gap: 24 }}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="glass-card card-gradient-border cursor-pointer group"
                            style={{ padding: 32 }}
                        >
                            {/* Icon */}
                            <div
                                className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{
                                    width: 48, height: 48, borderRadius: 14,
                                    background: feature.gradient,
                                    marginBottom: 24,
                                }}
                            >
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Text */}
                            <h3 className="text-white font-semibold" style={{ fontSize: '1.2rem', marginBottom: 12 }}>
                                {feature.title}
                            </h3>
                            <p className="text-gray-400" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                                {feature.description}
                            </p>

                            {/* Hover arrow */}
                            <div className="flex items-center gap-2 text-gray-500 group-hover:text-purple-400 transition-colors" style={{ marginTop: 24, fontSize: '0.875rem' }}>
                                Learn more
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
