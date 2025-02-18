import { describe } from 'vitest';
import { runFixture } from 'test/__factory';

describe('basic', () => {
    runFixture({
        name: 'basic',
        args: [],

        packages: {
            '.': {
                linkedFileNames: {
                    included: ['.vscode', '.nxihfq', 'mfoqw.json', '.gitignore'],
                    excluded: ['test', 'src'],
                },
            },
        },
    });
});
