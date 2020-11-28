'use strict';

import { getCurrentTime } from './helper';

export default function debounce(fn, delay = 1000) {
    let startTime = getCurrentTime();

    return function(...args) {
        const now = getCurrentTime();

        if (now - delay >= startTime) {
            return fn.apply(this, args)
        } else {
            startTime = getCurrentTime();
        }
    }
}
