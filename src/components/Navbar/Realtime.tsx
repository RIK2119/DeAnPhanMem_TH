"use client";

// import { useEffect, useMemo, useState } from "react";
import { useMemo, useState } from "react";

const timeFormatter = new Intl.DateTimeFormat("vi", { dateStyle: "long" });

const RealTime = () => {
	const currentDate = useMemo(() => timeFormatter.format(Date.now()), []);
	// const [currentTime, setTime] = useState(currentDate);
	const [currentTime] = useState(currentDate);

	// useEffect(() => {
	// 	const intervelId = setInterval(() => {
	// 		setTime(new Date().toDateString());
	// 	}, 60 * 1000);

	// 	return () => clearInterval(intervelId);
	// }, []);

	return <div className="w-max text-sm"> {currentTime} </div>;
};

export { RealTime };
