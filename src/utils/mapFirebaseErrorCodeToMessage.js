export const mapFirebaseErrorCodeToMessage = (errorCode) => {
	const errorMessages = {
		"auth/invalid-email": "Email provided is invalid. Please try again.",
		"auth/wrong-password":
			"Incorrect password. Please try again or you can reset your password.",
		"auth/user-not-found":
			"Sorry, we can't find an account with this email address. Please try again or create a new account.",
		"auth/too-many-requests":
			"We are facing huge network traffic. Please try again later.",
		"auth/network-error": "Network error occurred. Please try again later.",
	};

	// Check if the error code is in the dictionary.
	if (errorCode in errorMessages) {
		return errorMessages[errorCode];
	} else {
		console.log(errorCode);
		return "Something went wrong";
	}
};
