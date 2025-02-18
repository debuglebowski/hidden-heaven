import { test, expect, describe } from 'vitest';
import { fse } from '~/utils';
import type { FixtureConfig } from './index.types';
import { execHiddenHeaven } from './index.exec';
import { runPackages } from './index.package';

export async function runFixture(config: FixtureConfig) {
    const { args } = config;

    describe('Hide', () => {
        runPackages(config, (pkg) => {
            const {
                packageLinkFolderPath,

                linkedFileNames__included,
                linkedFileNames__excluded,

                readPackageItems,
                readLinkedItems,
            } = pkg;

            test('link folder exists', async () => {
                execHiddenHeaven(args);

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
        });
    });

    describe('Reset', () => {
        runPackages(config, ({ packageLinkFolderPath }) => {
            test('link folder does not exist', async () => {
                execHiddenHeaven(['--reset']);

                const exists = await fse.exists(packageLinkFolderPath);

                expect(exists).toBe(false);
            });
        });
    });
}
