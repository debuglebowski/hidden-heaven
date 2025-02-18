import { findUp } from '../findUp';

export function findNodeModules(cwd: string) {
    return findUp('node_modules', cwd);
}
