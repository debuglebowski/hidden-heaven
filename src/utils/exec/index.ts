import { spawnSync } from 'node:child_process';

export function execSync(cmd: string[]) {
    return spawnSync(cmd.join(' '), { stdio: 'pipe', shell: true });
}
