import EventEmitter from './EventEmitter';

export default class Activate extends EventEmitter {
    result = {};

    constructor(obj) {
        super();

        this.result = Object.assign(this.result, obj);
    }

    get(key) {
        return this.result[key];
    }

    set(key, value) {
        this.emit(key, value);
    }

    on(key, fn) {
        super.on(key, (newValue) => {
            if (newValue != this.result[key]) {
                try {
                    fn(newValue);
                    this.result[key] = newValue;
                } catch (e) {
                    throw e;
                }
            }
        });
    }
}
