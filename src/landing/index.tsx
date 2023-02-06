import React, { useEffect, useState } from 'react';
// import { Gradient } from './Gradient';
import Snowfall from 'react-snowfall';

const LandingPage = () => {
  
  const [bg, setBg] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setBg((b) => b + 1);
    }, 4500);
  }, []);

  return (
		<div className="flex flex-col w-screen h-screen">
			<div className="z-0">
				<div
					style={{
						background: `radial-gradient(63.94% 63.94% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), ${
							bg % 2 === 0
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
				<h1 className="text-5xl text-white">the yale reveal</h1>
        <h3 className="text-2xl text-gray-400">enter by midnight, 2/11</h3>
        {/* images */}
        <div>

        </div>
        {/* form */}
			</div>
		</div>
	);
};

export default LandingPage;
