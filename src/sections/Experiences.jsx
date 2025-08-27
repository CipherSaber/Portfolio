import { Timeline } from "../components/Timeline.jsx";
import { experiences } from "../constants";
const Experiences = () => {
  return (
    <div className="w-full" id="experience">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
