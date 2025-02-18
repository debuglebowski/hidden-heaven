import { test, expect, describe } from 'vitest';
import { execSync, fse } from '~/utils';

interface Package {
    linkedFileNames: {
        included: string[]; // File names that should be present in the link folder
        excluded: string[]; // File names that should not be present in the link folder
    };
}

interface FixtureConfig {
    name: string;

    args: string[];

    linkFolderName?: string;

    packages: Record<string, Package>;
}

function runHiddenHeaven(args: string[]) {
    execSync(['hidden-heaven', ...args]);
    // execSync(['hidden-heaven', ...args], { stdio: 'inherit' });
}

export async function runFixture(config: FixtureConfig) {
    const { linkFolderName = '.config', args, packages } = config;

    describe('Hide', () => {
        for (const packageName in packages) {
            const { linkedFileNames } = packages[packageName];

            describe(`Package "${packageName}"`, () => {
                test('link folder exists', async () => {
                    runHiddenHeaven(args);

                    const exists = await fse.pathExists(linkFolderName);

                    expect(exists).toBe(true);
                });

                test('item coverage', async () => {
                    const items = await fse.readdir(linkFolderName);

                    console.log(items);

                    const notCoveredItems = items.filter((linkedFileName) => {
                        const isIncludedItem = linkedFileNames.included.includes(linkedFileName);
                        const isExcludedItem = linkedFileNames.excluded.includes(linkedFileName);

                        return !isIncludedItem && !isExcludedItem;
                    });

                    expect(notCoveredItems).toEqual([]);
                });

                test('symlinked items', async () => {
                    const items = await fse.readdir(linkFolderName);

                    const missingItems = linkedFileNames.included.filter((linkedFileName) => {
                        return !items.includes(linkedFileName);
                    });

                    expect(missingItems).toEqual([]);
                });

                test('not symlinked items', async () => {
                    const items = await fse.readdir(linkFolderName);

                    const itemsThatShouldNotExist = linkedFileNames.excluded.filter((linkedFileName) => {
                        return items.includes(linkedFileName);
                    });

                    expect(itemsThatShouldNotExist).toEqual([]);
                });
            });
        }
    });

    describe('Reset', () => {
        test('link folder does not exist', async () => {
            runHiddenHeaven(['--reset']);

            const exists = await fse.pathExists(linkFolderName);

            expect(exists).toBe(false);
        });
    });
}
