import { describe, test, expect, beforeAll } from 'vitest';

interface FixtureConfig {
    name: string;
    args: string[];
}

export function runFixture(config: FixtureConfig) {
    describe(config.name, () => {
        beforeAll(() => {
            // console.log('say hello');
        });

        test('should be true', () => {
            expect(true).toBe(true);
        });
    });
}
