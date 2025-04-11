import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import CONSTANTS from "./constants";

const firebaseConfig = {
	apiKey: CONSTANTS.apiKey,
	authDomain: CONSTANTS.authDomain,
	projectId: CONSTANTS.projectId,
	storageBucket: CONSTANTS.storageBucket,
	messagingSenderId: CONSTANTS.messagingSenderId,
	appId: CONSTANTS.appId,
	measurementId: CONSTANTS.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
