import {
  banknoteList,
  calculateCoinChange,
  coinList,
} from "@/usecase/calculate-coin-change";

describe("calculateCoinChange", () => {
  const coins = coinList;
  const banknotes = banknoteList;
  describe("coins", () => {
    it("should return correct coin distribution when amount is 1", () => {
      const amount = 1;

      const result = calculateCoinChange(amount, coins);

      expect(result).toEqual({
        1: 1,
      });
    });

    it("should return correct coin distribution when amount is 5", () => {
      const amount = 5;

      const result = calculateCoinChange(amount, coins);

      expect(result).toEqual({
        5: 1,
      });
    });
    it("should return correct coin distribution when amount is 10", () => {
      const amount = 10;

      const result = calculateCoinChange(amount, coins);

      expect(result).toEqual({
        10: 1,
      });
    });

    it("should return correct coin distribution when amount is 27", () => {
      const amount = 27;

      const result = calculateCoinChange(amount, coins);

      expect(result).toEqual({
        10: 2,
        5: 1,
        1: 2,
      });
    });
  });
  describe("banknotes", () => {
    it("should return correct banknote distribution when amount is 20", () => {
      const amount = 20;

      const result = calculateCoinChange(amount, banknotes);

      expect(result).toEqual({
        20: 1,
      });
    });
    it("should return correct banknote distribution when amount is 50", () => {
      const amount = 50;

      const result = calculateCoinChange(amount, banknotes);

      expect(result).toEqual({
        50: 1,
      });
    });
    it("should return correct banknote distribution when amount is 100", () => {
      const amount = 100;

      const result = calculateCoinChange(amount, banknotes);

      expect(result).toEqual({
        100: 1,
      });
    });

    it("should return correct banknote distribution when amount is 500", () => {
      const amount = 500;

      const result = calculateCoinChange(amount, banknotes);

      expect(result).toEqual({
        500: 1,
      });
    });
    it("should return correct banknote distribution when amount is 1000", () => {
      const amount = 1000;

      const result = calculateCoinChange(amount, banknotes);

      expect(result).toEqual({
        1000: 1,
      });
    });
    it("should return correct banknote distribution when amount is 1770", () => {
      const amount = 1770;

      const result = calculateCoinChange(amount, banknotes);

      expect(result).toEqual({
        1000: 1,
        500: 1,
        100: 2,
        50: 1,
        20: 1,
      });
    });
  });
  describe("banknotes and coins", () => {
    it("should return correct banknote distribution when amount is 1774", () => {
      const amount = 1774;

      const result = calculateCoinChange(amount, [...banknotes, ...coins]);

      expect(result).toEqual({
        1000: 1,
        500: 1,
        100: 2,
        50: 1,
        20: 1,
        1: 4,
      });
    });
    it("should return correct banknote distribution when amount is 1234", () => {
      const amount = 1234;

      const result = calculateCoinChange(amount, [...banknotes, ...coins]);

      expect(result).toEqual({
        1000: 1,
        100: 2,
        20: 1,
        10: 1,
        1: 4,
      });
    });
  });
});
