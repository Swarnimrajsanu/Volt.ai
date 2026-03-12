import { useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChatPanel from '../components/builder/ChatPanel';
import CodeEditor from '../components/builder/CodeEditor';
import PreviewPanel from '../components/builder/PreviewPanel';
import { useWebContainer } from '../hooks/useWebContainer';

type ActiveTab = 'code' | 'preview';

export default function Builder() {
    const location = useLocation();
    const state = location.state as { prompt?: string; prompts?: string[] } | null;
    const webContainer = useWebContainer();

    const [chatWidth, setChatWidth] = useState(360);
    const [activeTab, setActiveTab] = useState<ActiveTab>('code');
    const isDragging = useRef(false);

    const handleMouseDown = useCallback(() => {
        isDragging.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const newWidth = Math.max(280, Math.min(600, e.clientX));
            setChatWidth(newWidth);
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div className="h-screen flex bg-[#020010] overflow-hidden">
            {/* Chat Sidebar */}
            <div style={{ width: chatWidth }} className="shrink-0 border-r border-white/5">
                <ChatPanel
                    initialPrompt={state?.prompt}
                    templatePrompts={state?.prompts}
                    webContainer={webContainer}
                />
            </div>

            {/* Resize Handle */}
            <div
                onMouseDown={handleMouseDown}
                className="w-1 bg-transparent hover:bg-purple-500/50 cursor-col-resize transition-colors shrink-0 z-30"
            />

            {/* Right Panel: Code + Preview */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Tab Bar */}
                <div className="h-10 bg-[#080618] border-b border-white/5 flex items-center px-1 gap-1 shrink-0">
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            activeTab === 'code'
                                ? 'bg-white/10 text-white'
                                : 'text-gray-500 hover:text-white'
                        }`}
                    >
                        Code
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            activeTab === 'preview'
                                ? 'bg-white/10 text-white'
                                : 'text-gray-500 hover:text-white'
                        }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Panel Content */}
                <div className="flex-1 min-h-0">
                    {activeTab === 'code' ? (
                        <CodeEditor />
                    ) : (
                        <PreviewPanel previewUrl={webContainer.previewUrl} />
                    )}
                </div>
            </div>
        </div>
    );
}
