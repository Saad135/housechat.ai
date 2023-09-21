export default function PropertyList({ properties, setselectedProperty }) {
  return (
    <div hidden={properties.length == 0} className="p-4 min-w-[15%]">
      {properties.map((property, idx) => (
        <div
          key={idx}
          className="cursor-pointer"
          onClick={() => setselectedProperty({ a: property })}
        >
          <div className="my-5 flex shadow-sm rounded-lg text-blue-200 items-center justify-center w-full h-20 bg-blue-800">
            <span>{property}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
