import { loadFull } from "tsparticles";
import Fireworks from "../components/Fireworks";

const Main = () => {
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <div className="App bg-black h-screen w-full">
      <Fireworks
        particlesLoaded={particlesLoaded}
        particlesInit={particlesInit}
      />
    </div>
  );
};

export default Main;
