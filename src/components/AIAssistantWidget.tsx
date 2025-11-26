// AIAssistantWidget.tsx

import { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, BookOpen } from 'lucide-react';
import assistantAvatar from 'figma:asset/9c1fb7d9d9db690d97bb417070ac43ffa09c8467.png';

import {
  callCozeAPI,
  getPresetAnswerFromLocal,
  PresetQuestionsMap,
} from '../utils/bookboyChat';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantWidgetProps {
  // 可选：如果你有一个“跳转到 BookBoyPage”按钮，可以从父组件传进来
  onNavigateToBookBoy?: () => void;
}

// 当前不使用任何本地预设（空对象），只是为了兼容 getPresetAnswerFromLocal 的签名
const emptyPreset: PresetQuestionsMap = {};

export function AIAssistantWidget({ onNavigateToBookBoy }: AIAssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'assistant',
      content:
        '您好，我是书童小助手！\n\n可以问我关于徐霞客、生平游记、网站功能等任何问题，小的都会尽力为您解答~',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = ['徐霞客是谁？', '他游历了哪些地方？', '《徐霞客游记》有什么特点？'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (presetText?: string) => {
    if (isTyping) return;

    const text = (presetText ?? inputValue).trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      content: text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 调用和 BookBoyPage 相同的 Coze API
      const answer = await callCozeAPI(text);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        content: answer,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      // 兜底：先尝试本地预设（目前传的是空 preset），再用固定提示
      const fallback =
        getPresetAnswerFromLocal(text, emptyPreset) ??
        '小的刚刚试图连线主服务器，可惜被风雨阻隔了一会儿……\n\n您可以稍后再试一试，若还有其他疑问，尽管问小的便是！';

      const assistantMessage: Message = {
        id: Date.now() + 2,
        content: fallback,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* 浮动开启按钮 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center"
          style={{ backgroundColor: '#655d25' }}
        >
          <img
            src={assistantAvatar}
            alt="书童助手"
            className="w-12 h-12 rounded-full object-cover border-2"
            style={{ borderColor: '#f5f2f0' }}
          />
        </button>
      )}

      {/* 聊天窗口 */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-96 h-[500px] rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden"
          style={{ backgroundColor: '#f5f2f0' }}
        >
          {/* 头部 */}
          <div
            className="p-4 flex items-center justify-between flex-shrink-0"
            style={{ backgroundColor: '#655d25' }}
          >
            <div className="flex items-center gap-3">
              <img
                src={assistantAvatar}
                alt="书童助手"
                className="w-10 h-10 rounded-full object-cover border-2 shadow-md"
                style={{ borderColor: '#f5f2f0' }}
              />
              <div>
                <h3 className="text-sm" style={{ color: '#f5f2f0' }}>
                  书童小助手
                </h3>
                <p className="text-xs opacity-75" style={{ color: '#959d8b' }}>
                  在线为您服务
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onNavigateToBookBoy && (
                <button
                  onClick={onNavigateToBookBoy}
                  className="px-2 py-1 rounded-lg flex items-center gap-1 text-xs hover:bg-white/10 transition-colors"
                  style={{ color: '#f5f2f0' }}
                >
                  <BookOpen className="w-3 h-3" />
                  Book Boy
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Minimize2 className="w-4 h-4" style={{ color: '#f5f2f0' }} />
              </button>
            </div>
          </div>

          {/* 消息区 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className="max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line shadow-md"
                  style={{
                    backgroundColor:
                      message.sender === 'user' ? '#959d8b' : '#636c53',
                    color: '#f5f2f0',
                    border: `1px solid ${
                      message.sender === 'user' ? '#655d25' : '#3d1b0b'
                    }`,
                    borderTopLeftRadius: message.sender === 'assistant' ? 0 : '0.5rem',
                    borderTopRightRadius: message.sender === 'user' ? 0 : '0.5rem',
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="p-3 rounded-lg shadow-md rounded-tl-none"
                  style={{ backgroundColor: '#636c53', color: '#f5f2f0' }}
                >
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#f5f2f0', animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#f5f2f0', animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#f5f2f0', animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 快捷提问 */}
          <div
            className="px-4 py-2 border-t flex gap-2 overflow-x-auto flex-shrink-0"
            style={{ borderColor: '#959d8b' }}
          >
            {quickSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSendMessage(s)}
                disabled={isTyping}
                className="text-xs px-3 py-1 rounded-full whitespace-nowrap hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  backgroundColor: '#959d8b',
                  color: '#f5f2f0',
                  border: '1px solid #655d25',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* 输入区 */}
          <div
            className="p-4 border-t flex gap-2 flex-shrink-0"
            style={{ borderColor: '#959d8b', backgroundColor: '#ffffff' }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="请问关于霞客先生或游记的问题吧..."
              className="flex-1 px-3 py-2 rounded-lg border outline-none text-sm"
              style={{
                borderColor: '#959d8b',
                color: '#3d1b0b',
              }}
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="px-4 py-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{ backgroundColor: '#655d25', color: '#f5f2f0' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
