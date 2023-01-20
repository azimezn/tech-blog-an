const { User } = require("../models");

const userData = [
  {
    "username": "Sal",
    "password": "password12345"
  },
  {
    "username": "Lernantino",
    "password": "password12345"
  },
  {
    "username": "Amiko",
    "password": "password12345"
  },
];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData