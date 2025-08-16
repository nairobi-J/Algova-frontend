'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Search, Filter, Plus, Eye, MessageCircle, BookMarked as BookMark, TrendingUp, DollarSign, Users, Calendar, MapPin, Star, Heart, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function InvestorBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  
  const [newIdea, setNewIdea] = useState({
    title: '',
    category: '',
    stage: '',
    fundingNeeded: '',
    description: '',
    highlights: ''
  });

  // Mock business ideas data
  const businessIdeas = [
    {
      id: 1,
      title: "AI-Powered Healthcare Diagnostics Platform",
      founder: {
        name: "Dr. Sarah Johnson",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        title: "CEO & Founder"
      },
      category: "HealthTech",
      stage: "Series A",
      fundingNeeded: "$2.5M",
      location: "San Francisco, CA",
      description: "Revolutionary AI platform that reduces diagnostic errors by 90% and speeds up diagnosis time by 75%. Currently partnered with 15 hospitals.",
      highlights: [
        "90% reduction in diagnostic errors",
        "Partnership with 15 hospitals",
        "FDA breakthrough device designation",
        "$500K ARR achieved"
      ],
      tags: ["AI", "Healthcare", "Diagnostics", "B2B"],
      views: 234,
      interested: 45,
      rating: 4.8,
      posted: "2 days ago",
      isSaved: false,
      isInterested: true
    },
    {
      id: 2,
      title: "Sustainable Fashion Marketplace",
      founder: {
        name: "Emily Chen",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        title: "Founder"
      },
      category: "E-commerce",
      stage: "Seed",
      fundingNeeded: "$500K",
      location: "New York, NY",
      description: "Connecting conscious consumers with sustainable fashion brands. Our platform has grown 300% in the last 6 months with 50K active users.",
      highlights: [
        "300% growth in 6 months",
        "50K+ active users",
        "Partnership with 200+ sustainable brands",
        "Carbon neutral shipping"
      ],
      tags: ["Sustainability", "Fashion", "Marketplace", "B2C"],
      views: 189,
      interested: 32,
      rating: 4.6,
      posted: "1 day ago",
      isSaved: true,
      isInterested: false
    },
    {
      id: 3,
      title: "EdTech VR Learning Platform",
      founder: {
        name: "Michael Rodriguez",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        title: "Co-Founder & CTO"
      },
      category: "EdTech",
      stage: "Pre-Seed",
      fundingNeeded: "$750K",
      location: "Austin, TX",
      description: "Immersive VR platform for STEM education. Students learn complex concepts through virtual reality experiences. Piloted in 25 schools.",
      highlights: [
        "Piloted in 25 schools",
        "95% student engagement rate",
        "Partnership with major textbook publishers",
        "Patent pending VR technology"
      ],
      tags: ["VR", "Education", "STEM", "B2B"],
      views: 167,
      interested: 28,
      rating: 4.7,
      posted: "3 days ago",
      isSaved: false,
      isInterested: false
    },
    {
      id: 4,
      title: "Blockchain-Based Supply Chain Solution",
      founder: {
        name: "David Kim",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        title: "Founder & CEO"
      },
      category: "FinTech",
      stage: "Series A",
      fundingNeeded: "$3M",
      location: "Seattle, WA",
      description: "End-to-end supply chain transparency using blockchain technology. Helping companies track products from origin to consumer with 100% accuracy.",
      highlights: [
        "100% supply chain accuracy",
        "Fortune 500 clients",
        "$1M+ ARR",
        "International expansion ready"
      ],
      tags: ["Blockchain", "Supply Chain", "Enterprise", "B2B"],
      views: 298,
      interested: 67,
      rating: 4.9,
      posted: "5 days ago",
      isSaved: true,
      isInterested: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'healthtech', label: 'HealthTech' },
    { value: 'edtech', label: 'EdTech' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'blockchain', label: 'Blockchain' }
  ];

  const stages = [
    { value: 'all', label: 'All Stages' },
    { value: 'pre-seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series-a', label: 'Series A' },
    { value: 'series-b', label: 'Series B' },
    { value: 'growth', label: 'Growth' }
  ];

  const handleIdeaSubmit = () => {
    if (!newIdea.title || !newIdea.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Business idea submitted successfully!');
    setIsSubmitDialogOpen(false);
    setNewIdea({
      title: '',
      category: '',
      stage: '',
      fundingNeeded: '',
      description: '',
      highlights: ''
    });
  };

  const handleInterest = (ideaId: number) => {
    toast.success('Interest recorded! The founder will be notified.');
  };

  const handleSave = (ideaId: number) => {
    toast.success('Idea saved to your collection!');
  };

  const handleContact = (ideaId: number) => {
    toast.success('Opening message thread...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Investor Board</h1>
              <p className="text-gray-600">
                Discover promising business ideas and connect with innovative entrepreneurs
              </p>
            </div>
            <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your Idea
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Submit Your Business Idea</DialogTitle>
                  <DialogDescription>
                    Share your innovative idea with potential investors
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Business Title *</label>
                    <Input
                      placeholder="Enter your business title"
                      value={newIdea.title}
                      onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select onValueChange={(value) => setNewIdea({...newIdea, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Funding Stage</label>
                      <Select onValueChange={(value) => setNewIdea({...newIdea, stage: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {stages.slice(1).map(stage => (
                            <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Funding Needed</label>
                    <Input
                      placeholder="e.g., $500K"
                      value={newIdea.fundingNeeded}
                      onChange={(e) => setNewIdea({...newIdea, fundingNeeded: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Describe your business idea, target market, and unique value proposition..."
                      value={newIdea.description}
                      onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Key Highlights</label>
                    <Textarea
                      placeholder="List your key achievements, metrics, partnerships (one per line)"
                      value={newIdea.highlights}
                      onChange={(e) => setNewIdea({...newIdea, highlights: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleIdeaSubmit}>
                    Submit Idea
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search business ideas, founders, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="browse">Browse Ideas</TabsTrigger>
            <TabsTrigger value="saved">Saved Ideas</TabsTrigger>
            <TabsTrigger value="interested">Interested</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* AI Recommendations */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">AI-Recommended for You</h3>
                    <p className="text-sm text-blue-700">
                      Based on your investment history and preferences, these ideas might interest you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Ideas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {businessIdeas.map((idea) => (
                <Card key={idea.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={idea.founder.avatar} />
                          <AvatarFallback>
                            {idea.founder.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{idea.title}</h3>
                          <p className="text-sm text-gray-600">{idea.founder.name}</p>
                          <p className="text-xs text-gray-500">{idea.founder.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{idea.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">{idea.category}</Badge>
                      <Badge variant="outline">{idea.stage}</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        {idea.fundingNeeded}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {idea.location}
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      {idea.posted}
                    </div>

                    <p className="text-gray-700 leading-relaxed">{idea.description}</p>

                    {/* Key Highlights */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Highlights</h4>
                      <ul className="space-y-1">
                        {idea.highlights.slice(0, 3).map((highlight, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {idea.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {idea.interested}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={idea.isInterested ? "default" : "outline"}
                          onClick={() => handleInterest(idea.id)}
                        >
                          {idea.isInterested ? 'Interested' : 'Show Interest'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSave(idea.id)}
                        >
                          <BookMark className={`h-4 w-4 ${idea.isSaved ? 'fill-current text-blue-600' : ''}`} />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleContact(idea.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button className="var-outline size-lg">
                Load More Ideas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <BookMark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Ideas Yet</h3>
                <p className="text-gray-600 mb-4">
                  Save interesting business ideas to review them later.
                </p>
                <Button className="outline">Browse Ideas</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interested" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Track Your Interests</h3>
                <p className="text-gray-600 mb-4">
                  Ideas youve shown interest in will appear here.
                </p>
                <Button className="outline">Explore Ideas</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}