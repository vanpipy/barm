'use strict';

import { getCurrentTime } from './helper';

export default function throttle(fn, delay = 1000) {
    let hasCalled = false;
    let startTime = getCurrentTime();

    return function(...args) {
        const now = getCurrentTime();

        if (now - delay >= startTime) {
            hasCalled = false;
        }

        if (!hasCalled) {
            hasCalled = true
            return fn.apply(this, args);
        }
    }
}
