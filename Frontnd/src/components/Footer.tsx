import { Github, Twitter, Zap } from 'lucide-react';

const footerLinks = [
    {
        title: 'Product',
        links: ['Features', 'Templates', 'Pricing', 'Changelog'],
    },
    {
        title: 'Resources',
        links: ['Documentation', 'API Reference', 'Blog', 'Community'],
    },
    {
        title: 'Company',
        links: ['About', 'Careers', 'Contact', 'Privacy'],
    },
];

export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="section-container" style={{ paddingTop: 64, paddingBottom: 64 }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5" style={{ gap: 48 }}>
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <a href="#" className="flex items-center gap-2" style={{ marginBottom: 16 }}>
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: 32, height: 32, borderRadius: 10,
                                    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                                }}
                            >
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold gradient-text">Volt.ai</span>
                        </a>
                        <p className="text-gray-500 text-sm" style={{ maxWidth: 280, lineHeight: 1.7, marginBottom: 24 }}>
                            Build full-stack applications with AI. From idea to production in seconds.
                        </p>
                        <div className="flex items-center" style={{ gap: 12 }}>
                            <a
                                href="#"
                                className="flex items-center justify-center text-gray-500 hover:text-white transition-all glass-card"
                                style={{ width: 36, height: 36, borderRadius: 10 }}
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center text-gray-500 hover:text-white transition-all glass-card"
                                style={{ width: 36, height: 36, borderRadius: 10 }}
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Link groups */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h4 className="text-white text-sm font-semibold" style={{ marginBottom: 16 }}>
                                {group.title}
                            </h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {group.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div
                    className="flex flex-col sm:flex-row justify-between items-center"
                    style={{
                        marginTop: 64, paddingTop: 32, gap: 16,
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} Volt.ai. All rights reserved.
                    </p>
                    <div className="flex items-center" style={{ gap: 24 }}>
                        <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</a>
                        <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy</a>
                        <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
