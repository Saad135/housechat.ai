import Image from 'next/image';

export default function PropertyDetails({ selectedProperty }) {
  return !selectedProperty ? (
    <div hidden={!selectedProperty} className="flex-grow overflow-auto"></div>
  ) : (
    <div className="h-full flex-grow overflow-auto">
      <div className="h-2/5 relative">
        <Image
          src={`http://source.unsplash.com/${selectedProperty.imgID}`}
          alt="A house"
          fill
          objectFit="cover"
        />
      </div>
      <div className="flex justify-between rounded-2xl m-2 p-4 items-baseline bg-blue-200">
        <p className="text-blue-950 font-semibold">Interested in a tour?</p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm">
          Get in touch
        </button>
      </div>
      <div className="m-2 p-4 bg-white shadow-xl rounded-lg">
        <p className="text-gray-800 text-3xl tracking-tight">
          Property Details
        </p>
        <div className="my-4">
          <p>{selectedProperty.title}</p>
          <p>{selectedProperty.address}</p>
        </div>
      </div>
    </div>
  );
}
