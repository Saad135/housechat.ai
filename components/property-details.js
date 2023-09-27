import Image from 'next/image';

export default function PropertyDetails({
  selectedProperty,
  isUsingAI,
  setIsUsingAI,
  setMessages,
  imgID,
  isListButtonOnTopbarActive,
  isChatButtonOnTopbarActive,
  setIsListButtonOnTopbarActive,
  setIsChatButtonOnTopbarActive,
}) {
  const startContact = () => {
    setIsUsingAI(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'bot', message: 'Please Provide us with your email.' },
    ]);
    setIsChatButtonOnTopbarActive(true);
    setIsListButtonOnTopbarActive(false);
  };

  const propertyKeys =
    selectedProperty && selectedProperty.length != 0
      ? Object.keys(selectedProperty)
      : [];
  // console.log(propertyKeys);
  // propertyKeys.map((propertyKey, idx) => {
  //   if (
  //     propertyKey != 'PublicRemarks' ||
  //     propertyKey != 'TaxLegalDescription'
  //   ) {
  //     console.log(propertyKey);
  //   }
  // });

  return !selectedProperty ? (
    <div hidden={!selectedProperty} className="flex-grow overflow-auto"></div>
  ) : (
    <div
      className={`h-full ${
        isListButtonOnTopbarActive || isChatButtonOnTopbarActive ? 'hidden' : ''
      } sm:block max-w-full sm:max-w-[50%] flex-grow overflow-auto`}
    >
      <div className="h-2/5 relative">
        <Image
          src={`http://source.unsplash.com/MAnVoJlQUvg`}
          alt="A house"
          fill
          objectFit="cover"
        />
      </div>
      <div className="flex justify-between rounded-2xl m-2 p-4 items-baseline bg-blue-200">
        <p className="text-blue-950 font-semibold">Interested in a tour?</p>
        <button
          onClick={() => {
            startContact();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
        >
          Get in touch
        </button>
      </div>
      <div className="m-2 p-4 bg-white shadow-xl rounded-lg">
        <p className="text-gray-800 text-3xl tracking-tight">
          Property Details
        </p>
        <div className="my-4">
          <p className="mb-4">
            <span className="text-lg font-medium underline">Title: </span>
            {selectedProperty.PublicRemarks.split(' ')
              .slice(
                0,
                selectedProperty.PublicRemarks.split(' ').length >= 4 ? 3 : -1
              )
              .join(' ')}
          </p>
          <p className="text-lg font-medium underline mb-2">Description</p>
          <p className="mb-4">{selectedProperty.PublicRemarks}</p>
          <p className="mb-4">
            <span className="text-lg font-medium underline">
              TaxLegalDescription:{' '}
            </span>
            {selectedProperty.TaxLegalDescription}
          </p>
          <p className="text-lg font-medium underline mb-2">Others</p>
          {propertyKeys.map((propertyKey, idx) =>
            propertyKey != 'PublicRemarks' &&
            propertyKey != 'TaxLegalDescription' ? (
              <p key={idx}>
                {propertyKey}: {selectedProperty[propertyKey]}
              </p>
            ) : (
              <p key={idx} hidden></p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
