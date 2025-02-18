import { test, expect, describe } from 'vitest';
import { execSync, fse } from '~/utils';

interface FixtureConfig {
    name: string;

    args: string[];

    linkFolderName?: string;

    linkedFileNames?: string[];
}

function runHiddenHeaven(args: string[]) {
    execSync(['hidden-heaven', ...args]);
    // execSync(['hidden-heaven', ...args], { stdio: 'inherit' });
}

export async function runFixture(config: FixtureConfig) {
    const { linkFolderName = '.config', args, linkedFileNames = [] } = config;

    describe('Hide', () => {
        test('link folder exists', async () => {
            runHiddenHeaven(args);

            const exists = await fse.pathExists(linkFolderName);

            expect(exists).toBe(true);
        });

        test('symlinked items', async () => {
            const items = await fse.readdir(linkFolderName);

            const missingItems = linkedFileNames.filter((linkedFileName) => {
                return !items.includes(linkedFileName);
            });

            expect(missingItems).toEqual([]);
        });
    });

    describe.skip('Reset', () => {
        test('link folder does not exist', async () => {
            runHiddenHeaven(['--reset']);

            const exists = await fse.pathExists(linkFolderName);

            expect(exists).toBe(false);
        });
    });
}
