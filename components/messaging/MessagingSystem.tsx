'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Paperclip, Smile, Phone, Video, MoreHorizontal, Spline as Online, MessageCircle, Star, Archive, Trash2, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function MessagingSystem() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      participant: {
        name: 'Sarah Johnson',
        role: 'Entrepreneur',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'FinTech Solutions',
        isOnline: true
      },
      lastMessage: {
        text: 'Thanks for your interest in our AI payment system! Would love to discuss further.',
        timestamp: '2 min ago',
        isRead: true
      },
      unreadCount: 0,
      isPinned: true
    },
    {
      id: 2,
      participant: {
        name: 'Michael Chen',
        role: 'Investor',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'Venture Capital Group',
        isOnline: false
      },
      lastMessage: {
        text: 'I\'m interested in learning more about your HealthTech fund. Can we schedule a call?',
        timestamp: '1 hour ago',
        isRead: false
      },
      unreadCount: 2,
      isPinned: false
    },
    {
      id: 3,
      participant: {
        name: 'Emily Davis',
        role: 'Legal Advisor',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'Davis Legal Associates',
        isOnline: true
      },
      lastMessage: {
        text: 'I\'ve reviewed your contract. There are a few clauses we should discuss.',
        timestamp: '3 hours ago',
        isRead: true
      },
      unreadCount: 0,
      isPinned: false
    },
    {
      id: 4,
      participant: {
        name: 'David Wilson',
        role: 'Entrepreneur',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'EduTech Innovations',
        isOnline: false
      },
      lastMessage: {
        text: 'Congratulations on hitting 100K users! That\'s amazing growth.',
        timestamp: '1 day ago',
        isRead: true
      },
      unreadCount: 0,
      isPinned: false
    }
  ];

  // Mock messages for selected chat
  const messages = [
    {
      id: 1,
      senderId: 2,
      senderName: 'Sarah Johnson',
      text: 'Hi! I saw your interest in our AI-powered payment system. Thanks for reaching out!',
      timestamp: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      senderId: 1,
      senderName: 'You',
      text: 'Hello Sarah! Yes, I\'m very interested in learning more about your solution. The 80% reduction in processing time sounds impressive.',
      timestamp: '10:35 AM',
      isMe: true
    },
    {
      id: 3,
      senderId: 2,
      senderName: 'Sarah Johnson',
      text: 'Thank you! We\'ve been working on this for 2 years and have already partnered with 15 major financial institutions. Would you like to see a demo?',
      timestamp: '10:40 AM',
      isMe: false
    },
    {
      id: 4,
      senderId: 1,
      senderName: 'You',
      text: 'Absolutely! I\'d love to see how it works. Could we schedule a call this week?',
      timestamp: '10:42 AM',
      isMe: true
    },
    {
      id: 5,
      senderId: 2,
      senderName: 'Sarah Johnson',
      text: 'Perfect! I\'m available Thursday or Friday afternoon. What works better for you?',
      timestamp: '10:45 AM',
      isMe: false
    },
    {
      id: 6,
      senderId: 1,
      senderName: 'You',
      text: 'Friday afternoon would be great. How about 2 PM PST?',
      timestamp: '10:50 AM',
      isMe: true
    },
    {
      id: 7,
      senderId: 2,
      senderName: 'Sarah Johnson',
      text: 'Thanks for your interest in our AI payment system! Would love to discuss further.',
      timestamp: '2 min ago',
      isMe: false
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success('Message sent!');
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-140px)] flex">
          
          {/* Sidebar - Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                <div className="flex space-x-2">
                  <Button variant="ghost">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 mb-1 ${
                      selectedChat === conversation.id ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedChat(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.participant.avatar} />
                          <AvatarFallback>
                            {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.participant.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conversation.participant.name}
                            </h3>
                            {conversation.isPinned && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {conversation.lastMessage.timestamp}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {conversation.participant.role}
                          </Badge>
                        </div>
                        
                        <p className={`text-sm mt-2 truncate ${
                          !conversation.lastMessage.isRead ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {conversation.lastMessage.text}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {conversation.participant.company}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <Badge className="h-5 w-5 p-0 text-xs bg-blue-600">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConversation.participant.avatar} />
                          <AvatarFallback>
                            {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConversation.participant.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedConversation.participant.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {selectedConversation.participant.role}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {selectedConversation.participant.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isMe
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.isMe ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-12"
                      />
                      <Button
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* No Chat Selected */
              (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600">
                      Choose from your existing conversations or start a new one
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

         
          {selectedConversation && (
            <div className="w-80 border-l border-gray-200 bg-gray-50">
              <div className="p-4">
                <div className="text-center mb-6">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={selectedConversation.participant.avatar} />
                    <AvatarFallback className="text-xl">
                      {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {selectedConversation.participant.name}
                  </h3>
                  <Badge className="mb-2">{selectedConversation.participant.role}</Badge>
                  <p className="text-sm text-gray-600">
                    {selectedConversation.participant.company}
                  </p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Voice Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Chat Actions</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Star className="h-4 w-4 mr-2" />
                        Pin Conversation
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive Chat
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}