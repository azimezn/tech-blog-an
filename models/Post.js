const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // reference?
      // we will use user id to reference. delete username
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      // double check on date
      defaultValue: Date.now(),
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
      // reference?
      // comment id
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
