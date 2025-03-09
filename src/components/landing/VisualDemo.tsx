import Image from "next/image";
import VisualDemoImage from "../../../public/visualdemo.png";

const VisualDemo = () => {
  return (
    <div className="border border-gray-200 p-2 rounded-md shadow-md">
      <Image className="w-auto " src={VisualDemoImage} alt="visualdemo" />
    </div>
  );
};

export default VisualDemo;
