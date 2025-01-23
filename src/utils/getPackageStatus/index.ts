export function getPackageStatus(packageName: string) {
    try {
        require.resolve(packageName);
        return true;
    } catch (err) {
        return false;
    }
}
