"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { CartItem } from "@/lib/features/cart/cartSlice"
import { useAppDispatch } from "@/lib/hooks"
import { removeFromCart, updateQuantity } from "@/lib/features/cart/cartSlice"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const dispatch = useAppDispatch()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.product.id))
    } else {
      dispatch(updateQuantity({ id: item.product.id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.product.id))
  }

  const itemTotal = item.product.price * item.quantity

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg">{item.product.name}</h3>
            <p className="text-muted-foreground">{item.product.description}</p>
            <p className="text-lg font-medium mt-2">${item.product.price.toFixed(2)} each</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{item.quantity}</span>
            <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold">${itemTotal.toFixed(2)}</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive mt-2"
              onClick={handleRemoveItem}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
