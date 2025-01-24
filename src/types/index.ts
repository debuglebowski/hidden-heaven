export namespace Internals {
    export type Context = HiddenHeaven.InputConfig & Required<HiddenHeaven.CliFlags>;
}

export namespace HiddenHeaven {
    /**
     * The base interface for any item (file or folder)
     */
    export interface Item {
        name: string;

        absolutePath: string;
    }

    /**
     * Any item that is found in the source folder
     */
    export interface SourceItem extends Item {
        type: 'folder' | 'file';

        isDirectory: boolean;
        isFile: boolean;
    }

    /**
     * Any folder that contains files we want to symlink
     */
    export interface SourceFolder extends Item {
        children: SourceItem[];
    }

    /**
     * Any item that we want to write to a given target folder
     */
    export interface TargetItem extends Item {
        targetFolder: TargetFolder;
        sourceItem: SourceItem;
    }

    /**
     * The folder we want to write items to.
     * This is always the parent folder of the source folder.
     */
    export interface TargetFolder extends Item {
        sourceFolder: SourceFolder;
    }

    /**
     * How we should write the file
     * - root - write to the root folder
     * - package - write to the package path
     * - false - don't write file
     * - true - same as root
     */
    export type WriteFileMode = boolean | 'root' | 'package';

    /**
     * The config for the onItem callback
     */
    export interface OnItemConfig {
        targetFolder: TargetFolder;
        targetItem: TargetItem;

        sourceItem: SourceItem;

        context: Internals.Context;
    }

    /**
     * The config for the onItems callback.
     */
    export interface OnItemsConfig {
        targetItems: TargetItem[];
        context: Internals.Context;
    }

    /**
     * The content of the hidden-heaven.json config file
     */
    export interface InputConfig {
        /**
         * The name of the source folder we want to find.
         * Can only be used in package.json - otherwise we are not able to find it
         * Defaults to .config
         */
        sourceFolderName?: string;

        /**
         * If we should write the target files to .gitignore
         * Defaults to true
         */
        gitignore?: WriteFileMode;

        /**
         * If we should hide the target files in vscode
         * Defaults to true
         */
        vscode?: WriteFileMode;

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
             * Defaults to npm
             */
            runtime?: string;

            /**
             * Whether to try to run prettier fix on the file
             * Defaults to true
             */
            prettier?: boolean;

            /**
             * Whether to try to run eslint fix on the file
             * Defaults to true
             */
            eslint?: boolean;
        };

        /**
         * A callback for each source item that is found in the source folder.
         * This can be used e.g. to write a custom .gitignore, .vscode, or other config files.
         */
        onItem?(config: OnItemConfig): any;

        /**
         * A callback for all the items found, The items are flattened.
         * This can also be used to write a custom .gitignore, .vscode, or other config files.
         */
        onItems?(config: OnItemsConfig): any;
    }

    export interface CliFlags {
        /**
         * The root directory you want to find all the source folders in.
         * Defaults to process.cwd()
         */
        cwd?: string;

        /**
         * The name of the source folder you want to find.
         * Defaults to .config
         */
        sourceFolderName?: string;
    }
}
