export const checkValidFormData = (name, email, password) => {
	const errorMessage = {
		name: null,
		email: null,
		password: null,
	};

	// If name is undefined, it means we are in sign in mode and shouldn't check for name validation
	const toTestName = name === undefined ? false : true;

	const isNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
	const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
	const isPasswordValid =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

	// If feilds doesn't match the regex, also set the error message
	if (!isEmailValid) errorMessage.email = "Email id is not valid!";
	if (!isPasswordValid) errorMessage.password = "Password is not valid!";
	if (toTestName && !isNameValid) errorMessage.name = "Name is not valid!";

	// If feilds are empty (overriding the regex error message in case of empty)
	if (toTestName && (!name || name?.length === 0))
		errorMessage.name = "Name is required!";
	if (!email || email?.length === 0)
		errorMessage.email = "Email id is required!";
	if (!password || password?.length === 0)
		errorMessage.password = "Password is required!";

	return errorMessage;
};
