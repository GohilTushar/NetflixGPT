import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Header from "./Header";
import { checkValidFormData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { mapFirebaseErrorCodeToMessage } from "../utils/mapFirebaseErrorCodeToMessage";
import CONSTANTS from "../utils/constants";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/states/userSlice";
import useLoading from "../hooks/useLoader";
import Loading from "./Loading";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, showLoading, hideLoading } = useLoading();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessageFirebase, setErrorMessageFirebase] = useState(null);
  const [errorMessageForm, setErrorMessageForm] = useState({
    name: null,
    email: null,
    password: null,
  });

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignInToggle = () => {
    email.current.value = "";
    password.current.value = "";

    setErrorMessageFirebase(null);
    showLoading();
    setTimeout(() => {
      setIsSignIn(!isSignIn);
      hideLoading();
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessageFirebase(null);
    showLoading();

    const message = checkValidFormData(
      !isSignIn ? name.current.value : undefined,
      email.current.value,
      password.current.value
    );
    setErrorMessageForm(message);

    // Don't try to sign in/up if there are any errors
    if (message.email || message.password || message.name) {
      hideLoading();
      return;
    }

    // firebase auth
    if (!isSignIn) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(async () => {
              const { uid, email, displayName } = auth.currentUser;
              await setDoc(doc(db, "users", auth.currentUser.uid), {
                credit: 5,
              });
              dispatch(loginUser({ uid, email, displayName, credit: 5 }));
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = mapFirebaseErrorCodeToMessage(errorCode);
              setErrorMessageFirebase(errorMessage);
            })
            .finally(() => hideLoading());
        })
        .catch((error) => {
          name.current.value = "";
          email.current.value = "";
          password.current.value = "";

          const errorCode = error.code;
          const errorMessage = mapFirebaseErrorCodeToMessage(errorCode);
          setErrorMessageFirebase(errorMessage);
        })
        .finally(() => hideLoading());
    } else {
      // Sign in logic
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current.value
      )
        .then(async () => {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          const userData = userDoc.data();

          dispatch(
            loginUser({
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
              displayName: auth.currentUser.displayName,
              credit: userData?.credit || 0,
            })
          );
        })
        .catch((error) => {
          password.current.value = "";

          const errorCode = error.code;
          const errorMessage = mapFirebaseErrorCodeToMessage(errorCode);
          setErrorMessageFirebase(errorMessage);
        })
        .finally(() => hideLoading());
    }
  };

  return (
    <div className="">
      <Header />

      <img
        src={CONSTANTS.LOGIN_SCREEN_BG}
        alt="login bg screen"
        className="block object-cover w-[100vw] h-[100vh] brightness-[.3]"
      />

      {/* Loading spinner */}
      {loading && <Loading />}

      {/* Signin/Signup form */}
      <form
        onSubmit={handleSubmit}
        className={`absolute w-full sm:w-[400px] ${
          loading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300 ease-in-out"
        } top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-black rounded bg-opacity-70 flex flex-col p-10 text-white`}
      >
        <h1 className="text-3xl font-bold mb-8">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {/* Error message from firebase */}
        {errorMessageFirebase && (
          <p className="leading-5 bg-orange-400 p-2 rounded -mt-3 mb-4">
            {errorMessageFirebase}
          </p>
        )}

        {/* conditionally render name input box */}
        {!isSignIn && (
          <>
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="mb-4 p-3 rounded bg-gray-700 w-full"
            />
            {errorMessageForm.name && (
              <p className="text-red-500 opacity-70 -mt-3 mb-3">
                {errorMessageForm.name}
              </p>
            )}
          </>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email ID"
          className="mb-4 p-3 rounded bg-gray-700 w-full"
        />
        {errorMessageForm.email && (
          <p className="text-red-500 opacity-70 -mt-3 mb-3">
            {errorMessageForm.email}
          </p>
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="mb-8 p-3 rounded bg-gray-700 w-full"
        />
        {errorMessageForm.password && (
          <p className="text-red-500 opacity-70 -mt-7 mb-3">
            {errorMessageForm.password}
          </p>
        )}
        <button
          type="submit"
          className="cursor-pointer bg-red-700 py-3 rounded mb-6"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="mb-24">
          {isSignIn ? "New to Netflix? " : "Already have an account? "}
          <span
            onClick={handleSignInToggle}
            className="text-red-700 cursor-pointer"
          >
            {isSignIn ? "Sign up now" : "Sign in now"}.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
