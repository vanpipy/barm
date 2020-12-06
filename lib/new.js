'use strict';

export default function New(_parent, ...args) {
    const instance = Object.create(_parent.prototype);
    _parent.apply(instance, args);
    return instance;
}
