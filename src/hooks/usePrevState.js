import { useRef, useEffect } from "react";

const usePrevState = (state) => {
	const ref = useRef();
	useEffect(() => {
		ref.current = state;
	});
	return ref.current;
};

export default usePrevState;
