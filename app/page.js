'use client';

import Hero from '@/components/hero';
import PropertyCard from '@/components/property-card';
import PropertyDetails from '@/components/property-details';
import { useEffect, useState } from 'react';

export default function Home() {
  // Declare a state variable called "messages" and initialize it with an empty array
  const [messages, setMessages] = useState([]);

  // Declare a state variable called "inputMessage" and initialize it with an empty string
  const [inputMessage, setInputMessage] = useState('');

  // List of property objects that will be derived from the bot
  const [properties, setproperties] = useState([]);

  // Selected property that will be shown on detailed view
  const [selectedProperty, setselectedProperty] = useState(null);

  //Property that determines if the chat feature is using AI or not
  const [isUsingAI, setIsUsingAI] = useState(true);

  // Function to handle the sending of messages when the user presses the Enter key
  const handleSendMessage = async (e) => {
    // Check if the pressed key is "Enter" and there is a non-empty message in inputMessage
    if (e.key === 'Enter' && inputMessage) {
      // Add the user's message and a bot response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', message: inputMessage },
      ]);

      if (isUsingAI) {
        let textResponse = '';
        const textDecoder = new TextDecoder();
        const botResponse = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: inputMessage },
            ],
          }),
        });
        const botResponseReader = botResponse.body.getReader();
        while (true) {
          const { done, value } = await botResponseReader.read();
          const text_chunk = textDecoder.decode(value, { stream: true });

          if (done) {
            break;
          }

          textResponse += text_chunk;
          // console.log(textResponse);

          setMessages((prevMessages) =>
            prevMessages[prevMessages.length - 1].sender != 'bot'
              ? [...prevMessages, { sender: 'bot', message: 'AI' }]
              : [
                  ...prevMessages.slice(0, -1),
                  { sender: 'bot', message: textResponse },
                ]
          );
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', message: 'non AI' },
        ]);
      }

      setproperties([
        {
          imgID: '2gDwlIim3Uw',
          title: 'Rockford Drive',
          address: '65, Big Street, FL',
        },
        {
          imgID: 'MAnVoJlQUvg',
          title: 'Pickford Drive',
          address: '65, Little Street, FL',
        },
        {
          imgID: 'XGvwt544g8k',
          title: 'Luxury complex',
          address: '65, Rich Street, FL',
        },
      ]);
      // Reset the input message field
      setInputMessage('');
    }
  };

  // Render the main div and its contents, including the messages and input field
  return (
    <Hero
      properties={properties}
      selectedProperty={selectedProperty}
      setselectedProperty={setselectedProperty}
      messages={messages}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      handleSendMessage={handleSendMessage}
      isUsingAI={isUsingAI}
      setIsUsingAI={setIsUsingAI}
      setMessages={setMessages}
    />
  );
}
