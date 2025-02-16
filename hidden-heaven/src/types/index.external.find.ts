// import type { Item } from './index.external.item';

export namespace FindConfig {
    export interface Glob {
        include?: string[];
        exclude?: string[];
    }

    // export type Func = (item: Item) => boolean;
}

export type FindConfig = FindConfig.Glob;
