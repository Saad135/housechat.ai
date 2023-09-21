import Image from 'next/image';

export default function PropertyCard({ property, setselectedProperty }) {
  return (
    <div
      className="m-4 overflow-hidden cursor-pointer bg-white h-48 shadow-sm rounded-lg"
      onClick={() => setselectedProperty({ a: property })}
    >
      <div className="h-3/5 relative">
        <Image
          src={`http://source.unsplash.com/${property}`}
          alt="A house"
          fill
          objectFit="cover"
        />
      </div>
      <div className="px-4 pt-4">
        <p className="text-blue-700 pb-2 text-xl font-medium leading-5">
          Rockford Drive
        </p>
        <p className="text-blue-500 tracking-tight">65, Big Street, FL.</p>
      </div>
    </div>
  );
}
