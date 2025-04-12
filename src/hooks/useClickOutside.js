import { useState, useEffect } from "react";

const useOnClickOutside = (ref) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const listener = (event) => {
		if (ref?.current?.contains(event.target))return;
		setIsMenuOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
		};
	}, [ref]);

	return {
		isMenuOpen,
		setIsMenuOpen,
	};
};

export default useOnClickOutside;
