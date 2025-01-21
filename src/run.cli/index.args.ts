const __sourceFolderName = process.argv.find((arg) => {
    return arg.startsWith('--source-folder-name');
});

const sourceFolderName = __sourceFolderName?.split('=')[1] || '.config';

export { sourceFolderName };

// TODO: Fix this!
