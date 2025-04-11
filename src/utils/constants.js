const CONSTANTS = {
	// images
	SPELL_LOGO_BG_RED:
		"https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png",
	LOGIN_SCREEN_BG:
		"https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/IN-en-20230821-popsignuptwoweeks-perspective_alpha_website_medium.jpg",
	USER_AVATAR:
		"https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg",
	DEFAULT_POSTER:
		"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",

	// firebase
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

	// api
	API_OPTIONS: {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
		},
	},

	// tmdb constants
	TMDB_MOVIE_BASE_URL: "https://api.themoviedb.org/3/movie",
	TMDB_TV_BASE_URL: "https://api.themoviedb.org/3/tv",
	TMDB_IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
	TMDB_MOVIE_SEARCH_URL: "https://api.themoviedb.org/3/search/movie",

	GEN_API_KEY: import.meta.env.VITE_GEN_API_KEY,
};

export default CONSTANTS;
