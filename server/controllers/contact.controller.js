import { ContactModel } from '../models/contact.model.js';

export const createContact = async (req, res) => {
  const { phone, email, address } = req.body;

  const contact = await ContactModel.create({
    phone,
    email,
    address,
  });

  return res.json(contact);
};

export const getContact = async (req, res) => {
  const contact = await ContactModel.findAll();
  return res.json(contact);
};