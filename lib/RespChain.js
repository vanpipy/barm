
/**
 * A Chain of Responsibility has two result
 * 1. Execute all of the tasks successfully
 * 2. Failed and blocked by on of the tasks
 *
 * So there are many ways to design a chain
 * and the children should can be customized
 * by the user.
 *
 * interface Task {
 *   handler<Function>;
 *   next<Task>
 *   done<boolean>
 * }
 *
 * interface RespChain {
 *   public push<Task>;
 *   public run<void>;
 * }
 *
 */
class Task {
  constructor(task) {
    this.next = null;
    this.error = null;
    this.done = false;

    this.handler = () => new Promise((resolve, reject) => {
      try {
        resolve(task());
      } catch (e) {
        reject(e)
      }
    })
      .then((result) => {
        this.done = true;
        return result;
      })
      .catch((error) => {
        this.error = error;
        this.done = false;
      });
  }
}

class RespChain {
  constructor() {
    this.chain = [];
  }

  push(task) {
    const { chain } = this;
    const newTask = new Task(task);

    if (chain.length >= 1) {
      const previousTask = chain[chain.length - 1];
      previousTask.next = newTask;
    }

    chain.push(newTask);
  }

  async run() {
    const { chain } = this;
    let i = 0;

    while (1) {
      const current = chain[i];

      await current.handler();

      if (current.done && current.next !== null) {
        i += 1;
      } else {
        break;
      }
    }
  }
}

export default RespChain;
