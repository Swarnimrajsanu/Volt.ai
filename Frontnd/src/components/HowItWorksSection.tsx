import { motion } from 'framer-motion';
import { Cpu, MessageSquare, Rocket } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: MessageSquare,
        title: 'Describe Your Idea',
        description: 'Type your app idea in plain English. Be as detailed or as simple as you want — our AI understands context.',
        gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    },
    {
        number: '02',
        icon: Cpu,
        title: 'AI Generates Your App',
        description: 'Our AI builds the complete application — frontend, backend, database schemas, and API routes — all at once.',
        gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    },
    {
        number: '03',
        icon: Rocket,
        title: 'Edit & Deploy Instantly',
        description: 'Customize the generated code with an in-browser editor. One click to deploy to production.',
        gradient: 'linear-gradient(135deg, #06b6d4, #14b8a6)',
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="relative" style={{ padding: '120px 0' }}>
            {/* Background */}
            <div
                className="absolute rounded-full"
                style={{
                    top: '50%', right: 0, width: 500, height: 500,
                    background: 'rgba(59,130,246,0.04)', filter: 'blur(150px)',
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
                    <span className="text-sm font-medium tracking-wider uppercase" style={{ color: '#06b6d4' }}>
                        How It Works
                    </span>
                    <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 16, marginBottom: 20 }}>
                        Three steps to{' '}
                        <span className="gradient-text">launch</span>
                    </h2>
                    <p className="text-gray-400 mx-auto" style={{ maxWidth: 600, fontSize: '1.1rem' }}>
                        From idea to deployed app in under a minute. No boilerplate, no configuration headaches.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative" style={{ maxWidth: 900, margin: '0 auto' }}>
                    {/* Connecting line */}
                    <div
                        className="hidden md:block absolute"
                        style={{
                            left: '50%', top: 0, bottom: 0, width: 1,
                            background: 'linear-gradient(to bottom, rgba(168,85,247,0.3), rgba(59,130,246,0.3), rgba(6,182,212,0.3))',
                        }}
                    />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            style={{ gap: 32, marginBottom: i < steps.length - 1 ? 64 : 0 }}
                        >
                            {/* Card */}
                            <div className="flex-1 glass-card card-gradient-border" style={{ padding: 32 }}>
                                <div className="relative">
                                    {/* Step number watermark */}
                                    <span
                                        className="absolute font-black"
                                        style={{
                                            top: -8, left: -4,
                                            fontSize: '4rem', color: 'rgba(255,255,255,0.02)',
                                        }}
                                    >
                                        {step.number}
                                    </span>

                                    <div className="relative z-10">
                                        <div
                                            className="flex items-center justify-center"
                                            style={{
                                                width: 48, height: 48, borderRadius: 14,
                                                background: step.gradient,
                                                marginBottom: 20,
                                            }}
                                        >
                                            <step.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-white font-bold" style={{ fontSize: '1.4rem', marginBottom: 12 }}>
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-400" style={{ lineHeight: 1.7 }}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Center dot */}
                            <div
                                className="hidden md:flex shrink-0 z-10"
                                style={{
                                    width: 20, height: 20, borderRadius: 999,
                                    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                                    border: '4px solid #030014',
                                }}
                            />

                            {/* Spacer for alternating layout */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
