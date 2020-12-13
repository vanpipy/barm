
import Activate from './Activate';

describe('Activate', () => {
    it('should activate an object to have reactive attributes', () => {
        let cache = 1;
        const obj = { a: cache };
        const result = new Activate(obj);

        result.on('a', (newValue) => cache = newValue);

        result.set('a', 2)
        expect(obj.a).toEqual(1);
        expect(result.get('a')).toEqual(2);
        expect(cache).toEqual(2);
    });

    it('should add a new attribute onto an reactive object', () => {
        let cache = 10;
        const obj = {};
        const result = new Activate(obj);

        result.on('a', (newValue) => cache = newValue);

        result.set('a', 0);
        expect(cache).toEqual(0);
        expect(result.get('a')).toEqual(0);
    });

    it('should not update the value and trigger the callback when the new value assigned is same to the original value', () => {
        const obj = { a: 10 };
        const result = new Activate(obj);
        const fn = jest.fn();

        result.on('a', fn);

        result.set('a', 10);
        expect(result.get('a')).toEqual(10);
        expect(fn).toHaveBeenCalledTimes(0);
    });

    it('should update the value and trigger the callback when the new value assigned is not same to the original value', () => {
        let cache = 20;
        const obj = { a: 10 };
        const result = new Activate(obj);
        const fn = jest.fn().mockImplementation((newValue) => cache = newValue);

        result.on('a', fn);

        result.set('a', 1);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(cache).toEqual(1);
        expect(result.get('a')).toEqual(1);
    });
});
