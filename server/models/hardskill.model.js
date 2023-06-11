import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const HardSkillModel = database.define('hardskill', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

export { HardSkillModel };
