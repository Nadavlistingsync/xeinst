import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Zap, Star, Users } from "lucide-react";

// Mock data for demonstration
const mockAgents = [
  {
    id: "1",
    name: "E-commerce Analyzer",
    description: "Analyze your e-commerce performance and get actionable insights",
    category: "E-commerce",
    price: 29.99,
    rating: 4.8,
    users: 1247,
    creator: "DataFlow AI",
    webhookUrl: "https://api.dataflow.ai/ecommerce-analyzer",
  },
  {
    id: "2",
    name: "Social Media Scheduler",
    description: "Automatically schedule and post content across all social platforms",
    category: "Marketing",
    price: 19.99,
    rating: 4.6,
    users: 892,
    creator: "SocialBot Pro",
    webhookUrl: "https://api.socialbot.pro/scheduler",
  },
  {
    id: "3",
    name: "Customer Support Bot",
    description: "Handle customer inquiries 24/7 with intelligent responses",
    category: "Customer Support",
    price: 39.99,
    rating: 4.9,
    users: 2156,
    creator: "SupportAI",
    webhookUrl: "https://api.supportai.com/bot",
  },
  {
    id: "4",
    name: "Data Visualization Generator",
    description: "Create beautiful charts and reports from your data automatically",
    category: "Data Analysis",
    price: 24.99,
    rating: 4.7,
    users: 1567,
    creator: "VizAI",
    webhookUrl: "https://api.vizai.com/generator",
  },
  {
    id: "5",
    name: "Content Writer",
    description: "Generate high-quality blog posts, emails, and marketing copy",
    category: "Content Creation",
    price: 34.99,
    rating: 4.5,
    users: 2341,
    creator: "WriteAI",
    webhookUrl: "https://api.writeai.com/writer",
  },
  {
    id: "6",
    name: "Workflow Automator",
    description: "Automate repetitive tasks and streamline your business processes",
    category: "Automation",
    price: 44.99,
    rating: 4.8,
    users: 1892,
    creator: "AutoFlow",
    webhookUrl: "https://api.autoflow.com/automator",
  },
];

const categories = [
  "All",
  "E-commerce",
  "Marketing",
  "Customer Support",
  "Data Analysis",
  "Content Creation",
  "Automation",
];

function AgentCard({ agent }: { agent: typeof mockAgents[0] }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>
            <CardDescription className="mt-2">{agent.description}</CardDescription>
          </div>
          <Badge variant="secondary">{agent.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              {agent.rating}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {agent.users.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${agent.price}</div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm">
            <span className="text-gray-500">Creator: </span>
            <span className="font-medium">{agent.creator}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button className="flex-1" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Try Agent
            </Button>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AgentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockAgents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}

function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={category === "All" ? "default" : "outline"}
          size="sm"
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Explore AI Agents
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover powerful AI agents created by talented developers worldwide. 
            Find the perfect automation solution for your business needs.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search agents..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="All">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <CategoryFilter />
        </div>

        {/* Agents Grid */}
        <Suspense fallback={<div>Loading agents...</div>}>
          <AgentGrid />
        </Suspense>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Agents
          </Button>
        </div>
      </div>
    </div>
  );
}
