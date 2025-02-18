import { test, expect, describe } from 'vitest';
import { fse } from '~/utils';
import type { FixtureConfig } from './index.types';
import { execHiddenHeaven } from './index.exec';
import { runPackages } from './index.package';

export async function runFixture(config: FixtureConfig) {
    const { args } = config;

    describe('Hide', () => {
        runPackages(config, ({ linkedFileNames, readItems }) => {
            test('link folder exists', async () => {
                execHiddenHeaven(args);

                const exists = await readItems();

                expect(exists).toBe(true);
            });

            test('item coverage', async () => {
                const items = await readItems();

                const notCoveredItems = items.filter((linkedFileName) => {
                    const isIncludedItem = linkedFileNames.included.includes(linkedFileName);
                    const isExcludedItem = linkedFileNames.excluded.includes(linkedFileName);

                    return !isIncludedItem && !isExcludedItem;
                });

                expect(notCoveredItems).toEqual([]);
            });

            test('symlinked items', async () => {
                const items = await readItems();

                const missingItems = linkedFileNames.included.filter((linkedFileName) => {
                    return !items.includes(linkedFileName);
                });

                expect(missingItems).toEqual([]);
            });

            test('not symlinked items', async () => {
                const items = await readItems();

                const itemsThatShouldNotExist = linkedFileNames.excluded.filter((linkedFileName) => {
                    return items.includes(linkedFileName);
                });

                expect(itemsThatShouldNotExist).toEqual([]);
            });
        });
    });

    describe('Reset', () => {
        runPackages(config, ({ packageLinkFolderPath, readItems }) => {
            test('link folder does not exist', async () => {
                execHiddenHeaven(['--reset']);

                const exists = await fse.exists(packageLinkFolderPath);

                expect(exists).toBe(false);
            });
        });
    });
}
