import type { Internals } from '~/types';

interface Rules {
    allow?: {
        exact?: string[];
        contains?: string[];
        regex?: RegExp[];
    };

    ignore?: {
        exact?: string[];
        contains?: string[];
        regex?: RegExp[];
    };
}

export function createIgnoredItems__global(context: Internals.Context): Rules {
    return {
        allow: {
            regex: [/^\.*/],
        },
        ignore: {
            exact: ['.git', '.DS_Store', 'node_modules', context.sourceFolderName],
        },
    };
}

export function createIgnoredItems__package(context: Internals.Context): Rules {
    return {
        ignore: {
            exact: ['package.json'],
            contains: ['.lock', '-lock'],
        },
    };
}

export function isValidItem(ignoreConfig: Rules, itemName: string): boolean {
    const isAllowed__exact = ignoreConfig.allow?.exact?.includes(itemName) ?? true;
    const isAllowed__contains = ignoreConfig.allow?.contains?.some((pattern) => itemName.includes(pattern)) ?? true;
    const isAllowed__regex = ignoreConfig.allow?.regex?.some((regex) => itemName.match(regex)) ?? true;
    const isAllowed = isAllowed__exact && isAllowed__contains && isAllowed__regex;

    const isIgnored__exact = ignoreConfig.ignore?.exact?.includes(itemName) ?? false;
    const isIgnored__contains = ignoreConfig.ignore?.contains?.some((pattern) => itemName.includes(pattern)) ?? false;
    const isIgnored__regex = ignoreConfig.ignore?.regex?.some((regex) => itemName.match(regex)) ?? false;
    const isIgnored = isIgnored__exact && isIgnored__contains && isIgnored__regex;

    return isAllowed && !isIgnored;
}
