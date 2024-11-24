import Button from "../../UI/Button";
import Herowriter from "../../Smallcomponents/Herowriter";
import HeroFeatures from "../../Smallcomponents/HeroFeatures";
import { Handlegithublogin } from "../../../utils/Handlegithublogin";

const HeroSection = () => {
  return (
    <div className=" py-32   space-y-2 flex items-center justify-center flex-col text-center">
      <div className=" space-y-4 py-10">
        <h1 className="text-5xl font-bold uppercase text-glow ">
          Automate Your{" "}
          <span className="text-green-400">Pull Request Reviews</span>
        </h1>
        <Herowriter />
      </div>

      <div className="py-8 space-y-8 border-t-2 border-cyan-200">
        <HeroFeatures />
        <Button
          className=" px-4 py-2"
          label="Get Started with GitHub"
          variant="primary"
          onclick={() => Handlegithublogin()}
        />
      </div>
    </div>
  );
};
export default HeroSection;
