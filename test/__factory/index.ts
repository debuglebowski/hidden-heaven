import { join } from 'node:path';
import { test, expect } from 'vitest';
import { fse } from '~/utils';
import type { FixtureConfig } from './index.types';
import { execHiddenHeavenTest } from './index.exec';
import { runPackages } from './index.package';

export async function runFixture(config: FixtureConfig) {
    const { runArgs, linkFolderName } = config;

    const linkFolderNameArg = linkFolderName ? ['--link-folder-name', linkFolderName] : [];

    // Hide
    execHiddenHeavenTest('Hide', [...runArgs, ...linkFolderNameArg]);

    runPackages(config, (pkg) => {
        const {
            packagePath,
            packageLinkFolderPath,

            linkedFileNames__included,
            linkedFileNames__excluded,

            readPackageItems,
            readLinkedItems,
            readVscodeSettings,
        } = pkg;

        test('link folder exists', async () => {
            const exists = await fse.exists(packageLinkFolderPath);

            expect(exists).toBe(true);
        });

        test('item coverage', async () => {
            const items = await readPackageItems();

            const notCoveredItems = items.filter((linkedFileName) => {
                const isIncludedItem = linkedFileNames__included.includes(linkedFileName);
                const isExcludedItem = linkedFileNames__excluded.includes(linkedFileName);

                return !isIncludedItem && !isExcludedItem;
            });

            expect(notCoveredItems).toEqual([]);
        });

        test('symlinked items', async () => {
            const linkedItems = await readLinkedItems();

            const missingItems = linkedFileNames__included.filter((linkedFileName) => {
                return !linkedItems.includes(linkedFileName);
            });

            expect(missingItems).toEqual([]);
        });

        test('not symlinked items', async () => {
            const linkedItems = await readLinkedItems();

            const itemsThatShouldNotExist = linkedFileNames__excluded.filter((linkedFileName) => {
                return linkedItems.includes(linkedFileName);
            });

            expect(itemsThatShouldNotExist).toEqual([]);
        });

        test('vscode settings', async () => {
            const linkedItemNames = await readLinkedItems();
            const vscodeSettings = await readVscodeSettings();

            const excludedPaths = Object.keys(vscodeSettings['files.exclude']);

            const linkedItemsPaths = linkedItemNames.map((linkedItemName) => {
                return join(packagePath, linkedItemName);
            });

            const missingLinkedItems = linkedItemsPaths.filter((linkedItemPath) => {
                return !excludedPaths.includes(linkedItemPath);
            });

            expect(missingLinkedItems).toEqual([]);
        });
    });

    // Show
    execHiddenHeavenTest('Show', [...linkFolderNameArg, '--show']);

    runPackages(config, (pkg) => {
        const { testEmptyVscodeSettings } = pkg;

        testEmptyVscodeSettings();
    });

    // Reset
    execHiddenHeavenTest('Reset', [...linkFolderNameArg, '--reset']);

    runPackages(config, (pkg) => {
        const { packageLinkFolderPath, testEmptyVscodeSettings } = pkg;

        test('link folder does not exist', async () => {
            const exists = await fse.exists(packageLinkFolderPath);

            expect(exists).toBe(false);
        });

        testEmptyVscodeSettings();
    });
}
