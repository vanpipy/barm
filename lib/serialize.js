
const asyncNext = (value) => Promise.resolve(value);

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

        const chain = this.queue.reduce((promise, fn) => {
            return promise
                .then((value) => fn(value, asyncNext))
                .then((value) => value)
        }, Promise.resolve(this.result));

        return chain.then((value) => this.result = value);
    }
}

export default function serialize(queue = []) {
    return new Serializer(queue);
}
