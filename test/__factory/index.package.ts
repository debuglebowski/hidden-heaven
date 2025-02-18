import { join } from 'node:path';
import type { FixtureConfig, Package } from './index.types';
import { fse } from '~/utils';
import { describe } from 'vitest';

export interface PackageFnConfig extends Package {
    packagePath: string;

    packageLinkFolderPath: string;

    readItems(): Promise<string[]>;
}

export interface PackageFn {
    (config: PackageFnConfig): void;
}

export function runPackages(config: FixtureConfig, packageFn: PackageFn) {
    const { packages, linkFolderName = '.config' } = config;

    for (const packagePath in packages) {
        const pkg = packages[packagePath];

        const packageLinkFolderPath = join(process.cwd(), packagePath, linkFolderName);

        describe(`Package "${packagePath}"`, () => {
            packageFn({
                ...pkg,

                packagePath,

                packageLinkFolderPath,

                readItems() {
                    return fse.readdir(packageLinkFolderPath);
                },
            });
        });
    }
}
