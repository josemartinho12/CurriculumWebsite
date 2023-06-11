import Router from 'express';
import { createInterest, getInterest } from '../controllers/interest.controller.js';

const interestRoutes = Router();

interestRoutes.post('/create', createInterest);
interestRoutes.get('/get', getInterest);

export { interestRoutes };
