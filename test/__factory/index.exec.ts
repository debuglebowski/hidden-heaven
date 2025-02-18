import { execSync } from '~/utils';

export function execHiddenHeaven(args: string[]) {
    execSync(['hidden-heaven', ...args]);
    // execSync(['hidden-heaven', ...args], { stdio: 'inherit' });
}
