# Have you ever dreamed about this?

![Before](https://github.com/debuglebowski/hidden-hell/blob/main/docs/images/display.png?raw=true)

# What?

All the files (you have chosen) are hidden away within the `.config` folder. This process is made in all packages within a monorepo.

# Why?

The JavaScript / TypeScript ecosystem is very large - for good and for bad. This means that we will always have a lot of configuration files. I often find myself getting distracted by the amount of configuration files. This along with the fact that I love structure, led me to create this tool.

# How?

1. We find all the packages and items that are considered configuration (this is configurable but with good defaults).
2. We symlink them all into the `.config` folder (which is also configurable).
3. We hide all items by manipulating the `.vscode/settings.json` file.
4. If you don't use vscode (or it's decendents), there is a custom hook in the configuration file so you can configure your own IDE.

# Getting started

```bash
npx hidden-hell --init
```

This command will create a `.hide.js` file in the root of your project with some default configuration. This will lead to hiding all folders starting with a dot as well as all the root files. If you are using a monorepo, this will happen for all packages.

# Usage

(If you have `hidden-hell` installed, you can also use the `hide` command as an alias.)

```bash
npx hidden-hell

Options:
  (-i | --init)                     # Initialize the configuration
  (-l | --link-folder-name)  name   # The name of the folder that will contain the symlinks
  (-r | --reset)                    # Reset the configuration
  (-s | --show)                     # Show all files without removing the symlinks
```

# Configuration

The configuration file is a JavaScript file that exports an object with the following interface:

The configuration can be defined in either the `package.json` or in the `.hide.js`/`hide.js`/`hidden-heaven.js` file. Both of them adheres to the interface above. However, the callbacks obviously cannot be used in the `package.json`.

<details>
<summary>Click to expand configuration interface</summary>

```ts
interface InputConfig {
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
```

</details>

<br>

Check the [Source code](https://github.com/debuglebowski/hidden-hell/blob/main/src/types/index.external.ts) (`InputConfig`) for more information.

# Limitations

- Windows is not yet supported, will add on demand.
- Items are ignored and hidden on root level.
    - If you want to hide them at a specific position or level, you need to write a custom hook.

# TODO

- Make init just init the config file
- Battle test sync
- Add workflow instructions
    - If a file in the config file is not a symlink, we should move it to the root and then run the sync.
        - This allows for a better workflow.

# Roadmap

- Better docs
- Add linting
- Add different ways of determining included files
    - Regex object
    - JS-function (in config-file)
- Write to user settings in order to overwrite the hidings.
    - Add local ignored file to fix this? .hide.local.js?
