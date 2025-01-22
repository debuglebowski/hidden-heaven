function createArg(names: string[], defaultValue: string): string {
    const index = process.argv.findIndex((arg) => {
        return names.some((name) => arg.startsWith(name));
    });

    if (index === -1) {
        return defaultValue;
    }

    const arg = process.argv[index + 1];

    return arg ?? defaultValue;
}

export const cwd = createArg(['--cwd'], process.cwd());
export const sourceFolderName = createArg(['--source-folder-name', '--sourceFolderName', '-s'], '.config');
