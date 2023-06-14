import Router from 'express';
import { createSoftSkill, getSoftSkills, deleteSoftSkill } from '../controllers/softskill.controller.js';

const softSkillRoutes = Router();

softSkillRoutes.post('/create', createSoftSkill);
softSkillRoutes.get('/get', getSoftSkills);
softSkillRoutes.delete('/delete/:id', deleteSoftSkill);

export { softSkillRoutes };
