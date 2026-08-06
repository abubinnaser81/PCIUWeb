import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickReplies = [
  "Admission Info",
  "Bachelor's Requirements",
  "Master's Requirements",
  "Programs Offered",
  "Tuition Fees",
  "Scholarships",
  "Contact Us",
];

const autoResponses: Record<string, string> = {
  hello:
    "👋 Welcome to Port City International University! I'm here to help you with:\n\n• Admission Requirements\n• Bachelor's & Master's Programs\n• Tuition & Fees\n• Scholarships\n\nHow can I assist you today?",

  admission:
    "🎓 **Admission is now OPEN!**\n\nWe offer Bachelor's and Master's degree programs. There are specific entrance requirements for some courses, particularly in the sciences.\n\nWould you like to know about:\n• Bachelor's Requirements\n• Master's Requirements\n• How to Apply\n\nJust type your question!",

  bachelor:
    "📋 **Bachelor's Degree Requirements**\n\n🔹 **Arts, Law, Social Science & Business:**\n• Min GPA 2.50 in both SSC & HSC (or equivalent)\n• OR Min 5 subjects O-Level + 2 subjects A-Level with min grade B in 4 subjects & C in 3 subjects\n\n🔹 **Science & Engineering:**\n• Min GPA 2.50 in both SSC & HSC with science background (or equivalent)\n• OR Min 5 subjects O-Level + 2 subjects A-Level with min grade B in 4 & C in 3 (science group)\n\nWant to know about a specific program?",

  master:
    "📋 **Master's Degree – General Requirements**\n\n• Min GPA 2.50 or 2nd division in both SSC & HSC (or equivalent) from relevant group\n• Min 5 subjects O-Level + 2 subjects A-Level with min grade B in 4 & C in 3 (relevant group)\n• Min 2nd class or equivalent CGPA in Bachelor's degree from relevant subject\n\nFor program-specific requirements, ask about:\n• MBA\n• MA English\n• MSS Journalism\n• MSS Economics\n• LLM\n• MCSE",

  mba:
    "📋 **MBA Requirements**\n\nGraduates with B.A. / B.Sc. / B.Com. / B.S.S. or equivalent / Master's degree from any discipline are eligible.\n\nNo specific discipline restriction — open to all graduates!",

  english:
    "📋 **M.A. in English Requirements**\n\n🔹 **Preliminary & Final:**\nGraduates (B.A. / B.Sc. / B.Com. / B.S.S. or equivalent) / Master's degree from any discipline\n\n🔹 **Final Only:**\nB.A. (Hons.) in English / 4-year Bachelor's degree in English from any recognized university",

  journalism:
    "📋 **M.S.S. in Broadcast & Print Journalism**\n\n🔹 **Preliminary & Final:**\nGraduates (B.A. / B.Sc. / B.Com. / B.S.S. or equivalent) / Master's degree from any discipline\n\n🔹 **Final Only:**\n4-year Bachelor's degree in Journalism from any recognized university",

  economics:
    "📋 **M.S.S. in Economics Requirements**\n\n🔹 **Preliminary & Final:**\nGraduates (B.A. / B.Sc. / B.Com. / B.S.S. or equivalent) / Master's degree from any discipline\n\n🔹 **Final Only:**\n4-year Bachelor's degree in Economics from any recognized university",

  llm:
    "📋 **Master of Laws (LL.M.) Requirements**\n\n🔹 **LL.M. (Final):**\n4-year Bachelor of Laws from any recognized university\n\n🔹 **LL.M. (Preliminary & Final):**\n3-year Bachelor of Laws from any recognized university",

  mcse:
    "📋 **M.Sc. in Computer Science & Engineering (MCSE)**\n\nB.Sc. in Computer Science & Engineering or other relevant subjects from a recognized university.",

  programs:
    "📚 We offer 50+ programs across 3 faculties:\n\n🏛️ **Faculty of Business Studies**\n• BBA, MBA\n\n🏛️ **Faculty of Humanities, Social Sciences & Law**\n• BA English, LLB, BSS Journalism, BSS Economics\n\n🏛️ **Faculty of Science & Engineering**\n• BSc CSE, BSc EEE, BSc Textile, BSc Civil, BSc Fashion Design\n\nWhich program interests you?",

  fees:
    "💰 Tuition fees vary by program:\n\n• BBA: ৳3,50,000 (Total)\n• CSE: ৳4,00,000 (Total)\n• LLB: ৳3,00,000 (Total)\n\nScholarships up to 100% available based on SSC/HSC results!\n\nAsk about 'scholarships' for more details.",

  scholarship:
    "🏆 **Scholarship Opportunities**\n\n• Merit-based: Up to 100% tuition waiver\n• Need-based: Up to 50% waiver\n• Sports quota available\n• Freedom fighter quota\n\nScholarships are awarded based on SSC/HSC GPA. Would you like to know the eligibility criteria?",

  contact:
    "📞 **Contact Information**\n\n📍 Address: Chattogram, Bangladesh\n📱 Phone: +880-123-456789\n✉️ Email: info@pciu.edu.bd\n🌐 Website: www.pciu.edu.bd\n\n🕘 Office hours: 9 AM – 5 PM (Sat–Thu)",

  cse:
    "💻 **BSc in Computer Science & Engineering**\n\n**Requirements:**\n• Min GPA 2.50 in both SSC & HSC with science background\n• OR O-Level/A-Level with grades B in 4 & C in 3 subjects (science group)\n\n**Duration:** 4 years (8 semesters)\n\nFor Master's (MCSE), ask about 'MCSE'.",

  eee:
    "⚡ **BSc in Electrical & Electronic Engineering**\n\n**Requirements:**\n• Min GPA 2.50 in both SSC & HSC with science background\n• OR O-Level/A-Level with grades B in 4 & C in 3 subjects (science group)\n\n**Duration:** 4 years (8 semesters)",

  law:
    "⚖️ **Bachelor of Laws (LLB)**\n\n**Requirements:**\n• Min GPA 2.50 in both SSC & HSC (or equivalent)\n• OR O-Level/A-Level with grades B in 4 & C in 3 subjects\n\nFor Master's (LLM), ask about 'LLM'.",

  gpa:
    "📊 **GPA Requirements Summary**\n\n🔹 **Bachelor's (Arts/Law/Business):** Min 2.50 in SSC & HSC\n🔹 **Bachelor's (Science/Engineering):** Min 2.50 in SSC & HSC (science)\n🔹 **Master's (General):** Min 2.50 or 2nd division in SSC & HSC + 2nd class in Bachelor's\n\nO-Level/A-Level alternative: Min grade B in 4 subjects & C in 3 subjects.",

  olevel:
    "📋 **O-Level / A-Level Requirements**\n\n• Minimum 5 subjects in O-Level\n• Minimum 2 subjects in A-Level\n• Minimum grade B in 4 subjects and C in 3 subjects\n\n⚠️ For Science & Engineering programs, subjects must be from the science group.\n\nThese qualifications are accepted as alternatives where they cover the same content as the required program.",

  default:
    "Thank you for your message! I can help you with:\n\n• Admission requirements\n• Bachelor's / Master's programs\n• Fees & Scholarships\n• Contact information\n\nTry asking about a specific program like 'CSE', 'MBA', 'LLM', or type 'admission' for general info.\n\nFor detailed assistance, call us at +880-123-456789.",
};

const getAutoResponse = (message: string): string => {
  const lower = message.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|assalamu|salam|good morning|good evening)\b/.test(lower)) {
    return autoResponses.hello;
  }

  // Specific master's programs (check before general master's)
  if (lower.includes("mba")) return autoResponses.mba;
  if (lower.includes("mcse") || (lower.includes("msc") && lower.includes("cse")))
    return autoResponses.mcse;
  if (lower.includes("llm") || lower.includes("ll.m"))
    return autoResponses.llm;
  if ((lower.includes("english") || lower.includes("m.a")) && lower.includes("master"))
    return autoResponses.english;
  if (lower.includes("journalism") && (lower.includes("master") || lower.includes("mss")))
    return autoResponses.journalism;
  if (lower.includes("economics") && (lower.includes("master") || lower.includes("mss")))
    return autoResponses.economics;
  if (lower.includes("ma english") || lower.includes("m.a english"))
    return autoResponses.english;
  if (lower.includes("mss journalism"))
    return autoResponses.journalism;
  if (lower.includes("mss economics"))
    return autoResponses.economics;

  // Specific bachelor's programs
  if (lower.includes("cse") || lower.includes("computer science"))
    return autoResponses.cse;
  if (lower.includes("eee") || lower.includes("electrical"))
    return autoResponses.eee;
  if (lower.includes("law") || lower.includes("llb"))
    return autoResponses.law;

  // GPA / O-Level / A-Level
  if (lower.includes("gpa") || lower.includes("cgpa") || lower.includes("grade point"))
    return autoResponses.gpa;
  if (lower.includes("o-level") || lower.includes("o level") || lower.includes("a-level") || lower.includes("a level") || lower.includes("olevel") || lower.includes("alevel"))
    return autoResponses.olevel;

  // General categories
  if (lower.includes("bachelor") || lower.includes("bsc") || lower.includes("bba") || lower.includes("undergraduate"))
    return autoResponses.bachelor;
  if (lower.includes("master") || lower.includes("postgraduate") || lower.includes("graduate program"))
    return autoResponses.master;
  if (lower.includes("admission") || lower.includes("apply") || lower.includes("requirement") || lower.includes("eligib"))
    return autoResponses.admission;
  if (lower.includes("program") || lower.includes("course") || lower.includes("department") || lower.includes("faculty"))
    return autoResponses.programs;
  if (lower.includes("fee") || lower.includes("tuition") || lower.includes("cost") || lower.includes("payment"))
    return autoResponses.fees;
  if (lower.includes("scholarship") || lower.includes("waiver") || lower.includes("financial aid"))
    return autoResponses.scholarship;
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("address") || lower.includes("email") || lower.includes("location"))
    return autoResponses.contact;

  return autoResponses.default;
};

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Welcome to PCIU! I'm your virtual assistant. Ask me about admission requirements, programs, fees, or anything else!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getAutoResponse(text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">PCIU Assistant</h3>
            <p className="text-xs text-white/80">Online | Typically replies instantly</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[320px] overflow-y-auto p-4 space-y-3 bg-[#ECE5DD]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-line ${
                  message.isBot
                    ? "bg-white text-foreground rounded-tl-none shadow-sm"
                    : "bg-[#DCF8C6] text-foreground rounded-tr-none shadow-sm"
                }`}
              >
                {message.text}
                <div className="text-[10px] text-muted-foreground mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-2 bg-muted/50 flex gap-2 overflow-x-auto scrollbar-thin">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSendMessage(reply)}
              className="px-3 py-1.5 text-xs bg-white border border-primary/20 text-primary rounded-full whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-card border-t flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
            placeholder="Type a message..."
            className="flex-1 text-sm"
          />
          <Button
            size="icon"
            onClick={() => handleSendMessage(inputValue)}
            className="bg-[#25D366] hover:bg-[#128C7E] shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppChatbot;
