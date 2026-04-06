import { Timestamp } from "./lib/firebase";

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  year: string;
  cover: string;
  audioUrl?: string;
  createdAt?: Timestamp;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  description?: string;
  createdAt?: Timestamp;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  createdAt?: Timestamp;
}

export interface TourDate {
  id: string;
  date: string;
  venue: string;
  location: string;
  status: 'Tickets' | 'Sold Out' | 'Coming Soon';
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  createdAt?: Timestamp;
}
