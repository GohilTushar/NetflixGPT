export const checkValidFormData = (name, email, password) => {
  const errorMessage = {
    name: null,
    email: null,
    password: null,
  };

  // If name is undefined, it means we are in sign in mode and shouldn't check for name validation
  const toTestName = name === undefined ? false : true;

  const isNameValid = name.trim().split(" ").length >= 2;
  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordValid = password.length >= 6;

  // Set error messages if not valid
  if (!isEmailValid) errorMessage.email = "Please enter a valid email address.";
  if (!isPasswordValid)
    errorMessage.password = "Password must be at least 6 characters.";
  if (toTestName && !isNameValid)
    errorMessage.name = "Please enter your full name (first and last).";

  // If feilds are empty (overriding the regex error message in case of empty)
  if (toTestName && (!name || name?.length === 0))
    errorMessage.name = "Name is required!";
  if (!email || email?.length === 0)
    errorMessage.email = "Email id is required!";
  if (!password || password?.length === 0)
    errorMessage.password = "Password is required!";

  return errorMessage;
};
