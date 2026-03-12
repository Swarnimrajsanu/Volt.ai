import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                background: scrolled ? 'rgba(2,0,16,0.88)' : 'rgba(2,0,16,0.4)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                transition: 'background 0.4s ease, border-bottom 0.4s ease',
            }}
        >
            <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

                {/* Logo */}
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }} className="group">
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                        }}
                        className="group-hover:shadow-lg group-hover:shadow-purple-500/25 group-hover:scale-105"
                    >
                        <Zap className="w-[18px] h-[18px] text-white" />
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }} className="gradient-text">Volt.ai</span>
                </a>

                {/* Desktop Center Nav Links */}
                <div className="hidden md:flex" style={{ display: undefined, alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: '4px 6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            style={{
                                padding: '8px 18px',
                                fontSize: 14,
                                fontWeight: 500,
                                color: 'rgba(156, 163, 175, 1)',
                                textDecoration: 'none',
                                borderRadius: 10,
                                transition: 'all 0.3s ease',
                                letterSpacing: '-0.01em',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(156, 163, 175, 1)';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Desktop Right Actions */}
                <div className="hidden md:flex" style={{ display: undefined, alignItems: 'center', gap: 12 }}>
                    <a
                        href="#"
                        style={{
                            padding: '8px 18px',
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'rgba(156, 163, 175, 1)',
                            textDecoration: 'none',
                            borderRadius: 10,
                            border: '1px solid rgba(255,255,255,0.08)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(156, 163, 175, 1)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        Sign In
                    </a>
                    <a
                        href="#hero"
                        style={{
                            padding: '9px 22px',
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: 10,
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 20px rgba(139, 92, 246, 0.25), 0 0 40px rgba(59, 130, 246, 0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.25), 0 0 40px rgba(59, 130, 246, 0.1)';
                        }}
                    >
                        Get Started
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden"
                    style={{
                        color: 'rgba(156, 163, 175, 1)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 10,
                        padding: 8,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden"
                        style={{
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(2,0,16,0.95)',
                        }}
                    >
                        <div className="section-container" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        padding: '12px 16px',
                                        fontSize: 15,
                                        fontWeight: 500,
                                        color: 'rgba(156, 163, 175, 1)',
                                        textDecoration: 'none',
                                        borderRadius: 10,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
                            <a
                                href="#"
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    padding: '12px 16px',
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: 'rgba(156, 163, 175, 1)',
                                    textDecoration: 'none',
                                    borderRadius: 10,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Sign In
                            </a>
                            <a
                                href="#hero"
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    padding: '12px 16px',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: '#fff',
                                    textDecoration: 'none',
                                    borderRadius: 12,
                                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                                    textAlign: 'center',
                                    marginTop: 4,
                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.25)',
                                }}
                            >
                                Get Started
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
