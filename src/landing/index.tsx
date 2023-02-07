import React, { useEffect, useState } from 'react';
// import { Gradient } from './Gradient';
import Snowfall from 'react-snowfall';
import useInterval from 'src/utils/useInterval';

interface user {
  firstname: string;
  lastname: string;
  email: string;
  crushes: crush[];
}

type crush = {
	firstname: string;
	lastname: string;
};

const LandingPage = () => {
  
  const [bg, setBg] = useState(false);
  const [img, setImg] = useState(false);

  useInterval(() => {
    setBg((b) => !b);
  }, 5000);

  useInterval(() => {
		setImg((i) => !i);
  }, 1300);
  
  const [displayForm, setDisplayForm] = useState(false);
  const [crushes, setCrushes] = useState<crush[]>([]);

  const formSubmit = () => {

  }

  return (
		<div className="flex flex-col w-screen h-screen">
			<div className="z-0">
				<div
					style={{
						background: `radial-gradient(63.94% 63.94% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), ${
							bg
								? "rgb(67, 16, 51)"
								: //bg % 3 === 1 ? "rgb(5, 7, 19)" :
								  "rgb(1, 53, 107)"
						}`,
						transition: "all 3s ease 0s",
					}}
					className="absolute inset-0 w-full h-full"
				></div>
				<Snowfall snowflakeCount={50} />
			</div>
			{/* <div className="w-full h-full -z-10 bg-gradient-to-r from-purple-500 to-pink-500"></div> */}

			{/* text */}
			<div className="z-30 flex flex-col items-center justify-center pt-20">
				<h1 className="text-5xl text-white text-opacity-80">the yale reveal</h1>
				<h3 className="text-2xl text-gray-400 text-opacity-75">
					enter by midnight, 2/11
				</h3>
				{/* images */}
				<div className="pt-6 pb-1">
					{img && (
						<img src="./assets/images/2.png" alt="yale" className="w-52 h-52" />
					)}
					{!img && (
						<img src="./assets/images/1.png" alt="yale" className="w-52 h-52" />
					)}
				</div>
				{/* TODO: update this adaptively  */}
				<h3 className="text-2xl font-bold text-gray-400 text-opacity-80">
					376 crushes submitted
				</h3>
				{/* form */}
				<div className="flex flex-col px-10 py-6 mt-6 text-gray-400 bg-gray-400 rounded-xl w-96 bg-opacity-10">
					{/* <span className='pb-2 font-bold text-center'>
						info
					</span> */}
					<span>
						if you and your crush list each other, we&apos;ll notify you both!
						if not, nothing happens.
					</span>
					<button
						className="px-5 py-2 mt-6 text-2xl text-white bg-gray-700 border border-gray-100 rounded-full cursor-pointer bg-opacity-20 text-opacity-90 hover:bg-opacity-50 hover:bg-rose-500 transform hover:scale-[1.05] transition-all group"
						onClick={() => setDisplayForm(true)}
					>
						<span className="filter grayscale group-hover:grayscale-0">💗 start 💗</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
