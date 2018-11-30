'use strict';

// Yor code here ...
class Pancake {
  constructor(id = null) {
    this.id = id;
    this.sides = [false, false];
  }

  cook() {
    const { sides, isCooked } = this;
    if (!isCooked) {
      const rawSide = sides.findIndex(side => side === false);
      sides[rawSide] = true;
    }
  }

  get isCooked() {
    return this.sides.every(side => side === true);
  }

  get progress() {
    const { sides } = this;
    const cooked = sides.reduce((sum, side) => (side === true ? ++sum : sum), 0);
    return cooked / sides.length;
  }
}

class SmartPan {
  constructor(capacity = 1) {
    this.capacity = capacity;
  }

  fry(pancakes) {
    const { capacity } = this;
    if (pancakes.length > capacity) throw new Error(`Overload!`);
    const cooked = pancakes.filter(p => p.isCooked);
    if (cooked.length) throw new Error(`Pancakes ${cooked.map(p => p.id)} already cooked!`);
    pancakes.forEach(p => p.cook());
  }
}

class OptimalAlg {
  constructor(options = {}) {
    const defaultOptions = { panCapacity: 1, pans: 2, pancakes: 3 };
    const config = Object.assign({}, defaultOptions, options);
    this.iterations = 0;
    // init
    this.pans = [...Array(config.pans)].map(() => new SmartPan(config.panCapacity));
    this.pancakes = [...Array(config.pancakes)].map((v, i) => new Pancake(i));
  }

  iteration() {
    const { pancakes, isAllCooked, pans } = this;
    if (isAllCooked) return false;
    const totalCapacity = pans.reduce((sum, { capacity }) => sum + capacity, 0);

    // the basic idea of the algorithm - fry least cooked (sort)
    const leastCooked = pancakes
      .filter(p => !p.isCooked)
      .sort((p1, p2) => p1.progress - p2.progress)
      .slice(0, totalCapacity);

    // on pans!
    pans.forEach(pan => {
      if (!leastCooked.length) return;
      const part = leastCooked.splice(0, pan.capacity);
      pan.fry(part);
    });

    this.iterations += 1;
    this.log();
    return true;
  }

  get isAllCooked() {
    return this.pancakes.every(p => p.isCooked);
  }

  log() {
    const { pancakes, iterations } = this;
    const line = pancakes.reduce((str, p) => `${str}\t\t#${p.id}:${p.sides}`, '');
    console.log(`${iterations}: \t ${line}`);
  }
}

// Test. Maximum flexibility
const alg = new OptimalAlg({ panCapacity: 1, pans: 2, pancakes: 3 });
while (alg.iteration());

console.info(`Iterations: ${alg.iterations}`);
