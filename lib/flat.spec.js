'use strict';

import flat from './flat';

describe('flat', () => {
    it('should return a flatted array which contains the array child', () => {
        let arr = [
            0,
            1,
            [2, 3],
            [4, [ 5, 6 ]],
            7,
        ];
        expect(flat(arr)).toEqual([0,1,2,3,4,5,6,7]);

        arr = [
            [0],
            [1, [2]],
            [3, [4, [5]]],
            [6],
            7
        ];
        expect(flat(arr)).toEqual([0,1,2,3,4,5,6,7]);
    });

    it('should return an new array when the input array is empty', () => {
        const arr = [];
        const actual = flat(arr);
        expect(actual).toEqual([]);
        expect(actual !== arr).toEqual(true);
    });
});
