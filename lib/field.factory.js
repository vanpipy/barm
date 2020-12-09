
const defaultLabel = `
    <label>{label}</label>
`;

const defaultInput = `
    <input value="{input}"/>
`;

const defaultValidator = [
    (value) => {
        if (!value) {
            return 'The value cannot an empty string'
        }
    }
];

export default class Field {
    _label = 'default label';
    _input = 'default input';
    _validator = defaultValidator;
    _error = '';

    get validator() {
        return this._validator;
    }

    set validator(value) {
        this._validator = defaultValidator.concat(value);
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get input() {
        return this._input;
    }

    set input(value) {
        this._input = value;
        this._onInputChange(this._input);
    }

    get error() {
        return this._error;
    }

    constructor(opts = {}) {
        const { label = defaultLabel, input = defaultInput } = opts;

        this.labelContainer = label;
        this.inputContainer = input;
    }

    _onInputChange(value) {
        const l = this._validator.length;
        let i = 0;

        this._error = '';

        while (i < l) {
            if (!this._error) {
                this._error = this._validator[i](value);
            } else {
                break;
            }

            i += 1;
        }

        if (typeof this.onChange == 'function') {
            this.onChange(value);
        }
    }

    render() {
        return (
            `${this.labelContainer.replace(/{label}/, this._label)}` +
            `${this.inputContainer.replace(/{input}/, this._input)}` +
            `${!this._error ? '' : this._error}`
        )
    }
}
