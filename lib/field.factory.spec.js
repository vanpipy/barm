import Field from './field.factory';

describe('Field Factory', () => {
    it('should has a default label', () => {
        const field = new Field();
        expect(field.render()).toContain('<label>default label</label>');
    });

    it('should has a default input', () => {
        const field = new Field();
        expect(field.render()).toContain('<input value="default input"/>');
    });

    it('should has a default validator', () => {
        const field = new Field();
        expect(field.validator).toHaveLength(1);
        expect(typeof field.validator[0]).toEqual('function');
    });

    it('should change the label', () => {
        const field = new Field();
        field.label = 'test';
        expect(field.render()).toContain('<label>test</label>');
    });

    it('should change the input value', () => {
        const field = new Field();
        field.input = 'test';
        expect(field.render()).toContain('<input value="test"/>');
    });

    it('should trigger the validator when the input value changed', () => {
        const field = new Field();
        const fn = jest.fn();
        field.validator = fn;
        field.input = 'test';
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should validate the value is not empty always', () => {
        const field = new Field();
        field.input = '';
        expect(field.error).toEqual('The value cannot an empty string');
        field.validator = () => {return 'customized'};
        field.input = 'not empty';
        expect(field.error).toEqual('customized');
        field.input = '';
        expect(field.error).toEqual('The value cannot an empty string');
    });
});
