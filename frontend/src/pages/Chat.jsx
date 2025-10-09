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
            : 'bg-white text-gray-900 rounded-2xl rounded-tl-md border border-gray-100 mr-12'}
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
    { sender: 'bot', text: 'Hello! I am a large language model. Ask me anything to start a new chat.' }
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
      return 'Hello! I am ready to generate code, write poems, or answer your questions.';
    } else if (lowerCaseMessage.includes('code')) {
      return "I specialize in generating and explaining code snippets in various languages, like JavaScript, Python, or even React code!\n\nFor example, I can create a sorting algorithm or a component structure.";
    } else if (lowerCaseMessage.includes('gemini')) {
      return "I'm a model built by Google to help you with creative and technical tasks. I strive to be helpful and informative.";
    } else {
      return "I'm still learning! You can try asking me about 'code' or 'Gemini'.";
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
    <div className="flex flex-col h-screen w-full bg-gray-50">
      
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
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 flex justify-center w-full">
        <div className="max-w-4xl w-full">
            <div className="flex items-end bg-gray-100 rounded-3xl shadow-xl p-2 border border-gray-200">
                
                {/* Textarea for Input */}
                <textarea
                    ref={textAreaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Gemini..."
                    rows={1}
                    className="w-full resize-none p-3 bg-transparent text-lg text-gray-800 focus:outline-none overflow-hidden"
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
                    {/* Basic Send Icon */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      <path d="M12 19l9-7-9-7v14z" fill="currentColor"></path>
                    </svg>
                </button>
            </div>
             <p className="text-xs text-gray-500 text-center mt-2">
                Gemini may display inaccurate info, including about people, so double-check its responses.
            </p>
        </div>
      </div>
    </div>
  );
}

export default Chat;