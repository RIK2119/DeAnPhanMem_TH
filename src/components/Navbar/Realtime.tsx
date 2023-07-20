"use client";

import { useEffect, useMemo, useState } from "react";


const RealTime = () => {
	const currentDate = useMemo(() => new Date().toDateString(), [])
	const [currentTime, setTime] = useState(currentDate);

	useEffect(() => {
		const intervelId = setInterval(() => {
			setTime(new Date().toDateString());
		}, 60 * 1000);

		return () => clearInterval(intervelId);
	}, []);

	return <div className="text-sm"> {currentTime} </div>;
};

export { RealTime };
