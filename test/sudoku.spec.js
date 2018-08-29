const expect = require('chai').expect;

const sudoku = require('../src/sudoku');

describe('The sudoku module', () => {

    it('should be an object', () => {
        expect(sudoku).to.be.an('object');
    });

    it('should include an is_solution method', () => {
        expect(sudoku.is_solution).to.be.a('function');
    });

    it('should return false for invalid solutions', () => {
        expect(sudoku.is_solution([])).to.equal(false);
        expect(sudoku.is_solution([[], [], []])).to.equal(false);
        expect(sudoku.is_solution([[], [], [], [], [], [], [], [], []])).to.equal(false);

        const invalidSolution = [
            [9, 9, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 6, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 1, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 6, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 6, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1]
        ];
        expect(sudoku.is_solution(invalidSolution)).to.equal(false);
    });

    it('should return true for valid solutions', () => {
        const validSolution = [
            [7, 5, 9, 4, 6, 3, 1, 2, 8],
            [4, 6, 2, 5, 1, 8, 9, 7, 3],
            [8, 1, 3, 2, 9, 7, 6, 4, 5],
            [6, 9, 7, 5, 8, 4, 2, 3, 1],
            [1, 8, 4, 2, 3, 6, 7, 9, 5],
            [5, 3, 2, 9, 7, 1, 4, 8, 6],
            [3, 4, 5, 9, 1, 2, 8, 7, 6],
            [8, 2, 1, 6, 4, 7, 3, 5, 9],
            [7, 6, 9, 3, 5, 8, 1, 2, 4]
        ];
        expect(sudoku.is_solution(validSolution)).to.equal(true);
    });

    describe('the is_sub_array_valid method', () => {
        it('should be a function', () => {
            expect(sudoku.is_sub_array_valid).to.be.a('function');
        });

        it('return false for invalid sub-arrays', () => {
            expect(sudoku.is_sub_array_valid()).to.equal(false);
            expect(sudoku.is_sub_array_valid([])).to.equal(false);
            expect(sudoku.is_sub_array_valid(["one", "two", "three"])).to.equal(false);

            const arrayIsTooShort = [1, 2, 3, 4, 5, 6, 7];
            expect(sudoku.is_sub_array_valid(arrayIsTooShort)).to.equal(false);

            const arrayHasDuplicates = [1, 1, 2, 3, 4, 5, 6, 7, 8];
            expect(sudoku.is_sub_array_valid(arrayHasDuplicates)).to.equal(false);
        });

        it('should return true for valid arrays', () => {
            const validArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            expect(sudoku.is_sub_array_valid(validArray1)).to.equal(true);

            const validArray2 = [5, 7, 2, 1, 4, 8, 9, 3, 6];
            expect(sudoku.is_sub_array_valid(validArray2)).to.equal(true);
        });
    });

    describe('getting rows from the main grid', () => {
        it('should be a method exported from the main module', () => {
            expect(sudoku.get_row).to.be.a('function');
        });

        it('return an empty array for invalid arguments', () => {
            expect(sudoku.get_row()).to.deep.equal([]);
            expect(sudoku.get_row([])).to.deep.equal([]);
            expect(sudoku.get_row([[], [], []])).to.deep.equal([]);
        });

        it('expects an array of three sub-arrays and a specifier, and returns the top three cells of each', () => {
            const subArrays = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            ];

            const expectedResult = [1, 2, 3, 1, 2, 3, 1, 2, 3];

            expect(sudoku.get_row(subArrays, 'top')).to.deep.equal(expectedResult);
        });

        it('expects an array of three sub-arrays and a specifier, and returns the middle three cells of each', () => {
            const subArrays = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            ];

            const expectedResult = [4, 5, 6, 4, 5, 6, 4, 5, 6];

            expect(sudoku.get_row(subArrays, 'middle')).to.deep.equal(expectedResult);
        });

        it('expects an array of three sub-arrays and a specifier, and returns the bottom three cells of each', () => {
            const subArrays = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            ];

            const expectedResult = [7, 8, 9, 7, 8, 9, 7, 8, 9];

            expect(sudoku.get_row(subArrays, 'bottom')).to.deep.equal(expectedResult);
        });
    });

    describe('getting columns from the main grid', () => {
        it('should be a method exported from the main module', () => {
            expect(sudoku.get_column).to.be.a('function');
        });

        it('return an empty array for invalid arguments', () => {
            expect(sudoku.get_column()).to.deep.equal([]);
            expect(sudoku.get_column([])).to.deep.equal([]);
            expect(sudoku.get_column([[], [], []])).to.deep.equal([]);
        });

        it('expects an array of three sub-arrays and a specifier, and returns the top three cells of each', () => {
            const subArrays = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            ];

            const expectedResult = [1, 4, 7, 1, 4, 7, 1, 4, 7];

            expect(sudoku.get_column(subArrays, 'left')).to.deep.equal(expectedResult);
        });

        it('expects an array of three sub-arrays and a specifier, and returns the middle three cells of each', () => {
            const subArrays = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            ];

            const expectedResult = [2, 5, 8, 2, 5, 8, 2, 5, 8];

            expect(sudoku.get_column(subArrays, 'middle')).to.deep.equal(expectedResult);
        });

        it('expects an array of three sub-arrays and a specifier, and returns the bottom three cells of each', () => {
            const subArrays = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            ];

            const expectedResult = [3, 6, 9, 3, 6, 9, 3, 6, 9];

            expect(sudoku.get_column(subArrays, 'right')).to.deep.equal(expectedResult);
        });
    });

});
