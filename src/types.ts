export interface Track {
  id: string;
  title: string;
  duration: string;
  url: string;
  cover: string;
}

export interface TourDate {
  id: string;
  date: string;
  venue: string;
  location: string;
  status: 'Tickets' | 'Sold Out' | 'Coming Soon';
}
