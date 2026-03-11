import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for trying out Volt.ai',
        features: [
            '3 projects per month',
            'Basic AI code generation',
            'Community templates',
            'Standard support',
        ],
        cta: 'Get Started',
        highlighted: false,
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'For professionals building production apps',
        features: [
            'Unlimited projects',
            'Advanced AI models',
            'Custom templates',
            'Priority support',
            'Team collaboration',
            'Custom domains',
        ],
        cta: 'Start Pro Trial',
        highlighted: true,
    },
    {
        name: 'Team',
        price: '$79',
        period: '/month',
        description: 'For teams that build together',
        features: [
            'Everything in Pro',
            'Up to 10 team members',
            'Admin dashboard',
            'SSO & audit logs',
            'Dedicated support',
            'SLA guarantee',
        ],
        cta: 'Contact Sales',
        highlighted: false,
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function PricingSection() {
    return (
        <section id="pricing" className="relative" style={{ padding: '120px 0' }}>
            <div
                className="absolute rounded-full"
                style={{
                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 800, height: 600,
                    background: 'rgba(168,85,247,0.04)', filter: 'blur(180px)',
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
                    <span className="text-sm font-medium tracking-wider uppercase" style={{ color: '#a855f7' }}>
                        Pricing
                    </span>
                    <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 16, marginBottom: 20 }}>
                        Simple,{' '}
                        <span className="gradient-text">transparent</span>{' '}
                        pricing
                    </h2>
                    <p className="text-gray-400 mx-auto" style={{ maxWidth: 600, fontSize: '1.1rem' }}>
                        Start free and scale as you grow. No hidden fees, cancel anytime.
                    </p>
                </motion.div>

                {/* Pricing cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 mx-auto"
                    style={{ gap: 24, maxWidth: 960 }}
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="relative overflow-hidden"
                            style={{ borderRadius: 20 }}
                        >
                            {/* Highlighted top bar */}
                            {plan.highlighted && (
                                <div
                                    className="absolute top-0 left-0 right-0"
                                    style={{
                                        height: 2,
                                        background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
                                    }}
                                />
                            )}

                            <div
                                className="flex flex-col h-full"
                                style={{
                                    padding: 32,
                                    borderRadius: 20,
                                    background: plan.highlighted ? 'rgba(168,85,247,0.06)' : 'rgba(255,255,255,0.03)',
                                    border: plan.highlighted
                                        ? '1px solid rgba(168,85,247,0.3)'
                                        : '1px solid rgba(255,255,255,0.06)',
                                    boxShadow: plan.highlighted
                                        ? '0 0 40px rgba(168,85,247,0.1), 0 0 80px rgba(168,85,247,0.05)'
                                        : 'none',
                                }}
                            >
                                {/* Badge */}
                                {plan.highlighted && (
                                    <div
                                        className="inline-flex items-center gap-1.5 text-xs font-medium w-fit"
                                        style={{
                                            padding: '4px 12px', borderRadius: 999, marginBottom: 24,
                                            background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
                                            color: '#a855f7',
                                        }}
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        Most Popular
                                    </div>
                                )}

                                {/* Plan info */}
                                <h3 className="text-white font-semibold" style={{ fontSize: '1.2rem' }}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1" style={{ marginTop: 16, marginBottom: 8 }}>
                                    <span className="text-white font-extrabold" style={{ fontSize: '3rem' }}>
                                        {plan.price}
                                    </span>
                                    <span className="text-gray-400 text-sm">{plan.period}</span>
                                </div>
                                <p className="text-gray-400 text-sm" style={{ marginBottom: 32 }}>
                                    {plan.description}
                                </p>

                                {/* Features */}
                                <ul className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                                            <Check className="w-4 h-4 shrink-0" style={{ color: '#06b6d4', marginTop: 2 }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    className="w-full font-semibold text-sm cursor-pointer transition-all duration-300"
                                    style={{
                                        padding: '14px 0',
                                        borderRadius: 14,
                                        ...(plan.highlighted
                                            ? {
                                                background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                                                color: '#fff',
                                                border: 'none',
                                            }
                                            : {
                                                background: 'rgba(255,255,255,0.04)',
                                                color: '#fff',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                            }),
                                    }}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
