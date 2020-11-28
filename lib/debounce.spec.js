'use strict';

import { getCurrentTime } from './helper';
import debounce from './debounce';

jest.mock('./helper');

describe('Debounce', () => {
    let times = 0;
    getCurrentTime.mockImplementation(() => times);

    it('should return undefined with calling the debounced function when the timestamp is zero', () => {
        const fn = () => [];
        const fnDebounced = debounce(fn);
        expect(fnDebounced()).toEqual(undefined);
    });

    it('should not run the function pass into debounce when the timestamp is zero', () => {
        const fn = jest.fn();
        const fnDebounced = debounce(fn);
        fnDebounced();
        expect(fn).toHaveBeenCalledTimes(0);
    });

    it('should return undefined with calling the debounced function when the timestamp is less than 1000ms', () => {
        times = 0;
        const fn = () => [];
        const fnDebounced = debounce(fn);
        times = 900;
        expect(fnDebounced()).toEqual(undefined);
    });

    it('should not run the function pass into debounce when the timestamp is less than 1000ms', () => {
        times = 0;
        const fn = jest.fn();
        const fnDebounced = debounce(fn);
        times = 900;
        fnDebounced();
        expect(fn).toHaveBeenCalledTimes(0);
    });

    it('should return the result from the debounced function when the timestamp is greater than the delay', () => {
        times = 0;
        const fn = () => 10;
        const fnDebounced = debounce(fn);
        times = 1001;
        expect(fnDebounced()).toEqual(10);
    });

    it('should call the debounced function when the timestamp is greater than the delay', () => {
        times = 0;
        const fn = jest.fn();
        const fnDebounced = debounce(fn);
        times = 1001;
        fnDebounced();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should put off the time of calling the function always when calls the debounced function again in the delay time', () => {
        times = 0;
        const fn = jest.fn();
        const fnDebounced = debounce(fn);
        fnDebounced();
        expect(fn).toHaveBeenCalledTimes(0);
        times = 200;
        fnDebounced();
        expect(fn).toHaveBeenCalledTimes(0);
        times = 1200;
        fnDebounced();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should set the delay time', () => {
        times = 0;
        const fn = jest.fn();
        const fnDebounced = debounce(fn, 2000);
        times = 2000;
        fnDebounced();
        expect(fn).toHaveBeenCalledTimes(1);
    });
});
