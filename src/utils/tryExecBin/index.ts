import { execSync } from '../exec';
import { getPackageStatus } from '../getPackageStatus';

interface Config {
    runtime: string;
    bin: string;
    args: string[];
}

export function tryExecBin(config: Config) {
    const { runtime, bin, args } = config;

    const isPackageInstalled = getPackageStatus(bin);

    if (!isPackageInstalled) {
        console.warn(`${bin} is not installed, skipping...`);
        return;
    }

    execSync([runtime, bin, ...args]);
}
