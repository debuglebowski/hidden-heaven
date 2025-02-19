import { join } from 'node:path';
import type { FixtureConfig } from './index.types';
import { fse, parseJson } from '~/utils';
import { describe, expect, test } from 'vitest';

export interface PackageFnConfig {
    packagePath: string;

    packageLinkFolderPath: string;

    linkedFileNames__included: string[];
    linkedFileNames__excluded: string[];

    readPackageItems(): Promise<string[]>;
    readLinkedItems(): Promise<string[]>;
    readVscodeSettings(): Promise<any>;

    testEmptyVscodeSettings(): void;
}

export interface PackageFn {
    (config: PackageFnConfig): void;
}

export function runPackages(config: FixtureConfig, packageFn: PackageFn) {
    const { packages, linkFolderName = '.config' } = config;

    for (const packagePath in packages) {
        const pkg = packages[packagePath];

        const packageLinkFolderPath = join(process.cwd(), packagePath, linkFolderName);
        const vscodeSettingsPath = join(process.cwd(), '.vscode', 'settings.json');

        const { linkedFileNames } = pkg;
        const { included, excluded } = linkedFileNames;

        const linkedFileNames__included = [...included];
        const linkedFileNames__excluded = [...excluded, linkFolderName, 'node_modules', 'src', 'test'];

        function readPackageItems() {
            return fse.readdir(packagePath);
        }

        function readLinkedItems() {
            return fse.readdir(packageLinkFolderPath);
        }

        function readVscodeSettings() {
            return fse.readFile(vscodeSettingsPath, 'utf8').then(parseJson);
        }

        packageFn({
            packagePath,

            packageLinkFolderPath,

            linkedFileNames__included,
            linkedFileNames__excluded,

            readPackageItems,
            readLinkedItems,
            readVscodeSettings,

            testEmptyVscodeSettings() {
                test('empty vscode settings', async () => {
                    const vscodeSettings = await readVscodeSettings();

                    expect(vscodeSettings).toEqual({
                        'files.exclude': {},
                    });
                });
            },
        });
    }
}
