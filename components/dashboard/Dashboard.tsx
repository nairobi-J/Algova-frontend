'use client';

import { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  TrendingUp,
  MessageCircle,
  Trophy,
  Brain,
  DollarSign,
  Eye,
  Heart,
  Share2,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [userRole] = useState('entrepreneur'); // This would come from auth context

  // Mock data for charts and stats
  const engagementData = [
    { name: 'Jan', posts: 4, likes: 65, comments: 28 },
    { name: 'Feb', posts: 6, likes: 89, comments: 45 },
    { name: 'Mar', posts: 8, likes: 120, comments: 67 },
    { name: 'Apr', posts: 5, likes: 78, comments: 34 },
    { name: 'May', posts: 10, likes: 156, comments: 89 },
    { name: 'Jun', posts: 7, likes: 134, comments: 76 }
  ];

  const ideaCategories = [
    { name: 'FinTech', value: 35, color: '#3B82F6' },
    { name: 'HealthTech', value: 25, color: '#10B981' },
    { name: 'EdTech', value: 20, color: '#F59E0B' },
    { name: 'E-commerce', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'like',
      user: 'Sarah Johnson',
      action: 'liked your business idea',
      time: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 2,
      type: 'comment',
      user: 'Michael Chen',
      action: 'commented on your post',
      time: '4 hours ago',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 3,
      type: 'follow',
      user: 'Emily Davis',
      action: 'started following you',
      time: '1 day ago',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 4,
      type: 'message',
      user: 'David Wilson',
      action: 'sent you a message',
      time: '2 days ago',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    }
  ];

  const stats = {
    entrepreneur: [
      { title: 'Total Posts', value: '24', change: '+12%', icon: <TrendingUp className="h-4 w-4" />, color: 'text-blue-600' },
      { title: 'Profile Views', value: '1,234', change: '+23%', icon: <Eye className="h-4 w-4" />, color: 'text-green-600' },
      { title: 'Connections', value: '156', change: '+8%', icon: <Users className="h-4 w-4" />, color: 'text-purple-600' },
      { title: 'AI Recommendations', value: '8', change: '+15%', icon: <Brain className="h-4 w-4" />, color: 'text-orange-600' }
    ],
    investor: [
      { title: 'Ideas Reviewed', value: '89', change: '+18%', icon: <Eye className="h-4 w-4" />, color: 'text-blue-600' },
      { title: 'Investments Made', value: '$2.5M', change: '+45%', icon: <DollarSign className="h-4 w-4" />, color: 'text-green-600' },
      { title: 'Active Contests', value: '3', change: '0%', icon: <Trophy className="h-4 w-4" />, color: 'text-yellow-600' },
      { title: 'Portfolio Companies', value: '12', change: '+20%', icon: <Target className="h-4 w-4" />, color: 'text-purple-600' }
    ]
  };

  const currentStats = stats[userRole as keyof typeof stats] || stats.entrepreneur;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            Heres whats happening with your business network today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentStats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.change.startsWith('+') ? (
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : stat.change.startsWith('-') ? (
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  ) : null}
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 
                    stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Engagement Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>
                Your posts, likes, and comments over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="posts" fill="#3B82F6" name="Posts" />
                  <Bar dataKey="likes" fill="#10B981" name="Likes" />
                  <Bar dataKey="comments" fill="#F59E0B" name="Comments" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Idea Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
              <CardDescription>
                Business idea distribution in your network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={ideaCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {ideaCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {ideaCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-gray-600">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest interactions in your network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>{' '}
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {activity.type === 'like' && <Heart className="h-4 w-4 text-red-500" />}
                      {activity.type === 'comment' && <MessageCircle className="h-4 w-4 text-blue-500" />}
                      {activity.type === 'follow' && <Users className="h-4 w-4 text-green-500" />}
                      {activity.type === 'message' && <MessageCircle className="h-4 w-4 text-purple-500" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get things done faster
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/feed">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </Link>
              <Link href="/investor-board">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Submit Business Idea
                </Button>
              </Link>
              <Link href="/contests">
                <Button className="w-full justify-start" variant="outline">
                  <Trophy className="mr-2 h-4 w-4" />
                  Join Contest
                </Button>
              </Link>
              <Link href="/legal">
                <Button className="w-full justify-start" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  Ask AI Legal Bot
                </Button>
              </Link>
              <Link href="/messages">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-blue-600" />
              AI Recommendations
            </CardTitle>
            <CardDescription>
              Personalized suggestions to grow your business network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Connect with FinTech Investors</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Based on your recent posts about payment solutions, these investors might be interested.
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  View Suggestions
                </Button>
              </div>
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-900 mb-2">Join HealthTech Contest</h4>
                <p className="text-sm text-green-700 mb-3">
                  A new contest matching your interests is now accepting submissions.
                </p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Learn More
                </Button>
              </div>
              <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                <h4 className="font-medium text-purple-900 mb-2">Legal Consultation</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Consider getting legal advice for your upcoming product launch.
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Book Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}