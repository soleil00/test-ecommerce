import axios from "axios"

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
  timeout: 300000,
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json",
    "apiKey": process.env.NEXT_PUBLIC_API_KEY || "",
  }
})


export const axiosClientV0 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL2,
  timeout: 300000,
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json",
    "apiKey": process.env.NEXT_PUBLIC_WALLWET_API_KEY || "",
  }
})
