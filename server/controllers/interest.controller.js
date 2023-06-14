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

export const updateInterest = async (req, res) => {
  const { id, title, description } = req.body;

  const interest = await InterestModel.update({
    title,
    description,
  }, {
    where: {
      id,
    },
  });

  return res.json(interest);
};

export const deleteInterest = async (req, res) => {
  const { id } = req.params;

  const result = await InterestModel.destroy({
    where: {
      id,
    },
  });

  return res.json(result);
};
