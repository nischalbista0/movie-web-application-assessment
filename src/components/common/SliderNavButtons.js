import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const SliderNavButtons = ({ onNext, onPrev }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        className="skew-x-[-20deg] bg-[#0055CC] px-3 py-1.5 text-white"
      >
        <FaArrowLeftLong />
      </button>
      <button
        onClick={onNext}
        className="skew-x-[-20deg] bg-[#0055CC] px-3 py-1.5 text-white"
      >
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default SliderNavButtons;
