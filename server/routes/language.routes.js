import Router from 'express';
import { createLanguage, getLanguage } from '../controllers/language.controller.js';

const languageRoutes = Router();

languageRoutes.post('/create', createLanguage);
languageRoutes.get('/get', getLanguage);

export { languageRoutes };
