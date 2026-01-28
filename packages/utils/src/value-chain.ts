export function createValueChain() {
  return new ValueChain(undefined);
}

class ValueChain<T> {
  private _value: T;

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  do<U>(fn: (value: T) => U): ValueChain<U> {
    const newValue = fn(this._value);
    return new ValueChain(newValue);
  }

  value(): T {
    return this._value;
  }
}
