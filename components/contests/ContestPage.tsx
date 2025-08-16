'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Trophy,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Target,
  Award,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Timer,
  Crown,
  Medal,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';

export default function ContestPage() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState<number | null>(null);
  
  const [newContest, setNewContest] = useState({
    title: '',
    description: '',
    category: '',
    prize: '',
    duration: '',
    requirements: ''
  });

  const [submission, setSubmission] = useState({
    title: '',
    description: '',
    presentation: ''
  });

  // Mock contests data
  const contests = [
    {
      id: 1,
      title: "FinTech Innovation Challenge",
      description: "Build the next generation of financial services. Looking for innovative solutions in payments, lending, or personal finance management.",
      organizer: {
        name: "Michael Chen",
        role: "Investor",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "Venture Capital Group"
      },
      category: "FinTech",
      prize: "$50,000",
      participants: 145,
      maxParticipants: 200,
      deadline: "Dec 15, 2024",
      daysLeft: 12,
      status: "active",
      requirements: [
        "Functional prototype or detailed MVP",
        "Clear business model and revenue strategy",
        "Market analysis and competitive landscape",
        "Team background and experience"
      ],
      tags: ["FinTech", "Innovation", "Startup"],
      isJoined: true,
      submissionCount: 89
    },
    {
      id: 2,
      title: "HealthTech Solutions for Aging Population",
      description: "Develop technology solutions to improve healthcare and quality of life for elderly populations. Focus on telemedicine, monitoring, or care coordination.",
      organizer: {
        name: "Dr. Sarah Johnson",
        role: "Healthcare Investor",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "HealthTech Ventures"
      },
      category: "HealthTech",
      prize: "$75,000",
      participants: 87,
      maxParticipants: 150,
      deadline: "Jan 20, 2025",
      daysLeft: 28,
      status: "active",
      requirements: [
        "Healthcare compliance consideration",
        "User experience design for elderly",
        "Clinical validation or pilot data",
        "Regulatory pathway understanding"
      ],
      tags: ["HealthTech", "Elderly Care", "Telemedicine"],
      isJoined: false,
      submissionCount: 34
    },
    {
      id: 3,
      title: "Sustainable EdTech Initiative",
      description: "Create educational technology that promotes environmental awareness and sustainability. Solutions should engage students in climate action.",
      organizer: {
        name: "Emily Davis",
        role: "Impact Investor",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "Green Future Fund"
      },
      category: "EdTech",
      prize: "$30,000",
      participants: 112,
      maxParticipants: 180,
      deadline: "Nov 30, 2024",
      daysLeft: 3,
      status: "ending-soon",
      requirements: [
        "Educational impact measurement",
        "Age-appropriate content design",
        "Teacher adoption strategy",
        "Scalability plan"
      ],
      tags: ["EdTech", "Sustainability", "Climate"],
      isJoined: true,
      submissionCount: 67
    },
    {
      id: 4,
      title: "AI for Small Business Automation",
      description: "Develop AI-powered tools to help small businesses automate operations, improve efficiency, and reduce costs.",
      organizer: {
        name: "David Wilson",
        role: "Tech Investor",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "AI Ventures"
      },
      category: "AI",
      prize: "$40,000",
      participants: 203,
      maxParticipants: 250,
      deadline: "Feb 15, 2025",
      daysLeft: 45,
      status: "active",
      requirements: [
        "Working AI prototype",
        "SMB market analysis",
        "User acquisition strategy",
        "Technical architecture overview"
      ],
      tags: ["AI", "Small Business", "Automation"],
      isJoined: false,
      submissionCount: 156
    }
  ];

  // Mock leaderboard data
  const leaderboard = [
    {
      rank: 1,
      participant: {
        name: "Alex Thompson",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "PayFlow Solutions"
      },
      contestTitle: "FinTech Innovation Challenge",
      score: 2580,
      submissions: 3,
      likes: 234,
      views: 1420
    },
    {
      rank: 2,
      participant: {
        name: "Maria Garcia",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "CareConnect"
      },
      contestTitle: "HealthTech Solutions",
      score: 2340,
      submissions: 2,
      likes: 198,
      views: 1180
    },
    {
      rank: 3,
      participant: {
        name: "James Liu",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "EcoLearn"
      },
      contestTitle: "Sustainable EdTech",
      score: 2190,
      submissions: 4,
      likes: 176,
      views: 890
    },
    {
      rank: 4,
      participant: {
        name: "Sarah Kim",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "AutomateAI"
      },
      contestTitle: "AI for Small Business",
      score: 1980,
      submissions: 1,
      likes: 145,
      views: 720
    },
    {
      rank: 5,
      participant: {
        name: "Ryan Brooks",
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        company: "NextGen Tech"
      },
      contestTitle: "FinTech Innovation Challenge",
      score: 1840,
      submissions: 2,
      likes: 132,
      views: 650
    }
  ];

  const handleCreateContest = () => {
    if (!newContest.title || !newContest.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Contest created successfully!');
    setIsCreateDialogOpen(false);
    setNewContest({
      title: '',
      description: '',
      category: '',
      prize: '',
      duration: '',
      requirements: ''
    });
  };

  const handleJoinContest = (contestId: number) => {
    setSelectedContestId(contestId);
    setIsJoinDialogOpen(true);
  };

  const handleSubmitEntry = () => {
    if (!submission.title || !submission.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Contest entry submitted successfully!');
    setIsJoinDialogOpen(false);
    setSubmission({
      title: '',
      description: '',
      presentation: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'ending-soon': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <Trophy className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Contests</h1>
              <p className="text-gray-600">
                Compete with fellow entrepreneurs for funding and recognition
              </p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Contest
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Contest</DialogTitle>
                  <DialogDescription>
                    Launch a contest to find innovative business solutions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contest Title *</label>
                    <Input
                      placeholder="Enter contest title"
                      value={newContest.title}
                      onChange={(e) => setNewContest({...newContest, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select onValueChange={(value) => setNewContest({...newContest, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fintech">FinTech</SelectItem>
                          <SelectItem value="healthtech">HealthTech</SelectItem>
                          <SelectItem value="edtech">EdTech</SelectItem>
                          <SelectItem value="ai">Artificial Intelligence</SelectItem>
                          <SelectItem value="sustainability">Sustainability</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Prize Amount</label>
                      <Input
                        placeholder="e.g., $50,000"
                        value={newContest.prize}
                        onChange={(e) => setNewContest({...newContest, prize: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration (days)</label>
                    <Select onValueChange={(value) => setNewContest({...newContest, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="45">45 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Describe the contest objectives, goals, and what you're looking for..."
                      value={newContest.description}
                      onChange={(e) => setNewContest({...newContest, description: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Requirements</label>
                    <Textarea
                      placeholder="List the submission requirements (one per line)"
                      value={newContest.requirements}
                      onChange={(e) => setNewContest({...newContest, requirements: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateContest}>
                    Create Contest
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="active">Active Contests</TabsTrigger>
            <TabsTrigger value="joined">My Contests</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Active Contests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contests.filter(c => c.status === 'active' || c.status === 'ending-soon').map((contest) => (
                <Card key={contest.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-xl">{contest.title}</CardTitle>
                          <Badge className={`${getStatusColor(contest.status)} text-xs`}>
                            {contest.status === 'ending-soon' ? 'Ending Soon' : 'Active'}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-600">
                          {contest.description}
                        </CardDescription>
                      </div>
                    </div>
                    
                    {/* Organizer Info */}
                    <div className="flex items-center space-x-3 pt-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contest.organizer.avatar} />
                        <AvatarFallback>
                          {contest.organizer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contest.organizer.name}</p>
                        <p className="text-xs text-gray-600">{contest.organizer.company}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Contest Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold">{contest.prize}</span>
                        </div>
                        <p className="text-xs text-gray-600">Prize</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-blue-600">
                          <Users className="h-4 w-4" />
                          <span className="font-semibold">{contest.participants}</span>
                        </div>
                        <p className="text-xs text-gray-600">Participants</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-red-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-semibold">{contest.daysLeft}</span>
                        </div>
                        <p className="text-xs text-gray-600">Days Left</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{contest.participants} participants</span>
                        <span>{contest.submissionCount} submissions</span>
                      </div>
                      <Progress 
                        value={(contest.participants / contest.maxParticipants) * 100} 
                        className="h-2"
                      />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {contest.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                      <ul className="space-y-1">
                        {contest.requirements.slice(0, 2).map((req, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                      {contest.requirements.length > 2 && (
                        <p className="text-sm text-gray-500 mt-1">
                          +{contest.requirements.length - 2} more requirements
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                      <Button 
                        onClick={() => handleJoinContest(contest.id)}
                        className={contest.isJoined ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {contest.isJoined ? 'Submit Entry' : 'Join Contest'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Joined Contests Yet</h3>
                <p className="text-gray-600 mb-4">
                  Join contests to showcase your business ideas and compete for prizes.
                </p>
                <Button variant="outline" onClick={() => setSelectedTab('active')}>
                  Browse Active Contests
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  Contest Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers across all active contests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200">
                        {getRankIcon(entry.rank)}
                      </div>
                      
                      <Avatar>
                        <AvatarImage src={entry.participant.avatar} />
                        <AvatarFallback>
                          {entry.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{entry.participant.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            #{entry.rank}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{entry.participant.company}</p>
                        <p className="text-xs text-gray-500 mt-1">{entry.contestTitle}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{entry.score.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 space-x-3">
                          <span>{entry.submissions} submissions</span>
                          <span>{entry.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Contests</h3>
                <p className="text-gray-600">
                  Completed contests will appear here with results and winners.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Entry Dialog */}
        <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Submit Contest Entry</DialogTitle>
              <DialogDescription>
                Submit your business idea for this contest
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Entry Title *</label>
                <Input
                  placeholder="Enter your submission title"
                  value={submission.title}
                  onChange={(e) => setSubmission({...submission, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <Textarea
                  placeholder="Describe your business idea, solution, and value proposition..."
                  value={submission.description}
                  onChange={(e) => setSubmission({...submission, description: e.target.value})}
                  className="min-h-[120px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Presentation/Demo Link</label>
                <Input
                  placeholder="Link to your pitch deck, demo video, or prototype"
                  value={submission.presentation}
                  onChange={(e) => setSubmission({...submission, presentation: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitEntry}>
                Submit Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}