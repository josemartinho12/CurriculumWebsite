import { EducationModel } from '../models/education.model.js';

export const createEducation = async (req, res) => {
  const { level, degree, institution, year } = req.body;

  const education = await EducationModel.create({
    level,
    degree,
    institution,
    year,
  });

  return res.json(education);
};

export const getEducation = async (req, res) => {
  const education = await EducationModel.findAll();
  return res.json(education);
};

export const updateEducation = async (req, res) => {
  const { id, level, degree, institution, year } = req.body;

  const education = await EducationModel.update({
    level,
    degree,
    institution,
    year,
  }, {
    where: {
      id,
    },
  });

  return res.json(education);
};

export const deleteEducation = async (req, res) => {
  const { id } = req.params;

  const result = await EducationModel.destroy({
    where: {
      id,
    },
  });

  return res.json(result);
};
