import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

export default function CreateEvent() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [link, setlink] = useState("");
  const [duration, setduration] = useState("");

  const navigate = useNavigate();

  const firebase = useFirebase();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPhoto(selectedFile);
  };

  const handleSignup = useCallback(
    async (e) => {
      e.preventDefault();

      const event = await firebase.createEvent(
        title,
        description,
        link,
        photo,
        duration
      );
      if (event) {
        alert("Event added successfully");
        settitle("");
        setdescription("");
        setPhoto("");
        setlink("");
        setduration("");
      }
    },
    [title, description, photo, link,duration,firebase]
  );

  useEffect(() => {
    const checkUserAndAdmin = async () => {
      if (!(firebase.user && firebase.user.admin)) {
        navigate("/error");
      }
    };

    checkUserAndAdmin();
  }, [firebase, navigate]);

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
          <li className="text-neutral-500 dark:text-neutral-300">
            Create Event
          </li>
        </ol>
      </nav>
      <div className="w-full h-screen overflow-hidden">
        <section className=" text-white">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-center text-2xl font-bold leading-tight">
                Create Event{" "}
              </h2>
              <form onSubmit={handleSignup} method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="title"
                      className="text-base font-medium text-gray-50"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Title"
                        id="title"
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="text-base font-medium text-gray-50"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Description"
                        id="description"
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="profile"
                      className="text-base font-medium text-gray-50"
                    >
                      Event Image
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="profile"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="link"
                        className="text-base font-medium text-gray-50"
                      >
                        Link
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        value={link}
                        onChange={(e) => setlink(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="url"
                        placeholder="Registration Link"
                        id="link"
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="duration"
                        className="text-base font-medium text-gray-50"
                      >
                        Duration
                      </label>
                    </div>
                    <div className="mt-2">
                      <select
                        value={duration}
                        onChange={(e) => setduration(e.target.value)}
                        className="flex text-black h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id="duration"
                        required
                      >
                        <option value="">Select Duration</option>
                        <option value="Day 1">Day 1</option>
                        <option value="Day 2">Day 2</option>
                        <option value="Day 3">Day 3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Create eeeee <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
