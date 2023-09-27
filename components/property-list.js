import PropertyCard from './property-card';

export default function PropertyList({
  properties,
  setselectedProperty,
  imgID,
  setIsDetailsViewActive,
  selectedProperty,
}) {
  return (
    <div
      hidden={properties.length == 0}
      className={`py-4 overflow-auto px-2 flex-grow ${
        !selectedProperty ? 'max-w-[25%]' : 'max-w-[20%]'
      }`}
    >
      {properties.map((property, idx) => (
        <PropertyCard
          key={idx}
          property={property}
          setselectedProperty={setselectedProperty}
          imgID={imgID}
          setIsDetailsViewActive={setIsDetailsViewActive}
        />
      ))}
    </div>
  );
}
