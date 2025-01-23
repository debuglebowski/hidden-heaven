export namespace Internals {
    export type Context = HiddenHeaven.InputConfig & Required<HiddenHeaven.CliFlags>;
}

export namespace HiddenHeaven {
    export interface Item {
        name: string;

        absolutePath: string;
    }

    export interface SourceItem extends Item {
        type: 'folder' | 'file';

        isDirectory: boolean;
        isFile: boolean;
    }

    export interface TargetItem extends Item {
        targetFolder: TargetFolder;
        sourceItem: SourceItem;
    }

    export interface SourceFolder extends Item {
        children: SourceItem[];
    }

    export interface TargetFolder extends Item {}

    /**
     * The content of the hidden-heaven.json config file
     */
    export interface InputConfig {
        /**
         * Can only be used in package.json - otherwise we are not able to find it
         */
        sourceFolderName?: string;

        /**
         * If we should write the target files to .gitignore
         */
        gitignore?: boolean;

        /**
         * If we should hide the target files in vscode
         */
        vscode?: boolean;

        /**
         * A map of source item names -> target item names
         */
        map?: Record<string, string>;

        /**
         * The format config
         */
        format?: {
            /**
             * What JS runtime command should we use to execute the formatters? npm? pnpm? yarn? bun?
             */
            runtime?: string;

            /**
             * Whether to run prettier on the file
             */
            prettier?: boolean;

            /**
             * Whether to run eslint on the file
             */
            eslint?: boolean;
        };

        /**
         * A callback for each source item that is found in the source folder.
         * This can be used e.g. to write a custom .gitignore, .vscode, or other config files.
         */
        onItem?(item: HiddenHeaven.TargetItem[], context: Internals.Context): void;

        /**
         * A callback for all the items found
         */
        onItems?(items: HiddenHeaven.TargetItem[], context: Internals.Context): void;
    }

    export interface CliFlags {
        /**
         * The root directory you want to find all the source folders in.
         */
        cwd?: string;

        /**
         * The name of the source folder you want to find.
         */
        sourceFolderName?: string;
    }
}
