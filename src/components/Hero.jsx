import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useWindowSize } from "../hooks/useWindowSize.js";

const Hero = () => {
  const { width, height, isPortrait } = useWindowSize();
  const hideComputersCanvas = (isPortrait && width <= 640) || height <= 420;
  return (
    <section
      className={`relative w-full mx-auto ${
        hideComputersCanvas ? "h-96" : "h-screen"
      }`}
    >
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            I'm <span className="text-[#915EFF]">Vlad Godun</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop user interfaces
            <br className="sm:block hidden" />
            and web applications
          </p>
        </div>
      </div>

      {!hideComputersCanvas && <ComputersCanvas />}
    </section>
  );
};

export default Hero;
