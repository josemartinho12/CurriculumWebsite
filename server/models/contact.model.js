import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const ContactModel = database.define('contact', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  address: {
    type: STRING,
    allowNull: false,
  },
});

export { ContactModel };
