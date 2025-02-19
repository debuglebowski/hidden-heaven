import { runFixture } from 'test/__factory';
import { describe } from 'vitest';

describe('Init', () => {
    runFixture({
        name: 'init',
        runArgs: ['--init'],
        packages: {
            '.': {
                linkedFileNames: {
                    included: [
                        '.vscode',
                        '.gitignore',
                        '.dockerignore',
                        '.env.development',
                        '.env.production',
                        '.eslintignore',
                        '.eslintrc.json',
                        '.folder',
                        '.folder2',
                        '.gitattributes',
                        '.github',
                        '.npmrc',
                        'CONTRIBUTING.md',
                        'README.md',
                        'commitlint.config.js',
                        'pnpm-lock.yaml',
                        'pnpm-workspace.yaml',
                        'renovate.json',
                        'tsconfig.base.json',
                        'tsconfig.build.json',
                        'tsconfig.eslint.json',
                        'tsconfig.spec.json',
                        'turbo.json',
                        'vite.config.ts',
                        'vitest.config.ts',
                    ],
                    excluded: ['package.json'],
                },
            },
            'src/nested/folder': {
                linkedFileNames: {
                    included: ['.env.development', 'tsconfig.json', 'turbo.json'],
                    excluded: ['package.json'],
                },
            },
            'src/nested/project': {
                linkedFileNames: {
                    included: ['tsconfig.json', 'vite.config.ts', 'vitest.config.ts'],
                    excluded: ['package.json'],
                },
            },
        },
    });
});
