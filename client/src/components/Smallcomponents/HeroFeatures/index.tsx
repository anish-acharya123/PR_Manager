import { Icon } from "@iconify/react/dist/iconify.js";
import List from "../../UI/List";
import { FEATURES } from "../../../constants/Features";

const HeroFeatures = () => {
  return (
    <div className=" flex  justify-center gap-4 text-[1.1rem] ">
      <List
        items={FEATURES.slice(0, 2)}
        renderItem={(item) => (
          <li key={item.id} className="flex gap-2 items-center ">
            <figure>
              <Icon icon={item.icon} className="text-3xl" />
            </figure>
            <p>{item.label}</p>
          </li>
        )}
      />
      <List
        items={FEATURES.slice(2)}
        renderItem={(item) => (
          <li key={item.id} className="flex gap-2 items-center ">
            <figure>
              <Icon icon={item.icon} className="text-3xl" />
            </figure>
            <p>{item.label}</p>
          </li>
        )}
      />
    </div>
  );
};

export default HeroFeatures;
