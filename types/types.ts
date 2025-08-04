// src/types/types.ts
export interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  thumbnail: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
