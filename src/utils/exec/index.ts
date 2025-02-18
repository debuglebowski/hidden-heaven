import { spawnSync, type SpawnSyncOptions } from 'node:child_process';

export function execSync(cmd: string[], options: SpawnSyncOptions = {}) {
    return spawnSync(cmd.join(' '), { stdio: 'pipe', shell: true, ...options });
}
