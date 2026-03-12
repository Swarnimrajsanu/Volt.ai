import { motion } from 'framer-motion';
import { Bot, ChevronLeft, Code, Database, Globe, Loader2, Sparkles, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
    { icon: <Bot className="w-5 h-5" />, text: 'Analyzing requirements...', duration: 2000 },
    { icon: <Terminal className="w-5 h-5" />, text: 'Architecting system structure...', duration: 3000 },
    { icon: <Database className="w-5 h-5" />, text: 'Designing database schema...', duration: 2500 },
    { icon: <Code className="w-5 h-5" />, text: 'Generating smart components...', duration: 4000 },
    { icon: <Globe className="w-5 h-5" />, text: 'Optimizing deployment strategy...', duration: 2000 },
];

export default function Generate() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentStep < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, steps[currentStep].duration);
            return () => clearTimeout(timer);
        }
    }, [currentStep]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 0.5;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => {
                navigate('/preview');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [progress, navigate]);

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col" style={{ background: '#020010' }}>
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
            </div>

            {/* Header */}
            <header className="relative z-20 flex items-center justify-between p-6 md:p-10">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Dashboard
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-white tracking-tight">Volt.ai</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full text-center"
                >
                    <div className="mb-8 flex flex-col items-center">
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                className="w-32 h-32 rounded-full border-2 border-dashed border-purple-500/30"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20"
                                >
                                    <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 gradient-text-hero">
                        {currentStep < steps.length ? 'Building Your Vision' : 'Preparation Complete'}
                    </h1>
                    
                    <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                        Our AI agents are collaborating to architect your application with enterprise-grade quality.
                    </p>

                    {/* Progress Bar Container */}
                    <div className="w-full max-w-xl mx-auto mb-16 px-4">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                            />
                        </div>
                        <div className="flex justify-between mt-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            <span>Initializing core</span>
                            <span>{Math.round(progress)}% Optimized</span>
                        </div>
                    </div>

                    {/* Status Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-md mx-auto w-full">
                        {steps.map((step, index) => {
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ 
                                        opacity: isActive || isCompleted ? 1 : 0.3, 
                                        x: 0,
                                        scale: isActive ? 1.02 : 1
                                    }}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                                        isActive 
                                            ? 'bg-white/5 border-purple-500/40 shadow-lg shadow-purple-500/10' 
                                            : isCompleted 
                                                ? 'bg-transparent border-white/5' 
                                                : 'bg-transparent border-transparent'
                                    }`}
                                >
                                    <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                        isActive ? 'bg-purple-500 text-white' : isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-600'
                                    }`}>
                                        {isCompleted ? <Code className="w-5 h-5" /> : step.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className={`text-sm font-medium ${isActive ? 'text-white' : isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {step.text}
                                        </p>
                                        {isActive && (
                                            <motion.div 
                                                className="h-0.5 bg-purple-500 mt-2"
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: steps[index].duration / 1000 }}
                                            />
                                        )}
                                    </div>
                                    {isCompleted && (
                                        <div className="text-[10px] text-green-400 font-bold uppercase">Ready</div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </main>

            {/* Footer decoration */}
            <div className="relative z-10 p-10 text-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">
                    Neural Engine active • Cluster 04 • High Priority Task
                </p>
            </div>
        </div>
    );
}
