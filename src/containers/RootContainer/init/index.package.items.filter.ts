import type { Internals } from '~/types';

interface IgnoreConfig {
    exact: string[];
    contains: string[];
    regex: RegExp[];
}

export function createIgnoredItems__global(context: Internals.Context) {
    return {
        exact: ['.git', '.DS_Store', context.sourceFolderName],
        contains: ['node_modules'],
        regex: [],
    };
}

export const ignoredItems__global: IgnoreConfig = {
    exact: ['.git', '.DS_Store'],
    contains: ['node_modules'],
    regex: [],
};

export const ignoredItems__package: IgnoreConfig = {
    exact: ['package.json'],
    contains: ['.lock', '-lock'],
    regex: [],
};

export function isValidItem(ignoreConfig: IgnoreConfig, itemName: string) {
    const exactIgnored = ignoreConfig.exact.includes(itemName);
    const containsIgnored = ignoreConfig.contains.some((pattern) => itemName.includes(pattern));
    const regexIgnored = ignoreConfig.regex.some((regex) => itemName.match(regex));

    return !exactIgnored && !containsIgnored && !regexIgnored;
}
