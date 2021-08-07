// Symmetric difference (lodash xor equivalent)
const deepDifference = (arr1: unknown[], arr2: unknown[]): unknown[] => {
    const result: unknown[] = [];

    const checkArray = (a1: unknown[], a2: unknown[]) => {
        let flag = false;

        for (const val of a1) {
            flag = false;
            for (const otherVal of a2) {
                if (Array.isArray(val) && Array.isArray(otherVal)) {
                    const res = deepDifference(val, otherVal);
                    if (res.length == 0) {
                        flag = true;
                    }
                    break;
                } else if (val == otherVal) {
                    flag = true;
                    break;
                }
            }

            if (!flag) {
                result.push(val);
            }
        }
    };

    checkArray(arr1, arr2);
    checkArray(arr2, arr1);

    return result;
};

export { deepDifference };
