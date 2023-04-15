import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Video from "./Video";
import Navbar from "./Navbar";
import Results from "./Results";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

const socket = io.connect("http://localhost:3001");

function Room() {
  const { roomParam } = useParams();
  const [room, setRoom] = useState(roomParam);
  const [name, setName] = useState(
    uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      length: 2,
      style: "capital",
      separator: " ",
    })
  );
  const [userList, setUserList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const onPlay = () => {
    setIsPlaying(true);
    socket.emit("playVideo", { room });
  };

  const onPause = () => {
    setIsPlaying(false);
    socket.emit("pauseVideo", { room });
  };

  const playSearchedVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsPlaying(true);
    socket.emit("updateSelectedVideo", { room, videoUrl });
  };

  useEffect(() => {
    socket.on("playVideo", ({ isPlaying }) => {
      setIsPlaying(isPlaying);
    });

    socket.on("pauseVideo", ({ isPlaying }) => {
      setIsPlaying(isPlaying);
    });
  }, [isPlaying]);

  useEffect(() => {
    socket.on("selectedVideo", ({ room: receivedRoom, videoUrl }) => {
      if (receivedRoom === room) {
        setSelectedVideo(videoUrl);
      }
    });

    return () => {
      socket.off("selectedVideo");
    };
  }, [room]);

  useEffect(() => {
    socket.emit("join", { name, room });
  }, [name, room]);

  useEffect(() => {
    socket.emit("getUsers", { room });
    socket.on("userList", (data) => {
      setUserList(data);
    });
  }, [room]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar setSearchResults={setSearchResults}></Navbar>

      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <h1 className="text-2xl font-semibold text-white">Users</h1>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {userList.map((item) => {
                      return (
                        <div
                          key={item.name}
                          className={
                            "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          }
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-2xl font-semibold text-white">Users</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {userList.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className={
                        "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      {item.name}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Video
                  selectedVideo={selectedVideo}
                  playSearchedVideo={playSearchedVideo}
                  onPlay={onPlay}
                  onPause={onPause}
                  isPlaying={isPlaying}
                ></Video>
                <Results
                  searchResults={searchResults}
                  onVideoPlay={(selectedVideo) =>
                    playSearchedVideo(selectedVideo)
                  }
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Room;
