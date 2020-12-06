
const isArray = (arr) => Object.prototype.toString.call(arr) === '[object Array]';

export default function flat(arr) {
    let i = 0;
    let length = arr.length;

    while (true) {
        const element = arr[i];

        if (isArray(element)) {
            arr.splice.apply(arr, [i, 1].concat(element));
            length = arr.length;
            continue;
        }

        i += 1;
        
        if (i >= length) {
            break;
        }
    }

    return arr.slice();
}
