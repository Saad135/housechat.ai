export default function PropertyCard({ property }) {
  return (
    <div className="my-5 flex shadow-sm rounded-lg text-blue-200 items-center justify-center w-full h-20 bg-blue-800">
      <span>{property}</span>
    </div>
  );
}
