import { execSync } from '~/utils';

export function runHiddenHeaven(args: string[]) {
    // execSync(['hidden-heaven', ...args]);
    execSync(['hidden-heaven', ...args], { stdio: 'inherit' });
}
