import PropertyCard from './property-card';

export default function PropertyList({
  properties,
  setselectedProperty,
  imgID,
  setIsDetailsViewActive,
  selectedProperty,
  isListButtonOnTopbarActive,
  setIsListButtonOnTopbarActive,
  setIsChatButtonOnTopbarActive,
}) {
  return (
    <div
      className={`py-4 ${
        properties.length == 0
          ? 'hidden'
          : `${isListButtonOnTopbarActive ? '' : 'hidden'} sm:block`
      } overflow-auto px-2 flex-grow w-full ${
        !selectedProperty ? 'sm:max-w-[25%]' : 'sm:max-w-[20%]'
      }`}
    >
      {properties.map((property, idx) => (
        <PropertyCard
          key={idx}
          property={property}
          setselectedProperty={setselectedProperty}
          imgID={imgID}
          setIsDetailsViewActive={setIsDetailsViewActive}
          setIsListButtonOnTopbarActive={setIsListButtonOnTopbarActive}
          setIsChatButtonOnTopbarActive={setIsChatButtonOnTopbarActive}
        />
      ))}
    </div>
  );
}
