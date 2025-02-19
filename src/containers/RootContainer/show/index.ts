import type { RootContainer } from '..';

export async function show(this: RootContainer) {
    await this.vscode.reset();
}
