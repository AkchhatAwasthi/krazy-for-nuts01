import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { nutritionalData, giftBasketsData } from '../data/chatbotData';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  buttons?: Array<{
    text: string;
    action: string;
    data?: any;
  }>;
  timestamp: Date;
}

interface ChatState {
  flow: 'main' | 'nutrition' | 'gift_confusion' | 'customize';
  step: number;
  data: any;
}

const GEMINI_API_KEY = 'AIzaSyBZYaNR-LHv9g6Dp9F0T0NvD2IYPrrzUdI';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    flow: 'main',
    step: 0,
    data: {}
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: "Hello 👋 Welcome to Krazy For Nuts! What would you like to know today?",
      buttons: [
        { text: "🍎 Nutritional Value", action: "nutrition" },
        { text: "🎁 Confused in Gift Baskets", action: "gift_confusion" },
        { text: "🛠️ Customize Your Gift Basket", action: "customize" }
      ],
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const returnToMainMenu = () => {
    setChatState({ flow: 'main', step: 0, data: {} });
    addMessage({
      type: 'bot',
      content: "What else would you like to know?",
      buttons: [
        { text: "🍎 Nutritional Value", action: "nutrition" },
        { text: "🎁 Confused in Gift Baskets", action: "gift_confusion" },
        { text: "🛠️ Customize Your Gift Basket", action: "customize" }
      ]
    });
  };

  const handleNutritionFlow = (selectedNut?: string) => {
    if (!selectedNut) {
      setChatState({ flow: 'nutrition', step: 1, data: {} });
      addMessage({
        type: 'bot',
        content: "Great! Which nut or dry fruit would you like to know about?",
        buttons: Object.keys(nutritionalData).map(nut => ({
          text: nut,
          action: "nutrition_select",
          data: nut
        }))
      });
    } else {
      const nutInfo = nutritionalData[selectedNut as keyof typeof nutritionalData];
      if (nutInfo) {
        const nutritionText = `
**${selectedNut} Nutrition Facts** 🥜

**Serving Size:** ${nutInfo.serving_size}
**Calories:** ${nutInfo.calories}
**Protein:** ${nutInfo.protein}
**Fat:** ${nutInfo.fat}
**Carbs:** ${nutInfo.carbs}
**Fiber:** ${nutInfo.fiber}

**Key Nutrients:**
${Object.entries(nutInfo).filter(([key]) => 
  !['serving_size', 'calories', 'protein', 'fat', 'carbs', 'fiber', 'benefits'].includes(key)
).map(([key, value]) => `• ${key.replace('_', ' ').toUpperCase()}: ${value}`).join('\n')}

**Health Benefits:** ${nutInfo.benefits}
        `;
        
        addMessage({
          type: 'bot',
          content: nutritionText,
          buttons: [
            { text: "🔍 Check Another Nut", action: "nutrition" },
            { text: "🏠 Back to Main Menu", action: "main_menu" }
          ]
        });
      }
    }
  };

  const handleGiftConfusionFlow = (step: number, answer?: string) => {
    const questions = [
      {
        question: "Who are you buying this for?",
        options: ["Friend", "Family", "Colleague", "Kids", "Parents", "Corporate", "Other"]
      },
      {
        question: "What is the occasion?",
        options: ["Birthday", "Anniversary", "Festival", "Baby Shower", "Thank You", "Corporate Gift", "Other"]
      },
      {
        question: "What is the age group?",
        options: ["Kids", "Young Adults", "Middle Age", "Seniors"]
      },
      {
        question: "Do they prefer healthy, indulgent, or mixed options?",
        options: ["Healthy", "Indulgent", "Mixed"]
      }
    ];

    if (step === 0) {
      setChatState({ flow: 'gift_confusion', step: 1, data: {} });
      addMessage({
        type: 'bot',
        content: questions[0].question,
        buttons: questions[0].options.map(option => ({
          text: option,
          action: "gift_confusion_answer",
          data: { step: 1, answer: option }
        }))
      });
    } else if (step < 4) {
      const newData = { ...chatState.data, [`answer${step}`]: answer };
      setChatState({ flow: 'gift_confusion', step: step + 1, data: newData });
      
      addMessage({
        type: 'bot',
        content: questions[step].question,
        buttons: questions[step].options.map(option => ({
          text: option,
          action: "gift_confusion_answer",
          data: { step: step + 1, answer: option }
        }))
      });
    } else {
      // Generate recommendations using Gemini AI
      generateGiftRecommendations({ ...chatState.data, [`answer${step}`]: answer });
    }
  };

  const generateGiftRecommendations = async (answers: any) => {
    setIsLoading(true);
    
    const prompt = `Based on these preferences:
    - Recipient: ${answers.answer1}
    - Occasion: ${answers.answer2}
    - Age Group: ${answers.answer3}
    - Preference: ${answers.answer4}
    
    From this list of gift baskets: ${JSON.stringify(giftBasketsData.gift_baskets)}
    
    Recommend 2-3 most suitable gift baskets. For each recommendation, provide:
    1. Basket name
    2. Why it's perfect for their needs
    3. Brief description of contents
    
    Keep the response conversational and helpful.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const recommendation = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'd recommend our Nutri-Delight Supreme or Classic Nut Duo based on your preferences!";
      
      addMessage({
        type: 'bot',
        content: `Here are my recommendations for you:\n\n${recommendation}`,
        buttons: [
          { text: "📱 Order via WhatsApp", action: "whatsapp_order", data: { type: "gift_recommendation", content: recommendation } },
          { text: "🏠 Back to Main Menu", action: "main_menu" }
        ]
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      addMessage({
        type: 'bot',
        content: "Based on your preferences, I'd recommend our **Nutri-Delight Supreme** or **Classic Nut Duo**. Both are perfect for your needs!",
        buttons: [
          { text: "📱 Order via WhatsApp", action: "whatsapp_order", data: { type: "gift_recommendation" } },
          { text: "🏠 Back to Main Menu", action: "main_menu" }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomizeFlow = (step: number, data?: any) => {
    switch (step) {
      case 0:
        setChatState({ flow: 'customize', step: 1, data: { selectedItems: [], dryFruitCount: 0 } });
        addMessage({
          type: 'bot',
          content: "How many items would you like in your basket? (Minimum 4, Maximum 15)",
          buttons: Array.from({ length: 12 }, (_, i) => ({
            text: `${i + 4} items`,
            action: "customize_count",
            data: i + 4
          }))
        });
        break;
      
      case 1:
        setChatState({ 
          flow: 'customize', 
          step: 2, 
          data: { ...chatState.data, totalItems: data, selectedItems: [], dryFruitCount: 0 } 
        });
        addMessage({
          type: 'bot',
          content: `Perfect! Let's build your ${data}-item basket. Choose a category to start:`,
          buttons: [
            { text: "🥜 Crunch & Cravings", action: "customize_category", data: "Crunch & Cravings" },
            { text: "🍫 Sweet Indulgence", action: "customize_category", data: "Sweet Indulgence" },
            { text: "🥤 Sip & Chill", action: "customize_category", data: "Sip & Chill" },
            { text: "🍿 Snacks & Munchies", action: "customize_category", data: "Snacks & Munchies" },
            { text: "🌸 Desi Specials", action: "customize_category", data: "Desi Specials" }
          ]
        });
        break;
      
      case 2:
        const category = data;
        const items = giftBasketsData.categories[category as keyof typeof giftBasketsData.categories];
        addMessage({
          type: 'bot',
          content: `Great choice! Here are items from ${category}:`,
          buttons: items.map(item => ({
            text: item,
            action: "customize_add_item",
            data: { item, category }
          }))
        });
        break;
      
      case 3:
        const { item, category: itemCategory } = data;
        const newSelectedItems = [...chatState.data.selectedItems, item];
        const newDryFruitCount = itemCategory === "Crunch & Cravings" ? 
          chatState.data.dryFruitCount + 1 : chatState.data.dryFruitCount;
        
        setChatState({
          ...chatState,
          data: { 
            ...chatState.data, 
            selectedItems: newSelectedItems,
            dryFruitCount: newDryFruitCount
          }
        });

        if (newSelectedItems.length >= chatState.data.totalItems) {
          // Basket complete
          addMessage({
            type: 'bot',
            content: `🎉 Your custom basket is complete!\n\n**Selected Items:**\n${newSelectedItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
            buttons: [
              { text: "📱 Send My Order", action: "whatsapp_order", data: { type: "custom_basket", items: newSelectedItems } },
              { text: "🏠 Back to Main Menu", action: "main_menu" }
            ]
          });
        } else if (newDryFruitCount >= 3 && itemCategory === "Crunch & Cravings") {
          // Too many dry fruits warning
          addMessage({
            type: 'bot',
            content: `You already added 3 types of dry fruits! Would you like to continue with another dry fruit, or explore other categories like Snacks, Chocolates, Beverages?\n\n**Current items (${newSelectedItems.length}/${chatState.data.totalItems}):**\n${newSelectedItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
            buttons: [
              { text: "Continue Dry Fruits", action: "customize_category", data: "Crunch & Cravings" },
              { text: "Explore Other Categories", action: "customize_other_categories" }
            ]
          });
        } else {
          // Continue adding items
          addMessage({
            type: 'bot',
            content: `Added "${item}" to your basket! 🎉\n\n**Current items (${newSelectedItems.length}/${chatState.data.totalItems}):**\n${newSelectedItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}\n\nChoose another category:`,
            buttons: [
              { text: "🥜 Crunch & Cravings", action: "customize_category", data: "Crunch & Cravings" },
              { text: "🍫 Sweet Indulgence", action: "customize_category", data: "Sweet Indulgence" },
              { text: "🥤 Sip & Chill", action: "customize_category", data: "Sip & Chill" },
              { text: "🍿 Snacks & Munchies", action: "customize_category", data: "Snacks & Munchies" },
              { text: "🌸 Desi Specials", action: "customize_category", data: "Desi Specials" }
            ]
          });
        }
        break;
      
      case 4:
        // Show other categories (excluding Crunch & Cravings)
        addMessage({
          type: 'bot',
          content: "Choose from these other categories:",
          buttons: [
            { text: "🍫 Sweet Indulgence", action: "customize_category", data: "Sweet Indulgence" },
            { text: "🥤 Sip & Chill", action: "customize_category", data: "Sip & Chill" },
            { text: "🍿 Snacks & Munchies", action: "customize_category", data: "Snacks & Munchies" },
            { text: "🌸 Desi Specials", action: "customize_category", data: "Desi Specials" }
          ]
        });
        break;
    }
  };

  const handleWhatsAppOrder = (data: any) => {
    const phoneNumber = '+919903305374';
    let message = '';
    
    if (data.type === 'gift_recommendation') {
      message = `Hi! I got a gift basket recommendation from your chatbot:\n\n${data.content || 'Gift basket recommendation'}`;
    } else if (data.type === 'custom_basket') {
      message = `Hi! I want to order a custom gift basket with these items:\n\n${data.items.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n')}\n\nPlease help me with pricing and availability.`;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleButtonClick = (action: string, data?: any) => {
    // Add user message for button click
    addMessage({
      type: 'user',
      content: typeof data === 'string' ? data : (data?.answer || action.replace('_', ' '))
    });

    switch (action) {
      case 'nutrition':
        handleNutritionFlow();
        break;
      case 'nutrition_select':
        handleNutritionFlow(data);
        break;
      case 'gift_confusion':
        handleGiftConfusionFlow(0);
        break;
      case 'gift_confusion_answer':
        handleGiftConfusionFlow(data.step, data.answer);
        break;
      case 'customize':
        handleCustomizeFlow(0);
        break;
      case 'customize_count':
        handleCustomizeFlow(1, data);
        break;
      case 'customize_category':
        handleCustomizeFlow(2, data);
        break;
      case 'customize_add_item':
        handleCustomizeFlow(3, data);
        break;
      case 'customize_other_categories':
        handleCustomizeFlow(4);
        break;
      case 'whatsapp_order':
        handleWhatsAppOrder(data);
        break;
      case 'main_menu':
        returnToMainMenu();
        break;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage({
        type: 'user',
        content: inputValue
      });
      
      // Simple response for free text
      addMessage({
        type: 'bot',
        content: "I understand you have a question! For the best assistance, please use the menu options above, or I can connect you with our team via WhatsApp.",
        buttons: [
          { text: "📱 Contact via WhatsApp", action: "whatsapp_order", data: { type: "general_inquiry", content: inputValue } },
          { text: "🏠 Back to Main Menu", action: "main_menu" }
        ]
      });
      
      setInputValue('');
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className={`rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'hidden' : 'block'}`}
        >
          <img 
            src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg" 
            alt="Chatbot Assistant" 
            className="w-16 h-16 rounded-full"
          />
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-inter font-bold text-lg">Crazy For Nuts Assistant</h3>
                <p className="text-amber-100 text-sm">Always here to help! 🥜</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-amber-500 text-white' : 'bg-white text-gray-800'} rounded-2xl p-3 shadow-sm`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-inter whitespace-pre-line">{message.content}</p>
                      {message.buttons && (
                        <div className="mt-3 space-y-2">
                          {message.buttons.map((button, index) => (
                            <button
                              key={index}
                              onClick={() => handleButtonClick(button.action, button.data)}
                              className="block w-full text-left bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-2 rounded-lg text-sm font-inter font-medium transition-colors duration-200 border border-amber-200"
                            >
                              {button.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl p-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-amber-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;