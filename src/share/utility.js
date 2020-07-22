export const updatedObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required)
  {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.isEmail)
  {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    isValid = isValid && re.test(value);
  }
  if (rules.minLength)
  {
    isValid = value.length >= rules.minLength && isValid;
  }
  return isValid;
}