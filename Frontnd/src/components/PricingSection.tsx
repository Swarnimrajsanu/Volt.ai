import { motion } from 'framer-motion';
import { Building2, Check, Sparkles, Zap } from 'lucide-react';

const plans = [
    {
        name: 'Free',
        icon: Zap,
        price: '$0',
        period: '',
        description: 'For side projects and learning',
        features: ['3 Projects', 'Community Support', 'Basic AI Models', 'Shared Infrastructure'],
        cta: 'Get Started Free',
        highlighted: false,
    },
    {
        name: 'Pro',
        icon: Sparkles,
        price: '$29',
        period: '/mo',
        badge: 'Most Popular',
        description: 'For professionals and indie hackers',
        features: ['Unlimited Projects', 'Priority AI Models', 'Custom Domains', 'Advanced Analytics', 'API Access', 'Priority Support'],
        cta: 'Start Free Trial',
        highlighted: true,
    },
    {
        name: 'Team',
        icon: Building2,
        price: '$99',
        period: '/mo',
        description: 'For teams building at scale',
        features: ['Everything in Pro', 'Team Workspaces', 'SSO & RBAC', 'SLA Guarantee', 'Dedicated Support', 'Custom Integrations'],
        cta: 'Contact Sales',
        highlighted: false,
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="relative" style={{ padding: '120px 0' }}>
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
                        Simple Pricing
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: 440, margin: '0 auto' }}>
                        Start free. Scale when you're ready.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 mx-auto" style={{ gap: 20, maxWidth: 1000 }}>
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            whileHover={{ y: -6 }}
                            className={`relative flex flex-col ${plan.highlighted ? 'animated-border' : ''}`}
                            style={{
                                padding: 32,
                                borderRadius: 24,
                                background: plan.highlighted
                                    ? 'rgba(139,92,246,0.04)'
                                    : 'rgba(255,255,255,0.02)',
                                border: plan.highlighted
                                    ? 'none'
                                    : '1px solid rgba(255,255,255,0.05)',
                                ...(plan.highlighted
                                    ? { boxShadow: '0 0 60px rgba(139,92,246,0.08), 0 0 120px rgba(59,130,246,0.04)' }
                                    : {}),
                            }}
                        >
                            {/* Badge */}
                            {plan.highlighted && plan.badge && (
                                <div
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-semibold px-4 py-1.5 rounded-full"
                                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', color: '#fff' }}
                                >
                                    <Sparkles className="w-3 h-3" />
                                    {plan.badge}
                                </div>
                            )}

                            {/* Icon + Name */}
                            <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                                <div
                                    className="flex items-center justify-center"
                                    style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: plan.highlighted ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${plan.highlighted ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)'}`,
                                    }}
                                >
                                    <plan.icon className="w-4 h-4" style={{ color: plan.highlighted ? '#a78bfa' : '#64748b' }} />
                                </div>
                                <h3 className="text-white font-semibold" style={{ fontSize: '1.1rem' }}>{plan.name}</h3>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-1" style={{ marginBottom: 8 }}>
                                <span className="text-white font-extrabold" style={{ fontSize: '2.8rem', letterSpacing: '-0.02em' }}>{plan.price}</span>
                                {plan.period && <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{plan.period}</span>}
                            </div>

                            <p style={{ color: '#4b5563', fontSize: '0.85rem', marginBottom: 28 }}>{plan.description}</p>

                            {/* Features */}
                            <ul className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
                                        <Check className="w-4 h-4 shrink-0" style={{ color: plan.highlighted ? '#8b5cf6' : '#06b6d4' }} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                className="w-full font-semibold text-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    padding: '14px 0',
                                    borderRadius: 14,
                                    ...(plan.highlighted
                                        ? { background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', color: '#fff', border: 'none', boxShadow: '0 8px 30px rgba(139,92,246,0.2)' }
                                        : { background: 'rgba(255,255,255,0.03)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.06)' }),
                                }}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
