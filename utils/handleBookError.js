const handleBookError = (err) => {
  let errors = { title: "", author: "", publishYear: "" };
  let generalErrors = { msg: "" };

  if (err.message.includes("Books validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  }

  if (err.message.includes("Cast to ObjectId failed")) {
    generalErrors.msg = "Invalid book ID format";

    return generalErrors;
  }

  generalErrors.msg = "An unknown error occurred";
  return generalErrors;
};

export default handleBookError;
