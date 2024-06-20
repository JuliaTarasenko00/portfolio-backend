export const finallyResult = (data, language) => {
  const result = data.map(el => el[language]);

  return result;
};
