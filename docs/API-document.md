# API Documentation

## Overview
This document provides an overview of the API endpoints available in the `hello-vending-machine` project.

## Base URL
```
http://your-api-base-url.com/api
```

## Endpoints

### 1. Get All Products
**Endpoint:** `/products`
**Method:** `GET`
**Description:** Retrieve a list of all products available in the vending machine.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "price": "number",
    "quantity": "number"
  }
]
```

### 2. Create transaction 
**Endpoint:** `/transactions`
**Method:** `POST`
**Description:** Create a new transaction to purchase a product from the vending machine.

**Request:**
```json
{
  "customerId": 1, // Hardcoded for now
  "productMachineId": "string",
  "quantity": "number",
  "paidAmount": "number"
}
```

### 3. Get Transaction History
**Endpoint:** `/transactions`
**Method:** `GET`
**Description:** Retrieve a list of all transactions made at the vending machine.

**Response:**
```json
[
  {
    "id": "string",
    "customerId": "string",
    "productMachineId": "string",
    "stockQuantity": "number",
    "changeAmount": "number",
    "paidAmount": "number",
    "status": "string",
    "salesQuantity": "number",
    "timestamp": "string"
  }
]
```