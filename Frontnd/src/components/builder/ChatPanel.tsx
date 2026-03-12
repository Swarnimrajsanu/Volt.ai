import { FileCode, FolderOpen, Loader2, Send, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFileStore } from '../../hooks/useFileStore';
import type { useWebContainer } from '../../hooks/useWebContainer';
import { parseFileActionsFromPartial } from '../../lib/parseArtifact';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatPanelProps {
    initialPrompt?: string;
    templatePrompts?: string[];
    webContainer: ReturnType<typeof useWebContainer>;
}

export default function ChatPanel({ initialPrompt, templatePrompts, webContainer }: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [streaming, setStreaming] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const setFile = useFileStore(s => s.setFile);
    const processedFilesRef = useRef(new Set<string>());

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-send initial prompt
    useEffect(() => {
        if (initialPrompt && messages.length === 0) {
            sendMessage(initialPrompt, templatePrompts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function sendMessage(text: string, prompts?: string[]) {
        if (!text.trim() || streaming) return;

        const userMsg: Message = { role: 'user', content: text };
        const assistantMsg: Message = { role: 'assistant', content: '' };

        setMessages(prev => [...prev, userMsg, assistantMsg]);
        setInput('');
        setStreaming(true);
        processedFilesRef.current = new Set();

        // Build conversation for the API
        const apiMessages = [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.role === 'user' && prompts ? [...prompts, m.content].join('\n\n') : m.content,
        }));

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const data = JSON.parse(line.slice(6));
                                if (data.content) {
                                    fullText += data.content;
                                    setMessages(prev => {
                                        const updated = [...prev];
                                        updated[updated.length - 1] = { role: 'assistant', content: fullText };
                                        return updated;
                                    });

                                    // Incrementally parse files and write to WebContainer
                                    const fileActions = parseFileActionsFromPartial(fullText);
                                    for (const action of fileActions) {
                                        if (!processedFilesRef.current.has(action.filePath)) {
                                            processedFilesRef.current.add(action.filePath);
                                            setFile(action.filePath, action.content);
                                            // Write to WebContainer
                                            webContainer.writeFile(action.filePath, action.content).catch(console.error);
                                        }
                                    }
                                }
                                if (data.done) break;
                            } catch {
                                // skip malformed JSON
                            }
                        }
                    }
                }
            }

            // Final parse — update all files and write to WebContainer
            const finalFiles = parseFileActionsFromPartial(fullText);
            for (const action of finalFiles) {
                setFile(action.filePath, action.content);
                webContainer.writeFile(action.filePath, action.content).catch(console.error);
            }

            // Parse and run shell commands from the response
            const shellRegex = /<voltAction\s+type="shell"[^>]*>([\s\S]*?)<\/voltAction>/g;
            let shellMatch;
            while ((shellMatch = shellRegex.exec(fullText)) !== null) {
                const command = shellMatch[1].trim();
                if (command) {
                    webContainer.runCommand(command).catch(console.error);
                }
            }

        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' };
                return updated;
            });
        } finally {
            setStreaming(false);
        }
    }

    function renderMessageContent(content: string) {
        // Strip voltArtifact XML from visible chat
        const cleaned = content
            .replace(/<voltArtifact[\s\S]*?<\/voltArtifact>/g, '')
            .trim();

        if (!cleaned) {
            const fileActions = parseFileActionsFromPartial(content);
            if (fileActions.length > 0) {
                return (
                    <div className="space-y-1.5">
                        <p className="text-xs text-purple-400 font-medium mb-2">Generated files:</p>
                        {fileActions.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-1.5">
                                {f.filePath.includes('/') ? <FolderOpen className="w-3 h-3 text-blue-400" /> : <FileCode className="w-3 h-3 text-green-400" />}
                                {f.filePath}
                            </div>
                        ))}
                    </div>
                );
            }
        }

        return (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {cleaned.split('```').map((block, i) => {
                    if (i % 2 === 1) {
                        const lines = block.split('\n');
                        const lang = lines[0];
                        const code = lines.slice(1).join('\n');
                        return (
                            <div key={i} className="my-3 rounded-xl overflow-hidden border border-white/10">
                                <div className="bg-white/5 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{lang || 'code'}</div>
                                <pre className="bg-black/30 p-4 overflow-x-auto text-xs font-mono text-gray-300">
                                    <code>{code}</code>
                                </pre>
                            </div>
                        );
                    }
                    return <span key={i}>{block}</span>;
                })}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#05031a]/80 backdrop-blur-xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm text-white">Volt AI Chat</span>
                {webContainer.booting && (
                    <div className="ml-auto flex items-center gap-1.5 text-[10px] text-yellow-400">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Booting runtime...
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {messages.length === 0 && (
                    <div className="text-center text-gray-600 text-sm mt-20">
                        <Sparkles className="w-8 h-8 mx-auto mb-4 text-purple-500/30" />
                        <p>Describe what you want to build</p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && (
                            <div className="shrink-0 w-7 h-7 rounded-lg bg-purple-600/20 flex items-center justify-center mt-1">
                                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            </div>
                        )}
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            msg.role === 'user'
                                ? 'bg-purple-600/20 border border-purple-500/20 text-white'
                                : 'bg-white/5 border border-white/5 text-gray-300'
                        }`}>
                            {msg.role === 'assistant' && msg.content === '' && streaming ? (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                    Generating...
                                </div>
                            ) : (
                                renderMessageContent(msg.content)
                            )}
                        </div>
                        {msg.role === 'user' && (
                            <div className="shrink-0 w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center mt-1">
                                <User className="w-3.5 h-3.5 text-blue-400" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                        placeholder="Ask Volt to modify your app..."
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 focus:outline-none"
                        disabled={streaming}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={streaming || !input.trim()}
                        className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <Send className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
