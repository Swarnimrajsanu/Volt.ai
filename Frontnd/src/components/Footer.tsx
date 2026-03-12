import { Github, Linkedin, Twitter, Zap } from 'lucide-react';

const footerLinks = [
    { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Changelog', 'API'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Resources', links: ['Documentation', 'Community', 'Support', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
];

export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="section-container" style={{ paddingTop: 64, paddingBottom: 32 }}>
                <div className="grid grid-cols-2 md:grid-cols-6" style={{ gap: 40, marginBottom: 48 }}>
                    {/* Brand */}
                    <div className="col-span-2">
                        <a href="#" className="flex items-center gap-2" style={{ marginBottom: 14 }}>
                            <div className="flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
                                <Zap className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-base font-bold gradient-text">Volt.ai</span>
                        </a>
                        <p style={{ color: '#334155', fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
                            The next-generation AI platform for building production-ready applications at superhuman speed.
                        </p>
                        <div className="flex items-center" style={{ gap: 10 }}>
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    style={{
                                        width: 32, height: 32, borderRadius: 8,
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.04)',
                                        color: '#475569',
                                    }}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569', marginBottom: 16 }}>
                                {group.title}
                            </h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {group.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-xs transition-colors hover:text-gray-300" style={{ color: '#4b5563' }}>
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
                    style={{ paddingTop: 24, gap: 12, borderTop: '1px solid rgba(255,255,255,0.03)' }}
                >
                    <p style={{ color: '#1e293b', fontSize: '0.75rem' }}>
                        © {new Date().getFullYear()} Volt.ai. All rights reserved.
                    </p>
                    <div className="flex items-center" style={{ gap: 16 }}>
                        <a href="#" className="text-xs transition-colors hover:text-gray-400" style={{ color: '#1e293b' }}>Privacy</a>
                        <a href="#" className="text-xs transition-colors hover:text-gray-400" style={{ color: '#1e293b' }}>Terms</a>
                        <a href="#" className="text-xs transition-colors hover:text-gray-400" style={{ color: '#1e293b' }}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
