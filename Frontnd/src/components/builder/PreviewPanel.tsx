import { ExternalLink, Globe, Loader2, Monitor, RefreshCw, Smartphone } from 'lucide-react';
import { useRef, useState } from 'react';

interface PreviewPanelProps {
    previewUrl: string | null;
}

export default function PreviewPanel({ previewUrl }: PreviewPanelProps) {
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleRefresh = () => {
        if (iframeRef.current && previewUrl) {
            iframeRef.current.src = previewUrl;
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0820]">
            {/* Toolbar */}
            <div className="h-12 bg-[#080618] border-b border-white/5 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/5">
                        <button
                            onClick={() => setViewMode('desktop')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-white'}`}
                        >
                            <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => setViewMode('mobile')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-white'}`}
                        >
                            <Smartphone className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="p-1.5 text-gray-600 hover:text-white transition-colors"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="flex-1 mx-4 max-w-md bg-black/20 rounded-lg px-3 py-1 text-xs text-gray-500 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    <span className="truncate">{previewUrl || 'Waiting for server...'}</span>
                </div>

                <button className="p-1.5 text-gray-600 hover:text-white transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-[#0a0820] p-4 overflow-hidden">
                <div className={`mx-auto h-full transition-all duration-500 ${viewMode === 'mobile' ? 'max-w-sm' : 'w-full'}`}>
                    <div className="bg-white rounded-2xl overflow-hidden h-full shadow-2xl border border-white/10">
                        {previewUrl ? (
                            <iframe
                                ref={iframeRef}
                                src={previewUrl}
                                title="Preview"
                                className="w-full h-full border-none"
                                allow="cross-origin-isolated"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-950 text-gray-600 text-sm">
                                <div className="text-center">
                                    <Loader2 className="w-10 h-10 mx-auto mb-4 opacity-30 animate-spin text-purple-500" />
                                    <p className="font-medium text-white/60">Starting dev server...</p>
                                    <p className="text-xs mt-2 text-gray-700">The preview will appear once `npm run dev` completes</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
