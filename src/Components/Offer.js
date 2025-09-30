import bgH from "../assets/bgH.jpg";

export default function Offer() {
  return (
    <div
      className="offer mb-6 h-[300px] flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${bgH})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <p className="text-2xl">Get up to -40% Off</p>
      <h2 className=" text-2xl font-bold my-4">
        Up to 50% off on all products
      </h2>
    </div>
  );
}
