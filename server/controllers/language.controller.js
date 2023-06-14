import { LanguageModel } from '../models/language.model.js';

export const createLanguage = async (req, res) => {
  const { name } = req.body;

  const language = await LanguageModel.create({
    name,
  });

  return res.json(language);
};


export const getLanguage = async (req, res) => {
  const language = await LanguageModel.findAll();
  return res.json(language);
};

export const updateLanguage = async (req, res) => {
  const { id, name } = req.body;

  let language = await LanguageModel.findByPk(id);

  if (!language) {
    return res.status(404).json({ error: 'Language not found' });
  }

  language.name = name;

  await language.save();

  return res.json(language);
};

export const deleteLanguage = async (req, res) => {
  const { id } = req.params;

  let language = await LanguageModel.findByPk(id);

  
  if (!language) {
    return res.status(404).json({ error: 'Language not found' });
  }

  await language.destroy();

  return res.json({ success: 'Language deleted successfully' });
};
