import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "../components/Header";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignIn, setIsSignin] = useState(true);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleButtonClick = () => {
    let error;
    if (!isSignIn)
      error = checkValidData(data?.email, data?.password, data?.name);
    if (isSignIn) error = checkValidData(data?.email, data?.password);
    setError(error);
    if (error) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, data?.email, data?.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: data?.name,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = user;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              // An error occurred
              console.log(error)
              setError(error?.errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, data?.email, data?.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + "-" + errorMessage);
        });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="w-screen h-screen object-cover" src={BG_URL} alt="bg_url" />
      </div>
      <from className="absolute bg-black bg-opacity-80 p-12 w-2/4 md:w-1/4 my-36 mx-auto left-0 right-0 text-white rounded-lg">
        <h1 className="font-bold text-2xl py-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-gray-500"
            value={data?.name}
            name="name"
            onChange={handleChange}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-gray-500"
          value={data?.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-500"
          value={data?.password}
          name="password"
          onChange={handleChange}
        />
        <p className="text-red-500">{error}</p>
        <button
          type="submit"
          onClick={handleButtonClick}
          className="p-4 my-2 w-full bg-red-700 rounded-lg cursor-pointer"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer"
          onClick={() => setIsSignin(!isSignIn)}
        >
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already Registered! Sign In now"}
        </p>
      </from>
    </div>
  );
};

export default Login;
