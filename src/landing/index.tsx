import React, { useEffect, useState } from "react";
// import { Gradient } from './Gradient';
import Snowfall from "react-snowfall";
import useInterval from "src/utils/useInterval";
import {
	useAuthState,
	useSignInWithApple,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { db, firebaseAuth } from "src/utils/firebaseAuth";
import JSConfetti from "js-confetti";
import { setDoc, doc } from "firebase/firestore";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CountDown from "./Countdown";

interface user {
	displayname: string;
	uid: string;
	email: string;
	crushes: crush[];
}

type crush = {
	firstname: string;
	lastname: string;
	email?: string;
};

const LandingPage = () => {
	const [bg, setBg] = useState(false);
	const [img, setImg] = useState(false);
	const [signInWithGoogle, loading, error] = useSignInWithGoogle(firebaseAuth);
	const [user] = useAuthState(firebaseAuth);
	const [submitting, setSubmitting] = useState("start");
	const [crushCount, setCrushCount] = useState(0);

	useEffect(() => {
		if (crushCount === 0) {
			fetch("/api/get_crush_count")
				.then((response) => response.json())
				.then((response) => {
					setCrushCount(response.count);
				})
				.catch((error) => console.log(error));
		}
	}, [crushCount]);

	useInterval(() => {
		setBg((b) => !b);
	}, 5000);

	useInterval(() => {
		setImg((i) => !i);
	}, 1300);

	const [displayForm, setDisplayForm] = useState(false);
	const [crushes, setCrushes] = useState<crush[]>([
		{ firstname: "", lastname: "" },
		{ firstname: "", lastname: "" },
		{ firstname: "", lastname: "" },
		{ firstname: "", lastname: "" },
		{ firstname: "", lastname: "" },
		{ firstname: "", lastname: "" },
	]);

	const formSubmit = async () => {
    await signInWithGoogle().then((res) => {
      console.log(JSON.stringify(res?.user));
      console.log(JSON.stringify(user));
			if (res?.user && res?.user.email?.includes("@yale.edu")) {
				var student_crushes: crush[] = [];
				crushes.map((c, i) => {
					if (c.firstname !== "" && c.lastname !== "") {
						let cleanedCrush: crush = {
							firstname: c.firstname.toLowerCase().trim(),
							lastname: c.lastname.toLowerCase().trim(),
						};
						cleanedCrush[
							"email"
						] = `${cleanedCrush.firstname}.${cleanedCrush.lastname}@yale.edu`;
						student_crushes.push(cleanedCrush);
					}
				});
				const student: user = {
					displayname: res?.user.displayName ?? "",
					uid: res?.user.uid,
					email: res?.user.email ?? "",
					crushes: student_crushes,
				};
				setDoc(doc(db, "yalies", student.uid), {
					displayname: student.displayname,
					uid: student.uid,
					email: student.email,
					crushes: student.crushes,
				})
					.then((res) => {
						setSubmitting("success");
						console.log("Success!");
						const jsConfetti = new JSConfetti();
						jsConfetti.addConfetti({
							emojis: ["💙", "💗", "💙", "💜", "❤️", "♥️", "💘", "🤍"],
						});
						setCrushCount((c) => (c += student.crushes.length));
					})
					.catch((e) => {
						console.log("Error writing document: ", e);
					});
			} else {
				console.log("Not a student email");
				setSubmitting("error");
				console.log("An error occurred: ", error);
			}
    }).catch((e) => {
      setSubmitting("error");
			console.log("An error occurred: ", error);
    })
	};

	return (
		<div className="flex flex-col w-screen h-full min-h-screen">
			<div className="z-0">
				<div
					style={{
						background: `radial-gradient(63.94% 63.94% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), ${
							bg ? "rgb(67, 16, 51)" : "rgb(1, 53, 107)"
						}`,
						transition: "all 3s ease 0s",
					}}
					className="absolute inset-0 w-full h-full"
				></div>
				<Snowfall snowflakeCount={50} />
			</div>
			{/* text */}
			<div className="z-30 flex flex-col items-center justify-center pt-20">
				<h1 className="text-5xl text-white text-opacity-80">the yale reveal</h1>
				<h3 className="text-2xl text-gray-400 text-opacity-75">
					enter by midnight, 2/12
				</h3>
				{/* countdown clock  */}
				{/* <CountDown /> */}

				{/* images */}
				{(!displayForm || submitting === "success") && (
					<>
						<div className="pt-6 pb-1">
							{img && (
								<img
									src="./assets/images/3.png"
									alt="yale"
									className="z-40 w-64 h-64"
								/>
							)}
							{!img && (
								<img
									src="./assets/images/4.png"
									alt="yale"
									className="z-40 w-64 h-64"
								/>
							)}
						</div>

						<h3 className="text-2xl font-bold text-gray-400 text-opacity-80">
							{!crushCount || crushCount === 0 ? "376" : crushCount} crushes
							submitted
						</h3>
					</>
				)}
				<div className="flex flex-col w-full px-6 py-6 mt-6 text-gray-400 bg-gray-400 md:px-10 md:rounded-xl md:w-96 bg-opacity-10">
					{/* info */}
					{!displayForm && (
						<div className="flex flex-col items-center justify-center text-center">
							<span>
								if you and your crush list each other, we&apos;ll notify you
								both! if not, nothing happens.
							</span>
							<button
								className="px-5 w-48 mx-auto py-2 mt-6 text-xl text-white bg-gray-700 border border-gray-50 border-opacity-50 rounded-full cursor-pointer bg-opacity-20 text-opacity-90 hover:bg-opacity-50 hover:bg-rose-500 transform hover:scale-[1.05] transition-all group"
								onClick={() => {
									// const jsConfetti = new JSConfetti();
									// jsConfetti.addConfetti({
									// 	emojis: ["💙", "💗", "💙", "💜", "❤️", "♥️", "💘", "🤍"],
									// });
									setDisplayForm(true);
								}}
							>
								<span className="filter grayscale group-hover:grayscale-0">
									💗 start 💗
								</span>
							</button>
						</div>
					)}
					{/* form  */}
					{submitting != "success" && (
						<>
							{displayForm && (
								<div className="flex flex-col items-center justify-center">
									<span className="pb-1 text-center whitespace-nowrap">
										enter up to 6 crushes (names like yalies.io)
									</span>
									{/* crushes input */}
									{crushes.map((crush, index) => {
										if (
											index < 3 ||
											(crushes[index - 1].firstname != "" &&
												crushes[index - 1].lastname != "")
										) {
											return (
												<div
													key={index}
													className="flex items-center justify-center w-full mt-3"
												>
													<p className="pr-2 text-xl">#{index + 1}</p>
													<input
														type="text"
														id={`firstName-${index}`}
														name="firstName"
														placeholder="first name"
														className="h-10 px-4 mr-2 font-semibold text-white bg-transparent border border-white rounded-full cursor-pointer w-36 border-opacity-30 focus:border-blue-400 focus:border-2"
														onChange={(e) => {
															setCrushes((c) => {
																c[index].firstname = e.target.value;
																return c;
															});
														}}
														// value=""
													/>
													<input
														type="text"
														id={`lastName-${index}`}
														placeholder="last name"
														name="lastName"
														className="h-10 px-4 font-semibold text-white bg-transparent border border-white rounded-full cursor-pointer w-36 border-opacity-30 focus:border-blue-400 focus:border-2"
														onChange={(e) => {
															setCrushes((c) => {
																c[index].lastname = e.target.value;
																return c;
															});
														}}
														// value=""
													/>
												</div>
											);
										}
									})}

									<button
										className="px-5 py-2 my-5 text-xl text-white bg-gray-700 border border-gray-50 border-opacity-50  rounded-full cursor-pointer bg-opacity-20 text-opacity-90 hover:bg-opacity-50 hover:bg-blue-500 transform hover:scale-[1.05] transition-all group "
										onClick={() => formSubmit()}
									>
										<span className="text-md filter grayscale group-hover:grayscale-0">
											💙 verify and submit 💙
										</span>
									</button>
									<span className="text-sm italic text-center">
										use your yale.edu email to verify you&apos;re a student.
										pairings are private, no data shared :)
									</span>
									{submitting == "error" && (
										<span className="pt-1 text-sm italic text-center text-red-500">
											an error occurred when submitting, please try again
										</span>
									)}
								</div>
							)}
						</>
					)}
					{submitting == "success" && (
						<span className="pt-1 text-center text-blue-500 text-md">
							🎉 successfully submitted your crush(es)! <br />
							you&apos;ll be notified (or not) after the 12th.
							<br />
							<br />
							submitting more than once overrides previous entries.
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
