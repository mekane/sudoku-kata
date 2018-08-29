/**
 * grid is an array of 9 arrays representing the 81-cell sudoku board.
 * Each sub-array is expected to be a an array of length 9 representing
 * the cells within that group. Groups in the main board and cells within
 * the groups are indexed according to this pattern:
 *
 *  +---+---+---+
 *  | 0 | 1 | 2 |
 *  +---+---+---+
 *  | 3 | 4 | 5 |
 *  +---+---+---+
 *  | 6 | 7 | 8 |
 *  +---+---+---+
 *
 * @returns {boolean} if the array satisfies the following three rules:
 *   1. Each of the sub-arrays contains exactly nine numbers, exactly 1-9
 *   2. Each of the cells in each row of the main grid (crossing sub-arrays) contains 1-9
 *   3. Each of the cells in each column of the main grid (crossing sub-arrays) contains 1-9
 */

function is_solution(grid) {
    return false;
}

/**
 * Expects an array of integers. If the array has length nine and contains exactly
 * the number 1-9 with no duplicates, it is valid.
 */
function is_sub_array_valid(subArray) {
    return !!subArray && subArray.length === 9 && arrayContainsDigits1to9(subArray);

    function arrayContainsDigits1to9(array) {
        const sortedArray = array.sort();

        //expected values for the sorted array are [1,2,3,4,5,6,7,8,9]
        //which is the index of each value +1
        for (i = 1; i < 9; i++) {
            const expected = i + 1;
            if (sortedArray[i] !== expected)
                return false;
        }

        return true;
    }
}

module.exports = {
    is_solution,
    is_sub_array_valid
};
