declare function consoleLog(arg0: string): void;

export function add(a: isize, b: isize): isize {
    const result = a + b;
    consoleLog(result.toString());
    return result;
}
