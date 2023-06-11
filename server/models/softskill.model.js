import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const SoftSkillModel = database.define('softskill', {
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

export { SoftSkillModel };
