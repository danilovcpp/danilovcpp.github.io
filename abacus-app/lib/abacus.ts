export class AbacusCalculator {
  private columns: number;
  private values: number[];

  constructor(columns: number = 6) {
    this.columns = columns;
    this.values = new Array(columns).fill(0);
  }

  getValue(): number {
    let total = 0;
    for (let i = 0; i < this.columns; i++) {
      const power = this.columns - 1 - i;
      total += this.values[i] * Math.pow(10, power);
    }
    return total;
  }

  setValue(number: number, callback?: (column: number, value: number) => void): void {
    const digits = String(number)
      .padStart(this.columns, '0')
      .split('')
      .map(Number);

    digits.forEach((digit, index) => {
      this.values[index] = digit;
      if (callback) {
        callback(index, digit);
      }
    });
  }

  setColumnValue(column: number, value: number): void {
    if (column >= 0 && column < this.columns && value >= 0 && value <= 9) {
      this.values[column] = value;
    }
  }

  getColumnValue(column: number): number {
    return this.values[column] || 0;
  }

  reset(callback?: () => void): void {
    this.values.fill(0);
    if (callback) {
      callback();
    }
  }

  getDigits(): number[] {
    return [...this.values];
  }
}
