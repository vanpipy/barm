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
        const addOne = (count) => count + 1;
        const addTwo = (count) => count + 2;
        serializer.push(addOne);
        serializer.push(addTwo);
        serializer.runAsync(0)
            .then(() => {
                expect(serializer.get()).toEqual(3);
            })
            .then(done);
    });
});
