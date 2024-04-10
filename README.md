# **Róisín's News API**

## _Description_

This is a RESTful API built with PSQL, TypeScript and Express, and tested using Mocha and Chai. The API is a news API and contains data on articles, article topics, comments and users. The hosted API and available endpoints can be found here: https://news-api-ts.onrender.com/api

## _Prerequisites_

- Node: v21.x
- Postgres: v15.x
- NPM: v10.x

### _Installation_

To run this repository locally, in your terminal CLI you will need to run:

```
$ git clone https://github.com/roisinoreilly/news-api-ts
$ cd news-api-ts
```

You will then need to run `npm install`

### _Environment Variables_

In the root directory, you will need to create two .env files:

- .env.dev
- .env.test

In each file you will need to add: `PGDATABASE=nc_news` and `PGDATABASE=nc_news_test` respectively.

### _Database Setup_

You will then need to setup and seed the database by running the following scripts:

```
$ npm run setup-dbs
$ npm run seed
```

### _Testing_

This repository is fully tested using Mocha and Chai. To run all tests locally run `npm test`

### _Running the server locally_

In order to run the API locally you will need to run

```
tsc
npm start
```

You will then be able to access all available endpoints from http://localhost:9090/
