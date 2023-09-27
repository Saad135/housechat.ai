import Image from 'next/image';

export default function PropertyCard({
  property,
  setselectedProperty,
  imgID,
  setIsDetailsViewActive,
  setIsListButtonOnTopbarActive,
  setIsChatButtonOnTopbarActive,
}) {
  const handleClick = () => {
    setselectedProperty(property);
    setIsDetailsViewActive(true);
    setIsChatButtonOnTopbarActive(false);
    setIsListButtonOnTopbarActive(false);
  };
  return (
    <div
      className="m-4 cursor-pointer bg-white shadow-sm rounded-lg"
      onClick={handleClick}
    >
      <div className="h-32 rounded-t-lg relative overflow-hidden">
        <Image
          src={`http://source.unsplash.com/MAnVoJlQUvg`}
          alt="A house"
          fill
          objectFit="cover"
        />
      </div>
      <div className="px-4 py-4">
        <p className="text-blue-700 pb-2 text-xl font-medium leading-5">
          {property.PublicRemarks.split(' ')
            .slice(0, property.PublicRemarks.split(' ').length >= 4 ? 3 : -1)
            .join(' ')}
        </p>
        <p className="text-blue-500 tracking-tight">
          {property.TaxLegalDescription.charAt(0) +
            property.TaxLegalDescription.slice(1).toLowerCase()}
        </p>
      </div>
    </div>
  );
}
