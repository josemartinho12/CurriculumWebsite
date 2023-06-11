import Router from 'express';
import { createEducation, getEducation, updateEducation, deleteEducation } from '../controllers/education.controller.js';

const educationRoutes = Router();

educationRoutes.post('/create', createEducation);
educationRoutes.get('/get', getEducation);
educationRoutes.put('/update', updateEducation);
educationRoutes.delete('/delete/:id', deleteEducation);

export { educationRoutes };
