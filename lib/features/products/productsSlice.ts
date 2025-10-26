import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  reviews: number
  inStock: boolean
}

interface ProductsState {
  items: Product[]
  categories: string[]
  selectedCategory: string | null
  loading: boolean
  error: string | null
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 1,
    image: "/wireless-headphones.png",
    category: "Electronics",
    description: "Premium wireless headphones with noise cancellation",
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 0.9,
    image: "/smartwatch-lifestyle.png",
    category: "Electronics",
    description: "Advanced fitness tracking and notifications",
    rating: 4.3,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Running Shoes",
    price: 10,
    image: "/running-shoes-on-track.png",
    category: "Sports",
    description: "Comfortable running shoes for all terrains",
    rating: 4.7,
    reviews: 256,
    inStock: true,
  },
  {
    id: "4",
    name: "Coffee Maker",
    price: 0.4,
    image: "/modern-coffee-maker.png",
    category: "Home",
    description: "Automatic drip coffee maker with timer",
    rating: 4.2,
    reviews: 67,
    inStock: false,
  },
  {
    id: "5",
    name: "Backpack",
    price: 0.3,
    image: "/travel-backpack.png",
    category: "Fashion",
    description: "Durable travel backpack with multiple compartments",
    rating: 4.6,
    reviews: 143,
    inStock: true,
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    price: 0.2,
    image: "/bluetooth-speaker.png",
    category: "Electronics",
    description: "Portable speaker with excellent sound quality",
    rating: 4.4,
    reviews: 92,
    inStock: true,
  },
]

const initialState: ProductsState = {
  items: mockProducts,
  categories: ["All", "Electronics", "Sports", "Home", "Fashion"],
  selectedCategory: null,
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setSelectedCategory, setLoading, setError } = productsSlice.actions
export default productsSlice.reducer
