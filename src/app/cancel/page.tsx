import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Payment Cancelled
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your payment was not completed
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No worries!</CardTitle>
            <CardDescription>
              You can try again anytime. Your account and preferences are saved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900 mb-2">What happened?</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Payment was cancelled or failed</li>
                <li>• No charges were made to your account</li>
                <li>• You can try again whenever you're ready</li>
                <li>• Contact support if you need help</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/explore">
                <Button className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact our support team at{" "}
            <a href="mailto:support@xeinst.com" className="text-blue-600 hover:text-blue-500">
              support@xeinst.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
