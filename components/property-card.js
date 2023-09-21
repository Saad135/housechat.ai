import Image from 'next/image';

export default function PropertyCard({ property, setselectedProperty }) {
  return (
    <div
      className="m-4 cursor-pointer bg-white shadow-sm rounded-lg"
      onClick={() => setselectedProperty({ a: property })}
    >
      <div className="h-32 rounded-t-lg relative overflow-hidden">
        <Image
          src={`http://source.unsplash.com/${property}`}
          alt="A house"
          fill
          objectFit="cover"
        />
      </div>
      <div className="px-4 py-4">
        <p className="text-blue-700 pb-2 text-xl font-medium leading-5">
          Rockford Drive
        </p>
        <p className="text-blue-500 tracking-tight">65, Big Street, FL.</p>
      </div>
    </div>
  );
}
