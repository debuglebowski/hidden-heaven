import type { HiddenHeaven } from '../types';

interface Config {
    sourcePath: string;
    sourceItems: HiddenHeaven.SourceItem[];
}

export class SourceFolder {
    static async fromSourcePath(sourcePath: string) {
        return new SourceFolder({
            sourcePath,
            sourceItems: [],
        });
    }

    constructor(readonly config: Config) {}
}
