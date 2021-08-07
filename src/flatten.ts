const flatten = <T>(arr: T[] | Set<T> = []): T[] => {
    let list: T[] = [];

    for (const v of arr) {
        list = list.concat(v instanceof Array || v instanceof Set ? flatten(v) : v);
    }

    return list;
};

export { flatten };
