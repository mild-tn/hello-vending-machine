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
      const availableCoins = { 1: 1, 5: 0, 10: 0 };

      const result = calculateCoinChange(amount, coins, availableCoins);

      expect(result).toEqual({
        success: true,
        changeUsed: { 1: 1 },
      });
    });

    it("should return correct coin distribution when amount is 5", () => {
      const amount = 5;
      const availableCoins = { 1: 0, 5: 1, 10: 0 };

      const result = calculateCoinChange(amount, coins, availableCoins);

      expect(result).toEqual({
        success: true,
        changeUsed: { 5: 1 },
      });
    });

    it("should return correct coin distribution when amount is 10", () => {
      const amount = 10;
      const availableCoins = { 1: 0, 5: 0, 10: 1 };

      const result = calculateCoinChange(amount, coins, availableCoins);

      expect(result).toEqual({
        success: true,
        changeUsed: { 10: 1 },
      });
    });

    it("should return correct coin distribution when amount is 27", () => {
      const amount = 27;
      const availableCoins = { 1: 2, 5: 1, 10: 2 };

      const result = calculateCoinChange(amount, coins, availableCoins);

      expect(result).toEqual({
        success: true,
        changeUsed: { 10: 2, 5: 1, 1: 2 },
      });
    });
  });

  describe("banknotes", () => {
    it("should return correct banknote distribution when amount is 20", () => {
      const amount = 20;
      const availableBanknotes = { 20: 1, 50: 0, 100: 0, 500: 0, 1000: 0 };

      const result = calculateCoinChange(amount, banknotes, availableBanknotes);

      expect(result).toEqual({
        success: true,
        changeUsed: { 20: 1 },
      });
    });

    it("should return correct banknote distribution when amount is 50", () => {
      const amount = 50;
      const availableBanknotes = { 20: 0, 50: 1, 100: 0, 500: 0, 1000: 0 };

      const result = calculateCoinChange(amount, banknotes, availableBanknotes);

      expect(result).toEqual({
        success: true,
        changeUsed: { 50: 1 },
      });
    });

    it("should return correct banknote distribution when amount is 100", () => {
      const amount = 100;
      const availableBanknotes = { 20: 0, 50: 0, 100: 1, 500: 0, 1000: 0 };

      const result = calculateCoinChange(amount, banknotes, availableBanknotes);

      expect(result).toEqual({
        success: true,
        changeUsed: { 100: 1 },
      });
    });

    it("should return correct banknote distribution when amount is 500", () => {
      const amount = 500;
      const availableBanknotes = { 20: 0, 50: 0, 100: 0, 500: 1, 1000: 0 };

      const result = calculateCoinChange(amount, banknotes, availableBanknotes);

      expect(result).toEqual({
        success: true,
        changeUsed: { 500: 1 },
      });
    });

    it("should return correct banknote distribution when amount is 1000", () => {
      const amount = 1000;
      const availableBanknotes = { 20: 0, 50: 0, 100: 0, 500: 0, 1000: 1 };

      const result = calculateCoinChange(amount, banknotes, availableBanknotes);

      expect(result).toEqual({
        success: true,
        changeUsed: { 1000: 1 },
      });
    });

    it("should return correct banknote distribution when amount is 1770", () => {
      const amount = 1770;
      const availableBanknotes = { 20: 1, 50: 1, 100: 2, 500: 1, 1000: 1 };

      const result = calculateCoinChange(amount, banknotes, availableBanknotes);

      expect(result).toEqual({
        success: true,
        changeUsed: { 1000: 1, 500: 1, 100: 2, 50: 1, 20: 1 },
      });
    });
  });

  describe("banknotes and coins", () => {
    it("should return correct distribution when amount is 1774", () => {
      const amount = 1774;
      const available = {
        1: 4,
        5: 0,
        10: 0,
        20: 1,
        50: 1,
        100: 2,
        500: 1,
        1000: 1,
      };

      const result = calculateCoinChange(
        amount,
        [...banknotes, ...coins],
        available
      );

      expect(result).toEqual({
        success: true,
        changeUsed: { 1000: 1, 500: 1, 100: 2, 50: 1, 20: 1, 1: 4 },
      });
    });

    it("should return correct distribution when amount is 1234", () => {
      const amount = 1234;
      const available = {
        1: 4,
        5: 0,
        10: 1,
        20: 1,
        50: 0,
        100: 2,
        500: 0,
        1000: 1,
      };

      const result = calculateCoinChange(
        amount,
        [...banknotes, ...coins],
        available
      );

      expect(result).toEqual({
        success: true,
        changeUsed: { 1000: 1, 100: 2, 20: 1, 10: 1, 1: 4 },
      });
    });
  });
  describe("not enough coins or banknotes", () => {
    it("should return not enough coins or banknotes when amount is 1774", () => {
      const amount = 1774;
      const available = {
        1: 3,
        5: 0,
        10: 0,
        20: 1,
        50: 1,
        100: 2,
        500: 1,
        1000: 1,
      };

      const result = calculateCoinChange(
        amount,
        [...banknotes, ...coins],
        available
      );

      expect(result).toEqual({
        success: false,
        message: "Not enough coins or banknotes for the change.",
        changeUsed: { 1000: 1, 500: 1, 100: 2, 50: 1, 20: 1, 1: 3 },
      });
    });
  });
});
