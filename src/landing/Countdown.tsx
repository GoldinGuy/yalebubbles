import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
	isPlaying: true,
	size: 60,
  strokeWidth: 6,
  
};

const renderTime = (dimension: any, time: any) => {
	return (
		<div className="time-wrapper">
			<div className="time">{time}</div>
			<div>{dimension}</div>
		</div>
	);
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

export default function CountDown() {
	const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
	const endTime = stratTime + 243248; // use UNIX timestamp in seconds

	const remainingTime = endTime - stratTime;
	const days = Math.ceil(remainingTime / daySeconds);
	const daysDuration = days * daySeconds;

	return (
		<div className="z-10 flex flex-row text-center ">
			<CountdownCircleTimer
        {...timerProps}
      
				colors="#fff"
				duration={daysDuration}
				initialRemainingTime={remainingTime}
			>
				{({ elapsedTime, color }) => (
					<span style={{ color }}>
						{renderTime("d", getTimeDays(daysDuration - elapsedTime))}
					</span>
				)}
			</CountdownCircleTimer>
			<CountdownCircleTimer
				{...timerProps}
				colors="#fff"
				duration={daySeconds}
				initialRemainingTime={remainingTime % daySeconds}
				onComplete={(totalElapsedTime) => ({
					shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
				})}
			>
				{({ elapsedTime, color }) => (
					<span style={{ color }}>
						{renderTime("h", getTimeHours(daySeconds - elapsedTime))}
					</span>
				)}
			</CountdownCircleTimer>
			<CountdownCircleTimer
				{...timerProps}
				colors="#fff"
				duration={hourSeconds}
				initialRemainingTime={remainingTime % hourSeconds}
				onComplete={(totalElapsedTime) => ({
					shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
				})}
			>
				{({ elapsedTime, color }) => (
					<span style={{ color }}>
						{renderTime("m", getTimeMinutes(hourSeconds - elapsedTime))}
					</span>
				)}
			</CountdownCircleTimer>
			<CountdownCircleTimer
				{...timerProps}
				colors="#fff"
				duration={minuteSeconds}
				initialRemainingTime={remainingTime % minuteSeconds}
				onComplete={(totalElapsedTime) => ({
					shouldRepeat: remainingTime - totalElapsedTime > 0,
				})}
			>
				{({ elapsedTime, color }) => (
					<span style={{ color }}>
						{renderTime("s", getTimeSeconds(elapsedTime))}
					</span>
				)}
			</CountdownCircleTimer>
		</div>
	);
}
