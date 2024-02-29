'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/ui/sidebar';
import ChatSection from '@/components/ui/chat';

const Chat = () => {
  const router = useRouter();
  const msgEnd = useRef(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your friendly chatbot assistant. How can I help you today? Whether you have questions, need information, or just want to chat, feel free to ask. I'm here to assist you with any information or tasks you have in mind. What can I do for you?",
      isBot: true,
      metadata: null,
    },
  ]);

  useEffect(() => {
    if (msgEnd.current) {
      (msgEnd.current as HTMLElement).scrollIntoView();
    }
  }, [messages]);

  const handleSend = async () => {
    if (loading) return;
    setLoading(true);
    const text = input;
    setInput('');
    const newMessage = { text, isBot: false, metadata: null };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    const res = await fetch('https://poc-chatbot-iter-backend-ver1.azurewebsites.net/query_v3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        chat_history: messages,
      }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      data.metadata.author = JSON.parse(data.metadata.author);
      data.metadata.lastChangeUser = JSON.parse(data.metadata.lastChangeUser);
      data.metadata.parent_content = JSON.parse(data.metadata.parent_content);
      const botResponse = { text: data.result.split('\n')[0], isBot: true, metadata: data.metadata };
      const updatedMessagesWithBotResponse = [...updatedMessages, botResponse];
      setMessages(updatedMessagesWithBotResponse);
    } else {
      const botResponse = { text: 'Sorry, an error occurred. Please try again later.', isBot: true, metadata: null };
      const updatedMessagesWithBotResponse = [...updatedMessages, botResponse];
      setMessages(updatedMessagesWithBotResponse);
    }
  };

  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input) await handleSend();
  };

  const handleQuery = async (e: React.KeyboardEvent | React.MouseEvent) => {
    if (loading) return;
    setLoading(true);
    const text = (e.target as HTMLInputElement).innerText;
    setMessages([...messages, { text, isBot: false, metadata: null }]);
    const res = await fetch('https://poc-chatbot-iter-backend-ver1.azurewebsites.net/query_v3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        chat_hystory: '',
      }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      data.metadata.author = JSON.parse(data.metadata.author);
      data.metadata.lastChangeUser = JSON.parse(data.metadata.lastChangeUser);
      data.metadata.parent_content = JSON.parse(data.metadata.parent_content);

      setMessages([
        ...messages,
        { text, isBot: false, metadata: data.metadata },
        { text: data.result.split('\n')[0], isBot: true, metadata: data.metadata },
      ]);
    } else {
      const botResponse = { text: 'Sorry, an error occurred. Please try again later.', isBot: true, metadata: null };
      setMessages([...messages, { text, isBot: false, metadata: null }, botResponse]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/login');
  };

  return (
    <>
      {typeof window !== 'undefined' ? (
        localStorage.getItem('loggedIn') === 'true' ? (
          <main className="flex h-screen">
            <Sidebar
              handleQuery={handleQuery}
              handleLogout={handleLogout}
              loading={loading}
              setMessages={setMessages}
            />
            <ChatSection
              messages={messages}
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleEnter={handleEnter}
              msgEnd={msgEnd}
              loading={loading}
              setLoading={setLoading}
            />
          </main>
        ) : (
          router.push('/login')
        )
      ) : null}
    </>
  );
};

export default Chat;
