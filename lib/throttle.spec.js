'use strict';

import { getCurrentTime } from './helper';
import throttle from './throttle';

jest.mock('./helper');

describe('Throttle', () => {
    let times = 0;
    getCurrentTime.mockImplementation(() => times);

    it('should trigger the callback at the first time', () => {
        const fn = jest.fn();
        const fnThrottled = throttle(fn);
        fnThrottled();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should not trigger the callback again in the range from zero to delay time', () => {
        times = 0;
        const fn = jest.fn();
        const fnThrottled = throttle(fn);
        fnThrottled();
        times = 200;
        fnThrottled();
        expect(fn).toHaveBeenCalledTimes(1);
        times = 400;
        fnThrottled();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should trigger tht callback again after the delay time', () => {
        times = 0;
        const fn = jest.fn();
        const fnThrottled = throttle(fn);
        fnThrottled();
        times = 1000;
        fnThrottled();
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should change the default delay time', () => {
        times = 0;
        const fn = jest.fn();
        const fnThrottled = throttle(fn, 2000);
        fnThrottled();
        expect(fn).toHaveBeenCalledTimes(1);
        times = 1000;
        fnThrottled();
        expect(fn).toHaveBeenCalledTimes(1);
        times = 2000;
        fnThrottled();
        expect(fn).toHaveBeenCalledTimes(2);
    });
});
