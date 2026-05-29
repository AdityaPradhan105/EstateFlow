import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your EstateFlow AI Assistant. How can I help you find your dream property today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, userMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            const botMsg = { 
                id: Date.now() + 1, 
                text: getBotResponse(input), 
                sender: 'bot' 
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const getBotResponse = (query) => {
        const q = query.toLowerCase();
        if (q.includes('indore')) return "Indore has some great premium listings in Vijay Nagar and Nipania. Would you like to see them?";
        if (q.includes('bhopal')) return "Arera Colony in Bhopal is very popular for luxury villas. I can show you 5 available ones.";
        if (q.includes('price') || q.includes('budget')) return "Our properties range from ₹50L to ₹50Cr+. What is your preferred range?";
        if (q.includes('contact') || q.includes('agent')) return "You can contact our elite agents directly from the 'Agents' page or click the 'Inquiry' button on any property page.";
        return "That's interesting! I can help you find properties based on location, budget, or type. What are you looking for exactly?";
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-2xl border border-surface-variant dark:border-dark-surface-variant flex flex-col overflow-hidden mb-6"
                    >
                        {/* Header */}
                        <div className="bg-primary dark:bg-dark-primary p-6 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="font-black text-sm tracking-tight">EstateFlow AI Assistant</p>
                                    <p className="text-[10px] font-bold opacity-60">Online & Ready to Help</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-variant/30 dark:bg-dark-surface-variant/30 text-on-surface dark:text-dark-on-surface rounded-tl-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-surface-variant/10 dark:bg-dark-surface-variant/10 border-t border-surface-variant dark:border-dark-surface-variant">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="w-full bg-white dark:bg-dark-surface border border-surface-variant dark:border-dark-surface-variant rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary outline-none"
                                />
                                <button 
                                    onClick={handleSend}
                                    className="absolute right-2 top-1.5 w-9 h-9 bg-primary dark:bg-dark-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-primary dark:bg-dark-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/40 relative group"
            >
                {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
                {!isOpen && <span className="absolute -top-2 -right-2 bg-accent w-5 h-5 rounded-full border-4 border-background dark:border-dark-bg animate-bounce" />}
            </motion.button>
        </div>
    );
}
