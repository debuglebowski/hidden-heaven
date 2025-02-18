export function getPackageStatus(packageName: string) {
    try {
        const packagePath = require.resolve(packageName);

        return { isPackageInstalled: true, packagePath };
    } catch (err) {
        return { isPackageInstalled: false, packagePath: '' };
    }
}
