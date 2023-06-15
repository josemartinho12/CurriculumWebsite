import Router from 'express';
import { usersRoutes } from './user.routes.js';
import { educationRoutes } from './education.routes.js';
import { interestRoutes } from './interest.routes.js';
import { softSkillRoutes } from './softskill.routes.js';
import { hardSkillRoutes } from './hardskill.routes.js';

const api = Router();

api.use('/user', usersRoutes);
api.use('/education', educationRoutes);
api.use('/interest', interestRoutes);
api.use('/softskill', softSkillRoutes);
api.use('/hardskill', hardSkillRoutes);


export { api };

