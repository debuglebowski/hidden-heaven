import type { Context } from '~/types';

export async function validateContext(context: Context) {
    const { initMode, vscode, onItem } = context;

    if (initMode) {
        if (initMode !== 'all' && typeof initMode !== 'boolean') {
            throw new Error('initMode must be a boolean or "all"');
        }
    }

    if (vscode) {
        if (typeof vscode !== 'boolean') {
            throw new Error('vscode must be a boolean');
        }
    }

    if (onItem) {
        if (typeof onItem !== 'function') {
            throw new Error('onItem must be a function');
        }
    }

    return context;
}
