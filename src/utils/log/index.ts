export function print(message: string) {
    if (process.env.NODE_ENV !== 'test') {
        console.log(message);
    }
}

export function printWarning(message: string) {
    if (process.env.NODE_ENV !== 'test') {
        console.warn(message);
    }
}

export function printError(message: string, error: Error) {
    console.error(message);
    console.error(error.stack);
}
