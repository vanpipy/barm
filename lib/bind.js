
export default function bind(fn, context) {
    const key = `__${fn.name}`;

    if (context) {
        context[key] = fn;

        return function(...args) {
            return context[key](args);
        }
    }

    return fn;
}
