import { ChevronRight, FileCode, Folder, X } from 'lucide-react';
import { useState } from 'react';
import { useFileStore, type TreeNode } from '../../hooks/useFileStore';

function getLanguage(path: string): string {
    const ext = path.split('.').pop()?.toLowerCase();
    const map: Record<string, string> = {
        ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
        css: 'css', html: 'html', json: 'json', md: 'markdown', py: 'python',
    };
    return map[ext || ''] || 'text';
}

function FileTreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
    const [expanded, setExpanded] = useState(true);
    const activeFile = useFileStore(s => s.activeFile);
    const setActiveFile = useFileStore(s => s.setActiveFile);

    if (node.type === 'folder') {
        return (
            <div>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                    style={{ paddingLeft: 8 + depth * 12 }}
                >
                    <ChevronRight className={`w-3 h-3 shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                    <Folder className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                    <span className="truncate">{node.name}</span>
                </button>
                {expanded && node.children?.map(child => (
                    <FileTreeItem key={child.path} node={child} depth={depth + 1} />
                ))}
            </div>
        );
    }

    const isActive = activeFile === node.path;
    return (
        <button
            onClick={() => setActiveFile(node.path)}
            className={`w-full flex items-center gap-1.5 px-2 py-1 text-xs rounded transition-colors ${
                isActive ? 'bg-purple-600/20 text-purple-300' : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
            style={{ paddingLeft: 20 + depth * 12 }}
        >
            <FileCode className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{node.name}</span>
        </button>
    );
}

export default function CodeEditor() {
    const files = useFileStore(s => s.files);
    const activeFile = useFileStore(s => s.activeFile);
    const setActiveFile = useFileStore(s => s.setActiveFile);
    const getFileTree = useFileStore(s => s.getFileTree);

    const tree = getFileTree();
    const openFiles = Object.keys(files).filter(f => files[f] !== undefined);
    const content = activeFile ? files[activeFile] || '' : '';
    const lang = activeFile ? getLanguage(activeFile) : 'text';

    if (Object.keys(files).length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#0a0820] text-gray-600 text-sm">
                <div className="text-center">
                    <FileCode className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Waiting for AI to generate code...</p>
                    <p className="text-xs mt-2 text-gray-700">Files will appear here as they are generated</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full bg-[#0a0820]">
            {/* File Tree Sidebar */}
            <div className="w-52 border-r border-white/5 overflow-y-auto py-3 shrink-0">
                <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Explorer</p>
                {tree.map(node => (
                    <FileTreeItem key={node.path} node={node} />
                ))}
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Tabs */}
                <div className="flex items-center border-b border-white/5 bg-[#080618] overflow-x-auto">
                    {openFiles.map(path => {
                        const name = path.split('/').pop() || path;
                        const isActive = path === activeFile;
                        return (
                            <button
                                key={path}
                                onClick={() => setActiveFile(path)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-xs border-r border-white/5 shrink-0 transition-colors ${
                                    isActive ? 'bg-[#0a0820] text-white border-b-2 border-b-purple-500' : 'text-gray-500 hover:text-white bg-[#060516]'
                                }`}
                            >
                                <FileCode className="w-3 h-3" />
                                {name}
                                {isActive && <X className="w-3 h-3 ml-2 opacity-50 hover:opacity-100" />}
                            </button>
                        );
                    })}
                </div>

                {/* Code Content */}
                <div className="flex-1 overflow-auto p-0">
                    <div className="flex text-xs font-mono">
                        {/* Line Numbers */}
                        <div className="select-none text-right pr-4 pl-4 py-4 text-gray-700 bg-[#080618] border-r border-white/5 leading-6">
                            {content.split('\n').map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        {/* Code */}
                        <pre className="flex-1 p-4 overflow-x-auto text-gray-300 leading-6 whitespace-pre">
                            <code>{content}</code>
                        </pre>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="h-7 bg-[#060516] border-t border-white/5 px-4 flex items-center justify-between text-[10px] text-gray-600">
                    <span>{activeFile || 'No file selected'}</span>
                    <span className="uppercase">{lang}</span>
                </div>
            </div>
        </div>
    );
}
