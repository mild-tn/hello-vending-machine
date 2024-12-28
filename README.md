# hello-vending-machine
## Introduction
This project demonstrates a vending machine system that enables users to simulate real-world scenarios of buying products with coins or banknotes. It is designed to showcase a full-stack application with modern frameworks and best practices for front-end, back-end, and database integration.

## Project description
This project is a vending machine application that includes the following features:
- Display a list of products.
- Allow users to insert coins or banknotes.
- Enable product purchases and return change.
- Manage product inventory and coin/banknote updates.
- Provide transaction history.
- Validate sufficient stock and coins for each transaction.

## Project stack
- **Front-end**: Next.js (v13.x) application
- **Back-end**: Nest.js (v10.x) application
- **Database**: PostgreSQL (v15.x)
- **CI/CD**: GitHub Actions for automated testing and deployment

## Pre-requisites
- Docker and Docker Compose
- Node.js (for manual setup)
- Yarn (for manual setup)

## Use Docker to run the project
1. Install Docker and Docker Compose for start services, I prepared a docker-compose file that will start the front-end, back-end, database, migrate, and seed (seeding data for start service) services.
```bash
docker-compose up
```
2. Access the application at http://localhost:3000

## Manual setup
If you prefer manual setup, follow these steps:

1. Database:
```bash
docker-compose up vending-machine-db -d # start database
## or
docker run --name vending-machine-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=vending-machine-db -p 5432:5432 -d postgres:13 # start database
## or 
brew install postgresql # install postgresql
```

2. Front-end:
```bash
cd front-end
yarn install
yarn dev
```

3. Back-end:
```bash
cd back-end
yarn install
yarn typeorm migration:run --dataSource src/infrastructure/config/typeorm/typeorm.config.ts
yarn seed
yarn dev
```


## Run tests
front-end:
```bash
cd front-end
yarn test
```

back-end:
```bash
cd back-end
yarn test
```

## Notes for Future Improvements
### Frontend Improvements:
- Add responsive design for screens smaller than 1024px.
- Implement internationalization (i18n) to support multiple languages.
- Refactor components into reusable Design System (UX/UI) components.

### Backend Improvements:
- Add API validations for:
  - Ensuring enough coins or banknotes are available to complete a transaction.
  - Validating sufficient stock levels before completing a purchase.
- Add error handling for edge cases.

### General Enhancements:
- Write additional test cases for both front-end and back-end.
- Extend features such as adding products and coins dynamically.
- Implement a user authentication system.

## OTHER
- [User Manual](/docs/user-manual.md)
- [database diagram](/docs/database-diagram.jpg)
- [Entity Descriptions](/docs/Entity-Decriptsion.md)
- [API Documentation](/docs/API-document.md)