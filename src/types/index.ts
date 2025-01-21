export namespace __HiddenHeaven {
    export type Config = HiddenHeaven.Config & Required<HiddenHeaven.CliFlags>;
}

export namespace HiddenHeaven {
    export interface SourceItem {
        name: string;

        absolutePath: string;
        relativePath: string;
    }

    export interface TargetFolder {
        name: string;

        absolutePath: string;
        relativePath: string;
    }

    /**
     * The content of the hidden-heaven.json config file
     */
    export interface Config {
        gitignore?: boolean;
        vscode?: boolean;

        map?: Record<string, string>;

        onFile(file: HiddenHeaven.SourceItem): void;
    }

    export interface CliFlags {
        sourceFolderName?: string;
    }
}
