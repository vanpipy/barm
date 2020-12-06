
export default class EventEmitter {
    constructor() {
        this.cache = {};
    }

    on(name, callback) {
        this.cache[name] = this.cache[name]
            ? this.cache[name].concat(callback)
            : [callback];
    }

    off(name, callback) {
        const container = this.cache[name];

        if (callback) {
            const index = container.indexOf(callback);
            container.splice(index, 1);
        } else {
            container.length = 0;
        }
    }

    emit(name, payload) {
        const container = this.cache[name];

        if (container && container.length) {
            const triggerCallback = (callback) => callback(payload);
            container.forEach(triggerCallback);
        }
    }

    emitOnce(name, payload) {
        this.emit(name, payload);
        this.off(name);
    }
}
