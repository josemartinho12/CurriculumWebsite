import { HardSkillModel } from '../models/hardskill.model.js';

export const createHardSkill = async (req, res) => {
  const { name } = req.body;

  const hardSkill = await HardSkillModel.create({
    name
  });

  return res.json(hardSkill);
};

export const getHardSkills = async (req, res) => {
  const hardSkills = await HardSkillModel.findAll();

  return res.json(hardSkills);
};

export const deleteHardSkill = async (req, res) => {
  const { id } = req.params;

  const result = await HardSkillModel.destroy({
    where: { id }
  });

  return res.json(result);
};
