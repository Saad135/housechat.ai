'use client';

import Hero from '@/components/hero';
import PropertyCard from '@/components/property-card';
import PropertyDetails from '@/components/property-details';
import { useEffect, useState } from 'react';
import 'dotenv/config';
import { constructPrompt, convertPropertyToContext } from '@/utils/utils';
import TopBar from '@/components/top-bar';

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

  //Property that tracks if details view is active or not
  const [isDetailsViewActive, setIsDetailsViewActive] = useState(false);

  // Topbar states
  const [isListButtonOnTopbarActive, setIsListButtonOnTopbarActive] =
    useState(false);
  const [isChatButtonOnTopbarActive, setIsChatButtonOnTopbarActive] =
    useState(true);

  //handle bot interaction for details view
  const handleDetailViewMessage = async (e) => {
    if (e.key === 'Enter' && inputMessage) {
      // console.log('Details view');
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', message: inputMessage },
        { sender: 'bot', message: 'Typing...' },
      ]);

      const prompt = selectedProperty
        ? constructPrompt(inputMessage, [
            convertPropertyToContext(selectedProperty),
          ])
        : null;

      if (!prompt) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'bot',
            message: 'Sorry There was an error generating the prompt',
          },
        ]);
        setInputMessage('');
        return;
      }
      // console.log(prompt);

      try {
        let textResponse = '';
        const textDecoder = new TextDecoder();

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
      } catch (error) {
        console.error('There has been a problem with your operation:', error);
      }
      setInputMessage('');
    }
  };

  // Function to handle the sending of messages when the user presses the Enter key
  const handleSendMessage = async (e) => {
    // Check if the pressed key is "Enter" and there is a non-empty message in inputMessage
    if (e.key === 'Enter' && inputMessage) {
      // console.log('normal view');
      try {
        // let prompt = ""
        // Add the user's message and a bot response to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', message: inputMessage },
          { sender: 'bot', message: 'Fetching properties...' },
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
        setMessages((prevMessages) =>
          prevMessages[prevMessages.length - 1].sender != 'bot'
            ? [...prevMessages, { sender: 'bot', message: 'AI' }]
            : [
                ...prevMessages.slice(0, -1),
                { sender: 'bot', message: 'Typing response...' },
              ]
        );

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
    <div className="h-screen flex flex-col">
      <TopBar
        isListButtonOnTopbarActive={isListButtonOnTopbarActive}
        isChatButtonOnTopbarActive={isChatButtonOnTopbarActive}
        setIsListButtonOnTopbarActive={setIsListButtonOnTopbarActive}
        setIsChatButtonOnTopbarActive={setIsChatButtonOnTopbarActive}
      />
      <Hero
        properties={properties}
        selectedProperty={selectedProperty}
        setselectedProperty={setselectedProperty}
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={
          !isDetailsViewActive ? handleSendMessage : handleDetailViewMessage
        }
        isUsingAI={isUsingAI}
        setIsUsingAI={setIsUsingAI}
        setMessages={setMessages}
        setIsDetailsViewActive={setIsDetailsViewActive}
        isListButtonOnTopbarActive={isListButtonOnTopbarActive}
        isChatButtonOnTopbarActive={isChatButtonOnTopbarActive}
        setIsListButtonOnTopbarActive={setIsListButtonOnTopbarActive}
        setIsChatButtonOnTopbarActive={setIsChatButtonOnTopbarActive}
      />
    </div>
  );
}
