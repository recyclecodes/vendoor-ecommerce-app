import { Button } from "../ui/button";
import hero from "../../assets/homepage/hero.png";

export default function Hero() {
  return (
    <div className="flex flex-col w-full h-[600px] items-center justify-around bg-blue-50 px-11 sm:flex-row">
      <div className="flex flex-col gap-2">
        <h1>
          <span className="text-black">Wear Your </span>
          <span className="text-blue-600">Best</span>
        </h1>
        <p className="text-gray-600">
          Discover exclusive deals and an extensive range of products!
        </p>
        <Button
          variant="default"
          size="default"
          className="bg-blue-500 sm:w-1/3 mt-3 text-white"
        >
          Shop now
        </Button>
      </div>
      <div>
        <img
          src={hero}
          alt="Hero image"
          className="w-auto sm:h-[600px] h-[350px]  object-cover"
        />
      </div>
    </div>
  );
}
