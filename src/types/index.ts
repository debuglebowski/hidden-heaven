export namespace Internals {
    export type Config = HiddenHeaven.InputConfig & Required<HiddenHeaven.CliFlags>;
}

export namespace HiddenHeaven {
    export interface Item {
        name: string;

        absolutePath: string;
    }

    export interface SourceItem extends Item {
        isDirectory: boolean;
        isFile: boolean;
    }

    export interface SourceFolder extends Item {
        children: SourceItem[];
    }

    export interface TargetFolder extends Item {}

    /**
     * The content of the hidden-heaven.json config file
     */
    export interface InputConfig {
        gitignore?: boolean;
        vscode?: boolean;

        map?: Record<string, string>;

        onFile?(file: HiddenHeaven.SourceItem): void;
    }

    export interface CliFlags {
        cwd?: string;
        sourceFolderName?: string;
    }
}
