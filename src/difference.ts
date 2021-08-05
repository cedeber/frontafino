const result = [];

/* Defining the function with two
    arguments array inputs */
function difference(arr1, arr2) {
    var i = 0,
        j = 0;
    var flag = false;

    /* For array 1 */
    for (i = 0; i < arr1.length; i++) {
        /* Reseting the flag and the
            other array iterator */
        j = 0;
        flag = false;
        while (j != arr2.length) {
            if (arr1[i] == arr2[j]) {
                flag = true;
                break;
            }
            j++;
        }

        /* If value is not present in the
            second array then push that value
            to the resultant array */
        if (!flag) {
            result.push(arr1[i]);
        }
    }
    flag = false;

    /* For array 2 */
    for (i = 0; i < arr2.length; i++) {
        /* Reseting the flag and the
            other array iterator */
        j = 0;
        flag = false;
        while (j != arr1.length) {
            if (arr2[i] == arr1[j]) {
                flag = true;
                break;
            }
            j++;
        }

        /* If value is not present in the
            first array then push that value
            to the resultant array */
        if (!flag) {
            result.push(arr2[i]);
        }
    }
    return result;
}

export { difference };
