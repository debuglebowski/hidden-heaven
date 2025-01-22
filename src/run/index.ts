import type { Internals } from '../types';
import { findSourceFolders } from './findSourceFolders';
import { validateConfig } from './validateConfig';

export async function run(config: Internals.Config) {
    await validateConfig(config);

    const sourceFolders = await findSourceFolders(config);

    console.log(sourceFolders);
}
