import React from "react";

function Results({ searchResults, onVideoPlay }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {searchResults.map((item) => {
          return (
            <li key={item.id.videoId} className="relative">
              <div
                onClick={() => onVideoPlay(item)}
                className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
              >
                <img
                  src={item.snippet.thumbnails.high.url}
                  alt=""
                  className="object-cover pointer-events-none group-hover:opacity-75"
                />
                <button
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                ></button>
              </div>
              <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                {item.snippet.title}
              </p>
              <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {item.snippet.channelTitle}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Results;
