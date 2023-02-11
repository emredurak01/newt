import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const navigate = useNavigate();

  const joinRoom = () => {
    const roomID = uuidv4().slice(0, 6);
    navigate({
      pathname: `/room/${roomID}`,
    });
  };

  return (
    <div className="bg-gray-900 flex justify-center">
      <div className=" px-6 lg:px-8 min-h-screen">
        <div className="mx-auto max-w-2xl py-48 sm:py-64 lg:py-80">
          <div className="text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Newt.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              nunc massa, tincidunt id tincidunt quis, sagittis quis urna.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={joinRoom}
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm 
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600"
              >
                Create a room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
