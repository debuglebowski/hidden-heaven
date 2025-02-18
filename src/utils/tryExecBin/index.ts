import { execSync } from '../exec';
import { findNodeModules } from '../findNodeModules';
import { getPackageStatus } from '../getPackageStatus';
import { join } from 'node:path';

interface Config {
    runtime: string;
    bin: string;
    args: string[];
}

export async function tryExecBin(config: Config) {
    const { runtime, bin, args } = config;

    const { isPackageInstalled } = getPackageStatus(bin);

    const nodeModulesPath = await findNodeModules(process.cwd());

    const binPath = join(nodeModulesPath, '.bin', bin);

    console.log({ binPath });

    if (!isPackageInstalled) {
        console.warn(`${bin} is not installed, skipping...`);

        return;
    }

    execSync([runtime, binPath, ...args]);
}
