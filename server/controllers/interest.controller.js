import { InterestModel } from '../models/interest.model.js';

export const createInterest = async (req, res) => {
  const { title, description } = req.body;

  const interest = await InterestModel.create({
    title,
    description,
  });

  return res.json(interest);
};

export const getInterest = async (req, res) => {
  const interest = await InterestModel.findAll();
  return res.json(interest);
};