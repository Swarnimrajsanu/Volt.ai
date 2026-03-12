import { motion } from 'framer-motion';

const steps = [
    {
        number: '1',
        title: 'Describe Your Vision',
        description: 'Use natural English to describe your application: views, its features, and storage constraints.',
        color: '#a855f7',
    },
    {
        number: '2',
        title: 'AI Generates Infrastructure',
        description: 'Our AI creates the frontend, APIs, and responsive frontend components instantly.',
        color: '#3b82f6',
    },
    {
        number: '3',
        title: 'Review & Deploy',
        description: 'Make quick changes in your live app, then deploy your app to a live & global edge network.',
        color: '#06b6d4',
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" style={{ padding: '100px 0' }}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 60 }}
                >
                    <h2 className="text-white font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: 16 }}>
                        From Concept to Live in Minutes
                    </h2>
                </motion.div>

                {/* Two-column: Steps Left, Mockup Right */}
                <div className="grid lg:grid-cols-2 items-center" style={{ gap: 60 }}>
                    {/* Left: Steps */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="flex"
                                style={{ gap: 20 }}
                            >
                                {/* Number circle */}
                                <div
                                    className="shrink-0 flex items-center justify-center text-white font-bold"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 999,
                                        background: step.color,
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    {step.number}
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="text-white font-semibold" style={{ fontSize: '1.15rem', marginBottom: 8 }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Product Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <img
                            src="/images/product-mockup.png"
                            alt="Product mockup"
                            style={{
                                width: '100%',
                                borderRadius: 16,
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
