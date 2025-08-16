'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Heart, MessageCircle, Share2, BookMarked as BookMark, MoreHorizontal, Image as ImageIcon, Video, FileText, TrendingUp, Users, Brain, Clock, ThumbsUp, Eye, Send } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SocialFeed() {
  const [newPost, setNewPost] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock posts data
  const posts = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        role: 'Entrepreneur',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'FinTech Solutions'
      },
      content: "Just launched our new AI-powered payment system! Looking for feedback from the community. This solution reduces transaction processing time by 80% and includes advanced fraud detection. Would love to connect with other FinTech entrepreneurs and potential investors. #FinTech #AI #Startup",
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12,
      shares: 8,
      views: 234,
      tags: ['FinTech', 'AI', 'Payment'],
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      author: {
        name: 'Michael Chen',
        role: 'Investor',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'Venture Capital Group'
      },
      content: "Excited to announce our new $50M fund focused on HealthTech startups! We're particularly interested in companies working on telemedicine, medical AI, and digital therapeutics. DM me if you're building something amazing in this space. #HealthTech #Investment #Funding",
      timestamp: '4 hours ago',
      likes: 89,
      comments: 23,
      shares: 15,
      views: 567,
      tags: ['HealthTech', 'Investment', 'Funding'],
      isLiked: true,
      isSaved: true
    },
    {
      id: 3,
      author: {
        name: 'Emily Davis',
        role: 'Legal Advisor',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'Davis Legal Associates'
      },
      content: "Common legal mistakes I see startups make: 1) Not protecting IP early enough 2) Inadequate founder agreements 3) Ignoring compliance requirements 4) Poor contract management. Book a consultation if you need help navigating these challenges. Prevention is always better than cure! #LegalAdvice #Startups",
      timestamp: '6 hours ago',
      likes: 67,
      comments: 18,
      shares: 22,
      views: 445,
      tags: ['Legal', 'Startups', 'IP'],
      isLiked: false,
      isSaved: false
    },
    {
      id: 4,
      author: {
        name: 'David Wilson',
        role: 'Entrepreneur',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        company: 'EduTech Innovations'
      },
      content: "Our EdTech platform just hit 100K active users! 🎉 What started as a simple idea to make learning more interactive has grown into a comprehensive solution used by schools across 15 countries. Thank you to our investors, team, and the amazing Algova community for the support. Next stop: 1M users! #EdTech #Milestone #Growth",
      timestamp: '8 hours ago',
      likes: 156,
      comments: 34,
      shares: 28,
      views: 890,
      tags: ['EdTech', 'Growth', 'Milestone'],
      image: 'https://images.pexels.com/photos/5427868/pexels-photo-5427868.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      isLiked: true,
      isSaved: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Posts', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'following', label: 'Following', icon: <Users className="h-4 w-4" /> },
    { id: 'trending', label: 'Trending', icon: <Heart className="h-4 w-4" /> },
    { id: 'ai-recommendations', label: 'AI Picks', icon: <Brain className="h-4 w-4" /> }
  ];

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    toast.success('Post shared successfully!');
    setNewPost('');
  };

  const handleLike = (postId: number) => {
    toast.success('Post liked!');
  };

  const handleSave = (postId: number) => {
    toast.success('Post saved!');
  };

  const handleShare = (postId: number) => {
    toast.success('Post shared!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Create Post */}
        <Card className="mb-6 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What's on your mind? Share your business insights..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px] border-0 resize-none focus:ring-0 text-base"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Document
                </Button>
              </div>
              <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feed Filters */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="flex-shrink-0"
            >
              {filter.icon}
              <span className="ml-2">{filter.label}</span>
            </Button>
          ))}
        </div>

        {/* AI Recommendation Banner */}
        {selectedFilter === 'ai-recommendations' && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">AI-Curated Content</h3>
                  <p className="text-sm text-blue-700">
                    These posts are specially selected based on your interests, connections, and business focus areas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {post.author.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{post.author.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Save post</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                      <DropdownMenuItem>Hide</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-900 leading-relaxed mb-3">{post.content}</p>
                  
                  {/* Post Image */}
                  {post.image && (
                    <div className="rounded-lg overflow-hidden mb-3">
                      <img 
                        src={post.image} 
                        alt="Post image" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Post Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {post.comments}
                    </span>
                    <span className="flex items-center">
                      <Share2 className="h-3 w-3 mr-1" />
                      {post.shares}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {post.views} views
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={post.isLiked ? 'text-red-600 hover:text-red-700' : ''}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleShare(post.id)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSave(post.id)}
                    className={post.isSaved ? 'text-blue-600 hover:text-blue-700' : ''}
                  >
                    <BookMark className={`h-4 w-4 ${post.isSaved ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
}