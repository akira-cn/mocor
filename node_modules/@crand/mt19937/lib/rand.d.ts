declare class Mt19937 {
  constructor(seed: number, min?: number, max?: number);
  next(): number;
  destroy(): void;
}

export = Mt19937;
