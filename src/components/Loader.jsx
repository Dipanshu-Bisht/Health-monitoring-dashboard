import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading-animation.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: 50, height: 50 }} />
    </div>
  );
};

export default Loader;