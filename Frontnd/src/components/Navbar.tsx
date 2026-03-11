import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Templates', href: '#templates' },
    { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-navbar shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="section-container flex items-center justify-between" style={{ height: '72px' }}>
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div
                        className="flex items-center justify-center rounded-xl"
                        style={{
                            width: 36,
                            height: 36,
                            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                        }}
                    >
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">Volt.ai</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                        Sign In
                    </a>
                    <a
                        href="#hero"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                        }}
                    >
                        Get Started
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-gray-400 hover:text-white"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden glass-navbar"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                    <div className="px-6 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#hero"
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white text-center"
                            style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
                        >
                            Get Started
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
