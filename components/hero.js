import ChatBox from './chatbox';
import PropertyDetails from './property-details';
import PropertyList from './property-list';

export default function Hero({
  properties,
  setselectedProperty,
  selectedProperty,
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isUsingAI,
  setIsUsingAI,
}) {
  return (
    <div className="flex overflow-hidden flex-grow">
      <PropertyList
        properties={properties}
        setselectedProperty={setselectedProperty}
      />
      <PropertyDetails
        selectedProperty={selectedProperty}
        isUsingAI={isUsingAI}
        setIsUsingAI={setIsUsingAI}
      />
      <div className={`flex-grow ${selectedProperty ? 'max-w-[30%]' : ''}`}>
        <ChatBox
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          selectedProperty={selectedProperty}
        />
      </div>
    </div>
  );
}
