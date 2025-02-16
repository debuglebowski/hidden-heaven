import type { Context } from './index.context';
import type { FindConfig } from './index.external.find';
import type { Item } from './index.external.item';

export namespace HiddenHeaven {
    /**
     * The folder that contains files we want to symlink
     */
    export interface PackageFolder extends Item {}

    /**
     * The folder that contains all the linked items.
     */
    export interface LinkFolder extends Item {
        packageFolder: PackageFolder;
    }

    /**
     * Any item that is found in the package folder
     */
    export interface SourceItem extends Item {
        type: 'folder' | 'file';

        isDirectory: boolean;
        isFile: boolean;
    }

    /**
     * Any item that we want to write to a given link folder
     */
    export interface LinkItem extends Item {
        parent: LinkFolder;

        sourceItem: SourceItem;
    }

    /**
     * The config for the onItem callback
     */
    export interface OnItemConfig {
        linkItemParent: LinkFolder;

        linkItem: LinkItem;

        sourceItem: SourceItem;

        context: Context;
    }

    /**
     * The config for the onItems callback.
     */
    export interface OnItemsConfig {
        linkItems: LinkItem[];

        context: Context;
    }

    /**
     * The content of the hidden-heaven.json config file
     */
    export interface InputConfig {
        /**
         * How to find all the packages we want to run within. Uses glob patterns.
         */
        find?: {
            /**
             * The folders of where to run hidden-heaven within.
             * If the found item is a file, we'll use it's parent.
             * Defaults to finding all "package.json" files except for node_modules
             */
            packages?: FindConfig;

            /**
             * The files within the packages that will be hidden.
             * Defaults to ["*"]
             */
            items?: FindConfig;
        };

        /**
         * The name of the link folder we want all symlinks to be written to.
         * Defaults to .config
         */
        linkFolderName?: string;

        /**
         * If we should write the target files to .gitignore
         * Defaults to true
         */
        gitignore?: boolean;

        /**
         * If we should hide the target files in vscode
         * Defaults to true
         */
        vscode?: boolean;

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
         * The name of the link folder we want all symlinks to be written to.
         * Defaults to .config
         */
        linkFolderName?: string;

        /**
         * Which files we should include in the init
         * - true - opinionated
         * - all - all files
         *
         * Defaults to true.
         */
        initMode?: true | 'all';

        /**
         * If you want to remove all target files AND reset the setting files.
         * This reverses the init command.
         */
        isReset?: boolean;

        /**
         * If you want to ONLY remove all target files.
         */
        isClean: boolean;
    }
}
