"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Check, Package, Truck, Mail, ArrowLeft, Home, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch } from "@/lib/hooks"
import { clearCart } from "@/lib/features/cart/cartSlice"

interface OrderDetails {
  orderId: string
  totalAmount: number
  customerEmail: string
  customerName: string
  paymentMethod: string
  estimatedDelivery: string
}

export default function SuccessUrlPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Simulate fetching order details from URL params or API
    const orderId = searchParams.get('order_id') || `order_${Date.now()}`
    const totalAmount = parseFloat(searchParams.get('total') || '0')
    const customerEmail = searchParams.get('email') || 'customer@example.com'
    const customerName = searchParams.get('name') || 'Customer'
    const paymentMethod = searchParams.get('payment_method') || 'Pi Network'

    setOrderDetails({
      orderId,
      totalAmount,
      customerEmail,
      customerName,
      paymentMethod,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
    })

    // Clear cart after successful payment
    dispatch(clearCart())
    
    setIsLoading(false)
  }, [searchParams, dispatch])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Loading order confirmation...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Thank you for your order, {orderDetails?.customerName}
          </p>
          <p className="text-muted-foreground">
            Your payment has been processed and your order is being prepared.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order ID</span>
                <Badge variant="outline" className="font-mono">
                  {orderDetails?.orderId}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-bold text-lg">${orderDetails?.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="flex items-center">
                  <div className="w-4 h-4 mr-1">
                    <img src="/image.png" alt="Pi" className="w-full h-full" />
                  </div>
                  {orderDetails?.paymentMethod}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="text-green-600 font-medium">
                  {orderDetails?.estimatedDelivery}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Confirmation Email</h4>
                  <p className="text-sm text-muted-foreground">
                    We've sent order details to {orderDetails?.customerEmail}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">Order Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your items are being prepared for shipment
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Shipping Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll receive tracking information once your order ships
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Information */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about your order, please don't hesitate to contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link href="mailto:support@modernstore.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/help">
                    View Help Center
                  </Link>
                </Button>
              </div>
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
          <Button variant="outline" size="lg" asChild>
            <Link href="/orders">
              <ShoppingBag className="w-4 h-4 mr-2" />
              View Order History
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}