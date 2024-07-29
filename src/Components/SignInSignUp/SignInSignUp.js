import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const SignInSignUp = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="overflow-hidden">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="flex content-center justify-center flex-wrap h-screen">
          <div className="border-2 border-solid border-gray-800 p-10 rounded-lg text-base flex content-center justify-center flex-wrap gap-5 flex-col shadow-md">
            <div className="flex content-center justify-center flex-wrap uppercase font-bold text-xl border-b-2 border-gray-800">
              Log In
            </div>
            <div className="flex content-center justify-center flex-wrap gap-2 flex-col">
              <label>Email</label>
              <input
                type="email"
                className="outline-none border-2 border-gray-800 p-1"
              />
              <label>Password</label>
              <input
                type="password"
                className="outline-none border-2 border-gray-800 p-1"
              />
            </div>
            <div>Forgot password?</div>
            <div>
              Don't have an account &nbsp;
              <button onClick={handleClick} className="text-blue-800">
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="flex content-center justify-center flex-wrap h-screen">
          <div className="border-2 border-solid border-gray-800 p-10 rounded-lg text-base flex content-center justify-center flex-wrap gap-5 flex-col shadow-md">
            <div className="flex content-center justify-center flex-wrap uppercase font-bold text-xl border-b-2 border-gray-800">
              Register
            </div>
            <div className="flex content-center justify-center flex-wrap gap-2 flex-col">
              <label>Email</label>
              <input
                type="email"
                className="outline-none border-2 border-gray-800 p-1"
              />
              <label>Name</label>
              <input
                type="text"
                className="outline-none border-2 border-gray-800 p-1"
              />
              <label>Password</label>
              <input
                type="password"
                className="outline-none border-2 border-gray-800 p-1"
              />
            </div>
            <div>
              Already have an account &nbsp;
              <button onClick={handleClick} className="text-blue-800">
                log in
              </button>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default SignInSignUp;
