export interface Package {
    linkedFileNames: {
        included: string[]; // File names that should be present in the link folder
        excluded: string[]; // File names that should not be present in the link folder
    };
}

export interface FixtureConfig {
    name: string;

    args: string[];

    linkFolderName?: string;

    packages: Record<string, Package>;
}
