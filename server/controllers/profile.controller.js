import { ProfileModel } from '../models/profile.model.js';

export const createProfile = async (req, res) => {
  const { description } = req.body;

  const profile = await ProfileModel.create({
    description,
  });

  return res.json(profile);
};

export const getProfile = async (req, res) => {
  const profile = await ProfileModel.findAll();

  return res.json(profile);
};


