import RespChain from './RespChain';

describe('RespChain', () => {
  it('should run the sync tasks successfully', async () => {
    const example = {};
    const A = () => example.a = 10;
    const B = () => example.b = 20;
    const C = () => example.a = 55;
    const chain = new RespChain();

    chain.push(A);
    chain.push(B);
    chain.push(C);

    await chain.run();

    expect(example).toEqual({ a: 55, b: 20 });
  });

  it('should run the async tasks successfully', async () => {
    const example = {};
    const A = async () => example.a = 10;
    const B = async () => example.b = 20;
    const C = async () => example.a = 55;
    const chain = new RespChain();

    chain.push(A);
    chain.push(B);
    chain.push(C);

    await chain.run();

    expect(example).toEqual({ a: 55, b: 20 });
  });

  it('should run the mixed sync or async tasks successfully', async () => {
    const example = {};
    const A = () => example.a = 10;
    const B = async () => example.b = 20;
    const C = async() => example.a = 55;
    const D = () => example.b = 50;
    const chain = new RespChain();

    chain.push(A);
    chain.push(B);
    chain.push(C);
    chain.push(D);

    await chain.run();

    expect(example).toEqual({ a: 55, b: 50 });
  });

  it('should be blocked when one of the task throws error', async () => {
    const example = {};

    const runner = async () => {
      const A = () => example.a = 10;
      const B = jest.fn().mockImplementation(async () => {
        throw new Error('blocked');
      });
      const C = jest.fn().mockImplementation(async() => example.a = 20);
      const chain = new RespChain();

      chain.push(A);
      chain.push(B);
      chain.push(C);

      await chain.run();
    };

    await expect(runner).toThrow();
    expect(example).toEqual({ a: 10 });
  });
});
