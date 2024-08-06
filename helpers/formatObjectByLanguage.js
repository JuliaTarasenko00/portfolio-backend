export const formatObjectByLanguage = (item, language, result) => {
  const formattedObject = {};

  const fields = Object.keys(result[0]._doc);

  fields.forEach(field => {
    if (field.includes(language)) {
      const name = field.split('_')[0];
      formattedObject[name] = item[field];
    } else if (!field.includes('_')) {
      formattedObject[field] = item[field];
    }
  });

  return { ...formattedObject, _id: item._id };
};
