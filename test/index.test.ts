import { describe, test, expect, beforeAll } from 'vitest';

interface FixtureConfig {
    name: string;
    args: string[];
}

function runFixture(config: FixtureConfig) {
    describe(config.name, () => {
        beforeAll(() => {
            // console.log('say hello');
        });

        test('should be true', () => {
            expect(true).toBe(true);
        });
    });
}

describe('fixtures', () => {
    /**
     * Should just
     */
    describe('basic', () => {
        runFixture({ name: 'basic', args: [] });
    });

    describe('named', () => {
        runFixture({ name: 'named', args: ['--link-folder-name', '.files'] });
    });

    describe('config', () => {
        runFixture({ name: 'config', args: [] });
    });

    describe('init', () => {
        runFixture({ name: 'init', args: ['--init'] });
    });

    test('should be true', () => {
        expect(true).toBe(true);
    });
});
