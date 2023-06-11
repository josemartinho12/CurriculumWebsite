import Router from 'express';
import { createContact, getContact } from '../controllers/contact.controller.js';

const contactRoutes = Router();

contactRoutes.post('/create', createContact);
contactRoutes.get('/get', getContact);

export { contactRoutes };
