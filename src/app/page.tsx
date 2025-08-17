import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Users, Globe, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🚀 AI Agents Marketplace
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Xeinst v1
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              The ultimate marketplace for AI agents. Create, discover, and monetize intelligent 
              automation solutions that transform how businesses operate.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/explore">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Explore Agents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Xeinst?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The most comprehensive platform for AI agent creation and discovery
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Execute AI agents instantly with webhook-based architecture
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Enterprise-grade security with HMAC verification and role-based access
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Creator Economy</CardTitle>
                <CardDescription>
                  Monetize your AI agents with Stripe Connect integration
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Global Marketplace</CardTitle>
                <CardDescription>
                  Discover agents from creators worldwide with category filtering
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Star className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle>Premium Quality</CardTitle>
                <CardDescription>
                  Curated agents with detailed descriptions and usage examples
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <ArrowRight className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Simple webhook endpoints for seamless agent execution
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Categories
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find AI agents for every business need
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[
              "E-commerce", "Marketing", "Customer Support", 
              "Data Analysis", "Automation", "Content Creation"
            ].map((category) => (
              <Card key={category} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of creators and businesses using AI agents
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/auth/signin">
              <Button size="lg" variant="secondary">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Browse Agents
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
