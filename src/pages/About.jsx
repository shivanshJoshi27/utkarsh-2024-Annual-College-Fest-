import { Link } from "react-router-dom";
import "../team.css";

export default function About() {
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
          <li className="text-neutral-500 dark:text-neutral-300">About</li>
        </ol>
      </nav>

      <div className="pt-0 About">
        <div className="p-10 flex flex-col md:flex-row justify-content-between items-center">
          {/* First Section */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <div className="flex flex-col space-y-8 pb-10 md:pt-24">
              <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                <p className="text-xs font-semibold leading-normal md:text-sm">
                  About the company
                </p>
              </div>
              <p className="text-3xl font-bold teamHeading md:text-5xl md:leading-10">
                UTKARSH'24 excellence of 25 years
              </p>
              <p className="max-w-4xl text-base text-gray-50 md:text-xl">
                UTKARSH is a three day extravaganza; a celebration of sorts; a
                dense, fun-filled embodiment of the energy and conviviality
                which characterizes college life; a festival oozing with fun,
                vibrancy and entertainment. It is a product of dreams ambition
                and tireless hard work, a true testimony to the indomitable
                spirit, liveliness and sheer energy of the youth.
              </p>
            </div>
            <hr className="mt-20" />
          </div>
          <img
            className="h-auto w-1/2 rounded-xl object-cover md:w-1/2 md:h-[300px]"
            src="../../public/logo.png"
            alt=""
          />
        </div>

        {/* Second Section */}
        <div className="p-10 flex flex-col md:flex-row justify-content-between items-center">
          <img
            className="h-auto w-1/2 rounded-xl object-cover md:w-1/2 md:h-[300px]"
            src="https://images.shiksha.com/mediadata/images/1490683618phpmTqvtd.jpeg"
            alt=""
          />
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <div className="flex flex-col space-y-8 pb-10 md:pt-24 pl-8">
              {" "}
              <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                <p className="text-xs font-semibold leading-normal md:text-sm">
                  Section Title
                </p>
              </div>
              <p className="text-3xl font-bold teamHeading md:text-5xl md:leading-10">
                Second Title
              </p>
              <p className="max-w-4xl text-base text-gray-50 md:text-xl">
                second section content goes here.
              </p>
            </div>
            <hr className="mt-20" />
          </div>
        </div>
      </div>
    </>
  );
}
