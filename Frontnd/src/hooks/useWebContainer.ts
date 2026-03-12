import { WebContainer } from '@webcontainer/api';
import { useCallback, useEffect, useRef, useState } from 'react';

let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

async function getWebContainer(): Promise<WebContainer> {
    if (webcontainerInstance) return webcontainerInstance;
    if (!bootPromise) {
        bootPromise = WebContainer.boot().then(instance => {
            webcontainerInstance = instance;
            return instance;
        });
    }
    return bootPromise;
}

export interface TerminalOutput {
    type: 'stdout' | 'stderr' | 'info';
    content: string;
}

export function useWebContainer() {
    const [instance, setInstance] = useState<WebContainer | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [booting, setBooting] = useState(true);
    const [terminalOutput, setTerminalOutput] = useState<TerminalOutput[]>([]);
    const serverReadyRef = useRef(false);

    useEffect(() => {
        let cancelled = false;

        getWebContainer().then(wc => {
            if (cancelled) return;
            setInstance(wc);
            setBooting(false);

            if (!serverReadyRef.current) {
                serverReadyRef.current = true;
                wc.on('server-ready', (_port, url) => {
                    setPreviewUrl(url);
                    addOutput('info', `Server ready at ${url}`);
                });
            }
        }).catch(err => {
            console.error('WebContainer boot failed:', err);
            setBooting(false);
        });

        return () => { cancelled = true; };
    }, []);

    const addOutput = useCallback((type: TerminalOutput['type'], content: string) => {
        setTerminalOutput(prev => [...prev, { type, content }]);
    }, []);

    const writeFile = useCallback(async (path: string, content: string) => {
        const wc = await getWebContainer();
        // Ensure parent directories exist
        const parts = path.split('/');
        if (parts.length > 1) {
            const dir = parts.slice(0, -1).join('/');
            try {
                await wc.fs.mkdir(dir, { recursive: true });
            } catch {
                // directory might already exist
            }
        }
        await wc.fs.writeFile(path, content);
    }, []);

    const mountFiles = useCallback(async (files: Record<string, string>) => {
        const wc = await getWebContainer();
        const tree = buildFileSystemTree(files);
        await wc.mount(tree);
        addOutput('info', `Mounted ${Object.keys(files).length} files`);
    }, [addOutput]);

    const runCommand = useCallback(async (command: string): Promise<number> => {
        const wc = await getWebContainer();
        const parts = command.split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);

        addOutput('info', `$ ${command}`);

        const process = await wc.spawn(cmd, args);

        process.output.pipeTo(new WritableStream({
            write(data) {
                addOutput('stdout', data);
            }
        }));

        const exitCode = await process.exit;
        addOutput('info', `Process exited with code ${exitCode}`);
        return exitCode;
    }, [addOutput]);

    return {
        instance,
        booting,
        previewUrl,
        terminalOutput,
        writeFile,
        mountFiles,
        runCommand,
    };
}

/**
 * Convert a flat file map { "src/App.tsx": "content" }
 * into WebContainer's FileSystemTree format.
 */
function buildFileSystemTree(files: Record<string, string>): Record<string, any> {
    const tree: Record<string, any> = {};

    for (const [path, content] of Object.entries(files)) {
        const parts = path.split('/');
        let current = tree;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i === parts.length - 1) {
                // File
                current[part] = {
                    file: { contents: content },
                };
            } else {
                // Directory
                if (!current[part]) {
                    current[part] = { directory: {} };
                }
                current = current[part].directory;
            }
        }
    }

    return tree;
}
