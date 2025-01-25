import minimist from 'minimist';

export const args = minimist(process.argv);

export const cwd = args['cwd'] || process.cwd();

export const sourceFolderName__flag = args['source-folder-name'] || args['sourceFolderName'] || args['-s'] || '.config';

export const clean = args['clean'] || args['c'] || false;
