import Router from 'express';
import { createHardSkill, getHardSkills } from '../controllers/hardskill.controller.js';

const hardSkillRoutes = Router();

hardSkillRoutes.post('/create', createHardSkill);
hardSkillRoutes.get('/get', getHardSkills);

export { hardSkillRoutes };
