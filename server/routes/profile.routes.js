import Router from 'express';
import { createProfile, getProfile } from '../controllers/profile.controller.js';

const profileRoutes = Router();

profileRoutes.post('/create', createProfile);
profileRoutes.get('/get', getProfile);

export { profileRoutes };
