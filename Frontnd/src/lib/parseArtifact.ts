export interface FileAction {
    type: 'file';
    filePath: string;
    content: string;
}

export interface ShellAction {
    type: 'shell';
    command: string;
}

export type ArtifactAction = FileAction | ShellAction;

export interface ParsedArtifact {
    id: string;
    title: string;
    actions: ArtifactAction[];
}

/**
 * Parses voltArtifact XML from an AI response string.
 * Extracts file actions (path + content) and shell actions.
 */
export function parseArtifacts(text: string): ParsedArtifact[] {
    const artifacts: ParsedArtifact[] = [];
    const artifactRegex = /<voltArtifact\s+(?:[^>]*?)id="([^"]*)"(?:\s+title="([^"]*)")?[^>]*>([\s\S]*?)<\/voltArtifact>/g;

    let match;
    while ((match = artifactRegex.exec(text)) !== null) {
        const [, id, title, body] = match;
        const actions: ArtifactAction[] = [];

        const actionRegex = /<voltAction\s+type="(\w+)"(?:\s+filePath="([^"]*)")?[^>]*>([\s\S]*?)<\/voltAction>/g;
        let actionMatch;
        while ((actionMatch = actionRegex.exec(body)) !== null) {
            const [, type, filePath, content] = actionMatch;
            if (type === 'file' && filePath) {
                actions.push({ type: 'file', filePath, content: content.trim() });
            } else if (type === 'shell') {
                actions.push({ type: 'shell', command: content.trim() });
            }
        }

        artifacts.push({ id, title: title || id, actions });
    }

    return artifacts;
}

/**
 * Incrementally parses voltAction file entries from a partial stream.
 * Returns completed file actions found so far.
 */
export function parseFileActionsFromPartial(text: string): FileAction[] {
    const files: FileAction[] = [];
    const actionRegex = /<voltAction\s+type="file"\s+filePath="([^"]*)"[^>]*>([\s\S]*?)<\/voltAction>/g;

    let match;
    while ((match = actionRegex.exec(text)) !== null) {
        const [, filePath, content] = match;
        files.push({ type: 'file', filePath, content: content.trim() });
    }

    return files;
}
