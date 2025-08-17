import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your AI agent subscription is now active
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Xeinst!</CardTitle>
            <CardDescription>
              You now have access to powerful AI agents. Start exploring and automating your workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">What you can do now:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Execute AI agents via webhooks</li>
                <li>• Access your dashboard</li>
                <li>• View usage analytics</li>
                <li>• Manage your subscriptions</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              
              <Link href="/explore">
                <Button variant="outline" className="w-full">
                  Explore More Agents
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Need help getting started? Check out our{" "}
            <a href="/docs" className="text-blue-600 hover:text-blue-500">
              documentation
            </a>
            {" "}or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
