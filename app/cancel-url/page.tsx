"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { X, ShoppingCart, ArrowLeft, Home, RefreshCw, HelpCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppSelector } from "@/lib/hooks"

interface CancelDetails {
  reason?: string
  orderId?: string
  totalAmount?: number
}

export default function CancelUrlPage() {
  const [cancelDetails, setCancelDetails] = useState<CancelDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const { items } = useAppSelector((state) => state.cart)

  useEffect(() => {
    // Extract cancel details from URL params
    const reason = searchParams.get('reason') || 'Payment was cancelled'
    const orderId = searchParams.get('order_id') || undefined
    const totalAmount = searchParams.get('total') ? parseFloat(searchParams.get('total')!) : undefined

    setCancelDetails({
      reason,
      orderId,
      totalAmount
    })
    
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <X className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Cancel Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Your payment was not completed
          </p>
          <p className="text-muted-foreground">
            No charges have been made to your account.
          </p>
        </div>

        {/* Cancel Details */}
        {cancelDetails && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cancelDetails.orderId && (
                <div className="flex justify-between">
                  <span className="font-medium">Order ID</span>
                  <span className="font-mono text-sm">{cancelDetails.orderId}</span>
                </div>
              )}
              {cancelDetails.totalAmount && (
                <div className="flex justify-between">
                  <span>Order Total</span>
                  <span className="font-bold">${cancelDetails.totalAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-red-600 font-medium">Cancelled</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alert Message */}
        <Alert className="mb-8">
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>What happened?</strong> Your payment was cancelled before completion. 
            This could be due to various reasons such as browser issues, network problems, 
            or if you decided to cancel the transaction.
          </AlertDescription>
        </Alert>

        {/* Your Cart is Still Available */}
        {items.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Your Cart is Still Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Good news! Your items are still in your cart. You can continue shopping 
                or try checking out again.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link href="/cart">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Cart ({items.length} items)
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/checkout">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you're experiencing issues with payments or have questions about your order, 
              we're here to help.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Issues
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your internet connection</li>
                  <li>• Try a different payment method</li>
                  <li>• Clear your browser cache</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support Options
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Contact our support team</li>
                  <li>• Check our FAQ section</li>
                  <li>• Live chat available 24/7</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" asChild>
                <Link href="mailto:support@modernstore.com">
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">
                  View Help Center
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          
          {items.length > 0 && (
            <Button variant="outline" size="lg" asChild>
              <Link href="/checkout">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Checkout
              </Link>
            </Button>
          )}
          
          <Button variant="outline" size="lg" asChild>
            <Link href="/cart">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}