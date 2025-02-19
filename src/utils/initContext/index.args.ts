import minimist from 'minimist';

export const args = minimist(process.argv);

export const cwd = args['cwd'] || process.cwd();

export const linkFolderName__flag = args['link-folder-name'] || args['-l'] || '.config';

export const initMode = args['init'] || args['i'] || false;

export const isReset = args['reset'] || args['r'] || false;

export const isShow = args['show'] || args['s'] || false;
