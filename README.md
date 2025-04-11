# Netflix Clone with GPT Search Feature

[🌐 View Site](https://netflixgpt-pb.vercel.app/)

This is a Netflix clone project with a GPT search feature that allows users to provide prompts, and the application will return a list of movies based on the input prompt.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Installation

1. Clone this repository to your local machine using:

```bash
git clone https://github.com/prateek-budhiraja/netflix-gpt.git
```

2. Change directory to the project folder:

```bash
cd netflix-gpt
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

Rename the `.env.example` file to `.env` and add your keys for TMDB, OpenAI and Firebase.

````bash

5. Start the development server:

```bash
npm start
````

5. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to use the Netflix clone with GPT search feature.

## Usage

1. When you navigate to [http://localhost:3000](http://localhost:3000), the application will open the login page.

2. If you are not logged in, you can sign up for an account.

3. After logging in or signing up, you will be redirected to the `/browse` page, where you'll find a collection of movies similar to Netflix.

4. On the top of the `/browse` page, there is a GPT search button.

5. Click the GPT search button to access the input box, where you can enter your search prompt.

6. Enter your search prompt and press the search button or hit Enter to initiate the GPT search.

7. The application will return a list of movies related to your search prompt.

8. Click on any movie to view more details or watch it if available.

## Technologies Used

- React
- Gemini AI for search functionality
- Firebase for authentication
- TMDB API for movie data
- Tailwind for styling
- React Router for routing
- React Redux for state management
