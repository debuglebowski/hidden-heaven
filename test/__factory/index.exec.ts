import { test, expect } from 'vitest';
import { execSync } from '~/utils';

export function execHiddenHeaven(args: string[]) {
    execSync(['hidden-heaven', ...args], { stdio: 'inherit' });
    // execSync(['hidden-heaven', ...args]);
}

export function execHiddenHeavenTest(name: string, args: string[]) {
    test(name, () => {
        expect(() => execHiddenHeaven(args)).not.toThrow();
    });
}
