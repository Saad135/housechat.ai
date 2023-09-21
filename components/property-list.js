import PropertyCard from './property-card';

export default function PropertyList({ properties, setselectedProperty }) {
  return (
    <div hidden={properties.length == 0} className="p-4 min-w-[15%]">
      {properties.map((property, idx) => (
        <div
          key={idx}
          className="cursor-pointer"
          onClick={() => setselectedProperty({ a: property })}
        >
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
}
