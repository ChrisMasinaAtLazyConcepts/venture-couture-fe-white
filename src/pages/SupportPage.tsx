import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MessageSquare, Send, Phone, Mail, Clock, 
  HelpCircle, FileText, Search, Bot, User, Check, 
  CheckCheck, Paperclip, Smile, MoreVertical, 
  ChevronDown, Shield, Truck, Package, CreditCard,
  X, Mic, Image as ImageIcon, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support' | 'bot';
  timestamp: Date;
  read: boolean;
  type: 'text' | 'quick-reply' | 'attachment';
  attachments?: Array<{
    type: 'image' | 'document' | 'link';
    url: string;
    name?: string;
  }>;
}

interface QuickReply {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

interface SupportAgent {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  avatar: string;
}

interface ChatSession {
  id: string;
  agent?: SupportAgent;
  messages: Message[];
  status: 'active' | 'resolved' | 'waiting';
  createdAt: Date;
  updatedAt: Date;
}

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatActive, setIsChatActive] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Mock support agent
  const supportAgent: SupportAgent = {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Support Specialist',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
  };

  // Initial messages
  const initialMessages: Message[] = [
    {
      id: '1',
      text: 'Hello! I\'m Veldskoen Support Bot. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      type: 'text'
    },
    {
      id: '2',
      text: 'You can ask me about:\n• Order tracking\n• Returns & refunds\n• Payment issues\n• Product information\n• Account problems',
      sender: 'bot',
      timestamp: new Date(Date.now() - 3500000),
      read: true,
      type: 'text'
    }
  ];

  const [chatSession, setChatSession] = useState<ChatSession>({
    id: 'CHAT-001',
    agent: undefined,
    messages: initialMessages,
    status: 'active',
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date()
  });

  const [quickReplies] = useState<QuickReply[]>([
    { id: '1', text: 'Track my order', icon: <Truck size={16} /> },
    { id: '2', text: 'Return an item', icon: <Package size={16} /> },
    { id: '3', text: 'Payment issue', icon: <CreditCard size={16} /> },
    { id: '4', text: 'Speak to human agent', icon: <User size={16} /> },
    { id: '5', text: 'FAQ', icon: <HelpCircle size={16} /> },
    { id: '6', text: 'Contact details', icon: <Phone size={16} /> }
  ]);

  const [commonQuestions] = useState([
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order using the tracking number sent to your email. Visit the Orders page in your account.'
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy. Items must be unused with original packaging.'
    },
    {
      id: '3',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is 1-2 business days.'
    },
    {
      id: '4',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to selected countries. Shipping fees and times vary by location.'
    }
  ]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatSession.messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      read: true,
      type: 'text'
    };

    setChatSession(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      updatedAt: new Date()
    }));

    setMessage('');
    setShowQuickReplies(false);
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand you're asking about: " + message + ". Let me help you with that.",
        "Thanks for your question! I'm looking up the information for you.",
        "I've found some information that might help. Would you like me to connect you with a human agent for more details?",
        "Based on your question, here's what I found in our knowledge base...",
        "Is there anything specific about this that you'd like me to clarify?"
      ];

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
        read: false,
        type: 'text'
      };

      setChatSession(prev => ({
        ...prev,
        messages: [...prev.messages, botResponse]
      }));
      setIsTyping(false);

      // If this is the first user message, connect to agent
      if (chatSession.messages.filter(m => m.sender === 'user').length === 0) {
        setTimeout(() => {
          const agentMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: 'Hi! I\'m Sarah from the support team. I see you have a question. How can I assist you today?',
            sender: 'support',
            timestamp: new Date(),
            read: false,
            type: 'text'
          };

          setChatSession(prev => ({
            ...prev,
            agent: supportAgent,
            messages: [...prev.messages, agentMessage],
            status: 'active'
          }));
        }, 2000);
      }
    }, 1500);
  };

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply.text,
      sender: 'user',
      timestamp: new Date(),
      read: true,
      type: 'quick-reply'
    };

    setChatSession(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      updatedAt: new Date()
    }));

    setShowQuickReplies(false);
    setIsTyping(true);

    // Bot responses for quick replies
    const botResponses: Record<string, string> = {
      'Track my order': 'To track your order, please provide your order number or check the Orders page in your account.',
      'Return an item': 'For returns, visit the Returns page in your account or reply with your order number.',
      'Payment issue': 'I can help with payment issues. Please provide your order number and describe the problem.',
      'Speak to human agent': 'Connecting you with a support agent now...',
      'FAQ': 'Here are frequently asked questions: [FAQ link]. Is there something specific you need help with?',
      'Contact details': 'You can reach us at support@veldskoen.com or call 0800 123 456 during business hours.'
    };

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[reply.text] || 'Thank you for your question. How can I assist you further?',
        sender: 'bot',
        timestamp: new Date(),
        read: false,
        type: 'text'
      };

      setChatSession(prev => ({
        ...prev,
        messages: [...prev.messages, botResponse]
      }));
      setIsTyping(false);

      // Connect to agent for certain replies
      if (reply.text === 'Speak to human agent' || reply.text === 'Payment issue') {
        setTimeout(() => {
          const agentMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: 'Hello! This is Sarah from support. I see you need assistance. How can I help you today?',
            sender: 'support',
            timestamp: new Date(),
            read: false,
            type: 'text'
          };

          setChatSession(prev => ({
            ...prev,
            agent: supportAgent,
            messages: [...prev.messages, agentMessage],
            status: 'active'
          }));
        }, 1000);
      }
    }, 1000);
  };

  const handleStartChat = () => {
    setIsChatActive(true);
    setSelectedCategory(null);
  };

  const handleEndChat = () => {
    if (confirm('Are you sure you want to end this chat?')) {
      setIsChatActive(false);
      setChatSession({
        id: 'CHAT-' + Date.now().toString().slice(-6),
        agent: undefined,
        messages: initialMessages,
        status: 'resolved',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      setShowQuickReplies(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-ZA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    });
  };

  const getStatusColor = (status: SupportAgent['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
    }
  };

  const renderMessage = (msg: Message) => {
    const isUser = msg.sender === 'user';
    const isBot = msg.sender === 'bot';
    const isSupport = msg.sender === 'support';

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          {!isUser && (
            <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                {isBot ? (
                  <div className="w-full h-full bg-red-100 flex items-center justify-center">
                    <Bot size={16} className="text-red-600" />
                  </div>
                ) : (
                  <img 
                    src={supportAgent.avatar} 
                    alt={supportAgent.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          )}

          {/* Message Bubble */}
          <div className={`${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`rounded-2xl px-4 py-3 ${
              isUser 
                ? 'bg-red-600 text-white rounded-br-none' 
                : isBot
                  ? 'bg-gray-100 text-gray-800 rounded-bl-none'
                  : 'bg-blue-100 text-gray-800 rounded-bl-none'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>
              
              {/* Attachments */}
              {msg.attachments && msg.attachments.map((att, idx) => (
                <div key={idx} className="mt-2 p-2 bg-white/20 rounded-lg">
                  {att.type === 'image' && (
                    <div className="flex items-center gap-2">
                      <ImageIcon size={16} />
                      <span>Image attached</span>
                    </div>
                  )}
                  {att.type === 'document' && (
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <span>{att.name || 'Document'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Timestamp */}
            <div className={`flex items-center gap-1 mt-1 text-xs ${
              isUser ? 'text-gray-500 justify-end' : 'text-gray-400'
            }`}>
              <span>{formatTime(msg.timestamp)}</span>
              {isUser && (
                <span className="ml-1">
                  {msg.read ? <CheckCheck size={12} /> : <Check size={12} />}
                </span>
              )}
              {isBot && (
                <span className="ml-1">
                  <Bot size={12} />
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Account
          </button>
          <div className="flex justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
              <p className="text-gray-600 mt-2">Get help with your orders and account</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>Support Hours: 8am-8pm (Mon-Sat)</span>
              </div>
              <button
                onClick={() => alert('Call support at 0800 123 456')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                <Phone size={20} />
                Call Us
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Support Options */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Options</h2>
              <div className="space-y-3">
                <button
                  onClick={handleStartChat}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition ${
                    isChatActive 
                      ? 'bg-red-50 border-red-600 border' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isChatActive ? 'bg-red-100' : 'bg-gray-200'}`}>
                      <MessageSquare size={20} className={isChatActive ? 'text-red-600' : 'text-gray-600'} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">Chat with our support team</p>
                    </div>
                  </div>
                  {isChatActive && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </button>

                <a
                  href="mailto:support@veldskoen.com"
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="p-2 bg-gray-200 rounded-lg">
                    <Mail size={20} className="text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">support@venture-couture.co.za</p>
                  </div>
                </a>

                <button
                  onClick={() => alert('Call support at 0800 123 456')}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="p-2 bg-gray-200 rounded-lg">
                    <Phone size={20} className="text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-600">086 123 456</p>
                  </div>
                </button>
              </div>
            </div>

            {/* FAQ & Resources */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Help</h2>
              <div className="space-y-3">
                {commonQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedCategory(q.id);
                      setIsChatActive(true);
                      handleQuickReply({ id: q.id, text: q.question });
                    }}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <p className="font-medium text-gray-900">{q.question}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{q.answer}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => navigate('/faq')}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                <HelpCircle size={16} />
                View All FAQs
              </button>
            </div>

            {/* Support Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Support Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                    ))}
                    <span className="font-bold text-gray-900 ml-2">4.8/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Online Agents</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-bold text-gray-900">12 online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-12rem)] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <MessageSquare size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Support Chat</h2>
                      {chatSession.agent ? (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(chatSession.agent.status)}`}></div>
                            <span className="text-sm text-gray-600">{chatSession.agent.name}</span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {chatSession.agent.role}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">Chat with our support bot</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isChatActive && (
                      <button
                        onClick={handleEndChat}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        End Chat
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {!isChatActive ? (
                  // Welcome State
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                      <MessageSquare size={48} className="text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Support</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Start a chat to get help with orders, returns, payments, or any other questions.
                    </p>
                    <button
                      onClick={handleStartChat}
                      className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                    >
                      Start New Chat
                    </button>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply.id}
                          onClick={() => {
                            handleStartChat();
                            setTimeout(() => handleQuickReply(reply), 100);
                          }}
                          className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left"
                        >
                          <div className="flex items-center gap-2">
                            {reply.icon}
                            <span className="font-medium text-gray-900">{reply.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Active Chat
                  <>
                    {/* Date Separator */}
                    <div className="text-center mb-6">
                      <div className="inline-block px-4 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                        {formatDate(new Date())}
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-2">
                      {chatSession.messages.map((msg) => (
                        <div key={msg.id}>
                          {renderMessage(msg)}
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start mb-4"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              {chatSession.agent ? (
                                <img 
                                  src={supportAgent.avatar} 
                                  alt={supportAgent.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-red-100 flex items-center justify-center">
                                  <Bot size={16} className="text-red-600" />
                                </div>
                              )}
                            </div>
                            <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Quick Replies */}
                      {showQuickReplies && chatSession.messages.length <= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6"
                        >
                          <p className="text-sm text-gray-600 mb-3">Quick replies:</p>
                          <div className="flex flex-wrap gap-2">
                            {quickReplies.map((reply) => (
                              <button
                                key={reply.id}
                                onClick={() => handleQuickReply(reply)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition"
                              >
                                {reply.icon}
                                <span>{reply.text}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Chat Input Area */}
              {isChatActive && (
                <div className="border-t border-gray-200 p-4">
                  {/* Attachment Menu */}
                  <AnimatePresence>
                    {showAttachmentMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mb-4 p-3 bg-white border border-gray-200 rounded-lg shadow-lg"
                      >
                        <div className="grid grid-cols-4 gap-2">
                          <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg">
                            <ImageIcon size={24} className="text-gray-600 mb-1" />
                            <span className="text-xs text-gray-600">Photo</span>
                          </button>
                          <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg">
                            <FileText size={24} className="text-gray-600 mb-1" />
                            <span className="text-xs text-gray-600">Document</span>
                          </button>
                          <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg">
                            <Mic size={24} className="text-gray-600 mb-1" />
                            <span className="text-xs text-gray-600">Voice</span>
                          </button>
                          <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg">
                            <Download size={24} className="text-gray-600 mb-1" />
                            <span className="text-xs text-gray-600">File</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-2">
                    {/* Attachment Button */}
                    <button
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition"
                    >
                      <Paperclip size={20} />
                    </button>

                    {/* Message Input */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full p-3 pr-12 bg-gray-100 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                        <Smile size={20} />
                      </button>
                    </div>

                    {/* Send Button */}
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className={`p-3 rounded-full transition ${
                        message.trim()
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send size={20} />
                    </button>
                  </div>

                  {/* Chat Status */}
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      {chatSession.agent ? (
                        <>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(chatSession.agent.status)}`}></div>
                          <span>{chatSession.agent.name} is online</span>
                        </>
                      ) : (
                        <>
                          <Bot size={12} />
                          <span>AI Support Bot is online</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={12} />
                      <span>Chat is encrypted</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat History & Transcript */}
            {isChatActive && chatSession.messages.length > 2 && (
              <div className="mt-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Chat Details</h3>
                  <button
                    onClick={() => alert('Downloading chat transcript...')}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Download size={16} />
                    Save Transcript
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Chat ID</p>
                    <p className="font-medium text-gray-900">{chatSession.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Started</p>
                    <p className="font-medium text-gray-900">
                      {formatTime(chatSession.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Messages</p>
                    <p className="font-medium text-gray-900">
                      {chatSession.messages.length} messages
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      chatSession.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {chatSession.status.charAt(0).toUpperCase() + chatSession.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Fast Response</h3>
                <p className="text-sm text-gray-600">Average response time: 2 minutes</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Chat</h3>
                <p className="text-sm text-gray-600">End-to-end encrypted conversations</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCheck size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600">Round-the-clock assistance available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;