'use strict';

import serialize from './serialize';

describe('serialize', () => {
    it('should run the queue functions synchronously', () => {
        const serializer = serialize([]);
        const addOne = (count) => count + 1;
        const addTwo = (count) => count + 2;
        serializer.push(addOne);
        serializer.push(addTwo);
        serializer.run(0);
        expect(serializer.get()).toEqual(3);
    });

    it('should run the queue functions asynchronously', (done) => {
        const serializer = serialize([]);
        const addOne = (count, next) => next(count + 1);
        const addTwo = (count, next) => next(count + 2);
        serializer.push(addOne);
        serializer.push(addTwo);
        serializer.runAsync(0)
            .then((value) => {
                expect(serializer.get()).toEqual(value);
                expect(value).toEqual(3);
            })
            .then(done);
    });
});
