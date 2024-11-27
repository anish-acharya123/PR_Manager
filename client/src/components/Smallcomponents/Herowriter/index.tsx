import Typewriter from "typewriter-effect";

const Herowriter = () => {
  return (
    <>
      <div  className="relative flex justify-center items-center text-white text-lg md:text-xl lg:text-2xl">
        <span className="text-glow mr-2">{"< "}</span>
        <Typewriter
          options={{
            strings: [
              "Save time, streamline workflows, and ensure fairness in code reviews",
            ],
            autoStart: true,
            loop: true,
          }}
        />
        <span className="text-glow ml-2">{" />"}</span>
        <div
          className="absolute top-0 left-1/2 w-[80%] h-[2px] bg-gradient-to-r from-cyan-500 via-transparent to-cyan-500 opacity-50 animate-pulse"
          style={{ transform: "translateX(-50%)" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-[80%] h-[2px] bg-gradient-to-r from-cyan-500 via-transparent to-cyan-500 opacity-50 animate-pulse"
          style={{ transform: "translateX(-50%)" }}
        ></div>
      </div>
    </>
  );
};
export default Herowriter;
