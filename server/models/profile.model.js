import { INTEGER, STRING, TEXT } from 'sequelize';
import { database } from '../config/context/database.js';

const ProfileModel = database.define('profile', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
});

export { ProfileModel };
