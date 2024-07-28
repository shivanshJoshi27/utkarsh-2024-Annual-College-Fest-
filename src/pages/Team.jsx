
import { Link } from "react-router-dom";
import backgroundImage from "../../public/background.jpeg";
import TeamCard from "../components/TeamCard";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";

const Team = () => {

  const firebase = useFirebase()
  const [users, setusers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      if (users.length === 0) {
        // console.log("Fetching users...");
        const usersData = await firebase.getUsers();
        // console.log("Users fetched:", usersData);
        if (usersData) {
          setusers(usersData);
        }
      }
    };

    fetchUsers();
  }, [users]); 

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
          <li className="text-neutral-500 dark:text-neutral-300">Team</li>
        </ol>
      </nav>

      <div
        className="h-full w-full flex flex-col"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="p-10 flex items-center">
          <div className="space-y-6 md:w-3/4 text-white">
            <div className="max-w-max rounded-full border bg-gray-800 p-1 px-3">
              <p className="text-xs font-semibold leading-normal md:text-sm">
                Join Us &rarr;
              </p>
            </div>
            <p className="text-3xl font-bold md:text-4xl">Meet our team</p>
            <p className="max-w-4xl text-base md:text-xl">
              Our philosophy is simple — hire a team of diverse, passionate
              people and foster a culture that empowers you to do your best
              work.
            </p>
          </div>
        </div>

        {/* TEAM */}
        <div className=" p-10 flex-grow grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
          {users.map((user) => (
            <TeamCard key={user.uid} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
