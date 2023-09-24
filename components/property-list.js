import PropertyCard from './property-card';

export default function PropertyList({
  properties,
  setselectedProperty,
  imgID,
}) {
  return (
    <div
      hidden={properties.length == 0}
      className="py-4 overflow-auto px-2 flex-grow max-w-[25%]"
    >
      {properties.map((property, idx) => (
        <PropertyCard
          key={idx}
          property={property}
          setselectedProperty={setselectedProperty}
          imgID={imgID}
        />
      ))}
    </div>
  );
}
