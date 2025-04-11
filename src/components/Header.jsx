import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import useOnClickOutside from "../hooks/useClickOutside";
import { loginUser, logoutUser } from "../utils/states/userSlice";
import { setView } from "../utils/states/gptSlice";
import { auth } from "../utils/firebase";
import CONSTANTS from "../utils/constants";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const gptView = useSelector((state) => state.gpt.view);
	const refToMenu = useRef(null);
	const { isMenuOpen, setIsMenuOpen } = useOnClickOutside(
		refToMenu,
		handleCloseMenu
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName } = user;
				dispatch(loginUser({ uid, email, displayName, credit: 5 }));
				navigate("/browse");
			} else {
				dispatch(logoutUser());
				navigate("/");
			}
		});

		return () => unsubscribe();
	}, []);

	const handleSignout = () => {
		signOut(auth)
			.then()
			.catch((error) => {
				console.log(error);
			});
	};

	function handleCloseMenu() {
		setIsMenuOpen(false);
	}

	const toggleGPTView = () => {
		dispatch(setView());
	};

	return (
		<div className="fixed backdrop-blur-md top-0 left-0 right-0 z-50 px-4 py-2 flex justify-between items-center bg-gradient-to-b from-black">
			<img
				src={CONSTANTS.SPELL_LOGO_BG_RED}
				alt="netflix logo"
				className="w-24 sm:w-40"
			/>
			{user && (
				<div className="flex gap-4">
					<button
						className="cursor-pointer font-bold text-xs md:text-base text-white bg-purple-600 py-1 px-4 rounded-lg"
						onClick={toggleGPTView}
					>
						{gptView ? "Home" : "GPT Search"}
					</button>
					<div ref={refToMenu}>
						<img
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							src={CONSTANTS.USER_AVATAR}
							alt="userpic"
							className="w-6 sm:w-10 cursor-pointer"
						/>
						<div
							className={`${
								!isMenuOpen && "hidden"
							} absolute bg-white rounded right-2 top-[60px] sm:top-[95px] p-2 shadow-md animate-openmenu`}
						>
							<div className="w-4 h-4 bg-white rotate-45 absolute -top-2 right-2" />
							<h4>Welcome! {user.displayName}</h4>
							<hr className="mb-1 mt-2" />
							<span
								className="text-red-500 cursor-pointer inline-block"
								onClick={handleSignout}
							>
								Sign Out
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
