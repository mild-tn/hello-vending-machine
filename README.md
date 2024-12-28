# hello-vending-machine
A vending machine application that allows users to buy products using coins.

## Project description
This project is a vending machine application that allows users to buy products using coins. The application has a front-end that allows users to select products and insert coins. The back-end is responsible for managing the products and coins.
The application has the following features:
- List products
- Insert coins
- Buy products
- Return coins
- Return products
- Transaction history
- Update coin/banknote of machine

## Project stack
- front-end: Next.js application
- back-end: Nest.js application
- vending-machine-db: PostgreSQL database
- Run CI (CI/CD) with GitHub Actions

## Pre-requisites
- Docker and Docker Compose
- Node.js (for manual setup)
- Yarn (for manual setup)

## Use Docker to run the project
1. Install Docker and Docker Compose for start services, I prepared a docker-compose file that will start the front-end, back-end, database, migrate, and seed (seeding data for start service) services.
```bash
docker-compose up
```
3. Access the application at http://localhost:3000

## Manual setup
Database:
```bash
docker-compose up vending-machine-db -d
```

front-end:
```bash
cd front-end
yarn install
yarn dev
```

back-end:
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

## Notes improvements
- Add more tests
- Support multiple languages (i18n)
- Support responsive design (for now support only screen > 1024px)
- Add more error handling
- Implement Design System (UX/UI) components

## OTHER
- [User Manual](/docs/user-manual.md)
- [database diagram](/docs/database-diagram.jpg)
- [Entity Descriptions](/docs/Entity-Decriptsion.md)
- [API Documentation](/docs/API-document.md)