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
  setMessages,
  setIsDetailsViewActive,
  isListButtonOnTopbarActive,
  isChatButtonOnTopbarActive,
  setIsListButtonOnTopbarActive,
  setIsChatButtonOnTopbarActive,
}) {
  const imgIDList = ['2gDwlIim3Uw', 'MAnVoJlQUvg', 'XGvwt544g8k'];

  return (
    <div className="flex overflow-hidden flex-grow">
      <PropertyList
        properties={properties}
        setselectedProperty={setselectedProperty}
        imgID={imgIDList[Math.floor(Math.random() * imgIDList.length)]}
        setIsDetailsViewActive={setIsDetailsViewActive}
        selectedProperty={selectedProperty}
        isListButtonOnTopbarActive={isListButtonOnTopbarActive}
        setIsListButtonOnTopbarActive={setIsListButtonOnTopbarActive}
        setIsChatButtonOnTopbarActive={setIsChatButtonOnTopbarActive}
      />
      <PropertyDetails
        selectedProperty={selectedProperty}
        isUsingAI={isUsingAI}
        setIsUsingAI={setIsUsingAI}
        setMessages={setMessages}
        imgID={imgIDList[Math.floor(Math.random() * imgIDList.length)]}
        isListButtonOnTopbarActive={isListButtonOnTopbarActive}
        isChatButtonOnTopbarActive={isChatButtonOnTopbarActive}
        setIsListButtonOnTopbarActive={setIsListButtonOnTopbarActive}
        setIsChatButtonOnTopbarActive={setIsChatButtonOnTopbarActive}
      />
      <div
        className={`flex-grow ${
          isChatButtonOnTopbarActive ? '' : 'hidden sm:block'
        } ${selectedProperty ? 'max-w-full sm:max-w-[30%]' : ''}`}
      >
        <ChatBox
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          selectedProperty={selectedProperty}
          isUsingAI={isUsingAI}
          setMessages={setMessages}
          setIsUsingAI={setIsUsingAI}
        />
      </div>
    </div>
  );
}
