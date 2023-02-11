import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handlePlay = () => {
    search({ query: searchInput });
  };

  const search = async ({ query }) => {
    axios({
      method: "GET",
      url: process.env.REACT_APP_BASE_URL,
      params: {
        part: "snippet",
        maxResults: "1",
        key: process.env.REACT_APP_YT_API,
        q: query,
      },
    }).then((res) => {
      setSearchResult(res.data.items);
    });
  };

  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Search a video"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handlePlay(e) : null)}
      />
    </div>
  );
}

export default Search;
