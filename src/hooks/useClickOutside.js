import { useState, useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const listener = (event) => {
		if (!ref.current || ref.current.contains(event.target)) {
			return;
		}

		handler(event);
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
