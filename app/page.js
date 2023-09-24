'use client';

import Hero from '@/components/hero';
import PropertyCard from '@/components/property-card';
import PropertyDetails from '@/components/property-details';
import { useEffect, useState } from 'react';
import 'dotenv/config';

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
      try {
        // let prompt = ""
        // Add the user's message and a bot response to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', message: inputMessage },
          { sender: 'bot', message: 'Typing...' },
        ]);
        // const inputMessage = inputMessage;

        // // Reset the input message field
        // setInputMessage('');

        let textResponse = '';
        const textDecoder = new TextDecoder();

        const promptResponse = await fetch(
          process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api/prompt',
          {
            method: 'POST',
            body: JSON.stringify({
              question: inputMessage,
            }),
          }
        );
        if (!promptResponse.ok) {
          throw new Error(
            'There was an error fetching the prompt. Status: ' +
              promptResponse.status
          );
        }
        const { prompt, propertylist } = await promptResponse.json();
        // console.log(prompt);
        // console.log(propertylist);

        const botResponse = await fetch(
          process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api/chat',
          {
            method: 'POST',
            body: JSON.stringify({
              messages: [
                {
                  role: 'system',
                  content:
                    'You are a real estate broker trying to find the best property for your customer. Always phrase your answer in a presentable manner.',
                },
                { role: 'user', content: prompt },
              ],
            }),
          }
        );
        if (!botResponse.ok) {
          throw new Error(
            'There was an error fetching the bot response. Status: ' +
              botResponse.status
          );
        }
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

        setproperties(propertylist);
        // Reset the input message field
      } catch (error) {
        console.error('There has been a problem with your operation:', error);
      }

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
