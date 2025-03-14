import { execSync } from '../exec';
import { findUp } from '../findUp';
import { getPackageStatus } from '../getPackageStatus';
import { printWarning } from '../log';

interface Config {
    runtime: string;
    bin: string;
    args: string[];
}

export async function tryExecBin(config: Config) {
    const { runtime, bin, args } = config;

    const { isPackageInstalled } = getPackageStatus(bin);

    if (!isPackageInstalled) {
        printWarning(`${bin} is not installed, skipping...`);

        return;
    }

    const binPath = await findUp(`node_modules/.bin/${bin}`, process.cwd());

    execSync([runtime, binPath, ...args], { stdio: 'inherit' });
}
