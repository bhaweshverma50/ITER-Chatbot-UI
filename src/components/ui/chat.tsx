import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ChatSection = ({
  input,
  setInput,
  handleSend,
  messages,
  msgEnd,
  handleEnter,
  loading,
  setLoading,
}: {
  input: string;
  setInput: any;
  handleSend: any;
  messages: any;
  msgEnd: any;
  handleEnter: any;
  loading: boolean;
  setLoading: any;
}) => {
  return (
    <div className="px-8 flex flex-col gap-1 pt-10">
      <div className="flex flex-col h-full gap-4 overflow-scroll no-scrollbar">
        {messages.map((message: any, i: number) => (
          <div key={i} className={message.isBot ? 'chat chat-start' : 'chat chat-end'}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                {message.isBot ? (
                  <Image src="chatgptLogo.svg" alt="logo" width={20} height={20} quality={90} />
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-orange-300 rounded-full w-10 border border-orange-500">
                      <span className="text-xl">U</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className={message.isBot ? 'chat-bubble flex flex-col gap-2' : 'chat-bubble chat-bubble-info'}>
              {message.text}
              {message.isBot && message.metadata ? (
                <div className="pb-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-xs text-slate-400 bg-slate-600 px-2 py-1 rounded-full">
                        metadata
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Doc ID: {message.metadata.uid}</p>
                        <p>Title: {message.metadata.title}</p>
                        <p>Reference: {message.metadata.reference_text}</p>
                        <p>Author: {message.metadata.author.uid}</p>
                        <p>Creation Date: {new Date(message.metadata.creation_date).toLocaleString()}</p>
                        <p>Last Change User: {message.metadata.lastChangeUser.uid}</p>
                        <p>Last Change Date: {new Date(message.metadata.lastChangeDate).toLocaleString()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : null}
            </p>
          </div>
        ))}
        <div ref={msgEnd} />
      </div>

      <div className="flex flex-col gap-4 pb-4">
        <div className="flex gap-2">
          <Input
            className="bg-slate-100 rounded-sm border border-slate-300"
            type="text"
            placeholder="Send a message"
            value={input}
            onKeyDown={handleEnter}
            disabled={loading}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          <Button className="rounded-sm p-4" onClick={handleSend} disabled={!input}>
            <Image src="send.svg" alt="Send" width={30} height={30} />
          </Button>
        </div>

        <span className="text-xs text-center text-slate-500">
          ChatGPT can make mistakes. Consider checking important information.
        </span>
      </div>
    </div>
  );
};

export default ChatSection;
