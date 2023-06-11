import Router from 'express';
import { createSoftSkill, getSoftSkills } from '../controllers/softskill.controller.js';

const softSkillRoutes = Router();

softSkillRoutes.post('/create', createSoftSkill);
softSkillRoutes.get('/get', getSoftSkills);

export { softSkillRoutes };
