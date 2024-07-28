import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";

const Home = () => {
  const firebase = useFirebase();
  const openInstagram = () => {
    window.open("https://www.instagram.com/utkarsh.adgitm/", "_black");
  };

  const navigate = useNavigate();
  const handleClick = (href) => {
    navigate(`/${href}`);
  };

  const [getUserCalled, setGetUserCalled] = useState(
    sessionStorage.getItem("getUserCalled") === "true"
  );

  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    if (!getUserCalled) {
      firebase.getUser().then((userData) => {
        if (userData && !userData.emailVerified) {
          setVerificationError("Email not verified. Please check your email.");
        }
      });

      sessionStorage.setItem("getUserCalled", "true");
      setGetUserCalled(true);
    }
  }, [getUserCalled, firebase]);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <nav className="w-full bg-transparent px-5 py-3 dark:bg-gray-800">
          <ol className="list-reset flex">
            <li>
              <Link
                to=""
                className="text-[#ead4ad] text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-300">
                |
              </span>
            </li>
            {!firebase.user ? (
              <>
                <li>
                  <Link
                    to="/admin/register"
                    className="text-[#ead4ad] text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => firebase.logout()}
                  className="text-[#ead4ad] text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >
                  Logout
                </button>
              </li>
            )}
          </ol>
        </nav>
        {verificationError && (
          <div className="bg-red-500 text-white p-3 rounded-md m-4">
            {verificationError}
          </div>
        )}

        <img
          src="/background.jpeg"
          className="w-full h-[100vh] object-cover"
          alt=""
        />
        <img
          src="/logo.png"
          className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          alt=""
        />

        <h1 className="h2Color1  absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Utkarsh
        </h1>
        <h1 className="h2Colorchota  absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          12-14 March 2024
        </h1>

        <div className="absolute top-[8%] left-[8%] flex flex-col space-y-4">
          {firebase.user && firebase.user.admin ? (
            <button
              onClick={() => handleClick("admin/createEvent")}
              className="btn-2 ease-in duration-100 transition-all text-secondary tracking-wide text-sm bg-accent bg-opacity-30 hover:bg-opacity-70 px-4 py-2 rounded-full border border-secondary"
            >
              <span className="hover:translate-x-0">Create Event</span>
            </button>
          ) : null}
          {firebase.user ? (
            <button
              onClick={() => handleClick("tasks")}
              className="btn-2 ease-in duration-100 transition-all text-secondary tracking-wide text-sm bg-accent bg-opacity-30 hover:bg-opacity-70 px-4 py-2 rounded-full border border-secondary"
            >
              <span className="hover:translate-x-0">Tasks</span>
            </button>
          ) : null}
          <button
            onClick={() => handleClick("events")}
            className="btn ease-in duration-100 transition-all text-secondary tracking-wide text-sm bg-accent bg-opacity-30 hover:bg-opacity-70 px-4 py-2 rounded-full border border-secondary"
          >
            <span className="hover:translate-x-0">Events</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-[8%] flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          <button
            onClick={() => handleClick("team")}
            className="btn-2 ease-in duration-100 transition-all text-secondary tracking-wide text-sm bg-accent bg-opacity-30 hover:bg-opacity-70 px-4 py-2 rounded-full border border-secondary"
          >
            <span className="hover:translate-x-0">Meet the team</span>
          </button>
        </div>

        <div className="absolute top-[8%]  makeGolden right-[10%] text-3xl">
          <button>
            <FontAwesomeIcon icon={faInstagram} onClick={openInstagram} />
          </button>
        </div>

        <div className="absolute bottom-6 right-[8%] flex flex-row space-x-4">
          <button
            onClick={() => handleClick("about")}
            className="btn-2 ease-in duration-100 transition-all text-secondary tracking-wide text-sm bg-accent bg-opacity-30 hover:bg-opacity-70 px-4 py-2 rounded-full border border-secondary"
          >
            <span className="hover:translate-x-0">About us</span>
          </button>
          {/* <button className="btn-2 ease-in duration-100 transition-all text-secondary tracking-wide text-sm bg-accent bg-opacity-30 hover:bg-opacity-70 px-4 py-2 rounded-full border border-secondary">
          <span className="hover:translate-x-0">Events</span>
        </button> */}
        </div>
      </div>
    </>
  );
};

export default Home;
