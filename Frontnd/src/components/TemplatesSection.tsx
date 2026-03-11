import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const templates = [
    {
        title: 'SaaS Dashboard',
        description: 'Analytics, user management, billing integration',
        borderColor: 'rgba(168,85,247,0.3)',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    },
    {
        title: 'AI Chatbot',
        description: 'Conversational AI with memory and custom training',
        borderColor: 'rgba(59,130,246,0.3)',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    },
    {
        title: 'Startup Landing Page',
        description: 'Beautiful, conversion-optimized landing pages',
        borderColor: 'rgba(6,182,212,0.3)',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    },
    {
        title: 'E-commerce Store',
        description: 'Full shopping cart, payments, and inventory',
        borderColor: 'rgba(236,72,153,0.3)',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    },
    {
        title: 'Portfolio Website',
        description: 'Showcase your work with stunning animations',
        borderColor: 'rgba(245,158,11,0.3)',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function TemplatesSection() {
    return (
        <section id="templates" className="relative" style={{ padding: '120px 0' }}>
            <div
                className="absolute rounded-full"
                style={{
                    bottom: 0, left: '25%', width: 600, height: 400,
                    background: 'rgba(6,182,212,0.04)', filter: 'blur(150px)',
                }}
            />

            <div className="relative z-10 section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                    style={{ marginBottom: 80 }}
                >
                    <span className="text-sm font-medium tracking-wider uppercase" style={{ color: '#3b82f6' }}>
                        Templates
                    </span>
                    <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 16, marginBottom: 20 }}>
                        Start with a{' '}
                        <span className="gradient-text">template</span>
                    </h2>
                    <p className="text-gray-400 mx-auto" style={{ maxWidth: 600, fontSize: '1.1rem' }}>
                        Beautiful, production-ready templates to jumpstart your next project.
                    </p>
                </motion.div>

                {/* Template grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3"
                    style={{ gap: 24 }}
                >
                    {templates.map((template) => (
                        <motion.div
                            key={template.title}
                            variants={cardVariants}
                            whileHover={{ y: -8, rotateY: 3, rotateX: 2 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="group"
                            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                        >
                            <div
                                className="overflow-hidden transition-colors duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${template.borderColor}`,
                                    borderRadius: 20,
                                }}
                            >
                                {/* Thumbnail */}
                                <div className="relative overflow-hidden" style={{ height: 180 }}>
                                    <img
                                        src={template.image}
                                        alt={template.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        style={{ opacity: 0.6 }}
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(to top, #030014, transparent)',
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div style={{ padding: 24 }}>
                                    <h3 className="text-white font-semibold" style={{ fontSize: '1.1rem', marginBottom: 8 }}>
                                        {template.title}
                                    </h3>
                                    <p className="text-gray-400" style={{ fontSize: '0.875rem', marginBottom: 20 }}>
                                        {template.description}
                                    </p>
                                    <button className="flex items-center gap-2 text-sm font-medium cursor-pointer group/btn transition-colors" style={{ color: '#a855f7' }}>
                                        Use Template
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
