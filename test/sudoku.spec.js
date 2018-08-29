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
            [9, 8, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 6, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 6, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 6, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1],
            [1, 1, 2, 2, 3, 4, 5, 6, 7],
            [9, 8, 7, 6, 5, 5, 3, 2, 1]
        ];
        expect(sudoku.is_solution(invalidSolution)).to.equal(false);
    });

    it('should return true for valid solutions', () => {
        //TODO: valid solution
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
            const validArray1 = [1,2,3,4,5,6,7,8,9];
            expect(sudoku.is_sub_array_valid(validArray1)).to.equal(true);

            const validArray2 = [5,7,2,1,4,8,9,3,6];
            expect(sudoku.is_sub_array_valid(validArray2)).to.equal(true);
        });
    });

});
