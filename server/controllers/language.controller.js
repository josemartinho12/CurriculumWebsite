import { LanguageModel } from '../models/language.model.js';

export const createLanguage = async (req, res) => {
  const { name, proficiency } = req.body;

  const language = await LanguageModel.create({
    name,
    proficiency,
  });

  return res.json(language);
};


export const getLanguage = async (req, res) => {
  const language = await LanguageModel.findAll();
  return res.json(language);
};