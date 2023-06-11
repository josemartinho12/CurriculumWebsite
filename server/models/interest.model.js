import { INTEGER, STRING, TEXT } from 'sequelize';
import { database } from '../config/context/database.js';

const InterestModel = database.define('interest', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: true,
  },
});

export { InterestModel };
