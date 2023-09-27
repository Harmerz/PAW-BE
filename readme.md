
# PAW-Backend
This project is part of our final task from Web Development course that contains a backend API for managing food recipes using Express.js and MongoDB. You can do CRUD operation for recipe, inventory, order, delivery, and auth feature.


## Authors
- [Haikal Hilmi](https://github.com/Harmerz)
- [Johanes De Britto Krisna Arianta](https://github.com/krisnaarianta)
- [Muhammad Rizqi](https://github.com/m-rizqi)
- [Nafisa Ramadhania](https://github.com/nafisaramadhania)
- [Yosep Engelbert Christo](https://github.com/YosepEChristo)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)
## Features

- CRUD operation for inventory manager
- CRUD operation for recipe
- CRUD operation for cart order
- CRUD operation for delivery
- CRUD operation for admin, customer, and authentication

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Npm installed. Download it [here](https://nodejs.org/en/download).
- MongoDB installed and running. Donwload it [here](https://www.mongodb.com/docs/manual/installation/).
- Clone this repository to your local machine.
## Installation

1. Create `.env` file by duplicate the `.env.example`
2. Specify your MongoDB connection url in the `.env` file like this.
```bash 
DATABASE_URL=mongodb://127.0.0.1:27017
```
3. Install module using npm

```bash
  npm install
```
4. Start the server by execute this command.
 ```bash 
npm start
```
## Api Documentation