'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, RotateCcw, Trash2 } from 'lucide-react';
// Using CSS animations instead of Framer Motion for Next.js 15 compatibility
import BackButton from '../components/BackButton';
import { getJiminResponse, resetJiminResponses } from '@/app/lib/jiminChat';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'jimin';
  timestamp: number;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('jiminChatHistory');
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading chat history:', error);
        initializeChat();
      }
    } else {
      initializeChat();
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('jiminChatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = () => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: "Hi ARMY! I'm Jimin. How can I help? 🥰",
      sender: 'jimin',
      timestamp: Date.now()
    };
    setMessages([initialMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const jiminResponse = getJiminResponse(input.trim());
      const jiminMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: jiminResponse,
        sender: 'jimin',
        timestamp: Date.now() + 1
      };

      setMessages(prev => [...prev, jiminMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetResponses = () => {
    resetJiminResponses();
    // Show a brief confirmation
    const resetMessage: Message = {
      id: Date.now().toString(),
      text: "Responses reset! Ready for fresh chats. 😊",
      sender: 'jimin',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, resetMessage]);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('jiminChatHistory');
    initializeChat();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-purple-200/50">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Chat with Jimin
            </h1>
            <p className="text-sm text-gray-600">Your personal BTS companion 💜</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleResetResponses}
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors touch-target"
            title="Reset responses"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors touch-target"
            title="Clear chat history"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md'
                  : 'bg-white/90 backdrop-blur-sm border border-purple-200/50 text-gray-800 rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200/50 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">Jimin is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-purple-200/50">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message to Jimin..."
            className="flex-1 px-4 py-3 rounded-full border border-purple-300 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 text-gray-900 placeholder-gray-500 text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl touch-target"
          >
            <Send size={18} />
          </button>
        </div>
        
        {/* Helpful tip */}
        <p className="text-xs text-gray-500 text-center mt-2">
          💜 Share your feelings with Jimin - he's here to support you!
        </p>
      </div>
    </main>
  );
}
