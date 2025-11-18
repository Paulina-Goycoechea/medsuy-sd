import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockConversations = [
  {
    id: 1,
    patient: "John Anderson",
    lastMessage: "Thank you for the prescription",
    time: "11:20 AM",
    unread: 0,
    avatar: "JA"
  },
  {
    id: 2,
    patient: "Maria Garcia",
    lastMessage: "When should I take the medication?",
    time: "10:45 AM",
    unread: 2,
    avatar: "MG"
  },
  {
    id: 3,
    patient: "Robert Smith",
    lastMessage: "I'm feeling much better now",
    time: "Yesterday",
    unread: 0,
    avatar: "RS"
  },
  {
    id: 4,
    patient: "Emily Chen",
    lastMessage: "Can we reschedule my appointment?",
    time: "Yesterday",
    unread: 1,
    avatar: "EC"
  }
];

const mockMessages = [
  {
    id: 1,
    sender: "patient",
    text: "Hello doctor, I have a question about my medication.",
    time: "10:30 AM"
  },
  {
    id: 2,
    sender: "patient",
    text: "When should I take the medication? Before or after meals?",
    time: "10:31 AM"
  },
  {
    id: 3,
    sender: "doctor",
    text: "Hello Maria! You should take it after meals, twice a day.",
    time: "10:35 AM"
  },
  {
    id: 4,
    sender: "doctor",
    text: "It's important to maintain a consistent schedule. Take it at the same times each day.",
    time: "10:36 AM"
  },
  {
    id: 5,
    sender: "patient",
    text: "When should I take the medication?",
    time: "10:45 AM"
  }
];

const DoctorMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[1]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-background">
      {/* Conversations List */}
      <div className="w-80 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Patient Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b cursor-pointer transition-colors ${
                selectedConversation.id === conversation.id
                  ? "bg-primary/10"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 bg-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {conversation.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm truncate">{conversation.patient}</p>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {selectedConversation.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{selectedConversation.patient}</p>
              <p className="text-xs text-muted-foreground">Patient</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "doctor"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "doctor"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t bg-card p-4">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Textarea
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  setMessageText("");
                }
              }}
            />
            <Button size="icon" className="h-[60px] w-[60px]">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMessages;
