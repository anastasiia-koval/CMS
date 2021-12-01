export const validateForm = (fields, values) => {
  const errors = {};

  fields.forEach((field) => {
    const id = field.id;
    const value = values[id];

    if (field.sameAs && values[field.sameAs] !== value) {
      errors[id] = field.sameAsError;
    }
  });

  return errors;
};

export const hasErrors = (errors) => {
  let hasErrors = false;
  Object.keys(errors).forEach((key) => {
    if (errors[key]) {
      hasErrors = true;
    }
  });

  return hasErrors;
};
