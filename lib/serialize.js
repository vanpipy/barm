
class Serializer {
    constructor(queue) {
        this.queue = queue;
    }

    push(fn) {
        this.queue.push(fn);
    }

    get() {
        return this.result;
    }

    run(arg) {
        const length = this.queue.length;
        let i = 0;

        this.result = arg;

        while (i < length) {
            this.result = this.queue[i].call(this, this.result);

            i += 1;
        }

        return this.result;
    }

    runAsync(arg) {
        this.result = arg;

        return this.queue.reduce((promise, fn) => {
            promise.then(() => {
                this.result = fn(this.result);
                return this.result;
            });
            return promise;
        }, Promise.resolve());
    }
}

export default function serialize(queue = []) {
    return new Serializer(queue);
}
