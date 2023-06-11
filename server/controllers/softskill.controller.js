import { SoftSkillModel } from '../models/softskill.model.js';

export const createSoftSkill = async (req, res) => {
  const { name } = req.body;

  const softSkill = await SoftSkillModel.create({
    name
  });

  return res.json(softSkill);
};

export const getSoftSkills = async (req, res) => {
  const softSkills = await SoftSkillModel.findAll();

  return res.json(softSkills);
};
