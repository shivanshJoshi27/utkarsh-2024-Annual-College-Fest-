import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

export default function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [position, setposition] = useState("");
  const [priority, setpriority] = useState("");
  const [password, setpassword] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const firebase = useFirebase();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPhoto(selectedFile);
  };

  const handleSignup = useCallback(
    async (e) => {
      e.preventDefault();

      const user = await firebase.createUserWithEmail(
        email,
        password,
        position,
        priority,
        name,
        photo
      );
      if (user) {
        navigate("/");
      }
    },
    [firebase, email, password, position, priority, name,photo, navigate]
  );

  useEffect(() => {
    if (firebase.user !== null) {
      navigate("/");
    }
  }, [ firebase.user,navigate ]);
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
          <li className="text-neutral-500 dark:text-neutral-300">Sign Up</li>
        </ol>
      </nav>
      
    <div className="w-full h-screen overflow-hidden">
      <section className=" text-white">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-xl font-bold leading-tight">
              Already have an account ?{" "}
              <Link to="/admin/login" className="font-medium hover:underline">
                Log In
              </Link>
            </h2>
            <form onSubmit={handleSignup} method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-50"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div>
                    <label
                      htmlFor="position"
                      className="text-base font-medium text-gray-50"
                    >
                      {" "}
                      Position{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        value={position}
                        onChange={(e) => setposition(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Position"
                        id="position"
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="position"
                      className="text-base font-medium text-gray-50"
                    >
                      {" "}
                      Priority{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        value={priority}
                        onChange={(e) => setpriority(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="Priority"
                        id="priority"
                        required
                      ></input>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-50"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="profile"
                    className="text-base font-medium text-gray-50"
                  >
                    {" "}
                    Profile Image{" "}
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
                      htmlFor="password"
                      className="text-base font-medium text-gray-50"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
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
