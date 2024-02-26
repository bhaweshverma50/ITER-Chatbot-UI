import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Sidebar = ({
  handleLogout,
  handleQuery,
  loading,
  setMessages,
}: {
  handleLogout: any;
  handleQuery: any;
  loading: boolean;
  setMessages: any;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col h-full p-5 bg-slate-200">
        <div className="flex flex-col my-5">
          <Image src={'/iter.png'} alt="Logo" className="logo" width={120} height={120} quality={80} />
          <div className="text-xs my-1">
            <span>For ITER Data</span>
            <span className="italic"> Active Queries</span>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4 my-5">
            <Button
              className="flex gap-5 center h-12 w-full rounded-sm text-sm bg-indigo-700 hover:bg-indigo-800"
              onClick={() =>
                setMessages([
                  {
                    text: "Hello! I'm your friendly chatbot assistant. How can I help you today? Whether you have questions, need information, or just want to chat, feel free to ask. I'm here to assist you with any information or tasks you have in mind. What can I do for you?",
                    isBot: true,
                  },
                ])
              }
            >
              <div className="flex gap-2">
                <Image src={'/add-30.png'} alt="" className="addBtn" width={20} height={20} />
                <p>New Chat</p>
              </div>
            </Button>
            <div className="flex flex-col gap-2">
              <div className="text-xs">Try the following queries:</div>
              <div className="flex flex-col gap-2">
                <Button
                  className="rounded-sm h-12 flex px-4"
                  onClick={handleQuery}
                  value={'What does ITER stand for?'}
                  disabled={loading}
                >
                  <div className="flex gap-2 align-middle justify-center">
                    <Image src={'message.svg'} alt="Query" className="queryImg" width={15} height={15} />
                    <p className="text-xs">What does ITER stand for?</p>
                  </div>
                </Button>

                <Button
                  className="rounded-sm h-12 flex px-6"
                  onClick={handleQuery}
                  value={'Provide an overview of ITER?'}
                  disabled={loading}
                >
                  <div className="flex gap-2 align-middle justify-center">
                    <Image src={'message.svg'} alt="Query" className="queryImg" width={15} height={15} />
                    <p className="text-xs">Provide an overview of ITER?</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <Button
            className="flex center h-12 w-full rounded-sm text-sm bg-red-700 hover:bg-red-800"
            onClick={handleLogout}
          >
            <div className="flex gap-2">
              <Image src={'logout.svg'} alt="logout" className="listItemsImg-logout" width={20} height={20} />
              <p>Logout</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
