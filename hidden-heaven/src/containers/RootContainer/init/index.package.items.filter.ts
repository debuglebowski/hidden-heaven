import type { Internals } from '~/types';
import type { fse } from '~/utils';

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

interface RulesConfig {
    any?: Rules;
    file?: Rules;
    folder?: Rules;
}

export function createRulesConfig__all(context: Internals.Context): RulesConfig {
    return {
        any: {
            ignore: {
                exact: ['.DS_Store', context.sourceFolderName],
                contains: ['.git'],
            },
        },
        folder: {
            allow: {
                regex: [/^\./],
            },
        },
    };
}

export function createRulesConfig__opinionated(context: Internals.Context): RulesConfig {
    return {
        any: {
            ignore: {
                exact: ['package.json'],
                contains: ['.lock', '-lock'],
            },
        },
    };
}

function validateItemWithRules(item: fse.Dirent, rules: Rules = {}): boolean {
    const isAllowed__exact = rules.allow?.exact?.includes(item.name) ?? true;
    const isAllowed__contains = rules.allow?.contains?.some((pattern) => item.name.includes(pattern)) ?? true;
    const isAllowed__regex = rules.allow?.regex?.some((regex) => item.name.match(regex)) ?? true;
    const isAllowed = isAllowed__exact && isAllowed__contains && isAllowed__regex;

    const isIgnored__exact = rules.ignore?.exact?.includes(item.name) ?? false;
    const isIgnored__contains = rules.ignore?.contains?.some((pattern) => item.name.includes(pattern)) ?? false;
    const isIgnored__regex = rules.ignore?.regex?.some((regex) => item.name.match(regex)) ?? false;
    const isIgnored = isIgnored__exact || isIgnored__contains || isIgnored__regex;

    return isAllowed && !isIgnored;
}

export function isValidItem(config: RulesConfig, item: fse.Dirent): boolean {
    const isValid__any = validateItemWithRules(item, config.any);
    const isValid__file = item.isFile() ? validateItemWithRules(item, config.file) : true;
    const isValid__folder = item.isDirectory() ? validateItemWithRules(item, config.folder) : true;

    return isValid__any && isValid__file && isValid__folder;
}
