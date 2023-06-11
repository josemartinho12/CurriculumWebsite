import Router from 'express';
import { usersRoutes } from './user.routes.js';
import { profileRoutes } from './profile.routes.js';
import { contactRoutes } from './contact.routes.js';
import { educationRoutes } from './education.routes.js';
import { interestRoutes } from './interest.routes.js';
import { languageRoutes } from './language.routes.js';
import { softSkillRoutes } from './softskill.routes.js';
import { hardSkillRoutes } from './hardskill.routes.js';


const api = Router();

api.use('/user', usersRoutes);
api.use('/profile', profileRoutes);
api.use('/contact', contactRoutes);
api.use('/education', educationRoutes);
api.use('/interest', interestRoutes);
api.use('/language', languageRoutes);
api.use('/softskill', softSkillRoutes);
api.use('/hardskill', hardSkillRoutes);


export { api };

