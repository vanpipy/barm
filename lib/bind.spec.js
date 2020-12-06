'use strict';

import Bind from './bind';

describe('Bind', () => {
    it('should not bind anything when the context is undefined', () => {
        const fn = function() {
            return this.a;
        };
        const fnBinded = Bind(fn, undefined);
        expect(fnBinded).toThrowError('Cannot read property');
    });

    it('should bind a context to the function', () => {
        const obj = { a: 1 };
        const fn = function() {
            return this.a;
        };
        const fnBinded = Bind(fn, obj);
        expect(fnBinded()).toEqual(obj.a);
    });
});
