import Router from 'express';
import { createHardSkill, getHardSkills, deleteHardSkill } from '../controllers/hardskill.controller.js';

const hardSkillRoutes = Router();

hardSkillRoutes.post('/create', createHardSkill);
hardSkillRoutes.get('/get', getHardSkills);
hardSkillRoutes.delete('/delete/:id', deleteHardSkill);

export { hardSkillRoutes };
