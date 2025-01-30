import minimist from 'minimist';

export const args = minimist(process.argv);

export const cwd = args['cwd'] || process.cwd();

export const sourceFolderName__flag = args['source-folder-name'] || args['sourceFolderName'] || args['-s'] || '.config';

export const initMode = args['init'] || args['i'] || false;

export const isClean = args['clean'] || args['c'] || false;

export const isReset = args['reset'] || false;
