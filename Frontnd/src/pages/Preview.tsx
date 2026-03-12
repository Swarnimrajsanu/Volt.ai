import { motion } from 'framer-motion';
import { 
    ChevronLeft, 
    Code2, 
    ExternalLink, 
    FileCode, 
    Folder, 
    Globe, 
    Layers, 
    Layout, 
    Monitor, 
    Play, 
    Rocket, 
    Settings, 
    Share2, 
    Smartphone 
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const files = [
    { name: 'App.tsx', type: 'file', active: true },
    { name: 'components/', type: 'folder', children: [
        { name: 'Navbar.tsx', type: 'file' },
        { name: 'Dashboard.tsx', type: 'file' },
        { name: 'Analytics.tsx', type: 'file' },
    ]},
    { name: 'styles/', type: 'folder', children: [
        { name: 'theme.css', type: 'file' },
    ]},
    { name: 'package.json', type: 'file' },
];

export default function Preview() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

    return (
        <div className="flex h-screen overflow-hidden bg-[#020010] text-white">
            {/* Sidebar */}
            <motion.aside 
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                className="w-64 border-r border-white/5 bg-[#05031a]/50 backdrop-blur-3xl flex flex-col z-20"
            >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <Layers className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-sm">Volt.ai</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-6">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Project Files</p>
                        <div className="space-y-1">
                            {files.map((file, i) => (
                                <div key={i}>
                                    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${file.active ? 'bg-white/5 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                        {file.type === 'folder' ? <Folder className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
                                        {file.name}
                                    </button>
                                    {file.children && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {file.children.map((child, j) => (
                                                <button key={j} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors text-gray-500 hover:text-white">
                                                    <FileCode className="w-3.5 h-3.5 opacity-50" />
                                                    {child.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <Settings className="w-4 h-4" />
                        Project Settings
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative">
                {/* Navbar */}
                <header className="h-16 border-b border-white/5 bg-[#05031a]/50 backdrop-blur-3xl px-6 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="h-4 w-px bg-white/10" />
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-400">Project / </span>
                            <span className="text-sm font-semibold text-white">CloudDashboard</span>
                            <div className="ml-2 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-bold uppercase tracking-wider">Production</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5 mr-4">
                            <button 
                                onClick={() => setViewMode('desktop')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => setViewMode('mobile')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all">
                            <Rocket className="w-4 h-4" />
                            Deploy
                        </button>
                    </div>
                </header>

                {/* Viewport Area */}
                <div className="flex-1 bg-[#020010] p-8 overflow-y-auto relative">
                    {/* Floating Background Effects */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className={`mx-auto transition-all duration-700 ease-out h-full ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-6xl'}`}>
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden h-full flex flex-col"
                        >
                            {/* Browser Bar */}
                            <div className="bg-zinc-800/50 px-4 py-3 flex items-center gap-4">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                                </div>
                                <div className="flex-1 bg-black/20 rounded-lg px-3 py-1 text-xs text-gray-500 flex items-center gap-2">
                                    <Globe className="w-3 h-3" />
                                    cloud-dashboard-volt.vercel.app
                                </div>
                                <div className="flex gap-2">
                                    <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
                                </div>
                            </div>

                            {/* App Canvas */}
                            <div className="flex-1 bg-white overflow-y-auto text-black p-10 font-sans">
                                {/* MOCKED GENERATED APP UI */}
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex items-center justify-between mb-12">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                                                <Layout className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-xl font-bold tracking-tight">CloudDash</h2>
                                        </div>
                                        <div className="flex gap-6 text-sm font-medium text-gray-500">
                                            <span>Dashboard</span>
                                            <span>Analytics</span>
                                            <span>Team</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6 mb-12">
                                        {[
                                            { label: 'Active Users', value: '12.4k', change: '+12%', color: 'purple' },
                                            { label: 'Cloud Usage', value: '84%', change: '+5%', color: 'blue' },
                                            { label: 'Efficiency', value: '96.2%', change: '+2%', color: 'emerald' },
                                        ].map((stat, i) => (
                                            <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-bold">{stat.value}</span>
                                                    <span className={`text-xs font-bold text-${stat.color}-600`}>{stat.change}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="rounded-3xl bg-gray-900 p-8 text-white relative overflow-hidden mb-12">
                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-bold mb-2">Build Your Next Idea</h3>
                                            <p className="text-gray-400 text-sm mb-6 max-w-sm">Scale your infrastructure instantly with our AI-driven orchestration engine.</p>
                                            <button className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-bold flex items-center gap-2">
                                                <Play className="w-4 h-4 fill-current" />
                                                Get Started
                                            </button>
                                        </div>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                                    </div>

                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="font-bold text-lg">Recent Deployments</h4>
                                        <button className="text-sm font-bold text-purple-600">View All</button>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((_, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <Code2 className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm">Feature/authentication-flow</p>
                                                        <p className="text-xs text-gray-400">Deployed 2 hours ago by AI Agent</p>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">Success</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
