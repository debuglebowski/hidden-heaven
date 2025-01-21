import type { __HiddenHeaven, HiddenHeaven } from '../types';
import { findSourceFolders } from './findSourceFolders';

export function run(config: __HiddenHeaven.Config) {
    const { sourceFolderName = '.config' } = config;

    const config__safe = config;

    const sourceFolders = findSourceFolders(config__safe);
}

export function runFromCli(config: HiddenHeaven.CliFlags) {
    const config__safe = config;

    // const sourceFolders = findSourceFolders(config__safe);
}
