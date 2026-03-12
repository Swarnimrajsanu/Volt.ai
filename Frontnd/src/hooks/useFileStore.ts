import { create } from 'zustand';

interface FileStore {
    files: Record<string, string>;
    activeFile: string | null;
    setFile: (path: string, content: string) => void;
    setFiles: (files: Record<string, string>) => void;
    setActiveFile: (path: string) => void;
    getFileTree: () => TreeNode[];
}

export interface TreeNode {
    name: string;
    path: string;
    type: 'file' | 'folder';
    children?: TreeNode[];
}

function buildTree(paths: string[]): TreeNode[] {
    const root: Record<string, any> = {};

    for (const filePath of paths) {
        const parts = filePath.split('/');
        let current = root;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!current[part]) {
                current[part] = i === parts.length - 1 ? null : {};
            }
            if (current[part] !== null) {
                current = current[part];
            }
        }
    }

    function convert(obj: Record<string, any>, prefix: string): TreeNode[] {
        return Object.keys(obj).sort((a, b) => {
            const aIsFolder = obj[a] !== null;
            const bIsFolder = obj[b] !== null;
            if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
            return a.localeCompare(b);
        }).map(key => {
            const fullPath = prefix ? `${prefix}/${key}` : key;
            if (obj[key] === null) {
                return { name: key, path: fullPath, type: 'file' as const };
            }
            return { name: key, path: fullPath, type: 'folder' as const, children: convert(obj[key], fullPath) };
        });
    }

    return convert(root, '');
}

export const useFileStore = create<FileStore>((set, get) => ({
    files: {},
    activeFile: null,

    setFile: (path, content) => set(state => ({
        files: { ...state.files, [path]: content },
        activeFile: state.activeFile ?? path,
    })),

    setFiles: (newFiles) => set(state => {
        const merged = { ...state.files, ...newFiles };
        const firstPath = state.activeFile ?? Object.keys(newFiles)[0] ?? null;
        return { files: merged, activeFile: firstPath };
    }),

    setActiveFile: (path) => set({ activeFile: path }),

    getFileTree: () => {
        const { files } = get();
        return buildTree(Object.keys(files));
    },
}));
