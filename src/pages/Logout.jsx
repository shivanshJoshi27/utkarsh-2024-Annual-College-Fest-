import { useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const Logout = () => {
  const firebase = useFirebase();

  return (
    <div>
      <button onClick={firebase.logout}>Logout</button>
    </div>
  );
};

export default Logout;
