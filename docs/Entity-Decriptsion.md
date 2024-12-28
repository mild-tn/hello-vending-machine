# Entity Descriptions

## Customer
Stores customer information, such as their name and phone number.

*Future Expansion:* Additional details about customers (e.g., email, purchase preferences, loyalty points) can be added later to enhance functionality.

## Branch
Represents the branch where a vending machine is located. Includes attributes like branch name and location.

*Future Expansion:* A Manager table can be introduced to store manager details for each branch. The `manager_id` can then be referenced in the Branch table to link it with a specific manager.

## Machine
Represents a vending machine and associates it with a branch using the `branch_id`. Includes attributes such as the machine's name for easy identification.

## Product
Stores product details, including name, price, available stock, images, and descriptions.

## ProductMachine
Acts as a link between products and vending machines. Ensures that each machine has its own product inventory.

## Transaction
Records all transactions made at the vending machine. Attributes include customer ID, product machine ID, stock quantity, change amount, paid amount, status (e.g., "SUCCESS" or "FAILED"), sales quantity, and the timestamp of the update.

## CoinAndBanknote
Defines the types of currency used in the vending machines, including:
- **Type:** "COIN" or "BANK_NOTE"
- **Denomination:** Supported denominations (e.g., 1, 5, 10 coins or banknotes of 20, 50, 100, 500, and 1,000).

## MachineCoinAndBanknote
Tracks the quantity of each coin and banknote denomination available in a specific vending machine.

*Purpose:* Ensures accurate management of currency levels in the vending machine to prevent shortages or errors during transactions.