import PropertyCard from './property-card';

export default function PropertyList({ properties, setselectedProperty }) {
  return (
    <div
      hidden={properties.length == 0}
      className="py-4 px-2 flex-grow max-w-[25%]"
    >
      {properties.map((property, idx) => (
        <PropertyCard
          key={idx}
          property={property}
          setselectedProperty={setselectedProperty}
        />
      ))}
    </div>
  );
}
