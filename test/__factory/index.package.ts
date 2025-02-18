import { join } from 'node:path';
import type { FixtureConfig } from './index.types';
import { fse } from '~/utils';
import { describe } from 'vitest';

export interface PackageFnConfig {
    packagePath: string;

    packageLinkFolderPath: string;

    linkedFileNames__included: string[];
    linkedFileNames__excluded: string[];

    readPackageItems(): Promise<string[]>;
    readLinkedItems(): Promise<string[]>;
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
            const { linkedFileNames } = pkg;
            const { included, excluded } = linkedFileNames;

            const linkedFileNames__included = [...included];
            const linkedFileNames__excluded = [...excluded, linkFolderName, 'node_modules', 'src', 'test'];

            packageFn({
                packagePath,

                packageLinkFolderPath,

                linkedFileNames__included,
                linkedFileNames__excluded,

                readPackageItems() {
                    return fse.readdir(packagePath);
                },

                readLinkedItems() {
                    return fse.readdir(packageLinkFolderPath);
                },
            });
        });
    }
}
