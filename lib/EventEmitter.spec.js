'use strict';

import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
    it('should add an event by the method on', () => {
        const emitter = new EventEmitter();
        const fn = () => {};
        emitter.on('test', fn);
        expect(emitter.cache).toEqual({ test: [fn] });
    });

    it('should remove the event from event emitter by the method off', () => {
        const emitter = new EventEmitter();
        const fn = () => {};
        emitter.on('test', fn);
        emitter.off('test');
        expect(emitter.cache).toEqual({ test: [] });
    });

    it('should remove an event with the callback from event emitter by the method off', () => {
        const emitter = new EventEmitter();
        const fn = () => {};
        const fnonemore = () => {};
        emitter.on('test', fn);
        emitter.on('test', fnonemore);
        emitter.off('test', fn);
        expect(emitter.cache).toEqual({ test: [fnonemore] });
    });

    it('should trigger the event when emit the event', () => {
        const emitter = new EventEmitter();
        const fn = jest.fn();
        emitter.on('test', fn);
        emitter.emit('test');
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should trigger the event with a payload when emit the event', () => {
        let data = 1;
        const emitter = new EventEmitter();
        const fn = (d) => data = d;
        emitter.on('test', fn);
        emitter.emit('test', 10);
        expect(data).toEqual(10);
    });

    it('should trigger the event once only when emit the event by emitOnce', () => {
        const emitter = new EventEmitter();
        const fn = jest.fn();
        emitter.on('test', fn);
        emitter.emitOnce('test');
        expect(fn).toHaveBeenCalledTimes(1);
        emitter.emitOnce('test');
        expect(fn).toHaveBeenCalledTimes(1);
    });
});
