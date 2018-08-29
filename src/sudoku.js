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
    if (!grid || grid.length < 9)
        return false;

    for (let i = 0; i < 9; i++)
        if (!is_sub_array_valid(grid[i]))
            return false;

    const topGridRow = [grid[0], grid[1], grid[2]];
    const middleGridRow = [grid[3], grid[4], grid[5]];
    const bottomGridRow = [grid[6], grid[7], grid[8]];

    const topRow1 = get_row(topGridRow, 'top');
    const topRow2 = get_row(topGridRow, 'middle');
    const topRow3 = get_row(topGridRow, 'bottom');

    const middleRow1 = get_row(middleGridRow, 'top');
    const middleRow2 = get_row(middleGridRow, 'middle');
    const middleRow3 = get_row(middleGridRow, 'bottom');

    const bottomRow1 = get_row(bottomGridRow, 'top');
    const bottomRow2 = get_row(bottomGridRow, 'middle');
    const bottomRow3 = get_row(bottomGridRow, 'bottom');

    const leftGridColumn = [grid[0], grid[3], grid[6]];
    const middleGridColumn = [grid[1], grid[4], grid[7]];
    const rightGridColumn = [grid[2], grid[5], grid[8]];

    const leftGrid1 = get_column(leftGridColumn, 'left');
    const leftGrid2 = get_column(leftGridColumn, 'middle');
    const leftGrid3 = get_column(leftGridColumn, 'right');

    const middleGrid1 = get_column(middleGridColumn, 'left');
    const middleGrid2 = get_column(middleGridColumn, 'middle');
    const middleGrid3 = get_column(middleGridColumn, 'right');

    const rightGrid1 = get_column(rightGridColumn, 'left');
    const rightGrid2 = get_column(rightGridColumn, 'middle');
    const rightGrid3 = get_column(rightGridColumn, 'right');

    const allRowsAndColumns = [
        topRow1,
        topRow2,
        topRow3,
        middleRow1,
        middleRow2,
        middleRow3,
        bottomRow1,
        bottomRow2,
        bottomRow3,
        leftGrid1,
        leftGrid2,
        leftGrid3,
        middleGrid1,
        middleGrid2,
        middleGrid3,
        rightGrid1,
        rightGrid2,
        rightGrid3
    ];

    const allRowsAndColumnsAreValid = allRowsAndColumns.every(is_sub_array_valid);

    return allRowsAndColumnsAreValid;
}

/**
 * Expects an array of integers. If the array has length nine and contains exactly
 * the number 1-9 with no duplicates, it is valid.
 */
function is_sub_array_valid(subArray) {
    return !!subArray && subArray.length === 9 && arrayContainsDigits1to9(subArray);

    function arrayContainsDigits1to9(array) {
        const sortedArray = array.slice().sort();

        //expected values for the sorted array are [1,2,3,4,5,6,7,8,9]
        //which is the index of each value +1
        for (let i = 1; i < 9; i++) {
            const expected = i + 1;
            if (sortedArray[i] !== expected)
                return false;
        }

        return true;
    }
}

function get_row(arrayOfSubArrays, which) {
    if (!arrayOfSubArrays ||
        arrayOfSubArrays.length < 3 ||
        arrayOfSubArrays[0].length < 3 ||
        arrayOfSubArrays[1].length < 3 ||
        arrayOfSubArrays[2].length < 3)
        return [];

    var index0 = 0;
    var index1 = 1;
    var index2 = 2;

    if (which === 'bottom') {
        index0 = 6;
        index1 = 7;
        index2 = 8;
    }
    else if (which === 'middle') {
        index0 = 3;
        index1 = 4;
        index2 = 5;
    }

    const array0 = arrayOfSubArrays[0];
    const array1 = arrayOfSubArrays[1];
    const array2 = arrayOfSubArrays[2];
    return [
        array0[index0],
        array0[index1],
        array0[index2],

        array1[index0],
        array1[index1],
        array1[index2],

        array2[index0],
        array2[index1],
        array2[index2]
    ];
}

function get_column(arrayOfSubArrays, which) {
    if (!arrayOfSubArrays ||
        arrayOfSubArrays.length < 3 ||
        arrayOfSubArrays[0].length < 3 ||
        arrayOfSubArrays[1].length < 3 ||
        arrayOfSubArrays[2].length < 3)
        return [];

    var index0 = 0;
    var index1 = 3;
    var index2 = 6;

    if (which === 'right') {
        index0 = 2;
        index1 = 5;
        index2 = 8;
    }
    else if (which === 'middle') {
        index0 = 1;
        index1 = 4;
        index2 = 7;
    }

    const array0 = arrayOfSubArrays[0];
    const array1 = arrayOfSubArrays[1];
    const array2 = arrayOfSubArrays[2];
    return [
        array0[index0],
        array0[index1],
        array0[index2],

        array1[index0],
        array1[index1],
        array1[index2],

        array2[index0],
        array2[index1],
        array2[index2]
    ];
}
module.exports = {
    get_column,
    get_row,
    is_solution,
    is_sub_array_valid
};
