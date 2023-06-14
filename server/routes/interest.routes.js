import Router from 'express';
import { createInterest, getInterest, updateInterest, deleteInterest } from '../controllers/interest.controller.js';

const interestRoutes = Router();

interestRoutes.get('/get', getInterest);
interestRoutes.post('/create', createInterest);
interestRoutes.put('/update', updateInterest); 
interestRoutes.delete('/delete/:id', deleteInterest); 

export { interestRoutes };
