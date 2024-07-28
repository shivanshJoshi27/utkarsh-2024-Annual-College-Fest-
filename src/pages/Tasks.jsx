import React from "react";
import { Link } from "react-router-dom";

const Tasks = () => {
  return (
    <>
      <nav className="w-full bg-transparent px-5 py-3 dark:bg-gray-800">
        <ol className="list-reset flex">
          <li>
            <Link
              to="/"
              className="text-[#ead4ad] text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-neutral-500 dark:text-neutral-300">
              /
            </span>
          </li>
          <li className="text-neutral-500 dark:text-neutral-300">Tasks</li>
        </ol>
      </nav>
      <div>
        <img
          src="/background.jpeg"
          className="w-full h-[100vh] object-cover"
          alt=""
        />

        <h1 className="h2Color1  absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Coming Soon!
        </h1>
      </div>
    </>
  );
};

export default Tasks;
