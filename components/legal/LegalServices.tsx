'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Scale,
  Brain,
  Calendar as CalendarIcon,
  Clock,
  Star,
  MessageCircle,
  BookOpen,
  Send,
  DollarSign,
  Users,
  CheckCircle,
  Phone,
  Video,
  FileText,
  Shield,
  Award,
  TrendingUp,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

export default function LegalServices() {
  const [chatMessage, setChatMessage] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(new Date());
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      message: "Hello! I'm your AI Legal Assistant. How can I help you with your business legal needs today?",
      isBot: true,
      timestamp: "Just now"
    }
  ]);

  const [appointmentForm, setAppointmentForm] = useState({
    type: '',
    time: '',
    description: '',
    preferredContact: 'video'
  });

  // Mock legal experts data
  const legalExperts = [
    {
      id: 1,
      name: "Emily Davis",
      title: "Corporate Lawyer",
      specialties: ["Startup Law", "Contract Law", "IP Protection", "Funding"],
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
      company: "Davis Legal Associates",
      rating: 4.9,
      reviews: 127,
      experience: "12+ years",
      hourlyRate: "$350",
      responseTime: "< 2 hours",
      languages: ["English", "Spanish"],
      availability: "Available",
      totalCases: 450,
      successRate: 96
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Chartered Accountant",
      specialties: ["Tax Planning", "Financial Auditing", "Business Valuation", "Compliance"],
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
      company: "Rodriguez & Associates CPA",
      rating: 4.8,
      reviews: 89,
      experience: "15+ years",
      hourlyRate: "$250",
      responseTime: "< 1 hour",
      languages: ["English", "Portuguese"],
      availability: "Available",
      totalCases: 320,
      successRate: 98
    },
    {
      id: 3,
      name: "Sarah Johnson",
      title: "IP & Technology Lawyer",
      specialties: ["Intellectual Property", "Tech Law", "Patents", "Trademarks"],
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
      company: "Johnson IP Law",
      rating: 4.9,
      reviews: 156,
      experience: "10+ years",
      hourlyRate: "$400",
      responseTime: "< 3 hours",
      languages: ["English", "Mandarin"],
      availability: "Busy",
      totalCases: 280,
      successRate: 94
    },
    {
      id: 4,
      name: "David Chen",
      title: "Employment Lawyer",
      specialties: ["Employment Law", "HR Compliance", "Contracts", "Disputes"],
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
      company: "Chen Employment Law",
      rating: 4.7,
      reviews: 94,
      experience: "8+ years",
      hourlyRate: "$300",
      responseTime: "< 4 hours",
      languages: ["English", "Korean"],
      availability: "Available",
      totalCases: 180,
      successRate: 92
    }
  ];

  // Mock FAQ data
  const faqData = [
    {
      category: "Startup Formation",
      questions: [
        {
          question: "What's the best business structure for a tech startup?",
          answer: "For most tech startups, a Delaware C-Corporation is recommended due to investor preference, employee stock option plans, and future fundraising flexibility."
        },
        {
          question: "How do I protect my intellectual property?",
          answer: "Start with NDAs, file provisional patents for inventions, register trademarks for branding, and consider copyrights for creative works."
        }
      ]
    },
    {
      category: "Funding & Investment",
      questions: [
        {
          question: "What legal documents do I need for fundraising?",
          answer: "Key documents include pitch deck, executive summary, term sheet, subscription agreement, and investor rights agreement."
        }
      ]
    },
    {
      category: "Compliance",
      questions: [
        {
          question: "What compliance requirements should startups know?",
          answer: "Key areas include data privacy (GDPR, CCPA), employment law, tax obligations, and industry-specific regulations."
        }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: chatHistory.length + 1,
      message: chatMessage,
      isBot: false,
      timestamp: "Just now"
    };

    // Simulate AI response
    const aiResponse = {
      id: chatHistory.length + 2,
      message: "I understand your question about " + chatMessage.toLowerCase() + ". Based on common business legal practices, I recommend consulting with one of our expert lawyers for personalized advice. Would you like me to help you book a consultation?",
      isBot: true,
      timestamp: "Just now"
    };

    setChatHistory(prev => [...prev, userMessage, aiResponse]);
    setChatMessage('');
  };

  const handleBookAppointment = (expertId: number) => {
    setSelectedExpert(expertId);
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!appointmentForm.type || !appointmentForm.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Appointment booked successfully! You will receive a confirmation email.');
    setIsBookingDialogOpen(false);
    setAppointmentForm({
      type: '',
      time: '',
      description: '',
      preferredContact: 'video'
    });
  };

  const filteredExperts = legalExperts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Services</h1>
          <p className="text-gray-600">
            Get AI-powered legal assistance and connect with expert lawyers and CA professionals
          </p>
        </div>

        <Tabs defaultValue="ai-chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="ai-chat">AI Legal Bot</TabsTrigger>
            <TabsTrigger value="experts">Find Experts</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="faq">Legal FAQ</TabsTrigger>
          </TabsList>

          {/* AI Legal Chat */}
          <TabsContent value="ai-chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-blue-600" />
                      AI Legal Assistant
                    </CardTitle>
                    <CardDescription>
                      Get instant answers to your business legal questions
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 p-0">
                    {/* Chat Messages */}
                    <div className="h-full flex flex-col">
                      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {chatHistory.map((chat) => (
                          <div
                            key={chat.id}
                            className={`flex ${chat.isBot ? 'justify-start' : 'justify-end'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              chat.isBot
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-blue-600 text-white'
                            }`}>
                              {chat.isBot && (
                                <div className="flex items-center space-x-2 mb-2">
                                  <Brain className="h-4 w-4" />
                                  <span className="text-sm font-medium">AI Assistant</span>
                                </div>
                              )}
                              <p className="text-sm">{chat.message}</p>
                              <p className={`text-xs mt-1 ${
                                chat.isBot ? 'text-gray-500' : 'text-blue-100'
                              }`}>
                                {chat.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Chat Input */}
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Ask a legal question..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          AI provides general guidance. For specific legal advice, consult with our expert lawyers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Suggested Topics */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Topics</CardTitle>
                    <CardDescription>
                      Common legal questions for startups
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Business structure selection",
                      "Intellectual property protection",
                      "Employment contracts",
                      "Fundraising legal requirements",
                      "Data privacy compliance",
                      "Terms of service templates"
                    ].map((topic, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-3"
                        onClick={() => setChatMessage(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Need Expert Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      For complex legal matters, book a consultation with our verified legal experts.
                    </p>
                    <Button className="w-full">
                      <Scale className="mr-2 h-4 w-4" />
                      Find Legal Expert
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Legal Experts */}
          <TabsContent value="experts" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search experts by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="ip">IP & Technology</SelectItem>
                  <SelectItem value="employment">Employment Law</SelectItem>
                  <SelectItem value="tax">Tax & Accounting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredExperts.map((expert) => (
                <Card key={expert.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={expert.avatar} />
                          <AvatarFallback>
                            {expert.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{expert.name}</h3>
                          <p className="text-gray-600">{expert.title}</p>
                          <p className="text-sm text-gray-500">{expert.company}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium ml-1">{expert.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({expert.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={expert.availability === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                        }
                      >
                        {expert.availability}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Specialties */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Experience</p>
                        <p className="font-medium">{expert.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Hourly Rate</p>
                        <p className="font-medium text-green-600">{expert.hourlyRate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Response Time</p>
                        <p className="font-medium">{expert.responseTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Success Rate</p>
                        <p className="font-medium">{expert.successRate}%</p>
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                      <div className="flex space-x-2">
                        {expert.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        className="flex-1"
                        onClick={() => handleBookAppointment(expert.id)}
                        disabled={expert.availability !== 'Available'}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Appointments */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments Scheduled</h3>
                <p className="text-gray-600 mb-4">
                  Book consultations with legal experts to get personalized advice for your business.
                </p>
                <Button variant="outline">Find Legal Expert</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqData.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((qa, qaIndex) => (
                      <div key={qaIndex} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <h4 className="font-medium text-gray-900 mb-2">{qa.question}</h4>
                        <p className="text-sm text-gray-600">{qa.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Booking Dialog */}
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Book Legal Consultation</DialogTitle>
              <DialogDescription>
                Schedule an appointment with {selectedExpert && legalExperts.find(e => e.id === selectedExpert)?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Consultation Type *</label>
                <Select onValueChange={(value) => setAppointmentForm({...appointmentForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consultation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Legal Consultation</SelectItem>
                    <SelectItem value="contract-review">Contract Review</SelectItem>
                    <SelectItem value="business-formation">Business Formation</SelectItem>
                    <SelectItem value="ip-protection">IP Protection</SelectItem>
                    <SelectItem value="compliance">Compliance Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Preferred Date</label>
                  <Calendar
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Preferred Time *</label>
                  <Select onValueChange={(value) => setAppointmentForm({...appointmentForm, time: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Meeting Type</label>
                <Select 
                  value={appointmentForm.preferredContact}
                  onValueChange={(value) => setAppointmentForm({...appointmentForm, preferredContact: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="office">In-Person (Office)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Brief description of your legal needs..."
                  value={appointmentForm.description}
                  onChange={(e) => setAppointmentForm({...appointmentForm, description: e.target.value})}
                  className="min-h-[80px]"
                />
              </div>

              {/* Pricing Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Consultation Fee</h4>
                <div className="flex items-center justify-between">
                  <span>60-minute session</span>
                  <span className="font-semibold">
                    {selectedExpert && legalExperts.find(e => e.id === selectedExpert)?.hourlyRate}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Payment will be processed after the consultation
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}