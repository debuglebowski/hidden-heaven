import minimist from 'minimist';

export const args = minimist(process.argv);

export const cwd = args['cwd'] || process.cwd();

export const linkFolderName__flag = args['link-folder-name'] || args['linkFolderName'] || args['-l'] || '.config';

export const initMode = args['init'] || args['i'] || false;

export const isClean = args['clean'] || args['c'] || false;

export const isReset = args['reset'] || false;
