const { Post } = require("../models");

const postData = [
    {
      "id": 1,
      "title": "Music Near Me",
      "content": "A mobile app that will send you notifications whenever a concert is playing in your area."
    },
    {
      "id": 2,
      "title": "The Ultimate Tech Quiz",
      "content": "A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!"
    },
    {
      "id": 3,
      "title": "Roll 'Em Up",
      "content": "A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes."
    },
  ];

const seedPostData = () => Post.bulkCreate(postData);

module.exports = seedPostData