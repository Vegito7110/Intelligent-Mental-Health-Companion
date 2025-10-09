import React, { useState, useEffect, useRef } from 'react'

 
const ChatMessage = ({ sender, text }) => {
    const isUser = sender === 'user';
    
    return (
      <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
        {/* Bot Icon/Placeholder */}
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-3 mt-1">
            AI
          </div>
        )}
  
        {/* Message Content */}
        <div className={`
          max-w-3xl p-3 shadow-md whitespace-pre-wrap
          ${isUser 
            ? 'bg-gray-100 text-gray-800 rounded-2xl rounded-br-md ml-12' 
            : 'bg-gray-700 text-white rounded-2xl rounded-tl-md border border-gray-600 mr-12'}
        `}>
          {text}
        </div>
  
        {/* User Icon/Placeholder */}
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold ml-3 mt-1">
            You
          </div>
        )}
      </div>
    );
};


function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Do you want to talk?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);

  // Auto-scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea effect (a nice AI chat UX touch)
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height
      // Set height based on scroll height, but cap it (e.g., at 150px)
      const newHeight = Math.min(textAreaRef.current.scrollHeight, 150);
      textAreaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  // Simple bot response logic
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello! I am here for a chat';
    } else if (lowerCaseMessage.includes('happy')) {
      return "That's good to hear. Keep the positive vibes coming!!";
    } else if (lowerCaseMessage.includes('sad')) {
      return "I am so sorry to hear that. You should indulge in your favourite activities like listening to music, playing sports or try going for a walk to change the scenery. I hope you feel better soon and if you don't, I am always here.";
    } else {
      return "I am not completely sure about how you feel.";
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const newUserMessage = { sender: 'user', text: input.trim() };
    
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    
    // Simulate API call and bot typing delay
    setTimeout(() => {
      const botReplyText = getBotResponse(newUserMessage.text);
      const newBotMessage = { sender: 'bot', text: botReplyText };
      
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    }, 1200); 
  };

  const handleKeyDown = (e) => {
    // Check for Shift + Enter for new line, otherwise Enter to send
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full" style={{ backgroundColor: 'hsl(0, 5%, 26%)' }}>
      
      {/* Main Chat Content Area - Scrolls Independently */}
      <div className="flex-grow overflow-y-auto px-4 sm:px-10 py-8 max-w-4xl mx-auto w-full">
        {messages.map((msg, index) => (
          // Make sure ChatMessage is defined or imported
          <ChatMessage key={index} sender={msg.sender} text={msg.text} /> 
        ))}
        {/* Scroll ref */}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="sticky bottom-0 border-t border-gray-600 p-4 sm:p-6 flex justify-center w-full" style={{ backgroundColor: 'hsl(0, 5%, 26%)' }}>
        <div className="max-w-4xl w-full">
            <div className="flex items-end bg-gray-700 rounded-3xl shadow-xl p-2 border border-gray-600">

                {/* Textarea for Input */}
                <textarea
                    ref={textAreaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Bot..."
                    rows={1}
                    className="w-full resize-none p-3 bg-transparent text-lg text-white focus:outline-none overflow-hidden"
                />

                {/* Send Button */}
                <button 
                    onClick={handleSend} 
                    disabled={input.trim() === ''}
                    className={`
                        flex-shrink-0 w-10 h-10 m-1 rounded-full flex items-center justify-center 
                        transition duration-200 
                        ${input.trim() === '' 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'}
                    `}
                    title="Send message"
                >
                    {/* Send Icon */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;