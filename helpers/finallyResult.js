export const finallyResult = (data, language) => {
  const result = data.map(el => {
    return { _id: el._id, ...el[language] };
  });

  return result;
};
