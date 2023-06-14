import Router from 'express';
import { createLanguage, deleteLanguage, getLanguage, updateLanguage } from '../controllers/language.controller.js';

const languageRoutes = Router();

languageRoutes.post('/create', createLanguage);
languageRoutes.get('/get', getLanguage);
languageRoutes.put('/update', updateLanguage);
languageRoutes.delete('/delete/:id', deleteLanguage)

export { languageRoutes };